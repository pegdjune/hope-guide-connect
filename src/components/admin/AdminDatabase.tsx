import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, Database, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ImportResult {
  total: number;
  created: number;
  updated: number;
  errors: string[];
}

const AdminDatabase = () => {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastResult, setLastResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSVValue = (value: string): string | null => {
    const trimmed = value.trim();
    if (trimmed === "" || trimmed === "NA" || trimmed === "N/A") return null;
    return trimmed;
  };

  const parseBooleanValue = (value: string): boolean => {
    const trimmed = value.trim().toUpperCase();
    return trimmed === "OUI" || trimmed === "TRUE" || trimmed === "1" || trimmed === "YES";
  };

  const parseNumberValue = (value: string): number | null => {
    const parsed = parseCSVValue(value);
    if (!parsed) return null;
    const num = parseFloat(parsed.replace(",", "."));
    return isNaN(num) ? null : num;
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setProgress(0);
    setLastResult(null);

    const result: ImportResult = {
      total: 0,
      created: 0,
      updated: 0,
      errors: [],
    };

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = parseCSVLine(lines[0]);
      
      const dataLines = lines.slice(1);
      result.total = dataLines.length;

      for (let i = 0; i < dataLines.length; i++) {
        const values = parseCSVLine(dataLines[i]);
        const row: Record<string, string> = {};
        
        headers.forEach((header, index) => {
          row[header.trim()] = values[index] || "";
        });

        try {
          const clinicData = {
            country: parseCSVValue(row["Pays"]) || "Unknown",
            city: parseCSVValue(row["Ville"]) || "Unknown",
            name: parseCSVValue(row["Nom_Clinique"]) || "Unknown",
            type: parseCSVValue(row["Type"]) || "Privée",
            latitude: parseNumberValue(row["Latitude"]),
            longitude: parseNumberValue(row["Longitude"]),
            email: parseCSVValue(row["Contact_Email"]),
            phone: parseCSVValue(row["Contact_Phone"]),
            website: parseCSVValue(row["Website"]),
            verification_status: parseCSVValue(row["Statut_Verification"]) || "Non_vérifié",
            updated_at: parseCSVValue(row["Date_Update"]) || new Date().toISOString(),
            collection_notes: parseCSVValue(row["Note_Collecte"]),
            tarif_fiv_base: parseNumberValue(row["Tarif_FIV_Base_EUR"]),
            tarif_fiv_dpi: parseNumberValue(row["Tarif_FIV_DPI_EUR"]),
            tarif_don_ovocytes: parseNumberValue(row["Tarif_Don_Ovocytes_EUR"]),
            service_don_ovocytes: parseBooleanValue(row["Services_Don_Ovocytes"]),
            service_don_sperme: parseBooleanValue(row["Services_Don_Sperme"]),
            service_dpi: parseBooleanValue(row["Services_DPI"]),
            access_couples_hetero: parseBooleanValue(row["Couples_Heterosexuels"]),
            access_couples_lesbiennes: parseBooleanValue(row["Couples_Lesbiennes"]),
            access_femmes_seules: parseBooleanValue(row["Femmes_Seules"]),
            taux_reussite_fiv: parseNumberValue(row["Taux_Reussite_FIV_Pct"]),
            taux_reussite_icsi: parseNumberValue(row["Taux_Reussite_ICSI_Pct"]),
            data_source: parseCSVValue(row["Source_Donnees"]),
            data_year: parseNumberValue(row["Annee_Donnees"]),
          };

          // Check if clinic exists by name + city + country
          const { data: existing } = await supabase
            .from("clinics")
            .select("id")
            .eq("name", clinicData.name)
            .eq("city", clinicData.city)
            .eq("country", clinicData.country)
            .maybeSingle();

          if (existing) {
            // Update
            const { error } = await supabase
              .from("clinics")
              .update(clinicData)
              .eq("id", existing.id);

            if (error) throw error;
            result.updated++;
          } else {
            // Insert
            const { error } = await supabase.from("clinics").insert(clinicData);
            if (error) throw error;
            result.created++;
          }
        } catch (err: any) {
          result.errors.push(`Ligne ${i + 2}: ${err.message}`);
        }

        setProgress(Math.round(((i + 1) / dataLines.length) * 100));
      }

      setLastResult(result);
      toast.success(`Import terminé: ${result.created} créées, ${result.updated} mises à jour`);
    } catch (err: any) {
      toast.error("Erreur lors de l'import: " + err.message);
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleExport = async () => {
    setExporting(true);

    try {
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .order("country")
        .order("city")
        .order("name");

      if (error) throw error;

      const headers = [
        "Pays",
        "Ville",
        "Nom_Clinique",
        "Type",
        "Latitude",
        "Longitude",
        "Contact_Email",
        "Contact_Phone",
        "Website",
        "Statut_Verification",
        "Date_Update",
        "Note_Collecte",
        "Tarif_FIV_Base_EUR",
        "Tarif_FIV_DPI_EUR",
        "Tarif_Don_Ovocytes_EUR",
        "Services_Don_Ovocytes",
        "Services_Don_Sperme",
        "Services_DPI",
        "Couples_Heterosexuels",
        "Couples_Lesbiennes",
        "Femmes_Seules",
        "Taux_Reussite_FIV_Pct",
        "Taux_Reussite_ICSI_Pct",
        "Source_Donnees",
        "Annee_Donnees",
      ];

      const formatValue = (val: any) => {
        if (val === null || val === undefined) return "NA";
        if (typeof val === "boolean") return val ? "OUI" : "NON";
        return String(val);
      };

      const rows = (data || []).map((clinic) => [
        clinic.country,
        clinic.city,
        clinic.name,
        clinic.type,
        clinic.latitude,
        clinic.longitude,
        clinic.email,
        clinic.phone,
        clinic.website,
        clinic.verification_status || "Non_vérifié",
        clinic.updated_at?.split("T")[0],
        clinic.collection_notes,
        clinic.tarif_fiv_base,
        clinic.tarif_fiv_dpi,
        clinic.tarif_don_ovocytes,
        clinic.service_don_ovocytes,
        clinic.service_don_sperme,
        clinic.service_dpi,
        clinic.access_couples_hetero,
        clinic.access_couples_lesbiennes,
        clinic.access_femmes_seules,
        clinic.taux_reussite_fiv,
        clinic.taux_reussite_icsi,
        clinic.data_source,
        clinic.data_year,
      ].map(formatValue));

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cliniques_export_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success(`${data?.length || 0} cliniques exportées`);
    } catch (err: any) {
      toast.error("Erreur lors de l'export: " + err.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Importer CSV
            </CardTitle>
            <CardDescription>
              Importez ou mettez à jour les cliniques depuis un fichier CSV
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleImport}
              className="hidden"
              id="csv-import"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
              className="w-full"
            >
              {importing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Import en cours...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Sélectionner un fichier CSV
                </>
              )}
            </Button>

            {importing && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground text-center">
                  {progress}% terminé
                </p>
              </div>
            )}

            {lastResult && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Import terminé</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total:</span>{" "}
                    <Badge variant="outline">{lastResult.total}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Créées:</span>{" "}
                    <Badge variant="default">{lastResult.created}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">MAJ:</span>{" "}
                    <Badge variant="secondary">{lastResult.updated}</Badge>
                  </div>
                </div>
                {lastResult.errors.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-1 text-destructive text-sm">
                      <AlertTriangle className="w-3 h-3" />
                      {lastResult.errors.length} erreur(s)
                    </div>
                    <div className="max-h-24 overflow-y-auto text-xs mt-1">
                      {lastResult.errors.slice(0, 5).map((err, i) => (
                        <div key={i} className="text-destructive">
                          {err}
                        </div>
                      ))}
                      {lastResult.errors.length > 5 && (
                        <div className="text-muted-foreground">
                          ... et {lastResult.errors.length - 5} autres
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exporter CSV
            </CardTitle>
            <CardDescription>
              Téléchargez toutes les cliniques au format CSV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleExport}
              disabled={exporting}
              variant="outline"
              className="w-full"
            >
              {exporting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Export en cours...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter toutes les cliniques
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Format Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Format CSV attendu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-1 font-medium">Colonne</th>
                  <th className="text-left py-2 px-1 font-medium">Type</th>
                  <th className="text-left py-2 px-1 font-medium">Exemple</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="py-1 px-1">Pays</td><td>Texte</td><td className="text-muted-foreground">France</td></tr>
                <tr><td className="py-1 px-1">Ville</td><td>Texte</td><td className="text-muted-foreground">Paris</td></tr>
                <tr><td className="py-1 px-1">Nom_Clinique</td><td>Texte</td><td className="text-muted-foreground">Clinique ABC</td></tr>
                <tr><td className="py-1 px-1">Type</td><td>Texte</td><td className="text-muted-foreground">Privée</td></tr>
                <tr><td className="py-1 px-1">Latitude / Longitude</td><td>Nombre</td><td className="text-muted-foreground">48.8566</td></tr>
                <tr><td className="py-1 px-1">Statut_Verification</td><td>Texte</td><td className="text-muted-foreground">Confirmé / À_confirmer / Non_vérifié</td></tr>
                <tr><td className="py-1 px-1">Tarifs (EUR)</td><td>Nombre</td><td className="text-muted-foreground">3500 ou NA</td></tr>
                <tr><td className="py-1 px-1">Services / Accès</td><td>OUI/NON</td><td className="text-muted-foreground">OUI</td></tr>
                <tr><td className="py-1 px-1">Taux_Reussite_*_Pct</td><td>Nombre</td><td className="text-muted-foreground">45.5</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            💡 Utilisez "NA" pour les valeurs manquantes. L'import détecte automatiquement si une clinique existe (même nom + ville + pays) et la met à jour.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDatabase;
