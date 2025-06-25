import React, { useEffect } from "react";
import project from "../projects/internshipHub";

export default function Project1() {
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

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold fade-in">{project.title}</h1>
        <p className="text-lg text-gray-300 fade-in">{project.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in">
          {project.images.map((img, index) => (
            <img
              key={index}
              src={`/images/${img}`}
              alt={`${project.title} screenshot ${index + 1}`}
              className="project-image shadow-md"
            />
          ))}
        </div>

        <div className="section-divider fade-in" />

        <div className="fade-in">
          <h2 className="text-2xl font-semibold">The Problem</h2>
          <p className="text-gray-300">{project.problem}</p>
        </div>

        <div className="fade-in">
          <h2 className="text-2xl font-semibold mt-4">The Solution</h2>
          <p className="text-gray-300">{project.solution}</p>
        </div>

        <div className="fade-in">
          <h2 className="text-2xl font-semibold mt-6">Key Features</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="fade-in">
          <h2 className="text-2xl font-semibold mt-6">Technologies Used</h2>
          <p className="text-gray-400">{project.tech.join(", ")}</p>
        </div>

        <div className="fade-in">
          <h2 className="text-2xl font-semibold mt-6">Impact</h2>
          <p className="text-gray-300">{project.impact}</p>
        </div>

        <div className="project-links fade-in mt-6">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub →
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              Live Site →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
