import { motion } from "framer-motion";

const MotionDiv = motion.div;

// Fades each public page in on route change. Respects prefers-reduced-motion
// via the MotionConfig wrapper in App.jsx.
export default function PageTransition({ children }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </MotionDiv>
  );
}
