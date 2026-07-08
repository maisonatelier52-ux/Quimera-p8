"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import React from "react";

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const id = React.use(params).id;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    template: "custom",
    heroTitle: "",
    heroSubtitle: "",
    blocks: [] as any[],
    isPublished: true,
    seoTitle: "",
    seoDescription: "",
    keywords: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch page");
        return res.json();
      })
      .then(data => {
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          template: data.template || "custom",
          heroTitle: data.heroTitle || "",
          heroSubtitle: data.heroSubtitle || "",
          blocks: data.blocks || [],
          isPublished: data.isPublished !== false,
          seoTitle: data.seoTitle || "",
          seoDescription: data.seoDescription || "",
          keywords: data.keywords || "",
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Error loading page");
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addBlock = (type: string) => {
    setFormData(prev => ({
      ...prev,
      blocks: [...prev.blocks, { type, data: { text: "" }, order: prev.blocks.length }]
    }));
  };

  const updateBlock = (index: number, field: string, value: string) => {
    const newBlocks = [...formData.blocks];
    newBlocks[index].data[field] = value;
    setFormData(prev => ({ ...prev, blocks: newBlocks }));
  };

  const removeBlock = (index: number) => {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index).map((b, i) => ({ ...b, order: i }))
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/pages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to update page");
      router.push("/admin/pages");
    } catch (error) {
      console.error(error);
      alert("Error updating page");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading page...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link href="/admin/pages" className="text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-xl font-bold text-gray-900">Edit Page</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
              <select
                name="template"
                value={formData.template}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="custom">Custom (Blocks)</option>
                <option value="contact">Contact Us</option>
                <option value="about">About Us</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title (Optional)</label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle (Optional)</label>
              <input
                type="text"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
            </div>
          </div>

          {formData.template === "custom" && (
            <div className="pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-900">Page Content Blocks</h3>
                <div className="flex space-x-2">
                  <button type="button" onClick={() => addBlock("heading")} className="flex items-center space-x-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded">
                    <Plus className="w-3 h-3" /> <span>Heading</span>
                  </button>
                  <button type="button" onClick={() => addBlock("paragraph")} className="flex items-center space-x-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded">
                    <Plus className="w-3 h-3" /> <span>Paragraph</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {formData.blocks.map((block, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{block.type}</span>
                      
                      {block.type === 'heading' ? (
                        <input 
                          type="text" 
                          value={block.data.text || ''}
                          onChange={(e) => updateBlock(index, 'text', e.target.value)}
                          placeholder="Heading text..."
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-bold"
                        />
                      ) : (
                        <textarea 
                          value={block.data.text || ''}
                          onChange={(e) => updateBlock(index, 'text', e.target.value)}
                          placeholder="Paragraph text..."
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                          rows={4}
                        />
                      )}
                    </div>
                    <button type="button" onClick={() => removeBlock(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md mt-6">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.blocks.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    No content blocks yet. Add a heading or paragraph to get started.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-md font-medium text-gray-900 mb-4">SEO & Metadata</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="Defaults to page title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
                  placeholder="Brief description for search engines..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="about us, news, contact, etc."
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
