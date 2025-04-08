import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
  } from "recharts";
  
const Conso = ({ data }) => {
    if (!data || data.length === 0) {
      return <div className="text-red-500">⚠️ Aucune donnée de consommation disponible pour cet objet.</div>;
    }
  
    return (
      <div className="w-full h-64 mt-4">
        <h3 className="text-lg font-bold mb-2">📈 Consommation récente</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="consommation" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
export default Conso;
