"use client";

import { useState } from "react";

export default function CollaborationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const roleOptions = [
    { id: "screenwriting", label: "Screenwriting" },
    { id: "directing", label: "Directing" },
    { id: "web-dev", label: "Web Development" },
    { id: "music", label: "Music/Scoring" },
    { id: "production", label: "Production Staff" },
    { id: "acting", label: "Acting" },
    { id: "sfx", label: "SFX/Makeup" },
    { id: "editing", label: "Editing/Post-Production" },
  ];

  const handleRoleChange = (roleId: string) => {
    setRoles((prev) =>
      prev.includes(roleId) ? prev.filter((r) => r !== roleId) : [...prev, roleId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || roles.length === 0) {
      alert("Please fill all fields and select at least one role");
      return;
    }

    // Here you would typically send this to an API
    console.log({ name, email, roles });

    setName("");
    setEmail("");
    setRoles([]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="mono text-accent text-xs tracking-widest uppercase mb-1">{"// JOIN THE TEAM"}</p>
        <h2 className="text-2xl font-bold text-text">Collaborate With Us</h2>
        <p className="text-muted text-sm mt-1">We're building a passionate crew to bring Project Miracles to life. All collaborators are credited.</p>
      </div>

      {submitted ? (
        <div className="bg-accent/10 border border-accent/30 rounded-md p-6">
          <p className="text-accent font-semibold text-lg mb-1">✓ Application received</p>
          <p className="text-muted text-sm">Thanks for your interest! We'll be in touch soon about opportunities.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-3">Roles of interest</label>
            <div className="grid grid-cols-2 gap-3">
              {roleOptions.map((role) => (
                <label key={role.id} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${
                  roles.includes(role.id)
                    ? "border-accent bg-accent/10 text-text"
                    : "border-border bg-surface text-muted hover:border-accent/40"
                }`}>
                  <input
                    type="checkbox"
                    checked={roles.includes(role.id)}
                    onChange={() => handleRoleChange(role.id)}
                    className="w-4 h-4 shrink-0"
                  />
                  <span className="text-sm">{role.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-cta hover:bg-cta-hover text-white font-semibold text-base shadow-lg shadow-red-900/20 transition-colors"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}
