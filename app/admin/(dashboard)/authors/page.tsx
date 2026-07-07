"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminAuthorsList() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/authors`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            setAuthors(data);
        } else if (data && Array.isArray(data.authors)) {
            setAuthors(data.authors);
        } else {
            setAuthors([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch authors:", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000'}/api/authors/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchAuthors();
      } else {
        alert("Failed to delete author");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting author");
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading authors...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Authors</h2>
          <p className="text-sm text-gray-500 mt-1">Manage article authors.</p>
        </div>
        <Link
          href="/admin/authors/create"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Author</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No authors found. Create your first author!
                  </td>
                </tr>
              ) : (
                authors.map((author: any) => (
                  <tr key={author._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {author.image ? (
                        <img src={author.image} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                          {author.name.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{author.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{author.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{author.role || "Author"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <Link href={`/admin/authors/edit/${author._id}`} className="text-blue-600 hover:text-blue-900 inline-flex items-center transition-colors">
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Link>
                      <button onClick={() => handleDelete(author._id)} className="text-red-600 hover:text-red-900 inline-flex items-center transition-colors">
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
