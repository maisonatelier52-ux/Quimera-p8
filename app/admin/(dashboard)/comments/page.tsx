"use client";

import { useState, useEffect } from "react";
import { Check, X, Trash2, Clock, CheckCircle } from "lucide-react";

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'approved'

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/comments", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/admin/comments/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/admin/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredComments = comments.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Comments</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === "all" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          All Comments
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${filter === "pending" ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <Clock size={14} /> Pending
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${filter === "approved" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <CheckCircle size={14} /> Approved
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
            <tr>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Article Slug</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading comments...</td>
              </tr>
            ) : filteredComments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No comments found.</td>
              </tr>
            ) : (
              filteredComments.map((comment) => (
                <tr key={comment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 align-top">
                    <p className="font-semibold text-gray-900">{comment.name}</p>
                    <p className="text-xs text-gray-500">{comment.email}</p>
                  </td>
                  <td className="px-4 py-3 align-top max-w-md">
                    <p className="text-gray-700 line-clamp-3">{comment.content}</p>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{comment.articleSlug}</span>
                  </td>
                  <td className="px-4 py-3 align-top text-gray-500 text-xs">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {comment.status === "pending" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Approved
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <div className="flex items-center justify-end gap-2">
                      {comment.status === "pending" && (
                        <button
                          onClick={() => updateStatus(comment._id, "approved")}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {comment.status === "approved" && (
                        <button
                          onClick={() => updateStatus(comment._id, "pending")}
                          className="p-1.5 text-orange-600 hover:bg-orange-50 rounded"
                          title="Set Pending"
                        >
                          <X size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteComment(comment._id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
