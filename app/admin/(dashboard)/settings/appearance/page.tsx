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
    articleLayout: [],
    homeAdImage: "/images/adv2.png",
    homeAdLink: "#",
    categoryAdImage: "/images/adv.png",
    categoryAdLink: "#"
  });
  const [loading, setLoading] = useState(true);
  const [homeAdLoading, setHomeAdLoading] = useState(false);
  const [categoryAdLoading, setCategoryAdLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'homeAdImage' | 'categoryAdImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    const setLoadingState = field === 'homeAdImage' ? setHomeAdLoading : setCategoryAdLoading;
    setLoadingState(true);

    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/upload`, {
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Upload failed");
      const result = await res.json();
      setFormData((prev: any) => ({ ...prev, [field]: result.url }));
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/appearance`, {
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
            articleLayout: data.articleLayout || [],
            homeAdImage: data.homeAdImage || "/images/adv2.png",
            homeAdLink: data.homeAdLink || "#",
            categoryAdImage: data.categoryAdImage || "/images/adv.png",
            categoryAdLink: data.categoryAdLink || "#"
          });
        }
        setLoading(false);
      })
      .catch(console.error);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/appearance`, {
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

        {/* Advertisements */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Advertisements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Home Page Advertisement</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'homeAdImage')}
                  disabled={homeAdLoading}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
                />
                <input 
                  type="text"
                  placeholder="Or enter image URL... (e.g. /images/adv2.png)"
                  value={formData.homeAdImage}
                  onChange={(e) => setFormData({ ...formData, homeAdImage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mt-1"
                />
                {homeAdLoading && <p className="text-xs text-blue-500 mt-2">Uploading...</p>}
                {formData.homeAdImage && (
                  <div className="mt-3 relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                    <img src={formData.homeAdImage} alt="Home Ad Preview" className="object-contain w-full h-full bg-gray-50" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination Link</label>
                <input 
                  type="text"
                  placeholder="https://..."
                  value={formData.homeAdLink}
                  onChange={(e) => setFormData({ ...formData, homeAdLink: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Category Page Advertisement</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'categoryAdImage')}
                  disabled={categoryAdLoading}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
                />
                <input 
                  type="text"
                  placeholder="Or enter image URL... (e.g. /images/adv.png)"
                  value={formData.categoryAdImage}
                  onChange={(e) => setFormData({ ...formData, categoryAdImage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mt-1"
                />
                {categoryAdLoading && <p className="text-xs text-blue-500 mt-2">Uploading...</p>}
                {formData.categoryAdImage && (
                  <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                    <img src={formData.categoryAdImage} alt="Category Ad Preview" className="object-contain w-full h-full bg-gray-50" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination Link</label>
                <input 
                  type="text"
                  placeholder="https://..."
                  value={formData.categoryAdLink}
                  onChange={(e) => setFormData({ ...formData, categoryAdLink: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
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
