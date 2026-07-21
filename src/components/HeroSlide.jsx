import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSlide() {
  const slideRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Standardized animation variants for consistency
  const textAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div 
      ref={slideRef}
      style={{
        height: '100vh', width: '100%', position: 'relative', overflow: 'hidden',
        scrollSnapAlign: 'start', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', textAlign: 'center',
        backgroundColor: '#000'
      }}
    >
      <motion.img 
        src="/couple.webp" 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', 
          y: yBg, 
          zIndex: 1 
        }}
      />
      
      {/* Vignette Edge Fade Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)',
        zIndex: 2 
      }}></div>
      
      {/* 
        NEW: Using whileInView. 
        viewport={{ once: false }} ensures it animates every time it enters the screen.
      */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Triggers when 30% of the element is visible
        style={{ 
          paddingTop: '10vh', 
          position: 'relative', 
          zIndex: 3,            
          width: '100%',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' 
        }}
      >
        <motion.p variants={textAnimation} style={{ fontFamily: 'Cormorant, serif', fontSize: '1.2rem', marginBottom: '25vh', letterSpacing: '2px' }}>
          Join us as we begin our forever...
        </motion.p>
        
        <motion.h1 variants={textAnimation} style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(60px, 18vw, 90px)', fontWeight: 'normal', margin: 0 }}>
          Praveena
        </motion.h1>
        
        <motion.div variants={textAnimation} style={{ width: '60px', height: '2px', backgroundColor: '#ffd700', margin: '10px auto', boxShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}></motion.div>
        
        <motion.h1 variants={textAnimation} style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(60px, 18vw, 90px)', fontWeight: 'normal', margin: 0 }}>
          Hari
        </motion.h1>
      </motion.div>

      {/* NEW: Delayed 5-second arrow container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.9)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.6))' }}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}