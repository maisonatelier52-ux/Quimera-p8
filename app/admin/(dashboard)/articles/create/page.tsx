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
    fetch("${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/categories", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);

    // Fetch authors
    fetch("${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/authors", {
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
      const res = await fetch("${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/upload", {
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
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/articles`, {
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
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      <div className="flex items-center space-x-3">
        <Link href="/admin/articles" className="text-neutral-400 hover:text-neutral-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight">Create Article</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-0 flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
          
          {/* Main Editor Content */}
          <div className="flex-1 p-6 md:p-8 space-y-6 border-b md:border-b-0 md:border-r border-neutral-200">
            <div>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full text-3xl font-bold text-neutral-900 placeholder:text-neutral-300 border-none outline-none focus:ring-0 p-0"
                placeholder="Article Title"
              />
            </div>

            <div>
              <textarea
                name="excerpt"
                rows={2}
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full text-[14px] text-neutral-600 placeholder:text-neutral-400 border-none outline-none focus:ring-0 p-0 resize-none"
                placeholder="Add a short excerpt or description..."
              />
            </div>

            {/* Block Editor */}
            <div className="pt-6 border-t border-neutral-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[13px] font-semibold text-neutral-900 uppercase tracking-wide">Content Blocks</h3>
                <div className="flex space-x-1.5">
                  <button type="button" onClick={() => addContentBlock("paragraph")} className="flex items-center space-x-1 text-[12px] font-medium px-2 py-1 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-md transition-colors">
                    <Plus className="w-3 h-3" /> <span>Text</span>
                  </button>
                  <button type="button" onClick={() => addContentBlock("heading")} className="flex items-center space-x-1 text-[12px] font-medium px-2 py-1 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-md transition-colors">
                    <Plus className="w-3 h-3" /> <span>Heading</span>
                  </button>
                  <button type="button" onClick={() => addContentBlock("quote")} className="flex items-center space-x-1 text-[12px] font-medium px-2 py-1 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-md transition-colors">
                    <Plus className="w-3 h-3" /> <span>Quote</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {formData.content.map((block, index) => (
                  <div key={index} className="group relative border border-transparent hover:border-neutral-200 rounded-lg p-2 -mx-2 flex gap-3 transition-colors">
                    <div className="opacity-0 group-hover:opacity-100 mt-2 cursor-move text-neutral-300">
                      <div className="w-4 h-4 flex flex-col justify-center items-center gap-[2px]">
                        <div className="w-3 h-[2px] bg-neutral-300 rounded-full"></div>
                        <div className="w-3 h-[2px] bg-neutral-300 rounded-full"></div>
                        <div className="w-3 h-[2px] bg-neutral-300 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {block.type === 'quote' ? (
                        <>
                          <textarea
                            value={block.text}
                            onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                            placeholder="Quote text..."
                            className="w-full px-3 py-2 text-[14px] border-l-2 border-neutral-300 bg-neutral-50 focus:bg-white outline-none focus:border-neutral-400 transition-colors rounded-r-md"
                            rows={2}
                          />
                          <input
                            type="text"
                            value={block.author || ''}
                            onChange={(e) => updateContentBlock(index, 'author', e.target.value)}
                            placeholder="Quote Author"
                            className="w-full px-3 py-1.5 text-[13px] text-neutral-500 border-none outline-none focus:ring-0"
                          />
                        </>
                      ) : block.type === 'heading' ? (
                        <input
                          type="text"
                          value={block.text}
                          onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                          placeholder="Heading..."
                          className="w-full px-0 py-1 text-xl font-bold border-none outline-none focus:ring-0 text-neutral-900 placeholder:text-neutral-300"
                        />
                      ) : (
                        <textarea
                          value={block.text}
                          onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                          placeholder="Start typing..."
                          className="w-full px-0 py-1 text-[15px] leading-relaxed border-none outline-none focus:ring-0 text-neutral-700 resize-none"
                          rows={3}
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeContentBlock(index)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-md mt-1 transition-all shrink-0 self-start"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {formData.content.length === 0 && (
                  <div className="text-[13px] text-neutral-400 py-10 text-center border border-dashed border-neutral-200 rounded-lg">
                    Click a block type above to start writing.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar Settings */}
          <div className="w-full md:w-[320px] bg-neutral-50/50 p-6 flex flex-col space-y-6 shrink-0">
            
            <div>
              <label className="block text-[12px] font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">Status</label>
              <label className="flex items-center space-x-2 cursor-pointer bg-white border border-neutral-200 px-3 py-2 rounded-md shadow-sm hover:bg-neutral-50 transition-colors">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-4 h-4 text-zinc-900 border-neutral-300 rounded focus:ring-zinc-900"
                />
                <span className="text-[13px] font-medium text-neutral-900">Publish immediately</span>
              </label>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={imageLoading}
                className="w-full text-[12px] text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-neutral-200 file:text-[12px] file:font-medium file:bg-white file:text-neutral-700 hover:file:bg-neutral-50 cursor-pointer"
              />
              {imageLoading && <p className="text-[11px] text-neutral-500 mt-1.5">Uploading...</p>}
              {formData.image && (
                <div className="mt-2.5 relative w-full h-32 rounded-md overflow-hidden border border-neutral-200 shadow-sm">
                  <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">Category</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full h-9 px-3 text-[13px] border border-neutral-200 rounded-md focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none bg-white shadow-sm"
              >
                <option value="" disabled>Select category...</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">Author</label>
              <select
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="w-full h-9 px-3 text-[13px] border border-neutral-200 rounded-md focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none bg-white shadow-sm"
              >
                <option value="" disabled>Select author...</option>
                {authors.map((auth: any) => (
                  <option key={auth._id} value={auth._id}>{auth.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-neutral-600 mb-1.5 uppercase tracking-wider">Slug</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full h-9 px-3 text-[13px] border border-neutral-200 rounded-md focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none bg-white shadow-sm font-mono text-neutral-600"
              />
            </div>

            <div className="pt-6 border-t border-neutral-200 mt-auto flex flex-col gap-2">
              <button
                type="submit"
                disabled={loading || categories.length === 0}
                className="w-full py-2 text-[13px] font-medium text-white bg-zinc-900 rounded-md hover:bg-zinc-800 shadow-sm disabled:opacity-50 transition-colors"
              >
                {loading ? "Saving..." : "Save Article"}
              </button>
              <Link
                href="/admin/articles"
                className="w-full py-2 text-[13px] font-medium text-neutral-600 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 shadow-sm text-center transition-colors"
              >
                Cancel
              </Link>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
