"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppearanceSettingsPage() {
  const [formData, setFormData] = useState<any>({
    headerBgColor: "#09365E",
    footerBgColor: "#09365E",
    primaryAccentColor: "#E12A32",
    globalTextColor: "#333333",
    globalFontFamily: "sans-serif",
    homeLayout: [],
    articleLayout: []
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/appearance", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (res.status === 401) {
          router.push("/admin/login");
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setFormData({
            headerBgColor: data.headerBgColor || "#09365E",
            footerBgColor: data.footerBgColor || "#09365E",
            primaryAccentColor: data.primaryAccentColor || "#E12A32",
            globalTextColor: data.globalTextColor || "#333333",
            globalFontFamily: data.globalFontFamily || "sans-serif",
            homeLayout: data.homeLayout || [],
            articleLayout: data.articleLayout || []
          });
        }
        setLoading(false);
      })
      .catch(console.error);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/appearance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Appearance settings updated successfully!");
      } else {
        alert("Failed to update appearance settings.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;
  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900">Appearance Settings</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
        
        {/* Colors */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Color Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Header Background</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="color"
                  value={formData.headerBgColor}
                  onChange={(e) => setFormData({ ...formData, headerBgColor: e.target.value })}
                  className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                />
                <input 
                  type="text"
                  value={formData.headerBgColor}
                  onChange={(e) => setFormData({ ...formData, headerBgColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Background</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="color"
                  value={formData.footerBgColor}
                  onChange={(e) => setFormData({ ...formData, footerBgColor: e.target.value })}
                  className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                />
                <input 
                  type="text"
                  value={formData.footerBgColor}
                  onChange={(e) => setFormData({ ...formData, footerBgColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Accent Color</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="color"
                  value={formData.primaryAccentColor}
                  onChange={(e) => setFormData({ ...formData, primaryAccentColor: e.target.value })}
                  className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                />
                <input 
                  type="text"
                  value={formData.primaryAccentColor}
                  onChange={(e) => setFormData({ ...formData, primaryAccentColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography & Text */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Global Typography & Text</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Global Text Color</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="color"
                  value={formData.globalTextColor}
                  onChange={(e) => setFormData({ ...formData, globalTextColor: e.target.value })}
                  className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                />
                <input 
                  type="text"
                  value={formData.globalTextColor}
                  onChange={(e) => setFormData({ ...formData, globalTextColor: e.target.value })}
                  className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Global Font Family</label>
              <select
                value={formData.globalFontFamily}
                onChange={(e) => setFormData({ ...formData, globalFontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sans-serif">Sans-Serif (Modern, Clean)</option>
                <option value="serif">Serif (Elegant, Traditional)</option>
                <option value="monospace">Monospace (Technical)</option>
                <option value="var(--font-inter)">Inter (Branded Default)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button 
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
