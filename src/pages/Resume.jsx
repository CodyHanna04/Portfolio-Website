import resume from "../data/resume";

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-sky-400 text-sm uppercase tracking-widest font-semibold border-b border-gray-700 pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Resume() {
  const c = resume.contact;

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">{resume.name}</h1>
            <p className="text-sky-400 mt-1">{resume.title}</p>
            <p className="text-gray-500 text-sm mt-2">
              {c.location} · <a href={`mailto:${c.email}`} className="hover:text-sky-400">{c.email}</a> ·{" "}
              <a href={`https://${c.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">{c.github}</a>
            </p>
          </div>
          <a
            href="/resume.pdf"
            download="CodyHanna_Resume.pdf"
            className="flex-shrink-0 bg-sky-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-500 transition text-center"
          >
            Download PDF ↓
          </a>
        </div>

        <Section title="Summary">
          <p className="text-gray-300 text-sm leading-relaxed">{resume.summary}</p>
        </Section>

        <Section title="Experience">
          <div className="space-y-6">
            {resume.experience.map((job) => (
              <div key={job.company}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-semibold">{job.company}</h3>
                  <p className="text-gray-500 text-xs font-mono flex-shrink-0">{job.period}</p>
                </div>
                <p className="text-gray-400 text-sm italic mb-2">{job.role}</p>
                <ul className="space-y-1.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="text-gray-300 text-sm leading-relaxed flex gap-2">
                      <span className="text-sky-400 flex-shrink-0">›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-5">
            {resume.projects.map((project) => (
              <div key={project.name}>
                <h3 className="font-semibold text-sm mb-1.5">{project.name}</h3>
                <ul className="space-y-1.5">
                  {project.bullets.map((b) => (
                    <li key={b} className="text-gray-300 text-sm leading-relaxed flex gap-2">
                      <span className="text-sky-400 flex-shrink-0">›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Technical Skills">
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.split(", ").map((skill) => (
              <span
                key={skill}
                className="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full border border-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Education & Certifications">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 className="font-semibold">{resume.education.school}</h3>
            <p className="text-gray-500 text-xs font-mono">{resume.education.period}</p>
          </div>
          <p className="text-gray-300 text-sm">{resume.education.degree}</p>
          <ul className="mt-3 space-y-1.5">
            {resume.certifications.map((cert) => (
              <li key={cert} className="text-gray-300 text-sm flex gap-2">
                <span className="text-sky-400 flex-shrink-0">✓</span>
                {cert}
              </li>
            ))}
          </ul>
        </Section>

      </div>
    </div>
  );
}
