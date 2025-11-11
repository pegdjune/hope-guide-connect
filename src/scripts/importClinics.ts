import { supabase } from "@/integrations/supabase/client";

// Script pour importer les cliniques depuis le CSV
export async function importClinicsFromCSV() {
  try {
    // Charger le fichier CSV
    const response = await fetch('/src/data/cliniques_fiv_europe.csv');
    const csvText = await response.text();
    
    // Parser le CSV
    const lines = csvText.split('\n');
    const clinics = [];
    
    // Sauter la première ligne (en-têtes)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Parser la ligne en tenant compte des virgules dans les guillemets
      const values = parseCSVLine(line);
      
      if (values.length >= 7) {
        const clinic = {
          country: values[0],
          city: values[1],
          name: values[2],
          type: values[3],
          total_clinics_country: parseInt(values[4]) || null,
          reporting_clinics: parseInt(values[5]) || null,
          country_configuration: values[6],
          // Valeurs par défaut pour les champs optionnels
          rating: null,
          review_count: 0,
          success_rate: null,
          price_from: null,
          specialties: ['FIV'],
          badges: values[3] === 'Privée' ? ['Clinique privée'] : ['Clinique publique'],
          longitude: null,
          latitude: null,
        };
        
        clinics.push(clinic);
      }
    }
    
    console.log(`Parsed ${clinics.length} clinics from CSV`);
    
    // Insérer les cliniques par lots de 100
    const batchSize = 100;
    for (let i = 0; i < clinics.length; i += batchSize) {
      const batch = clinics.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('clinics')
        .insert(batch);
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        throw error;
      }
      
      console.log(`Inserted batch ${i / batchSize + 1}/${Math.ceil(clinics.length / batchSize)}`);
    }
    
    console.log('All clinics imported successfully!');
    return { success: true, count: clinics.length };
    
  } catch (error) {
    console.error('Error importing clinics:', error);
    return { success: false, error };
  }
}

// Parser une ligne CSV en tenant compte des virgules dans les guillemets
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  // Ajouter la dernière valeur
  if (currentValue) {
    values.push(currentValue.trim());
  }
  
  return values;
}