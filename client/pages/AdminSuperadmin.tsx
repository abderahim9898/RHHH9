import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield, Upload, FileUp } from "lucide-react";
import { useState } from "react";

export default function AdminSuperadmin() {
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
    e.currentTarget.classList.add("border-purple-500", "bg-purple-50");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-purple-500", "bg-purple-50");
  };

  const handleDrop = (e: React.DragEvent, uploadId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-purple-500", "bg-purple-50");

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

  const UploadSection = ({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description: string;
  }) => (
    <div className="border border-border rounded-lg p-6 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <FileUp className="w-5 h-5 text-purple-500" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, id)}
        className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-purple-400"
      >
        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground mb-2">
          Glissez-déposez votre fichier ici
        </p>
        <p className="text-sm text-muted-foreground mb-4">ou</p>
        <label className="inline-block">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => handleFileSelect(e, id)}
            className="hidden"
          />
          <Button variant="outline" asChild className="cursor-pointer">
            <span>Sélectionner un fichier</span>
          </Button>
        </label>
        <p className="text-xs text-muted-foreground mt-4">
          Formats acceptés: Excel (.xlsx, .xls) ou CSV
        </p>

        {uploadProgress[id] !== undefined && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{
                  width: `${uploadProgress[id]}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {Math.round(uploadProgress[id])}% complété
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Panneau Superadmin</h1>
          </div>
          <p className="text-white/90">Bienvenue, {session?.email}</p>
        </div>

        <div className="space-y-6">
          {/* Pointage Uploads */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Gestion du Pointage
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <UploadSection
                id="pointage"
                title="Télécharger Pointage"
                description="Téléchargez le fichier contenant les données de pointage des employés"
              />
              <UploadSection
                id="presence"
                title="Télécharger Présence"
                description="Téléchargez le fichier contenant les données de présence et d'absence"
              />
            </div>
          </div>

          {/* Laboural Uploads */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Gestion Laboural
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <UploadSection
                id="database"
                title="Télécharger la Base de Données RH"
                description="Téléchargez le fichier contenant les données des employés"
              />
              <UploadSection
                id="recruitment"
                title="Télécharger la Base de Données Recrutement"
                description="Téléchargez le fichier contenant les données de recrutement"
              />
              <UploadSection
                id="temporary"
                title="Télécharger la Base de Données Travailleurs Temporaires"
                description="Téléchargez le fichier contenant les données des travailleurs temporaires"
              />
            </div>
          </div>

          {/* Turnover Form */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4">
              Formulaire de Saisie - Turnover (Départs)
            </h2>
            <p className="text-muted-foreground mb-6">
              Saisissez les informations de départ des employés
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="mois" className="text-sm font-medium">
                    Mois
                  </label>
                  <input
                    id="mois"
                    type="month"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Sélectionnez un mois"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="baja" className="text-sm font-medium">
                    Baja
                  </label>
                  <input
                    id="baja"
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Entrez Baja"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="group" className="text-sm font-medium">
                    Groupe
                  </label>
                  <input
                    id="group"
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Entrez le groupe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contrat" className="text-sm font-medium">
                    Contrat
                  </label>
                  <input
                    id="contrat"
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Entrez le type de contrat"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="effectif1" className="text-sm font-medium">
                    Effectif 1
                  </label>
                  <input
                    id="effectif1"
                    type="number"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Entrez l'effectif 1"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="effectif2" className="text-sm font-medium">
                    Effectif 2
                  </label>
                  <input
                    id="effectif2"
                    type="number"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Entrez l'effectif 2"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1">
                  Réinitialiser
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Soumettre
                </Button>
              </div>
            </form>
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
