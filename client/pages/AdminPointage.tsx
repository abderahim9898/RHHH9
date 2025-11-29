import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Clock, Upload, FileUp } from "lucide-react";
import { useState } from "react";

export default function AdminPointage() {
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
    e.currentTarget.classList.add("border-blue-500", "bg-blue-50");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-blue-500", "bg-blue-50");
  };

  const handleDrop = (e: React.DragEvent, uploadId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-500", "bg-blue-50");

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
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Gestion du Pointage</h1>
          </div>
          <p className="text-white/90">Bienvenue, {session?.email}</p>
        </div>

        <div className="space-y-6">
          {/* Upload Pointage Section */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <FileUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Télécharger Pointage</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Téléchargez le fichier contenant les données de pointage des employés
            </p>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "pointage")}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-blue-400"
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
                  onChange={(e) => handleFileSelect(e, "pointage")}
                  className="hidden"
                />
                <Button variant="outline" asChild className="cursor-pointer">
                  <span>Sélectionner un fichier</span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                Formats acceptés: Excel (.xlsx, .xls) ou CSV
              </p>

              {uploadProgress["pointage"] !== undefined && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${uploadProgress["pointage"]}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.round(uploadProgress["pointage"])}% complété
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Presence Section */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <FileUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Télécharger Présence</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Téléchargez le fichier contenant les données de présence et d'absence
            </p>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "presence")}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-blue-400"
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
                  onChange={(e) => handleFileSelect(e, "presence")}
                  className="hidden"
                />
                <Button variant="outline" asChild className="cursor-pointer">
                  <span>Sélectionner un fichier</span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                Formats acceptés: Excel (.xlsx, .xls) ou CSV
              </p>

              {uploadProgress["presence"] !== undefined && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${uploadProgress["presence"]}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.round(uploadProgress["presence"])}% complété
                  </p>
                </div>
              )}
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
