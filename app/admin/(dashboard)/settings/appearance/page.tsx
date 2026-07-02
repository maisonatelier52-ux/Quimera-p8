"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppearanceSettingsPage() {
  const [formData, setFormData] = useState<any>({
    headerBgColor: "#09365E",
    footerBgColor: "#09365E",
    primaryAccentColor: "#E12A32",
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

  const [dragState, setDragState] = useState<{ listName: 'homeLayout' | 'articleLayout' | null, draggedIndex: number | null, dragOverIndex: number | null }>({
    listName: null,
    draggedIndex: null,
    dragOverIndex: null
  });

  const handleDragStart = (e: React.DragEvent, listName: 'homeLayout' | 'articleLayout', index: number) => {
    setDragState({ listName, draggedIndex: index, dragOverIndex: null });
    setTimeout(() => {
        if (e.target instanceof HTMLElement) e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent, listName: 'homeLayout' | 'articleLayout', index: number) => {
    if (dragState.listName === listName) {
      setDragState(prev => ({ ...prev, dragOverIndex: index }));
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.target instanceof HTMLElement) e.target.classList.remove('opacity-50');
    const { listName, draggedIndex, dragOverIndex } = dragState;
    if (listName && draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newArray = [...formData[listName]];
      const draggedItem = newArray[draggedIndex];
      newArray.splice(draggedIndex, 1);
      newArray.splice(dragOverIndex, 0, draggedItem);
      
      setFormData({ ...formData, [listName]: newArray });
    }
    setDragState({ listName: null, draggedIndex: null, dragOverIndex: null });
    setDragState({ listName: null, draggedIndex: null, dragOverIndex: null });
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

        {/* Homepage Layout */}
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Homepage Layout</h3>
          <p className="text-sm text-gray-500 mb-6">Drag and drop to rearrange the order of components on the homepage.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Draggable List */}
            <div className="space-y-3">
              {formData.homeLayout.map((componentName: string, index: number) => (
                <div 
                  key={`home-${componentName}-${index}`} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'homeLayout', index)}
                  onDragEnter={(e) => handleDragEnter(e, 'homeLayout', index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex items-center p-4 bg-white border-2 border-dashed ${dragState.listName === 'homeLayout' && dragState.dragOverIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-xl cursor-move shadow-sm hover:border-gray-300 transition-colors`}
                >
                  <span className="font-medium text-gray-700 pointer-events-none">{componentName}</span>
                </div>
              ))}
            </div>
            
            {/* Live Preview */}
            {/* Live Preview */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">Live Preview</h4>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden relative h-[500px]">
                <iframe 
                  src={`/preview-home?layout=${formData.homeLayout.join(',')}`}
                  className="w-[285%] h-[285%] border-0 absolute top-0 left-0"
                  style={{ transform: 'scale(0.35)', transformOrigin: '0 0' }}
                  title="Homepage Preview"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Article Layout */}
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Article Page Layout</h3>
          <p className="text-sm text-gray-500 mb-6">Drag and drop to rearrange the order of components on a detailed article page.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Draggable List */}
            <div className="space-y-3">
              {formData.articleLayout.map((componentName: string, index: number) => (
                <div 
                  key={`article-${componentName}-${index}`} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'articleLayout', index)}
                  onDragEnter={(e) => handleDragEnter(e, 'articleLayout', index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex items-center p-4 bg-white border-2 border-dashed ${dragState.listName === 'articleLayout' && dragState.dragOverIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-xl cursor-move shadow-sm hover:border-gray-300 transition-colors`}
                >
                  <span className="font-medium text-gray-700 pointer-events-none">{componentName}</span>
                </div>
              ))}
            </div>
            
            {/* Live Preview */}
            {/* Live Preview */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">Live Preview</h4>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden relative h-[500px]">
                <iframe 
                  src={`/preview-article?layout=${formData.articleLayout.join(',')}`}
                  className="w-[285%] h-[285%] border-0 absolute top-0 left-0"
                  style={{ transform: 'scale(0.35)', transformOrigin: '0 0' }}
                  title="Article Preview"
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