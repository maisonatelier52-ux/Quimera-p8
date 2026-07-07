"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function CreateArticlePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    author: "",
    image: "",
    isPublished: true,
    content: [] as any[],
  });

  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:5000/api/categories", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);

    // Fetch authors
    fetch("http://localhost:5000/api/authors", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAuthors(data);
        else if (data && Array.isArray(data.authors)) setAuthors(data.authors);
        else setAuthors([]);
      })
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    let finalValue: any = value;
    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
      ...(name === "title" && {
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }),
    }));
  };

  const addContentBlock = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { type, text: "", author: "" }]
    }));
  };

  const removeContentBlock = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index)
    }));
  };

  const updateContentBlock = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newContent = [...prev.content];
      newContent[index] = { ...newContent[index], [field]: value };
      return { ...prev, content: newContent };
    });
  };

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
      setFormData((prev) => ({ ...prev, image: result.url }));
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Find the full author object based on the selected ID
    const selectedAuthor = authors.find(a => a._id === formData.author) || formData.author;
    const payload = { ...formData, author: selectedAuthor };

    try {
      const res = await fetch(`http://localhost:5000/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create article");
      router.push("/admin/articles");
    } catch (error) {
      console.error(error);
      alert("Error creating article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center space-x-4">
        <Link href="/admin/articles" className="text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">Create Article</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-lg"
                  placeholder="Article Headline..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea
                  name="excerpt"
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  placeholder="A short summary of the article..."
                />
              </div>

              {/* Block Editor */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-normal font-sans text-gray-900">Article Content</h3>
                  <div className="flex space-x-2">
                    <button type="button" onClick={() => addContentBlock("paragraph")} className="flex items-center space-x-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded">
                      <Plus className="w-3 h-3" /> <span>Paragraph</span>
                    </button>
                    <button type="button" onClick={() => addContentBlock("heading")} className="flex items-center space-x-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded">
                      <Plus className="w-3 h-3" /> <span>Heading</span>
                    </button>
                    <button type="button" onClick={() => addContentBlock("quote")} className="flex items-center space-x-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded">
                      <Plus className="w-3 h-3" /> <span>Quote</span>
                    </button>
                    <button type="button" onClick={() => addContentBlock("intro")} className="flex items-center space-x-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded">
                      <Plus className="w-3 h-3" /> <span>Intro</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {formData.content.map((block, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{block.type}</span>
                        </div>
                        {block.type === 'quote' ? (
                          <>
                            <textarea
                              value={block.text}
                              onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                              placeholder="Quote text..."
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                              rows={2}
                            />
                            <input
                              type="text"
                              value={block.author || ''}
                              onChange={(e) => updateContentBlock(index, 'author', e.target.value)}
                              placeholder="Quote Author"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                            />
                          </>
                        ) : block.type === 'heading' ? (
                          <input
                            type="text"
                            value={block.text}
                            onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                            placeholder="Heading text..."
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-bold"
                          />
                        ) : (
                          <textarea
                            value={block.text}
                            onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                            placeholder={`${block.type} text...`}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                            rows={4}
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeContentBlock(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md mt-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.content.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                      No content blocks yet. Add a paragraph to get started.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageLoading}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {imageLoading && <p className="text-xs text-blue-500 mt-2">Uploading...</p>}
                {formData.image && (
                  <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                    <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-900">
                    Publish Immediately
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Please create a category first.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <select
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                >
                  <option value="" disabled>Select an author</option>
                  {authors.map((auth: any) => (
                    <option key={auth._id} value={auth._id}>
                      {auth.name}
                    </option>
                  ))}
                </select>
                {authors.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Please create an author first.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Link
              href="/admin/articles"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 mr-3"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || categories.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-70 transition-colors"
            >
              {loading ? "Creating..." : "Create Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
