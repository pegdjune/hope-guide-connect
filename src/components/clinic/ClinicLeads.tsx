import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, Calendar, MessageSquare, FileText, User } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import CreateQuoteDialog from "./CreateQuoteDialog";

interface Lead {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string | null;
  user_phone: string | null;
  treatment_type: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
}

interface ClinicLeadsProps {
  clinicId: string;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  new: { label: "Nouveau", variant: "default" },
  sent: { label: "Reçu", variant: "secondary" },
  contacted: { label: "Contacté", variant: "outline" },
  converted: { label: "Converti", variant: "default" },
  closed: { label: "Fermé", variant: "destructive" },
};

const ClinicLeads = ({ clinicId }: ClinicLeadsProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [leadForQuote, setLeadForQuote] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, [clinicId]);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("clinic_id", clinicId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
      toast.error("Erreur lors du chargement des leads");
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (leadId: string, newStatus: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      toast.error("Erreur lors de la mise à jour");
    } else {
      toast.success("Statut mis à jour");
      fetchLeads();
    }
  };

  const openQuoteDialog = (lead: Lead) => {
    setLeadForQuote(lead);
    setQuoteDialogOpen(true);
  };

  if (loading) {
    return <p>Chargement des leads...</p>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Leads reçus ({leads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aucun lead pour le moment.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Les demandes des patients apparaîtront ici.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden md:table-cell">Traitement</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{lead.user_name || "Patient"}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {lead.user_email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {lead.treatment_type || "-"}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.status || "new"}
                          onValueChange={(value) => updateStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-28">
                            <Badge variant={statusConfig[lead.status || "new"]?.variant || "default"}>
                              {statusConfig[lead.status || "new"]?.label || lead.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Nouveau</SelectItem>
                            <SelectItem value="sent">Reçu</SelectItem>
                            <SelectItem value="contacted">Contacté</SelectItem>
                            <SelectItem value="converted">Converti</SelectItem>
                            <SelectItem value="closed">Fermé</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {lead.created_at && format(new Date(lead.created_at), "dd/MM/yyyy", { locale: fr })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedLead(lead);
                              setDetailsOpen(true);
                            }}
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => openQuoteDialog(lead)}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Devis</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails du lead</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-medium">{selectedLead.user_name || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedLead.user_email}</p>
                </div>
                {selectedLead.user_phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {selectedLead.user_phone}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Traitement souhaité</p>
                  <p className="font-medium">{selectedLead.treatment_type || "Non spécifié"}</p>
                </div>
              </div>
              {selectedLead.message && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Message</p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{selectedLead.message}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setDetailsOpen(false);
                    openQuoteDialog(selectedLead);
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Créer un devis
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedLead.user_email}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contacter
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Quote Dialog */}
      {leadForQuote && (
        <CreateQuoteDialog
          open={quoteDialogOpen}
          onOpenChange={setQuoteDialogOpen}
          lead={leadForQuote}
          clinicId={clinicId}
          onSuccess={() => {
            fetchLeads();
            updateStatus(leadForQuote.id, "converted");
          }}
        />
      )}
    </div>
  );
};

export default ClinicLeads;
