const warehouseApp = {
  title: "Warehouse Inventory Management System",
  description:
    "A custom inventory tool for logging, tracking, and visualizing warehouse shelf and floor data. Designed to provide fast data entry and real-time occupancy insights.",
  tech: ["React", "Firebase (Firestore)", "XLSX", "Vercel"],
  github: "https://github.com/CodyHanna04/virtual-warehouse",
  live: "https://warehouse-input.vercel.app/",
  images: ["warehouse1.png", "warehouse2.png", "warehouse3.png"],
  problem:
    "Manual tracking of shelf-level warehouse inventory was slow, inconsistent, and prone to human error. Occupancy and clearance data were difficult to access or filter.",
  solution:
    "This web app digitizes the process, letting users log rack/row/shelf data, mark sides A & B as occupied/unoccupied, and store metadata like item IDs, clearance levels, and shipment details. It also exports to Excel.",
  features: [
    "Structured row/column/floor/shelf input with real-time Firestore sync",
    "Occupancy tracking for each side of every shelf",
    "Metadata logging (item ID, org, shipment)",
    "Filtering shelves by clearance + occupancy",
    "Excel export for reporting or backup",
    "Visual warehouse layout display"
  ],
  impact:
    "Eliminated spreadsheet dependency and improved visibility into shelf usage. Significantly reduced time spent on audit prep and shipment coordination.",
};

export default warehouseApp;
