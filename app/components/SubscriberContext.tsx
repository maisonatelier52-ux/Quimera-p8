'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Subscriber {
  name: string;
  email: string;
}

interface SubscriberContextType {
  subscriber: Subscriber | null;
  setSubscriber: (sub: Subscriber | null) => void;
  logout: () => void;
  showSubscribeModal: boolean;
  setShowSubscribeModal: (show: boolean) => void;
}

const SubscriberContext = createContext<SubscriberContextType | undefined>(undefined);

export function SubscriberProvider({ children }: { children: React.ReactNode }) {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  
  const [subName, setSubName] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subError, setSubError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("foxiz_subscriber");
    if (saved) {
      try {
        setSubscriber(JSON.parse(saved));
      } catch (e) {
        // silent
      }
    }
  }, []);

  const logout = () => {
    setSubscriber(null);
    localStorage.removeItem("foxiz_subscriber");
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
      } else {
        setSubError("Subscription failed. Please try again.");
      }
    } catch {
      setSubError("An error occurred.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <SubscriberContext.Provider value={{ subscriber, setSubscriber, logout, showSubscribeModal, setShowSubscribeModal }}>
      {children}
      
      {/* Global Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSubscribeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-[20px] font-black text-[#09365E] mb-2">Subscribe</h3>
            <p className="text-[13px] text-gray-600 mb-6">
              Subscribe to get the latest news and interact with our community!
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#09365E]/20 focus:border-[#09365E] bg-gray-50 placeholder:text-gray-400 text-black"
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#09365E]/20 focus:border-[#09365E] bg-gray-50 placeholder:text-gray-400 text-black"
                />
              </div>

              {subError && <p className="text-[12px] text-red-500 font-medium">{subError}</p>}

              <button
                type="submit"
                disabled={subscribing}
                className="mt-2 w-full py-3 bg-[#09365E] text-white text-[14px] font-bold rounded-xl hover:bg-black transition-colors disabled:opacity-60"
              >
                {subscribing ? "Subscribing…" : "Subscribe Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </SubscriberContext.Provider>
  );
}

export function useSubscriber() {
  const context = useContext(SubscriberContext);
  if (context === undefined) {
    throw new Error('useSubscriber must be used within a SubscriberProvider');
  }
  return context;
}
