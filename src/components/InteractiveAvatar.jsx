import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { motion } from "framer-motion";
import animationData from "../assets/developer.json";

const techBadges = [
  { label: "React & Node.js", pos: "-top-2 -left-4 md:-left-12", delay: 0 },
  { label: "PHP & Scriptcase", pos: "top-12 -right-4 md:-right-14", delay: 0.4 },
  { label: "T-SQL / Database", pos: "bottom-8 -left-4 md:-left-16", delay: 0.8 },
  { label: "Azure DevOps / AD", pos: "bottom-2 -right-4 md:-right-12", delay: 1.2 },
];

export default function InteractiveAvatar() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className="relative flex justify-center items-center w-full max-w-xl h-[42vh] md:h-[50vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute w-72 h-72 md:w-96 md:h-96 border border-red-500/20 rounded-full border-dashed pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="absolute w-60 h-60 md:w-80 md:h-80 border border-red-600/15 rounded-full pointer-events-none"
      />

      <div className="absolute w-64 h-64 bg-red-600/25 rounded-full blur-[80px] pointer-events-none" />

      {techBadges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0] 
          }}
          transition={{
            opacity: { delay: badge.delay, duration: 0.5 },
            scale: { delay: badge.delay, duration: 0.5 },
            y: { repeat: Infinity, duration: 3 + index * 0.4, ease: "easeInOut" }
          }}
          className={`hidden sm:flex items-center gap-2 absolute ${badge.pos} z-20 px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-red-500/40 shadow-[0_0_15px_rgba(220,38,38,0.2)]`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[11px] font-mono font-semibold text-neutral-200 tracking-wider">
            {badge.label}
          </span>
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        ref={containerRef}
        className="relative z-10 w-full h-full flex justify-center items-center drop-shadow-[0_15px_35px_rgba(220,38,38,0.35)]"
      />
    </div>
  );
}