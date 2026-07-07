"use client";
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Users, Globe, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
  { title: "Total Visits", value: "118,390", change: "+12.5%", isPositive: true, icon: Users },
  { title: "Unique Visitors", value: "84,102", change: "+8.2%", isPositive: true, icon: Globe },
  { title: "Avg. Session", value: "3m 42s", change: "-1.1%", isPositive: false, icon: Activity },
  { title: "Bounce Rate", value: "42.3%", change: "-4.5%", isPositive: true, icon: TrendingUp }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-neutral-200 shadow-sm rounded-md p-2 min-w-[120px]">
        <p className="text-[12px] font-medium text-neutral-500 mb-1">{label}</p>
        <p className="text-[14px] font-bold text-neutral-900">
          {payload[0].value.toLocaleString()}
          <span className="text-[12px] font-medium text-neutral-500 ml-1">visits</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight">Analytics</h2>
          <p className="text-[13px] text-neutral-500 mt-0.5">Track your global reach and visitor engagement.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-neutral-200 text-[13px] font-medium text-neutral-700 py-1.5 px-3 rounded-md shadow-sm outline-none focus:ring-1 focus:ring-neutral-300">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="bg-zinc-900 text-white font-medium text-[13px] py-1.5 px-3 rounded-md shadow-sm hover:bg-zinc-800 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-medium text-neutral-600">{metric.title}</h3>
              <metric.icon className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-2xl font-bold text-neutral-900 tracking-tight">{metric.value}</span>
              <div className={`flex items-center text-[12px] font-medium ${metric.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metric.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Graph & Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-3.5 border-b border-neutral-200">
            <h3 className="text-[14px] font-semibold text-neutral-900">Reach by Country</h3>
          </div>
          
          <div className="h-[300px] w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCountryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#737373', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#737373', fontSize: 12 }}
                  tickFormatter={(value) => `${value >= 1000 ? (value/1000) + 'k' : value}`}
                  dx={-10}
                />
                <Tooltip cursor={{ fill: '#fafafa' }} content={<CustomTooltip />} />
                <Bar dataKey="visits" fill="#171717" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table / List */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-3.5 border-b border-neutral-200 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-neutral-900">Top Locations</h3>
            <button className="text-[12px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors">View All</button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-[13px] text-left">
              <thead>
                <tr className="text-neutral-500 border-b border-neutral-100 bg-neutral-50/50">
                  <th className="px-5 py-2 font-medium">Location</th>
                  <th className="px-5 py-2 font-medium text-right">Visits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {mockCountryData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-2.5">
                      <div className="font-medium text-neutral-900">{row.name}</div>
                      <div className="text-[11px] text-neutral-500">{row.percentage} of total</div>
                    </td>
                    <td className="px-5 py-2.5 text-right">
                      <div className="font-medium text-neutral-900">{row.visits.toLocaleString()}</div>
                      <div className={`text-[11px] font-medium ${row.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {row.trend}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
