import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface Diagnostic {
  id: string;
  user_id: string;
  situation: string;
  age_range: string | null;
  country_preference: string | null;
  budget_range: string | null;
  additional_info: string | null;
  created_at: string;
}

interface DiagnosticWithUser extends Diagnostic {
  user_email?: string;
}

const AdminDiagnostics = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const fetchDiagnostics = async () => {
    const { data: diagData, error } = await supabase
      .from("diagnostic_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching diagnostics:", error);
      setLoading(false);
      return;
    }

    // Fetch user emails
    const userIds = [...new Set(diagData.map((d) => d.user_id))];
    const { data: usersData } = await supabase
      .from("profiles")
      .select("id, email")
      .in("id", userIds);

    const userEmailMap = new Map(usersData?.map((u) => [u.id, u.email]));

    const diagnosticsWithUsers = diagData.map((diag) => ({
      ...diag,
      user_email: userEmailMap.get(diag.user_id),
    }));

    setDiagnostics(diagnosticsWithUsers);
    setLoading(false);
  };

  const getSituationBadge = (situation: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      "couple-essai": "default",
      "femme-seule": "secondary",
      "probleme-fertilite": "outline",
      "don-ovocytes": "default",
    };
    return <Badge variant={variants[situation] || "secondary"}>{situation}</Badge>;
  };

  if (loading) {
    return <p className="text-center py-8">Chargement...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soumissions de Diagnostics</CardTitle>
        <CardDescription>
          {diagnostics.length} diagnostic{diagnostics.length > 1 ? "s" : ""} soumis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Situation</TableHead>
              <TableHead>Âge</TableHead>
              <TableHead>Pays préféré</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {diagnostics.map((diag) => (
              <TableRow key={diag.id}>
                <TableCell className="font-medium">
                  {diag.user_email || "Utilisateur inconnu"}
                </TableCell>
                <TableCell>{getSituationBadge(diag.situation)}</TableCell>
                <TableCell>{diag.age_range || "-"}</TableCell>
                <TableCell>{diag.country_preference || "-"}</TableCell>
                <TableCell>{diag.budget_range || "-"}</TableCell>
                <TableCell>
                  {new Date(diag.created_at).toLocaleDateString("fr-FR")}
                </TableCell>
              </TableRow>
            ))}
            {diagnostics.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Aucun diagnostic soumis</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminDiagnostics;