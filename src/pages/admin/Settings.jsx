// src/pages/admin/Settings.jsx
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "",
    supportEmail: "",
    defaultTimeline: "",
    allowNewClients: true,
  });

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, "settings", "global");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setSettings(snapshot.data());
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "global"), settings);
      setStatus("✅ Settings saved.");
    } catch (err) {
      setStatus("❌ Failed to save settings.");
    }
    setSaving(false);
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">⚙️ Admin Settings</h1>

      <div className="bg-gray-900 p-4 rounded-lg space-y-4 shadow">
        <div>
          <label className="block font-medium mb-1">Company Name</label>
          <input
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Support Email</label>
          <input
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Default Timeline for Projects</label>
          <input
            name="defaultTimeline"
            value={settings.defaultTimeline}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="allowNewClients"
            checked={settings.allowNewClients}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Allow new client registrations</label>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded font-semibold"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

        {status && <p className="text-sm mt-2">{status}</p>}
      </div>
    </div>
  );
};

export default Settings;
