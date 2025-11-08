import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FileText, MessageSquare, User, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Quote {
  id: string;
  clinic_name: string;
  clinic_country: string;
  treatment_type: string;
  price_total: number;
  price_currency: string;
  success_rate?: string;
  status: string;
  created_at: string;
}

interface Conversation {
  id: string;
  clinic_name: string;
  subject?: string;
  status: string;
  created_at: string;
  unread_count?: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    await Promise.all([
      fetchProfile(session.user.id),
      fetchQuotes(session.user.id),
      fetchConversations(session.user.id)
    ]);
    setLoading(false);
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const fetchQuotes = async (userId: string) => {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setQuotes(data);
    }
  };

  const fetchConversations = async (userId: string) => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setConversations(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      pending: "secondary",
      viewed: "default",
      accepted: "default",
      rejected: "outline",
    };
    
    const labels: Record<string, string> = {
      pending: "En attente",
      viewed: "Consulté",
      accepted: "Accepté",
      rejected: "Refusé",
    };

    return <Badge variant={variants[status] || "default"}>{labels[status] || status}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <p className="text-center">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Bonjour, {profile?.full_name || "Utilisateur"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos devis et échangez avec les experts
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devis reçus</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quotes.length}</div>
              <p className="text-xs text-muted-foreground">
                {quotes.filter(q => q.status === "pending").length} nouveaux
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.length}</div>
              <p className="text-xs text-muted-foreground">
                {conversations.filter(c => c.status === "active").length} actives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Économies estimées</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quotes.length > 0 ? "Jusqu'à 50%" : "-"}
              </div>
              <p className="text-xs text-muted-foreground">
                vs prix France
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs pour devis et conversations */}
        <Tabs defaultValue="quotes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quotes">Mes Devis</TabsTrigger>
            <TabsTrigger value="conversations">Mes Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="mt-6">
            {quotes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun devis pour le moment</h3>
                  <p className="text-muted-foreground mb-6">
                    Complétez votre diagnostic pour recevoir des devis personnalisés
                  </p>
                  <Button onClick={() => navigate("/diagnostic")}>
                    Faire mon diagnostic
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {quotes.map((quote) => (
                  <Card key={quote.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{quote.clinic_name}</CardTitle>
                          <CardDescription>
                            {quote.clinic_country} • {quote.treatment_type}
                          </CardDescription>
                        </div>
                        {getStatusBadge(quote.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-primary">
                            {quote.price_total.toLocaleString()} {quote.price_currency}
                          </p>
                          {quote.success_rate && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Taux de réussite: {quote.success_rate}
                            </p>
                          )}
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                          <Button size="sm">
                            Contacter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="conversations" className="mt-6">
            {conversations.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune conversation</h3>
                  <p className="text-muted-foreground">
                    Vous pourrez échanger avec les experts une fois vos devis reçus
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {conversations.map((conv) => (
                  <Card key={conv.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{conv.clinic_name}</CardTitle>
                          <CardDescription>{conv.subject || "Conversation"}</CardDescription>
                        </div>
                        <Badge variant={conv.status === "active" ? "default" : "secondary"}>
                          {conv.status === "active" ? "Active" : "Fermée"}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;