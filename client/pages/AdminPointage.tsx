import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Clock } from "lucide-react";

export default function AdminPointage() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Gestion du Pointage</h1>
          </div>
          <p className="text-white/90">
            Bienvenue, {session?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Pointage en Direct</h2>
            <p className="text-muted-foreground mb-4">
              Consultez les pointages actuels des employés en temps réel.
            </p>
            <Button variant="outline" className="w-full">
              Accéder
            </Button>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Historique Pointage</h2>
            <p className="text-muted-foreground mb-4">
              Consultez l'historique complet des pointages par période.
            </p>
            <Button variant="outline" className="w-full">
              Accéder
            </Button>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Absences</h2>
            <p className="text-muted-foreground mb-4">
              Gérer les absences et les justificatifs des employés.
            </p>
            <Button variant="outline" className="w-full">
              Accéder
            </Button>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Rapports Pointage</h2>
            <p className="text-muted-foreground mb-4">
              Générer des rapports détaillés sur le pointage par département.
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
