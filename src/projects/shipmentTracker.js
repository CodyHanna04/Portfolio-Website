const shipmentTracker = {
  title: "Shipment Tracker",
  description:
    "An enterprise shipment tracking platform built during a summer internship. Lets logistics teams log and monitor packages in real-time, detect anomalies using AI, manage their pipeline from a central dashboard, and export or archive shipment data.",
  tech: ["React", "Firebase", "AI / ML", "Vercel"],
  github: null,
  live: "https://trackyourpackage.vercel.app/",
  images: [
    "shipmenttracker1.png",
    "shipmenttracker2.png",
    "shipmenttracker3.png",
    "shipmenttracker4.png",
    "shipmenttracker5.png",
    "shipmenttracker6.png",
    "shipmenttracker7.png",
    "shipmenttracker8.png",
    "shipmenttracker9.png",
  ],
  problem:
    "A logistics company was manually tracking hundreds of shipments across carriers with no automated way to detect delays, anomalies, or missing packages — a time-consuming and error-prone process.",
  solution:
    "Built a full dashboard where staff log tracking numbers, monitor live delivery status across carriers, and get AI-generated anomaly verdicts on any shipment that looks off — with filtering, exporting, and archiving to keep the workspace clean.",
  features: [
    "Real-time shipment status tracking with live refresh per record",
    "AI-powered anomaly detection with 'Ask AI' verdict per shipment",
    "Anomaly Alerts dashboard: filter and sort by shipped date",
    "Batch shipment upload to log multiple tracking numbers at once",
    "Export all shipments with their tracking data",
    "Bad Records view to detect and purge duplicates or invalid entries",
    "Route Map to visualize a package's physical transit path",
    "Archive Delivered to clear completed shipments from the active queue",
    "Filter current shipments by submitter, status, or date",
    "Multi-user support with per-account filtering",
    "In-progress: client-side portal for view-only access per contract",
  ],
  impact:
    "Gave the logistics team real-time visibility into their entire shipment pipeline and cut manual status-checking significantly. AI verdicts surface problem shipments before they become critical issues.",
};

export default shipmentTracker;
