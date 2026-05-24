const pancakeNight = {
  title: "Pancake Night - Kitchen Display System",
  description:
    "A real-time kitchen display system built for my fraternity's weekly Pancake Night events. Guests create accounts and self-order from their phones, the kitchen tracks and completes orders live, and admins control when and how ordering is open.",
  tech: ["React", "Next.js", "Firebase", "Vercel"],
  github: "https://github.com/CodyHanna04/Pancake-Night",
  live: "https://pancake-night.vercel.app/",
  images: [
    "pancake1.png",
    "pancake2.png",
    "pancake3.png",
    "pancake4.png",
    "pancake5.png",
    "pancake6.png",
    "pancake7.png",
  ],
  problem:
    "Taking orders on paper during busy nights led to confusion, missed items, and no way to track order progress. A dedicated order-taker also meant one person was tied up the entire event.",
  solution:
    "The KDS digitized the entire process: guests sign up for an account and place their own orders online, the kitchen sees a live queue and marks orders as done, and admins control all ordering settings without touching the code.",
  features: [
    "User authentication — guests create accounts and sign in to order",
    "Self-service guest ordering (no dedicated order-taker needed)",
    "Rate limiting: one order per guest every 15 minutes",
    "Real-time Firestore order queue for the kitchen view",
    "Kitchen interface to mark orders in-progress and completed",
    "Guest order history sidebar showing recent order status",
    "Admin controls: enable/disable ordering, set the day of week and time window",
    "Input validation to prevent junk or malicious entries in the name field",
    "Analytics for total orders per night",
    "Leaderboard to keep guests engaged",
    "Planned: admin approval gate for new accounts before they can order",
  ],
  impact:
    "Eliminated paper order slips entirely. Guests self-serve from their phones, the kitchen sees a clean live queue, and admins can lock or schedule ordering windows without any code changes.",
};

export default pancakeNight;
