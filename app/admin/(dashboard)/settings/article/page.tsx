"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ArticleSettingsPage() {
  const [formData, setFormData] = useState<any>({
    articleLayout: ['ArticleHeader', 'ArticleContent', 'RelatedArticles', 'Comments']
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
            articleLayout: data.articleLayout || ['ArticleHeader', 'ArticleContent', 'RelatedArticles', 'Comments']
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

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    setTimeout(() => {
      if (e.target instanceof HTMLElement) e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    setDragOverIndex(index);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.target instanceof HTMLElement) e.target.classList.remove('opacity-50');
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newArray = [...formData.articleLayout];
      const draggedItem = newArray[draggedIndex];
      newArray.splice(draggedIndex, 1);
      newArray.splice(dragOverIndex, 0, draggedItem);

      setFormData({ ...formData, articleLayout: newArray });
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Article Settings</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex-1 space-y-6">

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Article Page Layout</h3>
            <p className="text-sm text-gray-500 mb-4">Drag and drop to rearrange the order of components on the detailed article page.</p>
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
              {formData.articleLayout.map((componentName: string, index: number) => (
                <div
                  key={`article-${componentName}-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex items-center p-4 bg-white border-2 border-dashed ${dragOverIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg cursor-move shadow-sm hover:border-gray-400 transition-colors`}
                >
                  <span className="font-semibold text-gray-700 pointer-events-none">{componentName}</span>
                </div>
              ))}
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
                src={previewSlug ? `/articles/${previewSlug}?layout=${formData.articleLayout.join(',')}` : `/?layout=${formData.articleLayout.join(',')}`}
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
