"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ArticleSettingsPage() {
  const [formData, setFormData] = useState<any>({
    headerColor: '#09365E',
    paragraphColor: '#374151',
    textColor: '#000000',
    fontFamily: 'serif',
    sidebarPosition: 'right'
  });
  const [loading, setLoading] = useState(true);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/article-settings`, {
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
            headerColor: data.headerColor || '#09365E',
            paragraphColor: data.paragraphColor || '#374151',
            textColor: data.textColor || '#000000',
            fontFamily: data.fontFamily || 'serif',
            sidebarPosition: data.sidebarPosition || 'right'
          });
        }
        setLoading(false);
      })
      .catch(console.error);

    fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/public/articles`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPreviewSlug(data[0].slug);
        }
      })
      .catch(console.error);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/article-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Article settings updated successfully!");
      } else {
        alert("Failed to update article settings.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[20px] font-bold text-neutral-900 tracking-tight">Article Settings</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">Configure the look and feel of the article pages.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <form onSubmit={handleSubmit} className="w-full lg:w-[360px] xl:w-[400px] shrink-0 bg-white p-5 rounded-lg shadow-sm border border-neutral-200 space-y-6">
          <div>
            <h3 className="text-[14px] font-semibold text-neutral-900 mb-3 pb-2 border-b border-neutral-100">Typography & Colors</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1">Header Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.headerColor}
                    onChange={(e) => setFormData({ ...formData, headerColor: e.target.value })}
                    className="w-8 h-8 rounded-md cursor-pointer border-0 p-0 shadow-sm"
                  />
                  <input
                    type="text"
                    value={formData.headerColor}
                    onChange={(e) => setFormData({ ...formData, headerColor: e.target.value })}
                    className="flex-1 h-9 px-3 border border-neutral-200 rounded-md shadow-sm focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-[13px] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1">Paragraph Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.paragraphColor}
                    onChange={(e) => setFormData({ ...formData, paragraphColor: e.target.value })}
                    className="w-8 h-8 rounded-md cursor-pointer border-0 p-0 shadow-sm"
                  />
                  <input
                    type="text"
                    value={formData.paragraphColor}
                    onChange={(e) => setFormData({ ...formData, paragraphColor: e.target.value })}
                    className="flex-1 h-9 px-3 border border-neutral-200 rounded-md shadow-sm focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-[13px] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1">General Text Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.textColor}
                    onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                    className="w-8 h-8 rounded-md cursor-pointer border-0 p-0 shadow-sm"
                  />
                  <input
                    type="text"
                    value={formData.textColor}
                    onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                    className="flex-1 h-9 px-3 border border-neutral-200 rounded-md shadow-sm focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-[13px] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1">Font Family</label>
                <select
                  value={formData.fontFamily}
                  onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
                  className="w-full h-9 px-3 border border-neutral-200 rounded-md shadow-sm focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-[13px] outline-none bg-white"
                >
                  <option value="serif">Serif (Elegant)</option>
                  <option value="sans-serif">Sans-Serif (Modern)</option>
                  <option value="monospace">Monospace (Technical)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-neutral-900 mb-3 pb-2 border-b border-neutral-100">Layout</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-neutral-700 mb-1">Sidebar Position</label>
                <select
                  value={formData.sidebarPosition}
                  onChange={(e) => setFormData({ ...formData, sidebarPosition: e.target.value })}
                  className="w-full h-9 px-3 border border-neutral-200 rounded-md shadow-sm focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-[13px] outline-none bg-white"
                >
                  <option value="right">Right Sidebar (Default)</option>
                  <option value="left">Left Sidebar</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 mt-6">
            <button
              type="submit"
              className="w-full h-9 bg-zinc-900 text-white text-[13px] font-medium rounded-md hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Save Settings
            </button>
          </div>
        </form>

        {/* Live Preview */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200 h-[calc(100vh-8rem)] sticky top-6 hidden lg:flex flex-col w-[688px] shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[14px] font-semibold text-neutral-900">Live Preview</h3>
            <div className="flex space-x-1 bg-neutral-100 p-1 rounded-md border border-neutral-200">
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                className={`px-3 py-1 text-[12px] font-medium rounded transition-colors ${deviceView === 'mobile' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
              >
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('tablet')}
                className={`px-3 py-1 text-[12px] font-medium rounded transition-colors ${deviceView === 'tablet' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
              >
                Tablet
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                className={`px-3 py-1 text-[12px] font-medium rounded transition-colors ${deviceView === 'desktop' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
              >
                Desktop
              </button>
            </div>
          </div>

          <div className="flex-1 bg-neutral-100 rounded-md overflow-hidden flex justify-center items-start pt-4 relative border border-neutral-200 shadow-inner">
            <div
              className="origin-top bg-white transition-all duration-300 shadow-md overflow-hidden rounded-t-md shrink-0 border border-neutral-200"
              style={{
                width: deviceView === 'desktop' ? '1440px' : deviceView === 'tablet' ? '768px' : '375px',
                height: deviceView === 'desktop' ? '222.22%' : deviceView === 'tablet' ? '133.33%' : '100%',
                transform: deviceView === 'desktop' ? 'scale(0.45)' : deviceView === 'tablet' ? 'scale(0.75)' : 'scale(1)'
              }}
            >
              <iframe
                src={previewSlug ? `/articles/${previewSlug}?headerColor=${encodeURIComponent(formData.headerColor)}&paragraphColor=${encodeURIComponent(formData.paragraphColor)}&textColor=${encodeURIComponent(formData.textColor)}&fontFamily=${encodeURIComponent(formData.fontFamily)}&sidebarPosition=${encodeURIComponent(formData.sidebarPosition)}` : `/?headerColor=${encodeURIComponent(formData.headerColor)}&paragraphColor=${encodeURIComponent(formData.paragraphColor)}&textColor=${encodeURIComponent(formData.textColor)}&fontFamily=${encodeURIComponent(formData.fontFamily)}`}
                className="w-full h-full border-none"
                title="Article Live Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
