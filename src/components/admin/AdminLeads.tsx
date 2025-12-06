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
import { Mail, Phone, Calendar, Building2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Lead {
  id: string;
  clinic_id: string;
  user_id: string;
  user_email: string;
  user_name: string | null;
  user_phone: string | null;
  treatment_type: string | null;
  message: string | null;
  status: string | null;
  sent_to_clinic_at: string | null;
  created_at: string | null;
}

interface Clinic {
  id: string;
  name: string;
  city: string;
  country: string;
}

interface LeadStats {
  clinic_id: string;
  clinic_name: string;
  clinic_city: string;
  total_leads: number;
  new_leads: number;
  sent_leads: number;
  converted_leads: number;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  new: { label: "Nouveau", variant: "default" },
  sent: { label: "Envoyé", variant: "secondary" },
  contacted: { label: "Contacté", variant: "outline" },
  converted: { label: "Converti", variant: "default" },
  closed: { label: "Fermé", variant: "destructive" },
};

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [stats, setStats] = useState<LeadStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClinic, setSelectedClinic] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch leads
    const { data: leadsData, error: leadsError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (leadsError) {
      console.error("Error fetching leads:", leadsError);
    } else {
      setLeads(leadsData || []);
    }

    // Fetch clinics
    const { data: clinicsData, error: clinicsError } = await supabase
      .from("clinics")
      .select("id, name, city, country")
      .order("name");

    if (clinicsError) {
      console.error("Error fetching clinics:", clinicsError);
    } else {
      setClinics(clinicsData || []);
      
      // Calculate stats per clinic
      const clinicStats: LeadStats[] = (clinicsData || []).map((clinic) => {
        const clinicLeads = (leadsData || []).filter((l) => l.clinic_id === clinic.id);
        return {
          clinic_id: clinic.id,
          clinic_name: clinic.name,
          clinic_city: clinic.city,
          total_leads: clinicLeads.length,
          new_leads: clinicLeads.filter((l) => l.status === "new").length,
          sent_leads: clinicLeads.filter((l) => l.status === "sent").length,
          converted_leads: clinicLeads.filter((l) => l.status === "converted").length,
        };
      }).filter((s) => s.total_leads > 0);
      
      setStats(clinicStats);
    }

    setLoading(false);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    const updateData: { status: string; sent_to_clinic_at?: string } = { status: newStatus };
    
    if (newStatus === "sent") {
      updateData.sent_to_clinic_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", leadId);

    if (error) {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    } else {
      toast.success("Statut mis à jour");
      fetchData();
    }
  };

  const getClinicName = (clinicId: string) => {
    const clinic = clinics.find((c) => c.id === clinicId);
    return clinic ? `${clinic.name} (${clinic.city})` : "Clinique inconnue";
  };

  const filteredLeads = selectedClinic === "all" 
    ? leads 
    : leads.filter((l) => l.clinic_id === selectedClinic);

  if (loading) {
    return <p>Chargement des leads...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-sm text-muted-foreground">Total leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">
              {leads.filter((l) => l.status === "new").length}
            </div>
            <p className="text-sm text-muted-foreground">Nouveaux</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {leads.filter((l) => l.status === "sent").length}
            </div>
            <p className="text-sm text-muted-foreground">Envoyés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {leads.filter((l) => l.status === "converted").length}
            </div>
            <p className="text-sm text-muted-foreground">Convertis</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats by Clinic */}
      {stats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Leads par clinique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Clinique</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Nouveaux</TableHead>
                  <TableHead className="text-center">Envoyés</TableHead>
                  <TableHead className="text-center">Convertis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.map((stat) => (
                  <TableRow key={stat.clinic_id}>
                    <TableCell className="font-medium">
                      {stat.clinic_name}
                      <span className="text-muted-foreground text-sm ml-2">
                        ({stat.clinic_city})
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{stat.total_leads}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="default">{stat.new_leads}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{stat.sent_leads}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {stat.converted_leads}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* All Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tous les leads</CardTitle>
          <Select value={selectedClinic} onValueChange={setSelectedClinic}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrer par clinique" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les cliniques</SelectItem>
              {clinics.map((clinic) => (
                <SelectItem key={clinic.id} value={clinic.id}>
                  {clinic.name} ({clinic.city})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Clinique</TableHead>
                <TableHead>Traitement</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{lead.user_name || "N/A"}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {lead.user_email}
                      </div>
                      {lead.user_phone && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {lead.user_phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getClinicName(lead.clinic_id)}</TableCell>
                  <TableCell>{lead.treatment_type || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[lead.status || "new"]?.variant || "default"}>
                      {statusConfig[lead.status || "new"]?.label || lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {lead.created_at && format(new Date(lead.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status || "new"}
                      onValueChange={(value) => updateLeadStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Nouveau</SelectItem>
                        <SelectItem value="sent">Envoyé</SelectItem>
                        <SelectItem value="contacted">Contacté</SelectItem>
                        <SelectItem value="converted">Converti</SelectItem>
                        <SelectItem value="closed">Fermé</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredLeads.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Aucun lead pour le moment.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLeads;
