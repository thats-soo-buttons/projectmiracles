"use client";

import { useState, useEffect } from "react";

interface Post {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const NOTE_COLORS = [
  "bg-yellow-950/60 border-yellow-700/30",
  "bg-blue-950/60 border-blue-700/30",
  "bg-purple-950/60 border-purple-700/30",
  "bg-rose-950/60 border-rose-700/30",
  "bg-emerald-950/60 border-emerald-700/30",
];

export default function BulletinBoard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("bulletin");
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      name: name.trim().slice(0, 40),
      message: message.trim().slice(0, 200),
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    const updated = [post, ...posts].slice(0, 50);
    setPosts(updated);
    localStorage.setItem("bulletin", JSON.stringify(updated));
    setName("");
    setMessage("");
  };

  return (
    <div className="space-y-5">
      {/* Post form */}
      <form
        onSubmit={handlePost}
        className="bg-surface-2 border border-border rounded-md p-4 space-y-3"
      >
        <p className="text-sm font-medium text-text">Pin a note</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={40}
            className="sm:w-36 shrink-0"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message for the team..."
            maxLength={200}
            className="flex-1"
          />
          <button
            type="submit"
            className="shrink-0 px-4 py-2 bg-accent/20 border border-accent/40 text-accent text-sm rounded-md hover:bg-accent/30 transition-colors"
          >
            📌 Pin
          </button>
        </div>
        <p className="text-xs text-muted">
          Notes are stored locally in your browser. Keep it kind.
        </p>
      </form>

      {/* Notes grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12 text-muted text-sm border border-dashed border-border rounded-md">
          No notes yet — be the first to pin one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`border rounded-md p-4 text-sm ${NOTE_COLORS[i % NOTE_COLORS.length]}`}
            >
              <p className="font-semibold text-text mb-1">{post.name}</p>
              <p className="text-muted leading-relaxed break-words">{post.message}</p>
              <p className="mono text-xs text-muted/50 mt-3">{post.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
