const fedexQuoteScript = {
  title: "FedEx Shipping Rate Tool",
  description:
    "An internal automation tool — started as a Python script, later wrapped in a web interface — that processes bulk FedEx shipping rate lookups using company-specific discount rates. Reduced a 3-week manual task to 40 minutes.",
  tech: ["React", "Python", "Vercel"],
  github: null,
  live: null,
  images: [],
  problem:
    "An intern was manually updating over 1,800 rows of shipping rate data in a spreadsheet — a process projected to take roughly 3 weeks of tedious, error-prone lookup work.",
  solution:
    "Built a script (later converted to a web interface) that takes an address column as input, selects the applicable FedEx rate categories, and returns the company's discounted rates for every row automatically.",
  features: [
    "Bulk address input — processes entire spreadsheet columns at once",
    "Selectable rate types applied per row or across the full batch",
    "Company-specific discounted FedEx rate integration",
    "Web interface wrapper around the original Python script",
    "Output formatted for direct spreadsheet use",
  ],
  impact:
    "Reduced a 3-week manual task to 40 minutes. The intern could focus on higher-value work while the tool handled all rate lookups accurately and consistently.",
};

export default fedexQuoteScript;
