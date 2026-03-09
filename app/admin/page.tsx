
"use client";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { CATEGORIES } from "@/lib/categories";
import { useRouter } from "next/navigation";



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
const router = useRouter();

const [aiInput, setAiInput] = useState("");

const aiInputRef = useRef<HTMLTextAreaElement>(null);
const categoryRef = useRef<HTMLSelectElement>(null);

function extract(label: string, text: string) {
  const regex = new RegExp(label + "\\s*\\n\\s*(.+)");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}
function normalizeDate(d: string) {
  const parts = d.split(/[\/\-]/);

  if (parts.length !== 3) return "";

  // Detect YYYY-MM-DD
  if (parts[0].length === 4) {
    return `${parts[0]}-${parts[1].padStart(2,"0")}-${parts[2].padStart(2,"0")}`;
  }

  // Detect DD-MM-YYYY
  if (parts[2].length === 4) {
    return `${parts[2]}-${parts[1].padStart(2,"0")}-${parts[0].padStart(2,"0")}`;
  }

  return "";
}

function extractDateRange(text: string) {
  const match = text.match(
    /(\d{2,4}[\/\-]\d{1,2}[\/\-]\d{1,4})\s*-\s*(\d{2,4}[\/\-]\d{1,2}[\/\-]\d{1,4})/
  );

  if (!match) return { start: "", end: "" };

  return {
    start: normalizeDate(match[1]),
    end: normalizeDate(match[2]),
  };
}
function handleAutoFill() {

  const name = extract("Project Name", aiInput);
  const districtValue = extract("District", aiInput);
  const statusValue = extract("Status", aiInput);
  const budgetValue = extract("Budget", aiInput);
  const progressValue = extract("Progress", aiInput);
  const startDateValue = extract("Start Date", aiInput);
  const actualCompletionValue = extract("Actual Completion Date", aiInput);
  const notesValue = extract("Notes", aiInput);
/* ---------- PROJECT ---------- */


  setProjectName(name);
  setDistrict(districtValue);
  setStatus(statusValue);

  const cleanBudget = budgetValue.replace(/[₹,]/g, "");
  setBudget(cleanBudget);
if (statusValue === "Completed") {
  setProgress("100");
} else {
  setProgress(progressValue);
}
 const { start, end } = extractDateRange(aiInput);

if (statusValue === "Completed" && start && end) {
  setStartDate(start);
  setActualCompletionDate(end);
} else {
  if (startDateValue) {
    setStartDate(normalizeDate(startDateValue));
  }

  if (actualCompletionValue && statusValue === "Completed") {
    setActualCompletionDate(normalizeDate(actualCompletionValue));
  }
}
  setNotes(notesValue);
}
categoryRef.current?.focus();
  /* ---------- AUTH ---------- */
const [session, setSession] = useState<any>(null);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
  async function checkAuth() {
    const res = await fetch("/api/admin/check");
    const data = await res.json();

    if (data.authenticated) {
      setSession(true);
    } else {
      setSession(null);
    }
  }

  checkAuth();
}, []);



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

  /* ---------- SUBMIT ---------- */
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
  credentials: "include",
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

    
// Reset form fields
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
setAiInput("");
aiInputRef.current?.focus();
setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to save project ❌");
    }
  }
async function handleLogout() {
  await fetch("/api/admin/logout", { method: "POST" });
  setSession(null);
}
async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

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

  setSession(true);
}

  /* ---------- LOGIN UI ---------- */
  if (!session) {
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
<form
  className="space-y-4"
  onSubmit={handleSubmit}
  autoComplete="off"
>

<div className="mb-6">
  <label className="block font-medium mb-2">
    Paste AI Project Output
  </label>

 <textarea
  ref={aiInputRef}
  value={aiInput}
  onChange={(e) => setAiInput(e.target.value)}
  placeholder="Paste project block generated by AI"
  className="w-full border rounded p-3"
  rows={6}
/>

  <button
    type="button"
    onClick={handleAutoFill}
    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
  >
    Auto Fill Form
  </button>
</div>

<input
  type="text"
  name="new-project-name"
  autoComplete="new-password"
  spellCheck={false}
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
  ref={categoryRef}
  className="w-full p-3 rounded-xl bg-[#415A77] text-white"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
    <option value="">Select Category</option>
    {CATEGORIES.map((c) => (
      <option key={c}>{c}</option>
    ))}
  </select>

  <div>
    <label className="block text-sm text-slate-300 mb-1">
      Status
    </label>
    <select
      className="w-full p-3 rounded-xl bg-[#415A77] text-white"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">Select Status</option>
      <option value="Ongoing">Ongoing</option>
      <option value="Completed">Completed</option>
      <option value="Delayed">Delayed</option>
    </select>
  </div>

  <input
    type="number"
    placeholder="Budget (₹)"
    className="w-full p-3 rounded-xl bg-[#415A77] text-white"
    value={budget}
    onChange={(e) => setBudget(e.target.value)}
  />

  <input
    type="number"
    placeholder="Progress (%)"
    className="w-full p-3 rounded-xl bg-[#415A77] text-white"
    value={progress}
    onChange={(e) => setProgress(e.target.value)}
  />

  <div className="grid md:grid-cols-3 gap-4 items-start">

    <div>
      <label className="block text-sm text-slate-300 mb-1">
        Start Date
      </label>
      <input
        type="date"
        className="w-full h-[52px] p-3 rounded-xl bg-[#415A77] text-white"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm text-slate-300 mb-1">
        Expected End Date
      </label>
      <input
        type="date"
        className="w-full h-[52px] p-3 rounded-xl bg-[#415A77] text-white"
        value={expectedEndDate}
        onChange={(e) => setExpectedEndDate(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm text-slate-300 mb-1">
        Actual Completion Date
      </label>
      <input
        type="date"
        className="w-full h-[52px] p-3 rounded-xl bg-[#415A77] text-white"
        value={actualCompletionDate}
        onChange={(e) => setActualCompletionDate(e.target.value)}
      />
    </div>

  </div>

  <input
    type="number"
    placeholder="Beneficiaries"
    className="w-full p-3 rounded-xl bg-[#415A77] text-white"
    value={beneficiaries}
    onChange={(e) => setBeneficiaries(e.target.value)}
  />

  <input
    placeholder="Implementing Agency"
    className="w-full p-3 rounded-xl bg-[#415A77] text-white"
    value={implementingAgency}
    onChange={(e) => setImplementingAgency(e.target.value)}
  />

  <textarea
    placeholder="Notes"
    className="w-full p-3 rounded-xl bg-[#415A77] text-white"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />

  <input
    type="url"
    placeholder="Image URL (optional)"
    className="w-full p-3 rounded-xl bg-[#415A77] text-white"
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
  />

  <input
    type="url"
    placeholder="YouTube URL (optional)"
    className="w-full p-3 rounded-xl bg-[#415A77] text-white"
    value={videoUrl}
    onChange={(e) => setVideoUrl(e.target.value)}
  />
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
