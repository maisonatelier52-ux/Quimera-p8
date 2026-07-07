"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function EditHomepagePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    isActive: true,
    sections: [] as any[],
  });

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/homepage/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            isActive: data.isActive !== false, // default true
            sections: data.sections || [],
          });
        }
      })
      .catch(console.error);
  }, [id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { key: `section-${Date.now()}`, type: "overlay", title: "New Section", limit: 3, slots: [] }
      ]
    }));
  };

  const removeSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const updateSection = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const newSections = [...prev.sections];
      newSections[index] = { ...newSections[index], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/homepage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update homepage layout");
      router.push("/admin/homepage");
    } catch (error) {
      console.error(error);
      alert("Error updating homepage layout");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="space-y-6 max-w-4xl">
    <div className="flex items-center space-x-4">
      <Link href="/admin/homepage" className="text-gray-500 hover:text-blue-600 transition-colors">
        <ArrowLeft className="w-6 h-6" />
      </Link>
      <h2 className="text-2xl font-bold text-gray-900">Edit Homepage Layout</h2>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Layout Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., Summer 2026 Layout"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-900">Set as Active Layout</label>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
              <span>Add Section</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.sections.map((section, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={section.title || ""}
                      onChange={(e) => updateSection(index, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                    <select
                      value={section.type || "featured"}
                      onChange={(e) => updateSection(index, 'type', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white"
                    >
                      <option value="featured">Featured</option>
                      <option value="headline">Headline</option>
                      <option value="overlay">Overlay</option>
                      <option value="list">List</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Article Limit</label>
                    <input
                      type="number"
                      value={section.limit || 3}
                      onChange={(e) => updateSection(index, 'limit', parseInt(e.target.value))}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md mt-5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {formData.sections.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No sections added yet.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Link
            href="/admin/homepage"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 mr-3"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-70 transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
