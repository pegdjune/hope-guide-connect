import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Mail, UserPlus, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Clinic {
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
  created_at: string | null;
}

interface ClinicAccount {
  id: string;
  clinic_id: string;
  user_id: string;
  invitation_token: string | null;
  invitation_sent_at: string | null;
  invitation_accepted_at: string | null;
}

const AdminClinics = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [clinicAccounts, setClinicAccounts] = useState<ClinicAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteClinicId, setInviteClinicId] = useState<string>("");
  const [inviteEmail, setInviteEmail] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("Privée");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [successRate, setSuccessRate] = useState("");
  const [priceFrom, setPriceFrom] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [clinicsResult, accountsResult] = await Promise.all([
      supabase.from("clinics").select("*").order("name"),
      supabase.from("clinic_accounts").select("*"),
    ]);

    if (clinicsResult.error) {
      console.error("Error fetching clinics:", clinicsResult.error);
    } else {
      setClinics(clinicsResult.data || []);
    }

    if (accountsResult.error) {
      console.error("Error fetching accounts:", accountsResult.error);
    } else {
      setClinicAccounts(accountsResult.data || []);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setCity("");
    setCountry("");
    setType("Privée");
    setEmail("");
    setPhone("");
    setWebsite("");
    setDescription("");
    setSuccessRate("");
    setPriceFrom("");
    setEditingClinic(null);
  };

  const openEditDialog = (clinic: Clinic) => {
    setEditingClinic(clinic);
    setName(clinic.name);
    setCity(clinic.city);
    setCountry(clinic.country);
    setType(clinic.type);
    setEmail(clinic.email || "");
    setPhone(clinic.phone || "");
    setWebsite(clinic.website || "");
    setDescription(clinic.description || "");
    setSuccessRate(clinic.success_rate || "");
    setPriceFrom(clinic.price_from?.toString() || "");
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clinicData = {
      name,
      city,
      country,
      type,
      email: email || null,
      phone: phone || null,
      website: website || null,
      description: description || null,
      success_rate: successRate || null,
      price_from: priceFrom ? parseInt(priceFrom) : null,
    };

    if (editingClinic) {
      const { error } = await supabase
        .from("clinics")
        .update(clinicData)
        .eq("id", editingClinic.id);

      if (error) {
        toast.error("Erreur lors de la mise à jour");
        console.error(error);
      } else {
        toast.success("Clinique mise à jour");
        fetchData();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from("clinics").insert(clinicData);

      if (error) {
        toast.error("Erreur lors de la création");
        console.error(error);
      } else {
        toast.success("Clinique créée");
        fetchData();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const deleteClinic = async (id: string) => {
    if (!confirm("Supprimer cette clinique ? Cela supprimera aussi les leads associés.")) return;

    const { error } = await supabase.from("clinics").delete().eq("id", id);

    if (error) {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    } else {
      toast.success("Clinique supprimée");
      fetchData();
    }
  };

  const openInviteDialog = (clinicId: string) => {
    setInviteClinicId(clinicId);
    const clinic = clinics.find((c) => c.id === clinicId);
    setInviteEmail(clinic?.email || "");
    setInviteDialogOpen(true);
  };

  const sendInvitation = async () => {
    if (!inviteEmail) {
      toast.error("Email requis");
      return;
    }

    // Generate a unique token
    const token = crypto.randomUUID();

    // Check if account already exists
    const existingAccount = clinicAccounts.find((a) => a.clinic_id === inviteClinicId);
    
    if (existingAccount) {
      // Update existing invitation
      const { error } = await supabase
        .from("clinic_accounts")
        .update({
          invitation_token: token,
          invitation_sent_at: new Date().toISOString(),
        })
        .eq("id", existingAccount.id);

      if (error) {
        toast.error("Erreur lors de la mise à jour de l'invitation");
        console.error(error);
        return;
      }
    } else {
      // Create new clinic account with placeholder user_id
      // The real user_id will be set when the clinic accepts the invitation
      const { error } = await supabase.from("clinic_accounts").insert({
        clinic_id: inviteClinicId,
        user_id: "00000000-0000-0000-0000-000000000000", // Placeholder
        invitation_token: token,
        invitation_sent_at: new Date().toISOString(),
      });

      if (error) {
        toast.error("Erreur lors de la création de l'invitation");
        console.error(error);
        return;
      }
    }

    // TODO: Implement actual email sending via edge function
    // For now, just show the invitation link
    const invitationLink = `${window.location.origin}/clinic-invite/${token}`;
    
    toast.success(
      <div>
        <p>Invitation créée !</p>
        <p className="text-xs mt-1 break-all">{invitationLink}</p>
      </div>,
      { duration: 10000 }
    );

    setInviteDialogOpen(false);
    setInviteEmail("");
    fetchData();
  };

  const getAccountStatus = (clinicId: string) => {
    const account = clinicAccounts.find((a) => a.clinic_id === clinicId);
    if (!account) return null;
    
    if (account.invitation_accepted_at) {
      return { status: "active", label: "Compte actif", icon: CheckCircle };
    }
    if (account.invitation_sent_at) {
      return { status: "pending", label: "Invitation envoyée", icon: Clock };
    }
    return null;
  };

  if (loading) {
    return <p>Chargement des cliniques...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Cliniques ({clinics.length})</CardTitle>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle clinique
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingClinic ? "Modifier la clinique" : "Nouvelle clinique"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Input
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="Privée, Publique..."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays *</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="successRate">Taux de réussite</Label>
                    <Input
                      id="successRate"
                      value={successRate}
                      onChange={(e) => setSuccessRate(e.target.value)}
                      placeholder="ex: 45%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceFrom">Prix à partir de (€)</Label>
                    <Input
                      id="priceFrom"
                      type="number"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingClinic ? "Mettre à jour" : "Créer"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clinique</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Compte</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinics.map((clinic) => {
                const accountStatus = getAccountStatus(clinic.id);
                return (
                  <TableRow key={clinic.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{clinic.name}</div>
                        <Badge variant="outline" className="mt-1">
                          {clinic.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {clinic.city}, {clinic.country}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        {clinic.email && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {clinic.email}
                          </div>
                        )}
                        {clinic.phone && <div>{clinic.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      {accountStatus ? (
                        <Badge
                          variant={accountStatus.status === "active" ? "default" : "secondary"}
                          className="flex items-center gap-1 w-fit"
                        >
                          <accountStatus.icon className="w-3 h-3" />
                          {accountStatus.label}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">Pas de compte</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => openInviteDialog(clinic.id)}
                          title="Inviter"
                        >
                          <UserPlus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => openEditDialog(clinic)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteClinic(clinic.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {clinics.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Aucune clinique. Ajoutez votre première clinique !
            </p>
          )}
        </CardContent>
      </Card>

      {/* Invite Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inviter la clinique</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inviteEmail">Email de la clinique</Label>
              <Input
                id="inviteEmail"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="contact@clinique.com"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Un lien d'invitation sera généré. La clinique pourra créer son compte et accéder à son espace.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={sendInvitation}>
                <Mail className="w-4 h-4 mr-2" />
                Envoyer l'invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminClinics;
