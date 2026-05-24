"use client";
import { useState } from "react";
import { addRegionalAdmin } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function AddRegionalAdmin() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [regionName, setRegionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email || !regionName) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await addRegionalAdmin({ email, regionName });
      toast.success("Regional Admin added successfully");
      setGeneratedPassword(res.data.password|| null); // show generated password
    // console.log("API Response:", res.data.password);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setRegionName("");
    setGeneratedPassword(null);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#FF8906] text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-medium transition"
      >
        Add Regional Admin
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg md:max-w-xl lg:max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#FF8906]">
              Add Regional Admin
            </h2>

            {!generatedPassword ? (
              <>
                <div className="mb-5">
                  <label id="email" className="block mb-2 text-gray-700 font-medium" htmlFor="email">Email</label>
                  <input
                   type="email"
              id="email"
              name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-3 bg-grey-300 text-black rounded-lg focus:ring-2 focus:ring-[#FF8906] focus:outline-none transition"
                    placeholder="Enter admin email"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-gray-700 font-medium">Region Name</label>
                  <input
                    type="text"
                    value={regionName}
                    onChange={(e) => setRegionName(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg bg-grey-300 text-black focus:ring-2 focus:ring-[#FF8906] focus:outline-none transition"
                    placeholder="Enter region name"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-[#FF8906] text-white rounded-lg hover:bg-orange-600 font-medium transition"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Admin"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block mb-2 text-gray-700 font-medium">Generated Password</label>
                  <input
                    type="text"
                    value={generatedPassword}
                    readOnly
                    className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 text-gray-900"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Copy this password and share with the admin.
                  </p>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
