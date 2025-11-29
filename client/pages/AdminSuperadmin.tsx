import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield } from "lucide-react";

export default function AdminSuperadmin() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-accent to-accent/60 rounded-lg p-8 text-accent-foreground">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Panneau Superadmin</h1>
          </div>
          <p className="text-accent-foreground/90">
            Bienvenue, {session?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Gestion des Utilisateurs</h2>
            <p className="text-muted-foreground mb-4">
              Gérez les droits d'accès et les permissions de tous les utilisateurs du système.
            </p>
            <Button variant="outline" className="w-full">
              Accéder
            </Button>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Audit et Journaux</h2>
            <p className="text-muted-foreground mb-4">
              Consultez les journaux d'audit et les activités du système.
            </p>
            <Button variant="outline" className="w-full">
              Accéder
            </Button>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Configuration Système</h2>
            <p className="text-muted-foreground mb-4">
              Configurer les paramètres globaux du système RH.
            </p>
            <Button variant="outline" className="w-full">
              Accéder
            </Button>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Rapports Globaux</h2>
            <p className="text-muted-foreground mb-4">
              Consultez les rapports complets sur l'ensemble de l'organisation.
            </p>
            <Button variant="outline" className="w-full">
              Accéder
            </Button>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </Layout>
  );
}
