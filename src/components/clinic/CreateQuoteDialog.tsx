import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, Plus, X } from "lucide-react";

interface Lead {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string | null;
  treatment_type: string | null;
}

interface ClinicInfo {
  name: string;
  country: string;
  logo_url: string | null;
}

interface CreateQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead;
  clinicId: string;
  onSuccess: () => void;
}

const treatmentTypes = [
  "FIV classique",
  "FIV-ICSI",
  "Don d'ovocytes",
  "Don de sperme",
  "Double don",
  "DPI (Diagnostic préimplantatoire)",
  "Préservation de fertilité",
  "Autre",
];

const CreateQuoteDialog = ({
  open,
  onOpenChange,
  lead,
  clinicId,
  onSuccess,
}: CreateQuoteDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  
  // Form state
  const [treatmentType, setTreatmentType] = useState(lead.treatment_type || "");
  const [priceTotal, setPriceTotal] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [successRate, setSuccessRate] = useState("");
  const [duration, setDuration] = useState("");
  const [includedServices, setIncludedServices] = useState<string[]>([
    "Consultation initiale",
    "Examens de base",
  ]);
  const [newService, setNewService] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      fetchClinicInfo();
      if (lead.treatment_type) {
        setTreatmentType(lead.treatment_type);
      }
    }
  }, [open, clinicId]);

  const fetchClinicInfo = async () => {
    const { data } = await supabase
      .from("clinics")
      .select("name, country, logo_url")
      .eq("id", clinicId)
      .single();

    if (data) {
      setClinicInfo(data);
    }
  };

  const addService = () => {
    if (newService.trim() && !includedServices.includes(newService.trim())) {
      setIncludedServices([...includedServices, newService.trim()]);
      setNewService("");
    }
  };

  const removeService = (service: string) => {
    setIncludedServices(includedServices.filter((s) => s !== service));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!priceTotal || !treatmentType) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);

    try {
      // Calculate expiration (30 days from now)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const quoteData = {
        user_id: lead.user_id,
        clinic_name: clinicInfo?.name || "Clinique",
        clinic_country: clinicInfo?.country || "Unknown",
        clinic_logo_url: clinicInfo?.logo_url || null,
        treatment_type: treatmentType,
        price_total: parseFloat(priceTotal),
        price_currency: currency,
        success_rate: successRate || null,
        treatment_duration: duration || null,
        included_services: includedServices,
        additional_notes: notes || null,
        status: "pending",
        expires_at: expiresAt.toISOString(),
      };

      const { error } = await supabase.from("quotes").insert(quoteData);

      if (error) {
        console.error("Error creating quote:", error);
        toast.error("Erreur lors de la création du devis");
        return;
      }

      toast.success("Devis envoyé au patient !");
      onSuccess();
      onOpenChange(false);
      
      // Reset form
      setPriceTotal("");
      setSuccessRate("");
      setDuration("");
      setNotes("");
      setIncludedServices(["Consultation initiale", "Examens de base"]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Créer un devis
          </DialogTitle>
          <DialogDescription>
            Devis pour {lead.user_name || lead.user_email}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Treatment Type */}
          <div className="space-y-2">
            <Label htmlFor="treatmentType">Type de traitement *</Label>
            <Select value={treatmentType} onValueChange={setTreatmentType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un traitement" />
              </SelectTrigger>
              <SelectContent>
                {treatmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix total *</Label>
              <Input
                id="price"
                type="number"
                placeholder="5000"
                value={priceTotal}
                onChange={(e) => setPriceTotal(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Devise</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Success Rate & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="successRate">Taux de réussite estimé</Label>
              <Input
                id="successRate"
                placeholder="ex: 45%"
                value={successRate}
                onChange={(e) => setSuccessRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Durée du traitement</Label>
              <Input
                id="duration"
                placeholder="ex: 2-3 semaines"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          {/* Included Services */}
          <div className="space-y-2">
            <Label>Services inclus</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {includedServices.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => removeService(service)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un service..."
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
              />
              <Button type="button" variant="outline" onClick={addService}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes additionnelles</Label>
            <Textarea
              id="notes"
              placeholder="Informations complémentaires pour le patient..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer le devis"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuoteDialog;
