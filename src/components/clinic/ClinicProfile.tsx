import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Building2, Save, Globe, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

interface ClinicData {
  id: string;
  name: string;
  city: string;
  country: string;
  type: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  success_rate: string | null;
  price_from: number | null;
  tarif_fiv_base: number | null;
  tarif_fiv_dpi: number | null;
  tarif_don_ovocytes: number | null;
  service_don_ovocytes: boolean | null;
  service_don_sperme: boolean | null;
  service_dpi: boolean | null;
  access_couples_hetero: boolean | null;
  access_couples_lesbiennes: boolean | null;
  access_femmes_seules: boolean | null;
}

interface ClinicProfileProps {
  clinicId: string;
}

const ClinicProfile = ({ clinicId }: ClinicProfileProps) => {
  const [clinic, setClinic] = useState<ClinicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [successRate, setSuccessRate] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [tarifFivBase, setTarifFivBase] = useState("");
  const [tarifFivDpi, setTarifFivDpi] = useState("");
  const [tarifDonOvocytes, setTarifDonOvocytes] = useState("");
  const [serviceDonOvocytes, setServiceDonOvocytes] = useState(false);
  const [serviceDonSperme, setServiceDonSperme] = useState(false);
  const [serviceDpi, setServiceDpi] = useState(false);
  const [accessCouplesHetero, setAccessCouplesHetero] = useState(true);
  const [accessCouplesLesbiennes, setAccessCouplesLesbiennes] = useState(false);
  const [accessFemmesSeules, setAccessFemmesSeules] = useState(false);

  useEffect(() => {
    fetchClinic();
  }, [clinicId]);

  const fetchClinic = async () => {
    const { data, error } = await supabase
      .from("clinics")
      .select("*")
      .eq("id", clinicId)
      .single();

    if (error) {
      console.error("Error fetching clinic:", error);
      toast.error("Erreur lors du chargement");
    } else if (data) {
      setClinic(data);
      // Populate form
      setDescription(data.description || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setWebsite(data.website || "");
      setSuccessRate(data.success_rate || "");
      setPriceFrom(data.price_from?.toString() || "");
      setTarifFivBase(data.tarif_fiv_base?.toString() || "");
      setTarifFivDpi(data.tarif_fiv_dpi?.toString() || "");
      setTarifDonOvocytes(data.tarif_don_ovocytes?.toString() || "");
      setServiceDonOvocytes(data.service_don_ovocytes || false);
      setServiceDonSperme(data.service_don_sperme || false);
      setServiceDpi(data.service_dpi || false);
      setAccessCouplesHetero(data.access_couples_hetero !== false);
      setAccessCouplesLesbiennes(data.access_couples_lesbiennes || false);
      setAccessFemmesSeules(data.access_femmes_seules || false);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const updateData = {
      description: description || null,
      email: email || null,
      phone: phone || null,
      website: website || null,
      success_rate: successRate || null,
      price_from: priceFrom ? parseInt(priceFrom) : null,
      tarif_fiv_base: tarifFivBase ? parseInt(tarifFivBase) : null,
      tarif_fiv_dpi: tarifFivDpi ? parseInt(tarifFivDpi) : null,
      tarif_don_ovocytes: tarifDonOvocytes ? parseInt(tarifDonOvocytes) : null,
      service_don_ovocytes: serviceDonOvocytes,
      service_don_sperme: serviceDonSperme,
      service_dpi: serviceDpi,
      access_couples_hetero: accessCouplesHetero,
      access_couples_lesbiennes: accessCouplesLesbiennes,
      access_femmes_seules: accessFemmesSeules,
    };

    const { error } = await supabase
      .from("clinics")
      .update(updateData)
      .eq("id", clinicId);

    if (error) {
      console.error("Error updating clinic:", error);
      toast.error("Erreur lors de la sauvegarde");
    } else {
      toast.success("Profil mis à jour");
      fetchClinic();
    }

    setSaving(false);
  };

  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  if (!clinic) {
    return <p>Clinique non trouvée</p>;
  }

  return (
    <div className="space-y-6">
      {/* Basic Info (Read-only) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Informations générales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom</p>
              <p className="font-medium">{clinic.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{clinic.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ville</p>
              <p className="font-medium flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {clinic.city}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pays</p>
              <p className="font-medium">{clinic.country}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            * Pour modifier ces informations, contactez l'administrateur.
          </p>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Coordonnées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@clinique.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 123 456 789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Site web
              </Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Présentez votre clinique..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Tarifs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priceFrom">Prix de base (€)</Label>
              <Input
                id="priceFrom"
                type="number"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                placeholder="3000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tarifFivBase">FIV classique (€)</Label>
              <Input
                id="tarifFivBase"
                type="number"
                value={tarifFivBase}
                onChange={(e) => setTarifFivBase(e.target.value)}
                placeholder="4500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tarifFivDpi">FIV + DPI (€)</Label>
              <Input
                id="tarifFivDpi"
                type="number"
                value={tarifFivDpi}
                onChange={(e) => setTarifFivDpi(e.target.value)}
                placeholder="7000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tarifDonOvocytes">Don d'ovocytes (€)</Label>
              <Input
                id="tarifDonOvocytes"
                type="number"
                value={tarifDonOvocytes}
                onChange={(e) => setTarifDonOvocytes(e.target.value)}
                placeholder="6000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="successRate">Taux de réussite global</Label>
            <Input
              id="successRate"
              value={successRate}
              onChange={(e) => setSuccessRate(e.target.value)}
              placeholder="ex: 45% (femmes < 35 ans)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle>Services proposés</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="donOvocytes">Don d'ovocytes</Label>
              <Switch
                id="donOvocytes"
                checked={serviceDonOvocytes}
                onCheckedChange={setServiceDonOvocytes}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="donSperme">Don de sperme</Label>
              <Switch
                id="donSperme"
                checked={serviceDonSperme}
                onCheckedChange={setServiceDonSperme}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="dpi">DPI</Label>
              <Switch
                id="dpi"
                checked={serviceDpi}
                onCheckedChange={setServiceDpi}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access */}
      <Card>
        <CardHeader>
          <CardTitle>Accès aux traitements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="couplesHetero">Couples hétérosexuels</Label>
              <Switch
                id="couplesHetero"
                checked={accessCouplesHetero}
                onCheckedChange={setAccessCouplesHetero}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="couplesLesbiennes">Couples lesbiens</Label>
              <Switch
                id="couplesLesbiennes"
                checked={accessCouplesLesbiennes}
                onCheckedChange={setAccessCouplesLesbiennes}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label htmlFor="femmesSeules">Femmes seules</Label>
              <Switch
                id="femmesSeules"
                checked={accessFemmesSeules}
                onCheckedChange={setAccessFemmesSeules}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Sauvegarde..." : "Enregistrer les modifications"}
        </Button>
      </div>
    </div>
  );
};

export default ClinicProfile;
