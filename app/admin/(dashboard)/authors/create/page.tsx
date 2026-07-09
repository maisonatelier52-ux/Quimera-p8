"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateAuthorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    bio: "",
    avatar: "",
    role: "",
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && {
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    setImageLoading(true);

    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/upload`, {
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Upload failed");
      const result = await res.json();
      setFormData((prev) => ({ ...prev, avatar: result.url }));
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
    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create author");
      router.push("/admin/authors");
    } catch (error) {
      console.error(error);
      alert("Error creating author");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center space-x-4">
        <Link href="/admin/authors" className="text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">Create Author</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              placeholder="e.g., John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">Auto-generated from name.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="e.g., Senior Editor"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="e.g., john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Optional)</label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              placeholder="About the author..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={imageLoading}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
            />
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              placeholder="Or enter image URL... (https://...)"
            />
            {imageLoading && <p className="text-xs text-blue-500 mt-2">Uploading...</p>}
            {formData.avatar && (
              <div className="mt-3 relative w-32 h-32 rounded-full overflow-hidden border border-gray-200">
                <img src={formData.avatar} alt="Avatar Preview" className="object-cover w-full h-full bg-gray-50" />
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Link
              href="/admin/authors"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 mr-3"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-70 transition-colors"
            >
              {loading ? "Creating..." : "Create Author"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
