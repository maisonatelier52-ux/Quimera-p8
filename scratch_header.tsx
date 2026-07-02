"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeaderSettingsPage() {
  const [formData, setFormData] = useState<any>({
    logoType: "text",
    logoText: "QUIMERA",
    logoImageUrl: "",
    layoutOrder: ["date", "logo", "search"]
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/header", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (res.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setFormData({
            logoType: data.logoType || "text",
            logoText: data.logoText || "QUIMERA",
            logoImageUrl: data.logoImageUrl || "",
            layoutOrder: data.layoutOrder && data.layoutOrder.length === 3 ? data.layoutOrder : ["date", "logo", "search"]
          });
        }
        setLoading(false);
      })
      .catch(console.error);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/header", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Header settings updated successfully!");
      } else {
        alert("Failed to update header settings.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  const handleLayoutChange = (index: number, value: string) => {
    const newOrder = [...formData.layoutOrder];
    // Swap if already exists
    const existingIndex = newOrder.indexOf(value);
    if (existingIndex !== -1) {
      newOrder[existingIndex] = newOrder[index];
    }
    newOrder[index] = value;
    setFormData({ ...formData, layoutOrder: newOrder });
  };

  const [imageLoading, setImageLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    setImageLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Upload failed");
      const result = await res.json();
      setFormData((prev: any) => ({ ...prev, logoImageUrl: result.url }));
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setImageLoading(false);
    }
  };

  const renderPreviewElement = (type: string) => {
    if (type === "date") {
      return (
        <div className="text-[10px] text-black font-medium tracking-wide">
          Wednesday, 1 Jul 2026 | 12:00:00 PM
        </div>
      );
    }
    if (type === "logo") {
      return (
        <div className="flex items-center gap-1 group cursor-pointer">
          {formData.logoType === 'text' ? (
            <>
              <span className="flex gap-[2px] h-6 skew-x-[-15deg]">
                  <span className="w-1.5 h-full bg-red-500 block"></span>
                  <span className="w-1.5 h-full bg-yellow-400 block"></span>
                  <span className="w-1.5 h-full bg-cyan-400 block"></span>
              </span>
              <span className="text-3xl font-black text-black italic tracking-tighter ml-1">
                  {formData.logoText}
              </span>
            </>
          ) : (
            <img src={formData.logoImageUrl || "https://via.placeholder.com/150x40?text=Logo"} alt="Logo Preview" className="h-10 object-contain" />
          )}
        </div>
      );
    }
    if (type === "search") {
      return (
        <button className="p-2 hover:bg-black/10 rounded-full transition-colors cursor-pointer">
            <Search size={20} className='text-black' />
        </button>
      );
    }
    return null;
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">Header Settings</h2>
      
      {/* Live Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-800">Live Preview</h3>
        </div>
        <div className="p-6 bg-gray-100">
          <div className="bg-white text-white border border-gray-200 shadow-sm rounded-md">
            <div className="px-4 h-20 grid grid-cols-3 items-center">
              <div className="flex justify-start">
                {renderPreviewElement(formData.layoutOrder[0])}
              </div>
              <div className="flex justify-center">
                {renderPreviewElement(formData.layoutOrder[1])}
              </div>
              <div className="flex justify-end gap-4">
                {renderPreviewElement(formData.layoutOrder[2])}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        
        {/* Logo Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Logo Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo Type</label>
              <select
                value={formData.logoType}
                onChange={(e) => setFormData({ ...formData, logoType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="text">Text Logo</option>
                <option value="image">Image Logo</option>
              </select>
            </div>

            {formData.logoType === 'text' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Text</label>
                <input
                  type="text"
                  value={formData.logoText}
                  onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. QUIMERA"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Image URL</label>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={formData.logoImageUrl}
                    onChange={(e) => setFormData({ ...formData, logoImageUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://..."
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">or upload:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageLoading}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    {imageLoading && <span className="text-sm text-blue-600">Uploading...</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Layout Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Layout Settings (Top Bar)</h3>
          <p className="text-sm text-gray-500 mb-4">Choose which element appears on the left, center, and right side of the header.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Left Side</label>
              <select
                value={formData.layoutOrder[0]}
                onChange={(e) => handleLayoutChange(0, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Date & Time</option>
                <option value="logo">Logo</option>
                <option value="search">Search Icon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Center</label>
              <select
                value={formData.layoutOrder[1]}
                onChange={(e) => handleLayoutChange(1, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Date & Time</option>
                <option value="logo">Logo</option>
                <option value="search">Search Icon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Right Side</label>
              <select
                value={formData.layoutOrder[2]}
                onChange={(e) => handleLayoutChange(2, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Date & Time</option>
                <option value="logo">Logo</option>
                <option value="search">Search Icon</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-colors shadow-sm"
          >
            Save Header Settings
          </button>
        </div>
      </form>
    </div>
  );
}
