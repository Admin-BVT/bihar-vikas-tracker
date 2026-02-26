"use client";

import { useState, useEffect, type FormEvent } from "react";
import { CATEGORIES } from "@/lib/categories";

const DISTRICTS = [
  "Araria","Arwal","Aurangabad","Banka","Begusarai",
  "Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran",
  "Gaya","Gopalganj","Jamui","Jehanabad","Kaimur",
  "Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura",
  "Madhubani","Munger","Muzaffarpur","Nalanda","Nawada",
  "Patna","Purnia","Rohtas","Saharsa","Samastipur",
  "Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan",
  "Supaul","Vaishali","West Champaran"
];

export default function AdminPage() {

  /* ---------- AUTH ---------- */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
        setCheckingAuth(false);
      });
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    window.location.reload();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  /* ---------- PROJECT ---------- */
  const [projectName, setProjectName] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Ongoing");

  const [budget, setBudget] = useState("");
  const [progress, setProgress] = useState("");

  const [startDate, setStartDate] = useState("");
  const [expectedEndDate, setExpectedEndDate] = useState("");
  const [actualCompletionDate, setActualCompletionDate] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [implementingAgency, setImplementingAgency] = useState("");
  const [notes, setNotes] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const payload = {
      name: projectName,
      district,
      category,
      status,
      budget: budget ? Number(budget) : null,
      progress: progress ? Number(progress) : null,
      start_date: startDate || null,
      expected_end_date: expectedEndDate || null,
      actual_completion_date: actualCompletionDate || null,
      beneficiaries: beneficiaries ? Number(beneficiaries) : null,
      implementing_agency: implementingAgency || null,
      notes: notes || null,
      image_url: imageUrl || null,
      video_url: videoUrl || null,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("SERVER ERROR:", text);
        throw new Error("Save failed");
      }

      setSuccess("Project saved successfully ✅");
      setError("");
      setTimeout(() => setSuccess(""), 3000);

      setProjectName("");
      setDistrict("");
      setCategory("");
      setStatus("Ongoing");
      setBudget("");
      setProgress("");
      setStartDate("");
      setExpectedEndDate("");
      setActualCompletionDate("");
      setBeneficiaries("");
      setImplementingAgency("");
      setNotes("");
      setImageUrl("");
      setVideoUrl("");

    } catch (err) {
      console.error(err);
      alert("Failed to save project ❌");
    }

    setLoading(false);
  }

  /* ---------- LOADING CHECK ---------- */
  if (checkingAuth) {
    return null;
  }

  /* ---------- LOGIN UI ---------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="bg-[#1B263B] p-6 rounded-2xl w-full max-w-sm">
          <h2 className="text-white text-xl font-bold mb-4">Admin Access</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-[#415A77] text-white mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pr-20 rounded-xl bg-[#415A77] text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ---------- ADMIN FORM ---------- */
  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="max-w-4xl mx-auto bg-[#1B263B] rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl font-bold">Add New Project</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400"
          >
            Logout
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">

          <input
            type="text"
            className="w-full p-3 rounded-xl bg-[#415A77] text-white"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <select
            className="w-full p-3 rounded-xl bg-[#415A77] text-white"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            className="w-full p-3 rounded-xl bg-[#415A77] text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Remaining form stays unchanged */}

          {success && (
            <p className="text-green-400 text-sm text-center">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Project"}
          </button>

        </form>
      </div>
    </div>
  );
}