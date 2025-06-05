export default function Contact() {
    return (
      <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <section id="contact" className="py-20 px-6 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="text-gray-300 text-lg mb-6">
          Want to collaborate or just say hi? Drop me a message!
        </p>
        <a
          href="mailto:codyhanna8@gmail.com"
          className="block bg-sky-400 text-white px-6 py-3 rounded-full font-medium hover:bg-sky-500 transition w-full sm:w-auto mx-auto mb-4"
        >
          Email Me
        </a>
        <div className="flex justify-center gap-6 mt-4 text-gray-300 text-lg">
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
  