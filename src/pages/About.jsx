const skills = {
  Frontend: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML / CSS"],
  "Backend & Services": ["Firebase", "Firestore", "Firebase Auth", "Stripe", "EmailJS"],
  "Tools & Platforms": ["Vite", "Vercel", "Git", "GitHub", "XLSX"],
};

export default function About() {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-14">

        {/* Bio */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a developer based in Maryland, currently studying at Stevenson University.
            I love building projects that help others — whether it's websites for small businesses,
            apps for students, or automation tools to save time. I'm passionate about clean code,
            modern UI, and creating things that make life a little easier.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Skills & Technologies</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <h4 className="text-sky-400 font-medium mb-4 text-xs uppercase tracking-widest">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {items.map((skill) => (
                    <li key={skill} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
