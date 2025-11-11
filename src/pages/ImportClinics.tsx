import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { importClinicsFromCSV } from "@/scripts/importClinics";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ImportClinics() {
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count?: number; error?: any } | null>(null);

  const handleImport = async () => {
    setIsImporting(true);
    setResult(null);
    
    try {
      const importResult = await importClinicsFromCSV();
      setResult(importResult);
      
      if (importResult.success) {
        toast.success(`${importResult.count} cliniques importées avec succès !`);
      } else {
        toast.error("Erreur lors de l'importation");
      }
    } catch (error) {
      console.error('Import error:', error);
      setResult({ success: false, error });
      toast.error("Erreur lors de l'importation");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Import des Cliniques
          </h1>
          
          <div className="space-y-6">
            <p className="text-muted-foreground text-center">
              Cliquez sur le bouton ci-dessous pour importer toutes les cliniques depuis le fichier CSV dans la base de données.
            </p>
            
            <div className="flex justify-center">
              <Button
                onClick={handleImport}
                disabled={isImporting}
                size="lg"
                className="min-w-[200px]"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Importation en cours...
                  </>
                ) : (
                  'Importer les cliniques'
                )}
              </Button>
            </div>
            
            {result && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${
                result.success 
                  ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
              }`}>
                {result.success ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">
                        Importation réussie !
                      </p>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        {result.count} cliniques ont été importées dans la base de données.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 dark:text-red-100">
                        Erreur lors de l'importation
                      </p>
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        {result.error?.message || 'Une erreur est survenue'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
            
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Note importante :</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Les cliniques seront importées avec leurs données de base (nom, ville, pays, type)</li>
                <li>Les coordonnées géographiques devront être ajoutées ultérieurement</li>
                <li>Les notes, taux de réussite et prix pourront être complétés plus tard</li>
                <li>L'importation prendra quelques secondes pour traiter toutes les cliniques</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}