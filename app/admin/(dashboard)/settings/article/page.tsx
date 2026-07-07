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
    fetch("http://127.0.0.1:5000/api/article-settings", {
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

    fetch("http://127.0.0.1:5000/api/public/articles")
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
      const res = await fetch("http://127.0.0.1:5000/api/article-settings", {
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Article Settings</h1>
        <p className="text-gray-500 mt-1">Configure the look and feel of the article pages.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 xl:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Article Styling</h3>
            <p className="text-sm text-gray-500 mb-6">Customize the colors and typography for all detailed article pages.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Header Color</label>
                  <p className="text-xs text-gray-500 mb-2">Used for article titles and major headings.</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.headerColor}
                      onChange={(e) => setFormData({ ...formData, headerColor: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={formData.headerColor}
                      onChange={(e) => setFormData({ ...formData, headerColor: e.target.value })}
                      className="flex-1 min-w-0 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph Color</label>
                  <p className="text-xs text-gray-500 mb-2">Used for the main article content (paragraphs).</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.paragraphColor}
                      onChange={(e) => setFormData({ ...formData, paragraphColor: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={formData.paragraphColor}
                      onChange={(e) => setFormData({ ...formData, paragraphColor: e.target.value })}
                      className="flex-1 min-w-0 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">General Text Color</label>
                  <p className="text-xs text-gray-500 mb-2">Used for miscellaneous text, dates, and meta info.</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.textColor}
                      onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={formData.textColor}
                      onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                      className="flex-1 min-w-0 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                  <p className="text-xs text-gray-500 mb-2">The primary font used for the article text.</p>
                  <select
                    value={formData.fontFamily}
                    onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5 border"
                  >
                    <option value="serif">Serif (Elegant, Traditional)</option>
                    <option value="sans-serif">Sans-Serif (Modern, Clean)</option>
                    <option value="monospace">Monospace (Technical, Typewriter)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Layout Settings</h3>
            <p className="text-sm text-gray-500 mb-6">Configure the structural layout of the article page.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sidebar Position</label>
                <p className="text-xs text-gray-500 mb-2">Choose whether the sidebar appears on the right or the left side of the content.</p>
                <select
                  value={formData.sidebarPosition}
                  onChange={(e) => setFormData({ ...formData, sidebarPosition: e.target.value })}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5 border"
                >
                  <option value="right">Right Sidebar (Default)</option>
                  <option value="left">Left Sidebar</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Article Settings
            </button>
          </div>
        </form>

        {/* Live Preview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full lg:w-1/2 xl:w-2/3 h-[calc(100vh-8rem)] sticky top-6 hidden lg:flex flex-col">
          <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${deviceView === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('tablet')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${deviceView === 'tablet' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Tablet
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${deviceView === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Desktop
              </button>
            </div>
          </div>

          <div className="flex-1 bg-gray-200 rounded-xl overflow-hidden flex justify-center items-start pt-4 relative">
            <div
              className="origin-top bg-white transition-all duration-300 shadow-xl overflow-hidden rounded-t-xl shrink-0"
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
