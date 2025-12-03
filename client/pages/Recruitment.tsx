import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import { ArrowLeft, AlertCircle, RotateCcw, Users, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart as RechartssPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface RecruitmentRecord {
  [key: string]: string | number;
}

interface SummaryStats {
  totalRecruits: number;
  maleCount: number;
  femaleCount: number;
  averageAge: number;
  departmentCount: number;
  qzCount: number;
}

interface ChartData {
  byMonth: Array<{ month: string; count: number }>;
  byDepartment: Array<{ name: string; value: number }>;
  byGender: Array<{ name: string; value: number }>;
  byQZ: Array<{ qz: string; count: number }>;
}

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6"];

export default function Recruitment() {
  const [rawData, setRawData] = useState<RecruitmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const fetchRecruitmentData = async () => {
      try {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        console.log("Fetching recruitment data...");
        const response = await fetch("/api/recruitment", {
          signal: controller.signal,
          headers: { "Accept": "application/json" },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Failed to fetch recruitment data: ${response.status}`);
        }

        const data = await response.json();
        console.log("Recruitment data received:", data);

        if (Array.isArray(data) && data.length > 1) {
          const processedData: RecruitmentRecord[] = [];
          const headers = data[0];

          for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (!row || !Array.isArray(row)) continue;

            const record: RecruitmentRecord = {};
            for (let j = 0; j < headers.length && j < row.length; j++) {
              record[headers[j]] = row[j];
            }
            if (Object.keys(record).length > 0) {
              processedData.push(record);
            }
          }

          console.log("Processed recruitment records:", processedData.length);
          setRawData(processedData);
        } else {
          console.warn("No recruitment data received from server");
          setRawData([]);
        }
      } catch (err) {
        console.error("Error fetching recruitment data:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to load recruitment data";
        setError(errorMessage);
        setRawData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitmentData();
  }, [retryKey]);

  // Calculate summary statistics
  const stats = useMemo<SummaryStats>(() => {
    if (rawData.length === 0) {
      return { totalRecruits: 0, maleCount: 0, femaleCount: 0, averageAge: 0, departmentCount: 0, qzCount: 0 };
    }

    let totalAge = 0;
    let ageCount = 0;
    let maleCount = 0;
    let femaleCount = 0;
    const departments = new Set<string>();
    const qzs = new Set<string>();

    rawData.forEach((record) => {
      // Count gender (looking for common patterns)
      const gender = String(record["Sexo"] || record["sexo"] || record["gender"] || "").trim().toLowerCase();
      if (gender === "h" || gender === "m" || gender === "homme" || gender === "male") {
        maleCount++;
      } else if (gender === "f" || gender === "femme" || gender === "female" || gender === "w") {
        femaleCount++;
      }

      // Get age
      const age = record["Edad"] || record["edad"] || record["age"] || record["Age"];
      if (typeof age === "number" && age > 0) {
        totalAge += age;
        ageCount++;
      }

      // Get department
      const dept = record["Departamento"] || record["departamento"] || record["department"] || record["Department"];
      if (dept) {
        departments.add(String(dept).trim());
      }

      // Get QZ
      const qz = record["QZ"] || record["qz"] || record["Qz"];
      if (qz) {
        qzs.add(String(qz).trim());
      }
    });

    return {
      totalRecruits: rawData.length,
      maleCount,
      femaleCount,
      averageAge: ageCount > 0 ? Math.round(totalAge / ageCount) : 0,
      departmentCount: departments.size,
      qzCount: qzs.size,
    };
  }, [rawData]);

  // Prepare chart data
  const chartData = useMemo<ChartData>(() => {
    if (rawData.length === 0) {
      return { byMonth: [], byDepartment: [], byGender: [], byQZ: [] };
    }

    // By Month
    const monthMap = new Map<string, number>();
    const deptMap = new Map<string, number>();
    const genderMap = new Map<string, number>();
    const qzMap = new Map<string, number>();

    rawData.forEach((record) => {
      // Month data
      const month = String(record["Mes"] || record["mes"] || record["Month"] || "Unknown").trim();
      monthMap.set(month, (monthMap.get(month) || 0) + 1);

      // Department data
      const dept = String(record["Departamento"] || record["departamento"] || record["Department"] || "Other").trim();
      deptMap.set(dept, (deptMap.get(dept) || 0) + 1);

      // Gender data
      const genderRaw = String(record["Sexo"] || record["sexo"] || record["Gender"] || "").trim().toLowerCase();
      let genderLabel = "Unknown";
      if (genderRaw === "h" || genderRaw === "m" || genderRaw === "homme" || genderRaw === "male") {
        genderLabel = "Homme";
      } else if (genderRaw === "f" || genderRaw === "femme" || genderRaw === "female" || genderRaw === "w") {
        genderLabel = "Femme";
      }
      genderMap.set(genderLabel, (genderMap.get(genderLabel) || 0) + 1);

      // QZ data
      const qz = String(record["QZ"] || record["qz"] || record["Qz"] || "Other").trim();
      qzMap.set(qz, (qzMap.get(qz) || 0) + 1);
    });

    return {
      byMonth: Array.from(monthMap.entries())
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => {
          // Try to sort by month number if available
          const aNum = parseInt(String(a.month).replace(/\D/g, ""));
          const bNum = parseInt(String(b.month).replace(/\D/g, ""));
          return aNum - bNum;
        }),
      byDepartment: Array.from(deptMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8),
      byGender: Array.from(genderMap.entries()).map(([name, value]) => ({ name, value })),
      byQZ: Array.from(qzMap.entries())
        .map(([qz, count]) => ({ qz, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    };
  }, [rawData]);

  return (
    <Layout>
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users size={32} className="text-blue-600" />
            Recrutement et Intégration
          </h1>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
            <Button onClick={() => setRetryKey((k) => k + 1)} size="sm" className="ml-auto">
              <RotateCcw size={16} /> Réessayer
            </Button>
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des données...</p>
          </div>
        ) : rawData.length === 0 ? (
          <Alert>
            <AlertDescription>Aucune donnée de recrutement disponible</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Recrutés</p>
                    <p className="text-3xl font-bold mt-2">{stats.totalRecruits}</p>
                  </div>
                  <Users size={40} className="opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Hommes</p>
                    <p className="text-3xl font-bold mt-2">{stats.maleCount}</p>
                  </div>
                  <div className="text-4xl">👨</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm font-medium">Femmes</p>
                    <p className="text-3xl font-bold mt-2">{stats.femaleCount}</p>
                  </div>
                  <div className="text-4xl">👩</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Âge Moyen</p>
                    <p className="text-3xl font-bold mt-2">{stats.averageAge} ans</p>
                  </div>
                  <div className="text-4xl">🎂</div>
                </div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 size={24} className="text-purple-600" />
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Départements</p>
                </div>
                <p className="text-4xl font-bold text-purple-600">{stats.departmentCount}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp size={24} className="text-cyan-600" />
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Zones QZ</p>
                </div>
                <p className="text-4xl font-bold text-cyan-600">{stats.qzCount}</p>
              </div>
            </div>

            {/* Charts Section */}
            {chartData.byMonth.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={24} className="text-blue-600" />
                  Recrutements par Mois
                </h2>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData.byMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#3b82f6" name="Nombre de Recrutements" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Two Column Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {chartData.byGender.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <PieChart size={24} className="text-pink-600" />
                    Répartition par Genre
                  </h2>
                  <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartssPieChart>
                        <Pie
                          data={chartData.byGender}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chartData.byGender.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartssPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {chartData.byDepartment.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BarChart3 size={24} className="text-green-600" />
                    Top Départements
                  </h2>
                  <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.byDepartment} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#10b981" name="Recrutés" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            {chartData.byQZ.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={24} className="text-indigo-600" />
                  Top Zones QZ
                </h2>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData.byQZ}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="qz" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8b5cf6" name="Recrutements par QZ" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Detailed Data Table */}
            {rawData.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Données Détaillées ({rawData.length} enregistrements)
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                        {Object.keys(rawData[0] || {})
                          .slice(0, 8)
                          .map((header) => (
                            <th key={header} className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                              {String(header).charAt(0).toUpperCase() + String(header).slice(1)}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rawData.slice(0, 20).map((record, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          {Object.values(record)
                            .slice(0, 8)
                            .map((value, colIdx) => (
                              <td key={colIdx} className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                {String(value)}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {rawData.length > 20 && (
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Affichage des 20 premiers enregistrements sur {rawData.length}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
