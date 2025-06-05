import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold"
      >
        Hi, I'm Cody Hanna
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-xl text-gray-300 max-w-xl"
      >
        I build sleek, modern web apps with a strong focus on user experience, functionality, and performance.
      </motion.p>
      <motion.a
        href="#projects"
        className="mt-8 bg-sky-400 text-white px-6 py-3 rounded-full font-medium hover:bg-sky-500 transition"
        whileHover={{ scale: 1.05 }}
      >
        See My Work
      </motion.a>
    </section>
  );
}
