import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, UserX } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profilesError) {
      toast.error("Erreur lors du chargement des utilisateurs");
      return;
    }

    const { data: rolesData } = await supabase
      .from("user_roles")
      .select("user_id, role");

    const rolesMap: Record<string, string[]> = {};
    rolesData?.forEach((role: UserRole) => {
      if (!rolesMap[role.user_id]) {
        rolesMap[role.user_id] = [];
      }
      rolesMap[role.user_id].push(role.role);
    });

    setProfiles(profilesData || []);
    setUserRoles(rolesMap);
    setLoading(false);
  };

  const toggleAdminRole = async (userId: string, currentRoles: string[]) => {
    const isAdmin = currentRoles.includes("admin");

    if (isAdmin) {
      // Remove admin role
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");

      if (error) {
        toast.error("Erreur lors de la suppression du rôle admin");
        return;
      }
      toast.success("Rôle admin retiré");
    } else {
      // Add admin role
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });

      if (error) {
        toast.error("Erreur lors de l'ajout du rôle admin");
        return;
      }
      toast.success("Rôle admin ajouté");
    }

    fetchUsers();
  };

  if (loading) {
    return <p className="text-center py-8">Chargement...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Utilisateurs</CardTitle>
        <CardDescription>
          {profiles.length} utilisateur{profiles.length > 1 ? "s" : ""} enregistré{profiles.length > 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Rôles</TableHead>
              <TableHead>Inscription</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile) => {
              const roles = userRoles[profile.id] || [];
              const isAdmin = roles.includes("admin");

              return (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.email}</TableCell>
                  <TableCell>{profile.full_name || "-"}</TableCell>
                  <TableCell>{profile.phone || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {roles.length === 0 && <Badge variant="secondary">User</Badge>}
                      {roles.map((role) => (
                        <Badge key={role} variant={role === "admin" ? "default" : "secondary"}>
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(profile.created_at).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={isAdmin ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => toggleAdminRole(profile.id, roles)}
                    >
                      {isAdmin ? (
                        <>
                          <UserX className="w-4 h-4 mr-1" />
                          Retirer Admin
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-1" />
                          Nommer Admin
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;