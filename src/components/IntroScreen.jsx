import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InteractiveAvatar from "./InteractiveAvatar";

export default function IntroScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(timer);
  }, []);

  const getSystemStatus = () => {
    if (progress < 25) return "> Inicializando ambiente React & Node.js...";
    if (progress < 50) return "> Conectando módulos PHP, T-SQL & Scriptcase...";
    if (progress < 75) return "> Sincronizando Active Directory, LDAP & Azure DevOps...";
    if (progress < 100) return "> Compilando interface Full Stack...";
    return "> Sistema pronto. Acesso liberado!";
  };

  return (
    <div className="relative w-screen h-screen bg-[#060606] flex flex-col items-center justify-between py-8 px-4 text-white overflow-hidden select-none">
      
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(220, 38, 38, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 38, 38, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 85%)"
        }}
      />

      <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-red-600/50 pointer-events-none" />
      <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-red-600/50 pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-red-600/50 pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-red-600/50 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-20 flex flex-col items-center text-center mt-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-[11px] font-mono uppercase tracking-widest mb-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          System Boot // v2.026
        </div>
        <h1 className="text-2xl md:text-4xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-neutral-200 to-red-500 bg-clip-text text-transparent">
           Ana Clara <span className="text-red-600">Dev</span>
        </h1>
        <p className="text-xs font-mono text-neutral-400 tracking-widest uppercase mt-1">
          Full Stack & Systems Developer
        </p>
      </motion.div>

      <div className="w-full flex items-center justify-center z-10 my-auto">
        <InteractiveAvatar />
      </div>

      <div className="z-20 flex flex-col items-center w-full max-w-md bg-neutral-900/60 backdrop-blur-md border border-neutral-800 p-5 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] mb-2">
        
        <div className="w-full flex justify-between items-center mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
            {progress === 100 ? "Concluído" : "Carregando Módulos..."}
          </span>
          <span className="text-sm font-mono font-bold text-white bg-red-600/20 border border-red-500/40 px-2 py-0.5 rounded">
            {progress}%
          </span>
        </div>

        <div className="w-full h-2.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-red-800 via-red-600 to-red-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_15px_#ef4444]" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full mt-3 text-left bg-black/60 px-3 py-2 rounded-lg border border-neutral-800/80">
          <p className="text-[11px] font-mono text-neutral-300 truncate">
            {getSystemStatus()}
          </p>
        </div>

        <div className="mt-4 w-full flex justify-center">
          {progress === 100 ? (
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onFinished}
              className="w-full py-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.5)] border border-red-400/30 transition-all uppercase tracking-widest text-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Acessar Portfólio</span>
              <span className="text-base leading-none">→</span>
            </motion.button>
          ) : (
            <button 
              onClick={onFinished} 
              className="text-xs font-mono text-neutral-500 hover:text-red-400 transition-all cursor-pointer py-1"
            >
              [ Pular inicialização ]
            </button>
          )}
        </div>
      </div>

    </div>
  );
}