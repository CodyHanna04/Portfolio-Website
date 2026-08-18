import internshipHub from "./internshipHub.js";
import pancakeNight from "./pancakeNight.js";
import hannaProperties from "./hannaProperties.js";
import warehouseApp from "./warehouseApp.js";
import shipmentTracker from "./shipmentTracker.js";
import christmasListCreator from "./christmasListCreator.js";
import seniorBenefitsMD from "./seniorBenefitsMD.js";
import fedexQuoteScript from "./fedexQuoteScript.js";
import baylineVisuals from "./baylineVisuals.js";
import brainBee from "./brainBee.js";
import homelab from "./homelab.js";
import cyberCoreTech from "./cyberCoreTech.js";

const projects = [
  { ...hannaProperties, slug: "hanna-properties", featured: true, tagline: "Full-stack rental management platform" },
  { ...homelab, slug: "homelab", featured: true, tagline: "Enterprise-style Proxmox infrastructure" },
  { ...shipmentTracker, slug: "shipment-tracker", featured: true, tagline: "AI-powered logistics dashboard" },
  { ...cyberCoreTech, slug: "cybercore-tech" },
  { ...pancakeNight, slug: "pancake-night" },
  { ...internshipHub, slug: "internship-hub" },
  { ...christmasListCreator, slug: "christmas-list-creator", tagline: "Collaborative gift wishlist app" },
  { ...warehouseApp, slug: "warehouse-app" },
  { ...seniorBenefitsMD, slug: "senior-benefits-md" },
  { ...baylineVisuals, slug: "bayline-visuals" },
  { ...fedexQuoteScript, slug: "fedex-quote-script" },
  { ...brainBee, slug: "brain-bee" },
];

export const featuredProjects = projects.filter((p) => p.featured);

export default projects;
