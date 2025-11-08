import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Eye } from "lucide-react";

interface Conversation {
  id: string;
  user_id: string;
  clinic_name: string;
  subject: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ConversationWithUser extends Conversation {
  user_email?: string;
}

const AdminConversations = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const { data: convData, error } = await supabase
      .from("conversations")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations:", error);
      setLoading(false);
      return;
    }

    // Fetch user emails
    const userIds = [...new Set(convData.map((c) => c.user_id))];
    const { data: usersData } = await supabase
      .from("profiles")
      .select("id, email")
      .in("id", userIds);

    const userEmailMap = new Map(usersData?.map((u) => [u.id, u.email]));

    const conversationsWithUsers = convData.map((conv) => ({
      ...conv,
      user_email: userEmailMap.get(conv.user_id),
    }));

    setConversations(conversationsWithUsers);
    setLoading(false);
  };

  if (loading) {
    return <p className="text-center py-8">Chargement...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Conversations</CardTitle>
        <CardDescription>
          {conversations.length} conversation{conversations.length > 1 ? "s" : ""} au total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Clinique</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Créée le</TableHead>
              <TableHead>Dernière activité</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.map((conv) => (
              <TableRow key={conv.id}>
                <TableCell className="font-medium">
                  {conv.user_email || "Utilisateur inconnu"}
                </TableCell>
                <TableCell>{conv.clinic_name}</TableCell>
                <TableCell>{conv.subject || "Sans sujet"}</TableCell>
                <TableCell>
                  <Badge variant={conv.status === "active" ? "default" : "secondary"}>
                    {conv.status === "active" ? "Active" : "Fermée"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(conv.created_at).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  {new Date(conv.updated_at).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/chat/${conv.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {conversations.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Aucune conversation pour le moment</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminConversations;