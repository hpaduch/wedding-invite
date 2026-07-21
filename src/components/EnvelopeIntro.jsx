import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnvelopeIntro({ onComplete, onInteract }) {
  const [opened, setOpened] = useState(false);
  const [skip, setSkip] = useState(false);
  const [burst, setBurst] = useState(false); // Controls the magical tap burst

  useEffect(() => {
    // Check sessionStorage so guests do not see the envelope again on refresh
    if (sessionStorage.getItem("pv-invited")) {
      setSkip(true);
      onComplete();
    }
  }, [onComplete]);

  if (skip) return null;

  const handleOpen = () => {
    if (opened || burst) return;
    
    setBurst(true); // 1. Trigger the gold spark explosion
    onInteract?.(); // Start music on tap
    
    // 2. Wait a split second for the burst to shine, then trigger the "Unboxing" slide-up
    setTimeout(() => {
      setOpened(true);
    }, 450);

    // 3. Wait for the slide-up animation to finish before removing the component
    setTimeout(() => {
      sessionStorage.setItem("pv-invited", "true");
      onComplete(); 
    }, 1250); // 450ms wait + 800ms slide transition
  };

  // Generate 25 ambient gold dust particles for the background
  const ambientDust = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 3
  }));

  // Generate 15 explosive particles for the "Magic Touch" burst
  const burstParticles = Array.from({ length: 15 }).map((_, i) => {
    const angle = (i * 24) * (Math.PI / 180);
    return {
      id: i,
      x: Math.cos(angle) * 120, // Distance they travel outwards
      y: Math.sin(angle) * 120
    };
  });

  return (
    <motion.div 
      onClick={handleOpen}
      initial={{ y: 0 }}
      animate={{ 
        y: opened ? '-100dvh' : 0, // The "Unboxing" Transition: Slides perfectly up and out
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] // The Luxury Shimmer animation
      }}
      transition={{ 
        y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, // Cinematic easing curve for the slide
        backgroundPosition: { repeat: Infinity, duration: 15, ease: "linear" }
      }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        // The oversized luxury gradient
        background: 'linear-gradient(45deg, #f5ece0, #fdfbf7, #ebd9c8, #f5ece0)',
        backgroundSize: '400% 400%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '20px', 
        zIndex: 50,
        pointerEvents: opened ? 'none' : 'auto',
        overflow: 'hidden' // Keeps particles from breaking the screen bounds
      }}
    >
      {/* Ambient Gold Dust Layer */}
      {ambientDust.map((p) => (
        <motion.div
          key={p.id}
          animate={{ 
            y: [0, -80], 
            opacity: [0, 0.7, 0],
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
            backgroundColor: '#D4AF37', // Elegant gold hex code
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)',
            pointerEvents: 'none' // Ensures they don't block taps
          }}
        />
      ))}

      {/* Magic Touch Burst Layer (Only renders when tapped) */}
      <AnimatePresence>
        {burst && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 60 }}>
            {burstParticles.map((bp) => (
              <motion.div
                key={bp.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: bp.x, y: bp.y, opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#D4AF37',
                  borderRadius: '50%',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.9)'
                }}
              />
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
          y: burst ? 0 : [0, -8, 0], // Stop bobbing when tapped
          scale: burst ? 1.05 : 1 // Slight "press" effect on tap
        }} 
        transition={{ 
          y: burst ? { duration: 0.2 } : { repeat: Infinity, duration: 2, ease: "easeInOut" },
          scale: { duration: 0.3, ease: "easeOut" }
        }}
      />
      
      <motion.p
        animate={{ opacity: burst ? 0 : [0.4, 1, 0.4] }} // Fade out text on tap
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