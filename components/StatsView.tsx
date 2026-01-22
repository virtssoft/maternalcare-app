
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export const StatsView: React.FC = () => {
  const data = [
    { name: 'Karisimbi', cpn: 145, alerts: 12 },
    { name: 'Goma', cpn: 210, alerts: 5 },
    { name: 'Nyiragongo', cpn: 85, alerts: 18 },
  ];

  const pieData = [
    { name: 'Risque Faible', value: 65, color: '#7BAE7F' },
    { name: 'Risque Moyen', value: 25, color: '#f59e0b' },
    { name: 'Risque Élevé', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="p-6 space-y-10 pb-32 max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none uppercase">Statistiques & Impact</h1>
          <p className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-widest mt-2">Division Provinciale de la Santé - Nord-Kivu</p>
        </div>
        <div className="px-6 py-3 bg-white border border-gray-100 rounded-2xl flex items-center gap-3">
           <div className="w-2 h-2 bg-[#7BAE7F] rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Données en temps réel</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Main Chart */}
        <div className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">CPN par Zone de Santé</h3>
              <Users size={20} className="text-gray-300" />
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <Tooltip cursor={{fill: '#F8FAF7'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="cpn" radius={[10, 10, 10, 10]} barSize={40}>
                       {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.alerts > 15 ? '#ef4444' : '#7BAE7F'} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm flex flex-col items-center">
           <div className="w-full flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Distribution des Risques</h3>
              <TrendingUp size={20} className="text-gray-300" />
           </div>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={100} paddingAngle={8} dataKey="value">
                       {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="grid grid-cols-3 gap-6 w-full mt-4">
              {pieData.map((p, i) => (
                <div key={i} className="text-center">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{p.name}</p>
                   <p className="text-lg font-black text-gray-800">{p.value}%</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
