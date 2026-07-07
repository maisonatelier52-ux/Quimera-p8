"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Monitor, Tablet, Smartphone } from "lucide-react";

export default function HeaderSettingsPage() {
  const [formData, setFormData] = useState<any>({
    logoType: "text",
    logoText: "QUIMERA",
    logoImageUrl: "",
    layoutOrder: ["date", "logo", "search"],
    verticalOrder: ["topBar", "navbar", "ticker"],
    topBarBgColor: "#09365E",
    topBarTextColor: "#FFFFFF",
    navbarBgColor: "#000000",
    navbarTextColor: "#FFFFFF",
    tickerBgColor: "#09365E",
    tickerTextColor: "#FFFFFF"
  });
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  // Send real-time updates to iframe
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_HEADER_SETTINGS',
        settings: formData
      }, '*');
    }
  }, [formData]);

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/header`, {
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
            layoutOrder: data.layoutOrder && data.layoutOrder.length === 3 ? data.layoutOrder : ["date", "logo", "search"],
            verticalOrder: data.verticalOrder && data.verticalOrder.length === 3 ? data.verticalOrder : ["topBar", "navbar", "ticker"],
            topBarBgColor: data.topBarBgColor || "#09365E",
            topBarTextColor: data.topBarTextColor || "#FFFFFF",
            navbarBgColor: data.navbarBgColor || "#000000",
            navbarTextColor: data.navbarTextColor || "#FFFFFF",
            tickerBgColor: data.tickerBgColor || "#09365E",
            tickerTextColor: data.tickerTextColor || "#FFFFFF"
          });
        }
        setLoading(false);
      })
      .catch(console.error);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/header`, {
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

  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    setTimeout(() => {
      if (e.target instanceof HTMLElement) e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    setDragOverItemIndex(index);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.target instanceof HTMLElement) e.target.classList.remove('opacity-50');
    if (draggedItemIndex !== null && dragOverItemIndex !== null && draggedItemIndex !== dragOverItemIndex) {
      const newOrder = [...formData.layoutOrder];
      const draggedItem = newOrder[draggedItemIndex];
      newOrder.splice(draggedItemIndex, 1);
      newOrder.splice(dragOverItemIndex, 0, draggedItem);

      setFormData({ ...formData, layoutOrder: newOrder });
    }
    setDraggedItemIndex(null);
    setDragOverItemIndex(null);
  };

  const [draggedVIndex, setDraggedVIndex] = useState<number | null>(null);
  const [dragOverVIndex, setDragOverVIndex] = useState<number | null>(null);

  const handleVDragStart = (e: React.DragEvent, index: number) => {
    setDraggedVIndex(index);
    setTimeout(() => {
      if (e.target instanceof HTMLElement) e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleVDragEnter = (e: React.DragEvent, index: number) => {
    setDragOverVIndex(index);
  };

  const handleVDragEnd = (e: React.DragEvent) => {
    if (e.target instanceof HTMLElement) e.target.classList.remove('opacity-50');
    if (draggedVIndex !== null && dragOverVIndex !== null && draggedVIndex !== dragOverVIndex) {
      const newOrder = [...formData.verticalOrder];
      const draggedItem = newOrder[draggedVIndex];
      newOrder.splice(draggedVIndex, 1);
      newOrder.splice(dragOverVIndex, 0, draggedItem);

      setFormData({ ...formData, verticalOrder: newOrder });
    }
    setDraggedVIndex(null);
    setDragOverVIndex(null);
  };

  const [imageLoading, setImageLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    setImageLoading(true);
    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/upload`, {
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
    <div className="space-y-8 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900">Header Settings</h2>

      {/* Live Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[250px]">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Live Preview</h3>
          <div className="flex bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded-md transition-colors ${deviceView === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Desktop View"
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`p-1.5 rounded-md transition-colors ${deviceView === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Tablet View"
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded-md transition-colors ${deviceView === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Mobile View"
            >
              <Smartphone size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-gray-200 overflow-hidden flex justify-center items-start relative">
          <div
            className="origin-top bg-white transition-all duration-300 shadow-xl overflow-hidden shrink-0"
            style={{
              width: deviceView === 'desktop' ? '1640px' : deviceView === 'tablet' ? '768px' : '375px',
              height: deviceView === 'desktop' ? '222.22%' : deviceView === 'tablet' ? '133.33%' : '100%',
              transform: deviceView === 'desktop' ? 'scale(0.45)' : deviceView === 'tablet' ? 'scale(0.75)' : 'scale(1)'
            }}
          >
            <iframe
              ref={iframeRef}
              src="/?previewHeaderOnly=true"
              className="w-full h-full border-none"
              title="Header Live Preview"
              onLoad={() => {
                if (iframeRef.current && iframeRef.current.contentWindow) {
                  iframeRef.current.contentWindow.postMessage({
                    type: 'UPDATE_HEADER_SETTINGS',
                    settings: formData
                  }, '*');
                }
              }}
            />
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

        {/* Color Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Theme Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Header Background</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.topBarBgColor}
                    onChange={(e) => setFormData({ ...formData, topBarBgColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.topBarBgColor}
                    onChange={(e) => setFormData({ ...formData, topBarBgColor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Header Text</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.topBarTextColor}
                    onChange={(e) => setFormData({ ...formData, topBarTextColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.topBarTextColor}
                    onChange={(e) => setFormData({ ...formData, topBarTextColor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Navigation Background</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.navbarBgColor}
                    onChange={(e) => setFormData({ ...formData, navbarBgColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.navbarBgColor}
                    onChange={(e) => setFormData({ ...formData, navbarBgColor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Navigation Text</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.navbarTextColor}
                    onChange={(e) => setFormData({ ...formData, navbarTextColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.navbarTextColor}
                    onChange={(e) => setFormData({ ...formData, navbarTextColor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Running News Background</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.tickerBgColor}
                    onChange={(e) => setFormData({ ...formData, tickerBgColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.tickerBgColor}
                    onChange={(e) => setFormData({ ...formData, tickerBgColor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Running News Text</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.tickerTextColor}
                    onChange={(e) => setFormData({ ...formData, tickerTextColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.tickerTextColor}
                    onChange={(e) => setFormData({ ...formData, tickerTextColor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Layout Settings (Top Bar)</h3>
          <p className="text-sm text-gray-500 mb-4">Drag and drop the blocks below to rearrange the header layout. The Live Preview will update instantly.</p>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            {formData.layoutOrder.map((item: string, index: number) => {
              const labels: Record<string, string> = {
                date: "Date & Time",
                logo: "Logo",
                search: "Search Icon"
              };

              return (
                <div
                  key={item}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex-1 p-4 bg-white border-2 border-dashed ${dragOverItemIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg text-center cursor-move shadow-sm hover:border-gray-400 transition-all`}
                >
                  <span className="font-semibold text-gray-700 pointer-events-none">{labels[item]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vertical Layout Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Vertical Layout Settings</h3>
          <p className="text-sm text-gray-500 mb-4">Drag and drop the rows below to reorder the Header, Navbar, and Running News.</p>

          <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            {formData.verticalOrder.map((item: string, index: number) => {
              const labels: Record<string, string> = {
                topBar: "Main Header (Logo/Search)",
                navbar: "Navigation Bar (Categories)",
                ticker: "Running News (Marquee)"
              };

              return (
                <div
                  key={item}
                  draggable
                  onDragStart={(e) => handleVDragStart(e, index)}
                  onDragEnter={(e) => handleVDragEnter(e, index)}
                  onDragEnd={handleVDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`p-4 bg-white border-2 border-dashed ${dragOverVIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg text-center cursor-move shadow-sm hover:border-gray-400 transition-all`}
                >
                  <span className="font-semibold text-gray-700 pointer-events-none">{labels[item]}</span>
                </div>
              );
            })}
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
