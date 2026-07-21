import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroSlide() {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null); 

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        
        if (bgVideoRef.current) {
          bgVideoRef.current.currentTime = 0;
          bgVideoRef.current.play();
        }
      }        
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.currentTime = 0;
    }
  };

  const leftNameAnimation = {
    hidden: { opacity: 0, x: -60, rotate: -5 },
    visible: { opacity: 1, x: 0, rotate: 0, transition: { type: 'spring', damping: 14, stiffness: 90, delay: 0.2 } }
  };

  const rightNameAnimation = {
    hidden: { opacity: 0, x: 60, rotate: 5 },
    visible: { opacity: 1, x: 0, rotate: 0, transition: { type: 'spring', damping: 14, stiffness: 90, delay: 0.4 } }
  };

  const heartAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', damping: 10, stiffness: 100, delay: 0.6 } }
  };

  const particles = [
    { top: '10%', left: '10%', emoji: '🤍', size: '1.2rem', delay: 0.1, duration: 2 },
    { top: '15%', right: '15%', emoji: '❤️', size: '1rem', delay: 0.5, duration: 2.2 },
    { top: '35%', left: '5%', emoji: '💕', size: '1.5rem', delay: 0.2, duration: 1.8 },
    { top: '25%', right: '5%', emoji: '🤍', size: '1.3rem', delay: 0.8, duration: 2.5 },
    { top: '45%', right: '12%', emoji: '💖', size: '0.9rem', delay: 0.3, duration: 2 },
    { top: '55%', left: '15%', emoji: '🤍', size: '1.4rem', delay: 0.7, duration: 2.3 },
    { top: '65%', right: '8%', emoji: '💕', size: '1.1rem', delay: 0.4, duration: 1.9 },
    { top: '75%', left: '10%', emoji: '❤️', size: '1.2rem', delay: 0.9, duration: 2.4 },
    { top: '80%', right: '20%', emoji: '🤍', size: '1.3rem', delay: 0.1, duration: 2.1 },
    { top: '20%', left: '25%', emoji: '💖', size: '1rem', delay: 0.6, duration: 2.2 },
    { top: '85%', left: '30%', emoji: '❤️', size: '1.4rem', delay: 0.5, duration: 1.8 },
    { top: '30%', right: '25%', emoji: '🤍', size: '1.1rem', delay: 0.2, duration: 2.5 },
    { top: '50%', left: '25%', emoji: '💕', size: '0.8rem', delay: 0.8, duration: 1.9 },
    { top: '70%', right: '28%', emoji: '❤️', size: '1.2rem', delay: 0.3, duration: 2.1 },
    { top: '12%', left: '50%', emoji: '🤍', size: '1.3rem', delay: 0.4, duration: 2.3 },
  ];

  return (
    <div 
      onClick={handleVideoClick}
      style={{
        height: '100dvh', width: '100%', position: 'relative', overflow: 'hidden',
        scrollSnapAlign: 'start', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        backgroundColor: '#000', 
        cursor: 'pointer'
      }}
    >
      {/* LAYER 1: Ambient Blur Background */}
      <video 
        ref={bgVideoRef}
        src="/AnimatedIntro.mp4" 
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', 
          filter: 'blur(35px) brightness(0.8)', 
          transform: 'scale(1.2)', 
          zIndex: 0 
        }}
      />

      {/* LAYER 2: Main Foreground Video */}
      <video 
        ref={videoRef}
        src="/AnimatedIntro.mp4" 
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'contain', 
          zIndex: 1 
        }}
      />
      
      {/* LAYER 3: Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          whileInView={{ opacity: [0, 0.8, 0], y: -50, scale: [0.8, 1.2, 0.8] }}
          viewport={{ once: false }}
          transition={{ repeat: Infinity, delay: p.delay, duration: p.duration, ease: 'easeInOut' }}
          style={{ 
            position: 'absolute', top: p.top, left: p.left, right: p.right, fontSize: p.size, 
            zIndex: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
      
      {/* LAYER 4: Text Container */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} 
        style={{ paddingTop: '6dvh', position: 'relative', zIndex: 3, width: '100%' }}
      >
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }} 
          style={{ 
            color: '#4A3728', 
            fontFamily: '"Great Vibes", cursive', // Switched to calligraphy font
            fontSize: '2.4rem', // Increased size significantly
            marginBottom: '26dvh', // Slightly adjusted margin for the taller cursive text
            fontWeight: 'normal', // Removed bold to keep the script elegant
            textShadow: '0px 0px 8px rgba(255, 255, 255, 0.8)'
          }}
        >
          Join us as we begin our forever...
        </motion.p>
        
        <div style={{ color: '#FFFFFF', textShadow: '1px 2px 5px rgba(0, 0, 0, 0.6)' }}>
          <motion.h1 variants={leftNameAnimation} style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(60px, 18vw, 90px)', fontWeight: 'bold', margin: 0, lineHeight: 1.1 }}>
            Praveena
          </motion.h1>
          
          <motion.div variants={heartAnimation} style={{ color: '#E31C25', fontSize: '2.5rem', margin: '5px auto', lineHeight: 1, textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}>
            ♥
          </motion.div>
          
          <motion.h1 variants={rightNameAnimation} style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(60px, 18vw, 90px)', fontWeight: 'bold', margin: 0, lineHeight: 1.1 }}>
            Hari
          </motion.h1>
        </div>
      </motion.div>

      {/* LAYER 5: Swipe Up Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: 'absolute', bottom: '40px', display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10
        }}
      >
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.6))' }}>
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}