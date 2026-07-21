import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnvelopeIntro({ onComplete, onInteract }) {
  const [opened, setOpened] = useState(false);
  const [skip, setSkip] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pv-invited")) {
      setSkip(true);
      onComplete();
    }
  }, [onComplete]);

  if (skip) return null;

  const handleOpen = () => {
    if (opened || burst) return;
    
    setBurst(true); 
    onInteract?.(); 
    
    // Give the confetti blast a tiny bit more time to shine before sliding up
    setTimeout(() => {
      setOpened(true);
    }, 600);

    setTimeout(() => {
      sessionStorage.setItem("pv-invited", "true");
      onComplete(); 
    }, 1400);
  };

  // 1. Reverted to the softer, elegant gold dust
  const ambientDust = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2, 
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 3 
  }));

  // 2. Created a "Blast of Love" confetti generator
  const confettiEmojis = ['❤️', '🤍', '💕', '💖', '✨'];
  const burstParticles = Array.from({ length: 35 }).map((_, i) => {
    const angle = (Math.random() * 360) * (Math.PI / 180); // Explode in full 360 circle
    const distance = Math.random() * 150 + 50; // Travel random distances
    return {
      id: i,
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      x: Math.cos(angle) * distance, 
      y: Math.sin(angle) * distance,
      rotation: Math.random() * 360, // Spin randomly
      size: Math.random() * 1 + 0.8 // Random sizes between 0.8rem and 1.8rem
    };
  });

  return (
    <motion.div 
      onClick={handleOpen}
      initial={{ y: 0 }}
      animate={{ 
        y: opened ? '-100dvh' : 0, 
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{ 
        y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, 
        backgroundPosition: { repeat: Infinity, duration: 15, ease: "linear" }
      }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(45deg, #e3d3c0, #efe8df, #d4c1aa, #e3d3c0)',
        backgroundSize: '400% 400%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '20px', 
        zIndex: 50,
        pointerEvents: opened ? 'none' : 'auto',
        overflow: 'hidden' 
      }}
    >
      {/* Ambient Gold Dust Layer (Soft & Elegant) */}
      {ambientDust.map((p) => (
        <motion.div
          key={p.id}
          animate={{ 
            y: [0, -80], 
            opacity: [0, 0.7, 0], // Reverted to soft opacity
            scale: [1, 1.5, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: '#D4AF37', // Reverted to elegant gold
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)', // Reverted to soft shadow
            pointerEvents: 'none' 
          }}
        />
      ))}

      {/* Love Confetti Blast Layer */}
      <AnimatePresence>
        {burst && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 60, pointerEvents: 'none' }}>
            {burstParticles.map((bp) => (
              <motion.div
                key={bp.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                animate={{ 
                  x: bp.x, 
                  y: bp.y, 
                  opacity: [1, 1, 0], 
                  scale: 1,
                  rotate: bp.rotation
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  fontSize: `${bp.size}rem`,
                  transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {bp.emoji}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.img 
        src="/PH.jpeg" 
        alt="Tap to open"
        style={{ 
          width: '230px', 
          cursor: 'pointer',
          mixBlendMode: 'multiply', 
          borderRadius: '50%', 
          zIndex: 10
        }} 
        animate={{ 
          y: burst ? 0 : [0, -8, 0],
          scale: burst ? 1.05 : 1 
        }} 
        transition={{ 
          y: burst ? { duration: 0.2 } : { repeat: Infinity, duration: 2, ease: "easeInOut" },
          scale: { duration: 0.3, ease: "easeOut" }
        }}
      />
      
      <motion.p
        animate={{ opacity: burst ? 0 : [0.4, 1, 0.4] }} 
        transition={{ repeat: burst ? 0 : Infinity, duration: 2, ease: "easeInOut" }}
        style={{
          fontFamily: 'Cormorant, serif',
          fontSize: '1.2rem',
          letterSpacing: '3px',
          color: '#555',
          margin: 0,
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        TAP TO OPEN
      </motion.p>
    </motion.div>
  );
}