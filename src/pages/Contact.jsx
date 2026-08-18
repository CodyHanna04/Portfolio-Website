import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const contactReasons = [
  { value: "general", label: "General Inquiry" },
  { value: "project", label: "Project" },
  { value: "tech-help", label: "Tech Help / IT Consulting" },
  { value: "homelab", label: "Homelab" },
];

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [searchParams] = useSearchParams();
  const requestedReason = searchParams.get("reason");
  const [reason, setReason] = useState(
    contactReasons.some((r) => r.value === requestedReason) ? requestedReason : "general"
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(formRef.current);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("user_name"),
          email: formData.get("user_email"),
          phone: formData.get("user_phone"),
          reason,
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      formRef.current.reset();
      setReason("general");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <section id="contact" className="max-w-xl mx-auto text-center space-y-6 fade-in">
        <h2 className="text-3xl font-bold">Get In Touch</h2>
        <p className="text-gray-300 text-lg">
          Want to collaborate, work together, or just say hi? I'd love to hear from you.
        </p>

        <div className="text-gray-300 space-y-1">
          <p><strong>Email:</strong> <a href="mailto:codyhanna8@gmail.com" className="text-sky-400 hover:underline">codyhanna8@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:4104909074" className="text-sky-400 hover:underline">(410) 490-9074</a></p>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="bg-gray-800 p-6 rounded-lg space-y-4 text-left"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="tel"
            name="user_phone"
            placeholder="Your Phone (optional)"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {/* Honeypot: hidden from real visitors, bots that autofill every field trip it */}
          <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <fieldset>
            <legend className="text-sm text-gray-300 mb-2">Reason for Contact</legend>
            <div className="grid grid-cols-2 gap-2">
              {contactReasons.map((r) => (
                <label
                  key={r.value}
                  className={`flex items-center gap-2 text-sm rounded px-3 py-2 border cursor-pointer transition ${
                    reason === r.value
                      ? "border-sky-400 bg-sky-400/10 text-white"
                      : "border-gray-600 text-gray-400 hover:border-sky-400/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r.value}
                    checked={reason === r.value}
                    onChange={() => setReason(r.value)}
                    className="accent-sky-400"
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </fieldset>

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            required
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          ></textarea>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-sky-400 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded transition"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-sm text-center" role="status">
              Message sent. I'll get back to you soon!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center" role="alert">
              Something went wrong. Please try again, or email me directly.
            </p>
          )}
        </form>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-lg mt-4 text-gray-300">
          <a
            href="https://github.com/CodyHanna04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cody-hanna04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
