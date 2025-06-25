import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser"; // Make sure you install this

export default function Contact() {
  const formRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9ns3t0r",
        "template_mqmevlv",
        formRef.current,
        "8C-IOu8MXiOS-BmU2"    // replace with your EmailJS public key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          alert("Something went wrong. Try again.");
        }
      );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <section id="contact" className="max-w-xl mx-auto text-center space-y-6 fade-in">
        <h2 className="text-3xl font-bold">Get In Touch</h2>
        <p className="text-gray-300 text-lg">
          Want to collaborate, work together, or just say hi? I’d love to hear from you.
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
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="tel"
            name="user_phone"
            placeholder="Your Phone"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            required
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium py-3 px-6 rounded transition"
          >
            Send Message
          </button>
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
