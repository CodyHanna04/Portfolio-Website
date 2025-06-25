const pancakeNight = {
  title: "Pancake Night - Kitchen Display System",
  description: "A custom kitchen display system for our fraternity's weekly Pancake Night events. Users can place orders in real-time, and the kitchen team tracks, prepares, and completes them through a dedicated interface.",
  tech: ["React", "Firebase (Firestore)", "Vercel"],
  github: "https://github.com/CodyHanna04/Pancake-Night",
  live: "https://pancake-night.vercel.app/",
  images: ["pancake1.png", "pancake2.png", "pancake3.png", "pancake4.png", "pancake5.png"],
  problem: "Taking orders on paper during busy nights led to confusion, missed items, and no way to track order progress efficiently.",
  solution: "The KDS digitized the process: users submit tickets online, and the kitchen can view, track, and complete orders live through a simple UI.",
  features: [
    "Real-time Firestore order queue",
    "Kitchen view to mark items as done",
    "Client-side order form for guests",
    "Analytics for total orders per night",
    "Leaderboard to engage guests more"
  ],
  impact: "Reduced prep confusion, increased order speed, and improved guest satisfaction during high-traffic events."
};

export default pancakeNight;
