import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  LogOut, 
  Users, 
  FileText, 
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ClinicLeads from "@/components/clinic/ClinicLeads";
import ClinicQuotes from "@/components/clinic/ClinicQuotes";
import ClinicProfile from "@/components/clinic/ClinicProfile";

interface ClinicInfo {
  id: string;
  name: string;
  city: string;
  country: string;
  email: string | null;
  phone: string | null;
}

interface ClinicStats {
  totalLeads: number;
  newLeads: number;
  quotesSubmitted: number;
  conversionRate: number;
}

const ClinicDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  const [stats, setStats] = useState<ClinicStats>({
    totalLeads: 0,
    newLeads: 0,
    quotesSubmitted: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      navigate("/clinic-auth");
      return;
    }

    setUser(session.user);

    // Check clinic role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "clinic")
      .maybeSingle();

    if (!roleData) {
      toast.error("Accès non autorisé");
      navigate("/clinic-auth");
      return;
    }

    // Get clinic account
    const { data: accountData } = await supabase
      .from("clinic_accounts")
      .select("clinic_id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (!accountData) {
      toast.error("Aucune clinique associée à ce compte");
      navigate("/clinic-auth");
      return;
    }

    // Get clinic info
    const { data: clinic } = await supabase
      .from("clinics")
      .select("id, name, city, country, email, phone")
      .eq("id", accountData.clinic_id)
      .single();

    if (clinic) {
      setClinicInfo(clinic);
      await fetchStats(clinic.id);
    }

    setLoading(false);
  };

  const fetchStats = async (clinicId: string) => {
    // Fetch leads stats
    const { data: leads } = await supabase
      .from("leads")
      .select("status")
      .eq("clinic_id", clinicId);

    const totalLeads = leads?.length || 0;
    const newLeads = leads?.filter(l => l.status === "new" || l.status === "sent").length || 0;
    const converted = leads?.filter(l => l.status === "converted").length || 0;

    // Fetch quotes count
    // Note: We'll need to track which quotes came from this clinic
    // For now, we'll estimate based on leads

    setStats({
      totalLeads,
      newLeads,
      quotesSubmitted: converted,
      conversionRate: totalLeads > 0 ? Math.round((converted / totalLeads) * 100) : 0,
    });
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {clinicInfo?.name}
              </h1>
              <p className="text-muted-foreground">
                {clinicInfo?.city}, {clinicInfo?.country}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{stats.totalLeads}</div>
                  <p className="text-sm text-muted-foreground">Total leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{stats.newLeads}</div>
                  <p className="text-sm text-muted-foreground">Nouveaux leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{stats.quotesSubmitted}</div>
                  <p className="text-sm text-muted-foreground">Devis envoyés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                  <p className="text-sm text-muted-foreground">Conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Mes Leads</span>
              <span className="sm:hidden">Leads</span>
              {stats.newLeads > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {stats.newLeads}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Mes Devis</span>
              <span className="sm:hidden">Devis</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Mon Profil</span>
              <span className="sm:hidden">Profil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="mt-6">
            {clinicInfo && <ClinicLeads clinicId={clinicInfo.id} />}
          </TabsContent>

          <TabsContent value="quotes" className="mt-6">
            {clinicInfo && <ClinicQuotes clinicId={clinicInfo.id} clinicName={clinicInfo.name} />}
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            {clinicInfo && <ClinicProfile clinicId={clinicInfo.id} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClinicDashboard;
