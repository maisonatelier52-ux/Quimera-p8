"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ThumbsUp, Reply, Send, ChevronDown, X } from "lucide-react";
import { useSubscriber } from "../SubscriberContext";

interface Comment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
  likes: number;
  avatar?: string;
  replies?: Comment[];
}

interface Subscriber {
  name: string;
  email: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-blue-600", "bg-red-600", "bg-green-600", "bg-purple-600",
    "bg-orange-500", "bg-teal-600", "bg-pink-600", "bg-indigo-600"
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const intervals: [number, string][] = [
    [31536000, "year"], [2592000, "month"], [86400, "day"],
    [3600, "hour"], [60, "minute"]
  ];
  for (const [sec, label] of intervals) {
    const count = Math.floor(seconds / sec);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

function SingleComment({
  comment,
  articleSlug,
  isReply = false,
  subscriber,
  onRequestSubscribe,
}: {
  comment: Comment;
  articleSlug: string;
  isReply?: boolean;
  subscriber: Subscriber | null;
  onRequestSubscribe: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    if (!subscriber) {
      onRequestSubscribe();
      return;
    }

    setSubmittingReply(true);
    try {
      await fetch(`http://localhost:5000/api/public/articles/${articleSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subscriber.name,
          email: subscriber.email,
          content: replyContent,
          parentId: comment._id,
        }),
      });
      setReplyContent("");
      setShowReplyBox(false);
    } catch {
      // silent
    } finally {
      setSubmittingReply(false);
    }
  };

  return (
    <div className={`flex gap-3 ${isReply ? "ml-10 mt-3" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white text-[13px] font-bold ${getAvatarColor(comment.name)}`}
      >
        {comment.avatar ? (
          <img src={comment.avatar} alt={comment.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          getInitials(comment.name)
        )}
      </div>

      {/* Comment body */}
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] font-bold text-gray-900">{comment.name}</span>
            <span className="text-[11px] text-gray-400">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="text-[14px] text-gray-700 leading-relaxed">{comment.content}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-2 pl-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-[12px] font-medium transition-colors ${
              liked ? "text-[#09365E]" : "text-gray-400 hover:text-[#09365E]"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            {likeCount > 0 && <span>{likeCount}</span>}
            <span>Like</span>
          </button>
          {!isReply && (
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 hover:text-[#09365E] transition-colors"
            >
              <Reply className="w-3.5 h-3.5" />
              Reply
            </button>
          )}
        </div>

        {/* Reply box */}
        {showReplyBox && (
          <form onSubmit={handleReplySubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder={`Replying to ${comment.name}…`}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#09365E] bg-white placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={submittingReply}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#09365E] text-white text-[12px] font-semibold rounded-lg hover:bg-black transition-colors disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <SingleComment 
                key={reply._id} 
                comment={reply} 
                articleSlug={articleSlug} 
                isReply 
                subscriber={subscriber}
                onRequestSubscribe={onRequestSubscribe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const { subscriber, setSubscriber } = useSubscriber();
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subName, setSubName] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subError, setSubError] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/public/articles/${articleSlug}/comments`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleSlug]);

  const postComment = async (sub: Subscriber) => {
    setSubmitting(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/public/articles/${articleSlug}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: sub.name, email: sub.email, content }),
        }
      );
      if (res.ok) {
        setSubmitted(true);
        setContent("");
        await fetchComments();
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to post comment.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Please write a comment first.");
      return;
    }
    setError("");

    if (!subscriber) {
      setShowSubscribeModal(true);
      return;
    }

    await postComment(subscriber);
  };

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim() || !subEmail.trim()) {
      setSubError("Name and Email are required.");
      return;
    }
    setSubError("");
    setSubscribing(true);

    try {
      const res = await fetch("http://localhost:5000/api/public/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: subName, email: subEmail }),
      });
      if (res.ok) {
        const data = await res.json();
        const newSub = { name: data.name, email: data.email };
        setSubscriber(newSub);
        localStorage.setItem("foxiz_subscriber", JSON.stringify(newSub));
        setShowSubscribeModal(false);
        
        // Auto-post the comment if there is one
        if (content.trim()) {
          await postComment(newSub);
        }
      } else {
        setSubError("Subscription failed. Please try again.");
      }
    } catch {
      setSubError("An error occurred.");
    } finally {
      setSubscribing(false);
    }
  };

  const visibleComments = comments.slice(0, visibleCount);

  return (
    <section className="max-w-[1330px] mx-auto px-4 py-10 w-full border-t border-gray-100">
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
          <MessageCircle className="w-5 h-5 text-[#09365E]" />
          <h2 className="text-[18px] font-black text-[#09365E] tracking-tight">
            Comments
          </h2>
          {comments.length > 0 && (
            <span className="text-[12px] font-semibold text-white bg-red-600 px-2 py-0.5 rounded-full">
              {comments.length}
            </span>
          )}
        </div>

        {/* Comment Form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[14px] font-bold text-gray-900">Leave a Comment</h3>
            {subscriber && (
              <span className="text-[12px] text-gray-500 font-medium">Posting as {subscriber.name}</span>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <textarea
                placeholder="Share your thoughts on this article…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#09365E]/20 focus:border-[#09365E] bg-gray-50 placeholder:text-gray-400 transition-all resize-none"
              />
            </div>

            {error && (
              <p className="text-[12px] text-red-500 font-medium">{error}</p>
            )}

            {submitted && (
              <p className="text-[12px] text-green-600 font-medium">
                ✓ Your comment has been posted successfully!
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#09365E] text-white text-[13px] font-bold rounded-xl hover:bg-black transition-colors disabled:opacity-60 shadow-sm"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Posting…" : "Post Comment"}
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-16 bg-gray-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl">
            <MessageCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-[14px] text-gray-400 font-medium">No comments yet.</p>
            <p className="text-[12px] text-gray-300">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-5">
            {visibleComments.map((comment) => (
              <SingleComment 
                key={comment._id} 
                comment={comment} 
                articleSlug={articleSlug}
                subscriber={subscriber}
                onRequestSubscribe={() => setShowSubscribeModal(true)}
              />
            ))}

            {comments.length > visibleCount && (
              <button
                onClick={() => setVisibleCount((c) => c + 5)}
                className="flex items-center gap-2 mx-auto px-6 py-2.5 text-[13px] font-semibold text-[#09365E] border border-[#09365E]/20 rounded-xl hover:bg-[#09365E]/5 transition-colors mt-4"
              >
                <ChevronDown className="w-4 h-4" />
                Load more comments
              </button>
            )}
          </div>
        )}
      </div>

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSubscribeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-[20px] font-black text-[#09365E] mb-2">Subscribe to Post</h3>
            <p className="text-[13px] text-gray-600 mb-6">
              You must be a subscriber to interact with our community. It's completely free!
            </p>
            <form onSubmit={handleSubscribeSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#09365E]/20 focus:border-[#09365E] bg-gray-50 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#09365E]/20 focus:border-[#09365E] bg-gray-50 placeholder:text-gray-400"
                />
              </div>

              {subError && <p className="text-[12px] text-red-500 font-medium">{subError}</p>}

              <button
                type="submit"
                disabled={subscribing}
                className="mt-2 w-full py-3 bg-[#09365E] text-white text-[14px] font-bold rounded-xl hover:bg-black transition-colors disabled:opacity-60"
              >
                {subscribing ? "Subscribing…" : "Subscribe & Post Comment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
