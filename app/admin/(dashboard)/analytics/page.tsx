"use client";
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Users, Globe, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, MapPin } from 'lucide-react';

const mockCountryData = [
  { name: 'India', visits: 45230, percentage: '38.2%', trend: '+5.2%' },
  { name: 'USA', visits: 28410, percentage: '24.0%', trend: '+2.1%' },
  { name: 'UK', visits: 18320, percentage: '15.5%', trend: '-1.4%' },
  { name: 'UAE', visits: 12150, percentage: '10.3%', trend: '+8.4%' },
  { name: 'Australia', visits: 6420, percentage: '5.4%', trend: '+0.5%' },
  { name: 'Canada', visits: 4310, percentage: '3.6%', trend: '-2.1%' },
  { name: 'Others', visits: 3550, percentage: '3.0%', trend: '+1.0%' }
];

const mockMetrics = [
  { title: "Total Visits", value: "118,390", change: "+12.5%", isPositive: true, icon: Users, color: "text-blue-600", bg: "bg-blue-100/50" },
  { title: "Unique Visitors", value: "84,102", change: "+8.2%", isPositive: true, icon: Globe, color: "text-indigo-600", bg: "bg-indigo-100/50" },
  { title: "Avg. Session", value: "3m 42s", change: "-1.1%", isPositive: false, icon: Activity, color: "text-rose-600", bg: "bg-rose-100/50" },
  { title: "Bounce Rate", value: "42.3%", change: "-4.5%", isPositive: true, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100/50" }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-xl p-4 min-w-[150px]">
        <p className="text-sm font-bold text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-black text-gray-900">
          {payload[0].value.toLocaleString()}
          <span className="text-sm font-medium text-gray-500 ml-1">visits</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Audience Overview</h2>
          <p className="text-gray-500 mt-1">Track your global reach and visitor engagement.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-gray-200 text-sm font-medium text-gray-700 py-2 px-4 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-shadow">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="bg-gray-900 text-white font-medium text-sm py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {mockMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="absolute -top-4 -right-4 p-4 opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-transform duration-500">
              <metric.icon className={`w-28 h-28 ${metric.color} opacity-5`} />
            </div>
            
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className={`p-3 rounded-xl ${metric.bg}`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{metric.title}</h3>
            </div>
            
            <div className="flex items-end justify-between mt-auto relative z-10">
              <span className="text-4xl font-black text-gray-900 tracking-tight">{metric.value}</span>
              <div className={`flex items-center text-sm font-bold px-2 py-1 rounded-md ${metric.isPositive ? 'text-emerald-700 bg-emerald-100/50' : 'text-rose-700 bg-rose-100/50'}`}>
                {metric.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Graph & Data Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Graph */}
        <div className="xl:col-span-2 bg-white p-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Reach by Country</h3>
              <p className="text-sm text-gray-500 mt-1">Number of visits from top geographic locations.</p>
            </div>
          </div>
          
          <div className="h-[380px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCountryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 600 }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 600 }}
                  tickFormatter={(value) => `${value >= 1000 ? (value/1000) + 'k' : value}`}
                  dx={-10}
                />
                <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                <Bar dataKey="visits" radius={[6, 6, 0, 0]} maxBarSize={45}>
                  {
                    mockCountryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="url(#colorVisits)" />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table / List */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top Locations</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          
          <div className="flex-1 overflow-auto pr-2">
            <div className="space-y-5">
              {mockCountryData.map((row, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{row.name}</p>
                      <p className="text-xs font-semibold text-gray-400">{row.percentage} of total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-base">{row.visits.toLocaleString()}</p>
                    <p className={`text-xs font-bold mt-0.5 ${row.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {row.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
