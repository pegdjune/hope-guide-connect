import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Calendar, Euro, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Quote {
  id: string;
  user_id: string;
  clinic_name: string;
  treatment_type: string;
  price_total: number;
  price_currency: string | null;
  success_rate: string | null;
  status: string | null;
  created_at: string | null;
  expires_at: string | null;
}

interface ClinicQuotesProps {
  clinicId: string;
  clinicName: string;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "En attente", variant: "secondary" },
  accepted: { label: "Accepté", variant: "default" },
  rejected: { label: "Refusé", variant: "destructive" },
  expired: { label: "Expiré", variant: "outline" },
};

const ClinicQuotes = ({ clinicId, clinicName }: ClinicQuotesProps) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, [clinicName]);

  const fetchQuotes = async () => {
    // Fetch quotes created by this clinic
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("clinic_name", clinicName)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching quotes:", error);
    } else {
      setQuotes(data || []);
    }
    setLoading(false);
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const getStatus = (quote: Quote) => {
    if (quote.status === "pending" && isExpired(quote.expires_at)) {
      return "expired";
    }
    return quote.status || "pending";
  };

  const formatCurrency = (amount: number, currency: string | null) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency || "EUR",
    }).format(amount);
  };

  if (loading) {
    return <p>Chargement des devis...</p>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Mes devis envoyés ({quotes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {quotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aucun devis envoyé pour le moment.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Créez des devis depuis l'onglet "Mes Leads".
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Traitement</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead className="hidden md:table-cell">Taux réussite</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Expire</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((quote) => {
                    const status = getStatus(quote);
                    return (
                      <TableRow key={quote.id}>
                        <TableCell className="font-medium">
                          {quote.treatment_type}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 font-semibold text-primary">
                            {formatCurrency(quote.price_total, quote.price_currency)}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {quote.success_rate || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusConfig[status]?.variant || "secondary"}>
                            {statusConfig[status]?.label || status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {quote.created_at && format(new Date(quote.created_at), "dd/MM/yyyy", { locale: fr })}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {quote.expires_at && format(new Date(quote.expires_at), "dd/MM/yyyy", { locale: fr })}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Summary */}
      {quotes.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{quotes.length}</div>
              <p className="text-sm text-muted-foreground">Total devis</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {quotes.filter((q) => getStatus(q) === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">En attente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {quotes.filter((q) => getStatus(q) === "accepted").length}
              </div>
              <p className="text-sm text-muted-foreground">Acceptés</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-muted-foreground">
                {quotes.filter((q) => getStatus(q) === "expired" || getStatus(q) === "rejected").length}
              </div>
              <p className="text-sm text-muted-foreground">Expirés/Refusés</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClinicQuotes;
