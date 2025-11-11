import { supabase } from "@/integrations/supabase/client";

interface CSVClinic {
  Pays: string;
  Ville: string;
  "Nom de la clinique": string;
  Type: string;
  "Total cliniques pays": string;
  "Cliniques rapportantes": string;
  "Configuration pays": string;
  Latitude: string;
  Longitude: string;
}

export async function updateClinicsWithCoordinates() {
  try {
    console.log("🔄 Début de la mise à jour des coordonnées...");

    // Fetch CSV file
    const response = await fetch("/cliniques_fiv_europe_avec_coordonnees.csv");
    const csvText = await response.text();

    // Parse CSV
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(",");
      const clinic: any = {};

      headers.forEach((header, index) => {
        clinic[header.trim()] = values[index]?.trim() || "";
      });

      const latitude = parseFloat(clinic.Latitude);
      const longitude = parseFloat(clinic.Longitude);

      if (isNaN(latitude) || isNaN(longitude)) {
        console.log(`⚠️ Ligne ${i + 1}: Coordonnées invalides pour ${clinic["Nom de la clinique"]}`);
        skipped++;
        continue;
      }

      // Update clinic in database
      const { data: existingClinic, error: fetchError } = await supabase
        .from("clinics")
        .select("id")
        .eq("name", clinic["Nom de la clinique"])
        .eq("city", clinic.Ville)
        .eq("country", clinic.Pays)
        .single();

      if (fetchError || !existingClinic) {
        console.log(`⚠️ Clinique non trouvée: ${clinic["Nom de la clinique"]} à ${clinic.Ville}`);
        skipped++;
        continue;
      }

      const { error: updateError } = await supabase
        .from("clinics")
        .update({
          latitude,
          longitude,
        })
        .eq("id", existingClinic.id);

      if (updateError) {
        console.error(`❌ Erreur mise à jour ${clinic["Nom de la clinique"]}:`, updateError);
        errors++;
      } else {
        console.log(`✅ Mise à jour: ${clinic["Nom de la clinique"]} (${latitude}, ${longitude})`);
        updated++;
      }
    }

    console.log(`\n📊 Résumé:`);
    console.log(`✅ ${updated} cliniques mises à jour`);
    console.log(`⚠️ ${skipped} cliniques ignorées`);
    console.log(`❌ ${errors} erreurs`);

    return { updated, skipped, errors };
  } catch (error) {
    console.error("❌ Erreur générale:", error);
    throw error;
  }
}
