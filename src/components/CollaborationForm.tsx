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
    <div className="border border-terminal-green p-8 max-w-2xl">
      <h2 className="text-2xl mb-6 terminal-text">{`COLLABORATE WITH US`}</h2>

      {submitted ? (
        <div className="border border-terminal-green p-4 bg-terminal">
          <p className="text-terminal-green">{`✓ APPLICATION RECEIVED`}</p>
          <p className="text-terminal-dark-green mt-2">
            {`Thank you for your interest! We will contact you soon about opportunities.`}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-terminal-dark-green mb-2">
              {`> NAME:`}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-terminal-dark-green mb-2">
              {`> EMAIL:`}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-terminal-dark-green mb-4">
              {`> SELECT ROLES OF INTEREST:`}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roleOptions.map((role) => (
                <label key={role.id} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.includes(role.id)}
                    onChange={() => handleRoleChange(role.id)}
                    className="mr-2 w-4 h-4"
                  />
                  <span className="text-terminal-green">{role.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-terminal-dark-green bg-opacity-10 border border-terminal-dark-green p-4 text-sm">
            <p>{`[All collaborators will be credited. We are building a passionate team to bring Project Miracles to life.]`}</p>
          </div>

          <button type="submit" className="w-full py-3 text-lg font-bold">
            {`SUBMIT APPLICATION`}
          </button>
        </form>
      )}
    </div>
  );
}
