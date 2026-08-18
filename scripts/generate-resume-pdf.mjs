// Generates public/resume.pdf from src/data/resume.js.
// Run with: npm run resume:pdf
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import resume from "../src/data/resume.js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outPath = path.join(root, "public", "resume.pdf");

const SKY = "#0284c7";
const DARK = "#111827";
const GRAY = "#4b5563";

const doc = new PDFDocument({ size: "LETTER", margins: { top: 46, bottom: 40, left: 54, right: 54 } });
doc.pipe(fs.createWriteStream(outPath));

const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;

// Header
doc.font("Helvetica-Bold").fontSize(24).fillColor(DARK).text(resume.name);
doc.moveDown(0.1);
doc.font("Helvetica").fontSize(11).fillColor(SKY).text(resume.title);
doc.moveDown(0.3);
const c = resume.contact;
doc.fontSize(8.5).fillColor(GRAY).text(
  `${c.location}  ·  ${c.phone}  ·  ${c.email}  ·  ${c.website}  ·  ${c.github}  ·  ${c.linkedin}`
);

function sectionHeading(label) {
  doc.moveDown(0.9);
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(SKY).text(label.toUpperCase(), { characterSpacing: 1 });
  doc.moveDown(0.15);
  doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.margins.left + width, doc.y)
    .lineWidth(0.7).strokeColor("#d1d5db").stroke();
  doc.moveDown(0.35);
}

function bullets(items) {
  for (const b of items) {
    doc.font("Helvetica").fontSize(9).fillColor(DARK)
      .text(`•  ${b}`, { indent: 8, lineGap: 1.5 });
  }
}

// Summary
sectionHeading("Summary");
doc.font("Helvetica").fontSize(9).fillColor(DARK).text(resume.summary, { lineGap: 1.5 });

// Experience
sectionHeading("Experience");
resume.experience.forEach((job, i) => {
  if (i > 0) doc.moveDown(0.5);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10).fillColor(DARK).text(job.company, { continued: false });
  doc.font("Helvetica").fontSize(8.5).fillColor(GRAY)
    .text(job.period, doc.page.margins.left, y, { width, align: "right" });
  doc.font("Helvetica-Oblique").fontSize(9).fillColor(GRAY).text(job.role);
  doc.moveDown(0.15);
  bullets(job.bullets);
});

// Projects
sectionHeading("Projects");
resume.projects.forEach((project, i) => {
  if (i > 0) doc.moveDown(0.4);
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(DARK).text(project.name);
  doc.moveDown(0.1);
  bullets(project.bullets);
});

// Skills
sectionHeading("Technical Skills");
doc.font("Helvetica").fontSize(9).fillColor(DARK).text(resume.skills, { lineGap: 1.5 });

// Education & Certifications
sectionHeading("Education & Certifications");
const ey = doc.y;
doc.font("Helvetica-Bold").fontSize(9.5).fillColor(DARK).text(resume.education.school);
doc.font("Helvetica").fontSize(8.5).fillColor(GRAY)
  .text(resume.education.period, doc.page.margins.left, ey, { width, align: "right" });
doc.font("Helvetica").fontSize(9).fillColor(DARK).text(resume.education.degree);
doc.moveDown(0.3);
bullets(resume.certifications);

doc.end();
console.log(`Wrote ${outPath}`);
