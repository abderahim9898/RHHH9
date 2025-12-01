import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Briefcase, FileUp } from "lucide-react";
import FileUploadSection from "@/components/FileUploadSection";

export default function AdminLaboural() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Gestion Laboural</h1>
          </div>
          <p className="text-white/90">Bienvenue, {session?.email}</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Database Upload Section */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <FileUp className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold">
                  Télécharger la Base de Données RH
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Téléchargez le fichier contenant les données des employés
              </p>
              <FileUploadSection
                title="Database"
                description="Upload RH database"
                googleScriptUrl="https://script.google.com/macros/s/AKfycbxzPyGSZHI_1ll72EtyYLpDisgJmIXcUlYXdoy8HA_XjVNAz06R9AbpXL7roKJtkKsLmg/exec"
              />
            </div>

            {/* Recruitment Database Upload Section */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <FileUp className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold">
                  Télécharger la Base de Données Recrutement
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Téléchargez le fichier contenant les données de recrutement
              </p>
              <FileUploadSection
                title="Recruitment"
                description="Upload recruitment database"
                googleScriptUrl="https://script.google.com/macros/s/AKfycbxzPyGSZHI_1ll72EtyYLpDisgJmIXcUlYXdoy8HA_XjVNAz06R9AbpXL7roKJtkKsLmg/exec"
              />
            </div>

            {/* Temporary Workers Database Upload Section */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <FileUp className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold">
                  Télécharger la Base de Données Travailleurs Temporaires
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Téléchargez le fichier contenant les données des travailleurs temporaires
              </p>
              <FileUploadSection
                title="Temporary Workers"
                description="Upload temporary workers database"
                googleScriptUrl="https://script.google.com/macros/s/AKfycbxzPyGSZHI_1ll72EtyYLpDisgJmIXcUlYXdoy8HA_XjVNAz06R9AbpXL7roKJtkKsLmg/exec"
              />
            </div>

            {/* Turnover Form Section */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h2 className="text-xl font-semibold mb-4">
                Formulaire de Saisie - Turnover (Départs)
              </h2>
              <p className="text-muted-foreground mb-6">
                Saisissez les informations de départ des employés
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mois */}
                  <div className="space-y-2">
                    <label htmlFor="mois" className="text-sm font-medium">
                      Mois
                    </label>
                    <input
                      id="mois"
                      type="month"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Sélectionnez un mois"
                    />
                  </div>

                  {/* Baja */}
                  <div className="space-y-2">
                    <label htmlFor="baja" className="text-sm font-medium">
                      Baja
                    </label>
                    <input
                      id="baja"
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Entrez Baja"
                    />
                  </div>

                  {/* Group */}
                  <div className="space-y-2">
                    <label htmlFor="group" className="text-sm font-medium">
                      Groupe
                    </label>
                    <input
                      id="group"
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Entrez le groupe"
                    />
                  </div>

                  {/* Contrat */}
                  <div className="space-y-2">
                    <label htmlFor="contrat" className="text-sm font-medium">
                      Contrat
                    </label>
                    <input
                      id="contrat"
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Entrez le type de contrat"
                    />
                  </div>

                  {/* Effectif 1 */}
                  <div className="space-y-2">
                    <label htmlFor="effectif1" className="text-sm font-medium">
                      Effectif 1
                    </label>
                    <input
                      id="effectif1"
                      type="number"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Entrez l'effectif 1"
                    />
                  </div>

                  {/* Effectif 2 */}
                  <div className="space-y-2">
                    <label htmlFor="effectif2" className="text-sm font-medium">
                      Effectif 2
                    </label>
                    <input
                      id="effectif2"
                      type="number"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Entrez l'effectif 2"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1">
                    Réinitialiser
                  </Button>
                  <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
                    Soumettre
                  </Button>
                </div>
              </form>
            </div>
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
