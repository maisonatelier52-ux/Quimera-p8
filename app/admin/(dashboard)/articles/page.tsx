"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminArticlesList() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/articles", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // Assume API returns array of articles, or maybe an object if pagination is used
        if (Array.isArray(data)) {
            setArticles(data);
        } else if (data && Array.isArray(data.articles)) {
            setArticles(data.articles);
        } else {
            setArticles([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch articles:", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchArticles();
      } else {
        alert("Failed to delete article");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting article");
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading articles...</div>;

  return (
    <div className="space-y-6 max-w-7xl pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight">Articles</h2>
          <p className="text-[13px] text-neutral-500 mt-0.5">Manage your news articles and posts.</p>
        </div>
        <Link
          href="/admin/articles/create"
          className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-900 text-white text-[13px] font-medium rounded-md hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 text-[13px]">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-5 py-3 text-left font-semibold text-neutral-500 w-1/3">Title</th>
                <th className="px-5 py-3 text-left font-semibold text-neutral-500">Category</th>
                <th className="px-5 py-3 text-left font-semibold text-neutral-500">Author</th>
                <th className="px-5 py-3 text-left font-semibold text-neutral-500">Status</th>
                <th className="px-5 py-3 text-right font-semibold text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-neutral-500">
                    No articles found. Create your first article!
                  </td>
                </tr>
              ) : (
                articles.map((article: any) => (
                  <tr key={article._id} className="hover:bg-neutral-50/80 transition-colors group">
                    <td className="px-5 py-2.5 font-medium text-neutral-900 truncate max-w-[300px]" title={article.title}>{article.title}</td>
                    <td className="px-5 py-2.5 whitespace-nowrap text-neutral-500">
                        {article.category?.name || "Uncategorized"}
                    </td>
                    <td className="px-5 py-2.5 whitespace-nowrap text-neutral-500">
                        {article.author?.name || "Unknown"}
                    </td>
                    <td className="px-5 py-2.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 inline-flex text-[11px] font-medium rounded-full border ${article.isPublished ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-neutral-100 text-neutral-600 border-neutral-200"}`}>
                        {article.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 whitespace-nowrap text-right space-x-2">
                      <Link href={`/admin/articles/edit/${article._id}`} className="px-2.5 py-1 text-[12px] font-medium text-neutral-600 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 hover:text-neutral-900 transition-colors shadow-sm inline-flex items-center">
                        <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                      </Link>
                      <button onClick={() => handleDelete(article._id)} className="px-2.5 py-1 text-[12px] font-medium text-rose-600 bg-white border border-rose-200 rounded-md hover:bg-rose-50 hover:text-rose-700 transition-colors shadow-sm inline-flex items-center opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
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
