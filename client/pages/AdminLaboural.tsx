import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Briefcase } from "lucide-react";

export default function AdminLaboural() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Gestion Laboural</h1>
        </div>
        <p className="text-white/90">
          Bienvenue, {session?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Contrats Employés</h2>
          <p className="text-muted-foreground mb-4">
            Consultez et gérez les contrats de travail des employés.
          </p>
          <Button variant="outline" className="w-full">
            Accéder
          </Button>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Congés et Arrêts</h2>
          <p className="text-muted-foreground mb-4">
            Gérer les congés, les arrêts maladie et les permissions.
          </p>
          <Button variant="outline" className="w-full">
            Accéder
          </Button>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Documents Laboural</h2>
          <p className="text-muted-foreground mb-4">
            Accédez aux certificats de travail et autres documents légaux.
          </p>
          <Button variant="outline" className="w-full">
            Accéder
          </Button>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Conformité Laboural</h2>
          <p className="text-muted-foreground mb-4">
            Vérifiez la conformité légale et réglementaire du travail.
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
  );
}
