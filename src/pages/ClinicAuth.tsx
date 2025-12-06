import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";
import { Building2, CheckCircle } from "lucide-react";

interface ClinicInfo {
  id: string;
  name: string;
  city: string;
  country: string;
}

const ClinicAuth = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "signin";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(!!token);
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Validate invitation token
  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  // Redirect if logged in and has clinic role
  useEffect(() => {
    if (user && !token) {
      checkClinicRole();
    }
  }, [user, token]);

  const validateToken = async () => {
    setValidatingToken(true);
    
    const { data: account, error } = await supabase
      .from("clinic_accounts")
      .select("clinic_id, invitation_accepted_at")
      .eq("invitation_token", token)
      .maybeSingle();

    if (error || !account) {
      toast.error("Lien d'invitation invalide ou expiré");
      navigate("/clinic-auth");
      return;
    }

    if (account.invitation_accepted_at) {
      toast.info("Cette invitation a déjà été utilisée");
      navigate("/clinic-auth");
      return;
    }

    // Get clinic info
    const { data: clinic } = await supabase
      .from("clinics")
      .select("id, name, city, country")
      .eq("id", account.clinic_id)
      .single();

    if (clinic) {
      setClinicInfo(clinic);
    }

    setValidatingToken(false);
  };

  const checkClinicRole = async () => {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user!.id)
      .eq("role", "clinic")
      .maybeSingle();

    if (roleData) {
      navigate("/clinic-dashboard");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/clinic-dashboard`;
      
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Cet email est déjà utilisé. Essayez de vous connecter.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (signUpData.user && token) {
        await acceptInvitation(signUpData.user.id);
      } else if (signUpData.user) {
        // Auto-registration - add clinic role
        await supabase.from("user_roles").insert({
          user_id: signUpData.user.id,
          role: "clinic"
        });
        toast.success("Compte créé ! Vous pouvez maintenant vous connecter.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou mot de passe incorrect.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (signInData.user && token) {
        await acceptInvitation(signInData.user.id);
      } else {
        // Check if user has clinic role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", signInData.user.id)
          .eq("role", "clinic")
          .maybeSingle();

        if (roleData) {
          toast.success("Connexion réussie !");
          navigate("/clinic-dashboard");
        } else {
          toast.error("Votre compte n'est pas associé à une clinique.");
          await supabase.auth.signOut();
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const acceptInvitation = async (userId: string) => {
    // Update the clinic account
    const { error: updateError } = await supabase
      .from("clinic_accounts")
      .update({
        user_id: userId,
        invitation_accepted_at: new Date().toISOString(),
        invitation_token: null,
      })
      .eq("invitation_token", token);

    if (updateError) {
      console.error("Error accepting invitation:", updateError);
      toast.error("Erreur lors de l'activation du compte");
      return;
    }

    // Add clinic role
    await supabase.from("user_roles").insert({
      user_id: userId,
      role: "clinic"
    });

    toast.success("Compte clinique activé avec succès !");
    navigate("/clinic-dashboard");
  };

  if (validatingToken) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <p className="text-center">Validation de l'invitation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          {/* Clinic Info Banner */}
          {clinicInfo && (
            <Card className="mb-6 border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Invitation pour</p>
                    <p className="font-semibold">{clinicInfo.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {clinicInfo.city}, {clinicInfo.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue={token ? "signup" : mode} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <CardTitle>Espace Clinique</CardTitle>
                  </div>
                  <CardDescription>
                    Connectez-vous à votre espace clinique
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="votre@clinique.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Mot de passe</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Connexion..." : "Se connecter"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <CardTitle>
                      {token ? "Activer votre compte" : "Inscription Clinique"}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {token 
                      ? "Créez votre compte pour accéder à votre espace clinique"
                      : "Inscrivez votre clinique pour recevoir des leads qualifiés"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Nom du responsable</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Dr. Jean Dupont"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email professionnel</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="contact@clinique.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-muted-foreground">
                        Minimum 6 caractères
                      </p>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Création..." : token ? "Activer mon compte" : "Créer mon compte clinique"}
                    </Button>
                  </form>

                  {!token && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Pourquoi nous rejoindre ?
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Recevez des leads qualifiés</li>
                        <li>• Gérez vos devis directement</li>
                        <li>• Augmentez votre visibilité</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClinicAuth;
