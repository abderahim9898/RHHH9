import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Briefcase, Upload, FileUp } from "lucide-react";
import { useState } from "react";

export default function AdminLaboural() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-green-500", "bg-green-50");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-green-500", "bg-green-50");
  };

  const handleDrop = (
    e: React.DragEvent,
    uploadId: string
  ) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-green-500", "bg-green-50");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateUpload(uploadId, files[0]);
    }
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    uploadId: string
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload(uploadId, files[0]);
    }
  };

  const simulateUpload = (uploadId: string, file: File) => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress((prev) => ({
        ...prev,
        [uploadId]: progress,
      }));
    }, 300);
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

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "database")}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-green-400"
              >
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-2">
                  Glissez-déposez votre fichier ici
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  ou
                </p>
                <label className="inline-block">
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => handleFileSelect(e, "database")}
                    className="hidden"
                  />
                  <Button variant="outline" asChild className="cursor-pointer">
                    <span>Sélectionner un fichier</span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-4">
                  Formats acceptés: Excel (.xlsx, .xls) ou CSV
                </p>

                {uploadProgress["database"] !== undefined && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${uploadProgress["database"]}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(uploadProgress["database"])}% complété
                    </p>
                  </div>
                )}
              </div>
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

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "recruitment")}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-green-400"
              >
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-2">
                  Glissez-déposez votre fichier ici
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  ou
                </p>
                <label className="inline-block">
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => handleFileSelect(e, "recruitment")}
                    className="hidden"
                  />
                  <Button variant="outline" asChild className="cursor-pointer">
                    <span>Sélectionner un fichier</span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-4">
                  Formats acceptés: Excel (.xlsx, .xls) ou CSV
                </p>

                {uploadProgress["recruitment"] !== undefined && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${uploadProgress["recruitment"]}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(uploadProgress["recruitment"])}% complété
                    </p>
                  </div>
                )}
              </div>
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

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "temporary")}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-green-400"
              >
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-2">
                  Glissez-déposez votre fichier ici
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  ou
                </p>
                <label className="inline-block">
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => handleFileSelect(e, "temporary")}
                    className="hidden"
                  />
                  <Button variant="outline" asChild className="cursor-pointer">
                    <span>Sélectionner un fichier</span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-4">
                  Formats acceptés: Excel (.xlsx, .xls) ou CSV
                </p>

                {uploadProgress["temporary"] !== undefined && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${uploadProgress["temporary"]}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(uploadProgress["temporary"])}% complété
                    </p>
                  </div>
                )}
              </div>
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
