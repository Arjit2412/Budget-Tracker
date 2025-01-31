import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

const MinistryProjects = () => {
  const ministryProjectData = {
    Home: {
      projects: [
        { name: "Smart City Mission", budget: 5600, status: "Ongoing" },
        { name: "Internal Security Enhancement", budget: 4200, status: "Ongoing" },
        { name: "Border Infrastructure Development", budget: 3800, status: "Ongoing" }
      ]
    },
    Finance: {
      projects: [
        { name: "Digital India Program", budget: 7500, status: "Ongoing" },
        { name: "GST Implementation", budget: 3200, status: "Completed" },
        { name: "Financial Inclusion Initiative", budget: 4500, status: "Ongoing" }
      ]
    },
    Health: {
      projects: [
        { name: "Ayushman Bharat", budget: 6300, status: "Ongoing" },
        { name: "COVID-19 Vaccination Drive", budget: 5200, status: "Completed" },
        { name: "Healthcare Infrastructure Upgrade", budget: 4700, status: "Ongoing" }
      ]
    },
    Education: {
      projects: [
        { name: "Skill India Mission", budget: 4800, status: "Ongoing" },
        { name: "Digital Education Platform", budget: 3600, status: "Ongoing" },
        { name: "Higher Education Quality Improvement", budget: 5100, status: "Ongoing" }
      ]
    },
    Defense: {
      projects: [
        { name: "Modernization of Armed Forces", budget: 8500, status: "Ongoing" },
        { name: "Indigenous Weapon Development", budget: 6700, status: "Ongoing" },
        { name: "Border Technology Upgrade", budget: 5400, status: "Ongoing" }
      ]
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const processedData = Object.entries(ministryProjectData).map(([ministry, data]) => ({
    ministry,
    totalBudget: data.projects.reduce((sum, project) => sum + project.budget, 0)
  }));

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Ministry-wise Project Budgets</h1>
      
      {/* Ministry Project Budget Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Total Project Budget by Ministry (₹ Crores)</h2>
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

      {/* Ministry Budget Distribution Pie Chart */}
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
    </div>
  );
};

export default MinistryProjects;