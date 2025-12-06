import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Shield } from "lucide-react";
import { toast } from "sonner";
import { User as SupabaseUser } from "@supabase/supabase-js";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminQuotes from "@/components/admin/AdminQuotes";
import AdminConversations from "@/components/admin/AdminConversations";
import AdminDiagnostics from "@/components/admin/AdminDiagnostics";
import AdminArticles from "@/components/admin/AdminArticles";
import AdminLeads from "@/components/admin/AdminLeads";
import AdminClinics from "@/components/admin/AdminClinics";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      navigate("/auth");
      return;
    }

    setUser(session.user);

    // Check if user has admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      toast.error("Accès refusé - Droits administrateur requis");
      navigate("/dashboard");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <p className="text-center">Vérification des accès...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Administration
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestion complète de la plateforme
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Dashboard
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="clinics">Cliniques</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="quotes">Devis</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="mt-6">
            <AdminLeads />
          </TabsContent>

          <TabsContent value="clinics" className="mt-6">
            <AdminClinics />
          </TabsContent>

          <TabsContent value="articles" className="mt-6">
            <AdminArticles />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="quotes" className="mt-6">
            <AdminQuotes />
          </TabsContent>

          <TabsContent value="conversations" className="mt-6">
            <AdminConversations />
          </TabsContent>

          <TabsContent value="diagnostics" className="mt-6">
            <AdminDiagnostics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;