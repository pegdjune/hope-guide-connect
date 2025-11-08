import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Quote {
  id: string;
  user_id: string;
  clinic_name: string;
  clinic_country: string;
  treatment_type: string;
  price_total: number;
  price_currency: string;
  status: string;
  created_at: string;
}

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [quotesRes, usersRes] = await Promise.all([
      supabase.from("quotes").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, email, full_name"),
    ]);

    if (quotesRes.data) setQuotes(quotesRes.data);
    if (usersRes.data) setUsers(usersRes.data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const quoteData = {
      user_id: formData.get("user_id") as string,
      clinic_name: formData.get("clinic_name") as string,
      clinic_country: formData.get("clinic_country") as string,
      treatment_type: formData.get("treatment_type") as string,
      price_total: parseFloat(formData.get("price_total") as string),
      price_currency: formData.get("price_currency") as string,
      status: formData.get("status") as string,
    };

    if (editingQuote) {
      const { error } = await supabase
        .from("quotes")
        .update(quoteData)
        .eq("id", editingQuote.id);

      if (error) {
        toast.error("Erreur lors de la mise à jour");
        return;
      }
      toast.success("Devis mis à jour");
    } else {
      const { error } = await supabase.from("quotes").insert(quoteData);

      if (error) {
        toast.error("Erreur lors de la création");
        return;
      }
      toast.success("Devis créé");
    }

    setDialogOpen(false);
    setEditingQuote(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirmer la suppression ?")) return;

    const { error } = await supabase.from("quotes").delete().eq("id", id);

    if (error) {
      toast.error("Erreur lors de la suppression");
      return;
    }

    toast.success("Devis supprimé");
    fetchData();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      pending: "secondary",
      viewed: "default",
      accepted: "default",
      rejected: "outline",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (loading) {
    return <p className="text-center py-8">Chargement...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestion des Devis</CardTitle>
            <CardDescription>{quotes.length} devis au total</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingQuote(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Devis
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingQuote ? "Modifier le devis" : "Créer un devis"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="user_id">Utilisateur</Label>
                  <Select name="user_id" defaultValue={editingQuote?.user_id} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un utilisateur" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.full_name || user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clinic_name">Nom de la clinique</Label>
                    <Input
                      id="clinic_name"
                      name="clinic_name"
                      defaultValue={editingQuote?.clinic_name}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="clinic_country">Pays</Label>
                    <Input
                      id="clinic_country"
                      name="clinic_country"
                      defaultValue={editingQuote?.clinic_country}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="treatment_type">Type de traitement</Label>
                  <Input
                    id="treatment_type"
                    name="treatment_type"
                    defaultValue={editingQuote?.treatment_type}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price_total">Prix</Label>
                    <Input
                      id="price_total"
                      name="price_total"
                      type="number"
                      step="0.01"
                      defaultValue={editingQuote?.price_total}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price_currency">Devise</Label>
                    <Select
                      name="price_currency"
                      defaultValue={editingQuote?.price_currency || "EUR"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select name="status" defaultValue={editingQuote?.status || "pending"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="viewed">Consulté</SelectItem>
                      <SelectItem value="accepted">Accepté</SelectItem>
                      <SelectItem value="rejected">Refusé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  {editingQuote ? "Mettre à jour" : "Créer"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Clinique</TableHead>
              <TableHead>Pays</TableHead>
              <TableHead>Traitement</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.clinic_name}</TableCell>
                <TableCell>{quote.clinic_country}</TableCell>
                <TableCell>{quote.treatment_type}</TableCell>
                <TableCell>
                  {quote.price_total.toLocaleString()} {quote.price_currency}
                </TableCell>
                <TableCell>{getStatusBadge(quote.status)}</TableCell>
                <TableCell>
                  {new Date(quote.created_at).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingQuote(quote);
                        setDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(quote.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminQuotes;