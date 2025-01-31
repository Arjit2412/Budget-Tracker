import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

const MinistrySchemes = () => {
  const ministrySchemeData = {
    Home: {
      schemes: [
        { name: "Police Modernization Scheme", budget: 3500, beneficiaries: 100000 },
        { name: "Disaster Response Enhancement", budget: 2800, beneficiaries: 50000 },
        { name: "Cybersecurity Initiative", budget: 2200, beneficiaries: 75000 }
      ]
    },
    Finance: {
      schemes: [
        { name: "Pradhan Mantri Jan Dhan Yojana", budget: 6500, beneficiaries: 400000 },
        { name: "Startup India", budget: 4200, beneficiaries: 150000 },
        { name: "Digital Payment Incentive", budget: 3100, beneficiaries: 250000 }
      ]
    },
    Health: {
      schemes: [
        { name: "Ayushman Bharat", budget: 5800, beneficiaries: 500000 },
        { name: "National Health Protection", budget: 4600, beneficiaries: 300000 },
        { name: "Medical Education Support", budget: 3300, beneficiaries: 100000 }
      ]
    },
    Education: {
      schemes: [
        { name: "Skill India", budget: 4800, beneficiaries: 200000 },
        { name: "Digital Education Mission", budget: 3600, beneficiaries: 150000 },
        { name: "Scholarship Program", budget: 2900, beneficiaries: 100000 }
      ]
    },
    Defense: {
      schemes: [
        { name: "Veterans Welfare", budget: 3700, beneficiaries: 50000 },
        { name: "Defense Research Program", budget: 5200, beneficiaries: 25000 },
        { name: "Strategic Modernization", budget: 4500, beneficiaries: 10000 }
      ]
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const processedData = Object.entries(ministrySchemeData).map(([ministry, data]) => ({
    ministry,
    totalBudget: data.schemes.reduce((sum, scheme) => sum + scheme.budget, 0),
    totalBeneficiaries: data.schemes.reduce((sum, scheme) => sum + scheme.beneficiaries, 0)
  }));

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Ministry Schemes Overview</h1>
      
      {/* Scheme Budget Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Total Scheme Budget by Ministry (₹ Crores)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ministry" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalBudget" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Scheme Budget Distribution Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Budget Distribution Across Ministries</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={processedData}
              dataKey="totalBudget"
              nameKey="ministry"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Scheme Beneficiaries Breakdown */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Scheme Beneficiaries</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ministry" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalBeneficiaries" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MinistrySchemes;