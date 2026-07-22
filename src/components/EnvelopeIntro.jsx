import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function EnvelopeIntro({ onComplete, onInteract }) {
  const [opened, setOpened] = useState(false);
  const [skip, setSkip] = useState(false);
  const [burst, setBurst] = useState(false);
  
  const bgVideoRef = useRef(null);

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {});
    }
    
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

    // THE ULTIMATE CONFETTI MERGE: Option A (Realistic Depth) + Option B (Side Cannons)
    const count = 200;
    const colors = ['#FFD700', '#E31C25', '#FFFFFF', '#4CD964', '#5AC8FA', '#FF9500'];

    // Helper function to fire both sides simultaneously with specific physics
    function fire(particleRatio, opts) {
      // Left Cannon
      confetti(Object.assign({}, opts, {
        particleCount: Math.floor(count * particleRatio),
        angle: 60, // Shoots up and right
        origin: { x: 0, y: 0.85 }, // Bottom left corner
        colors: colors,
        zIndex: 100
      }));
      // Right Cannon
      confetti(Object.assign({}, opts, {
        particleCount: Math.floor(count * particleRatio),
        angle: 120, // Shoots up and left
        origin: { x: 1, y: 0.85 }, // Bottom right corner
        colors: colors,
        zIndex: 100
      }));
    }

    // 1. Fast, tight center burst
    fire(0.25, { spread: 26, startVelocity: 65 }); 
    // 2. Standard spread
    fire(0.2, { spread: 60, startVelocity: 50 }); 
    // 3. Lots of small, slow, floaty pieces
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 }); 
    // 4. Huge chunky pieces that hang in the air
    fire(0.1, { spread: 120, startVelocity: 35, decay: 0.92, scalar: 1.2 }); 
    // 5. Final wide blast
    fire(0.1, { spread: 120, startVelocity: 55 });
    
    // Give the confetti time to cross paths and fall beautifully before sliding up
    setTimeout(() => {
      setOpened(true);
    }, 1400);

    setTimeout(() => {
      sessionStorage.setItem("pv-invited", "true");
      onComplete(); 
    }, 2200);
  };

  const ambientDust = Array.from({ length: 40 }).map((_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2, delay: Math.random() * 3, duration: Math.random() * 3 + 3 
  }));

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: opened ? '-100dvh' : 0 }}
      transition={{ y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#000', display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center', gap: '20px', 
        zIndex: 50, pointerEvents: opened ? 'none' : 'auto', overflow: 'hidden'
      }}
    >
      <video 
        ref={bgVideoRef}
        src="/IntroBackground.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false} 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
          pointerEvents: 'none' 
        }}
      />

      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ backgroundPosition: { repeat: Infinity, duration: 15, ease: "linear" } }}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(45deg, rgba(227, 211, 192, 0.65), rgba(239, 232, 223, 0.65), rgba(212, 193, 170, 0.65), rgba(227, 211, 192, 0.65))',
          backgroundSize: '400% 400%', zIndex: 1, pointerEvents: 'none'
        }}
      />

      {ambientDust.map((p) => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -80], opacity: [0, 0.7, 0], scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: p.left, top: p.top, width: p.size, height: p.size,
            backgroundColor: '#D4AF37', borderRadius: '50%', boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)', 
            pointerEvents: 'none', zIndex: 2
          }}
        />
      ))}

      {/* Interactive Logo Layer */}
      <motion.img 
        onClick={handleOpen}
        src="/PH.jpeg" alt="Tap to open"
        style={{ 
          width: '230px', cursor: 'pointer', mixBlendMode: 'multiply', 
          borderRadius: '50%', zIndex: 10, backgroundColor: '#f5ece0' 
        }} 
        animate={{ y: burst ? 0 : [0, -8, 0], scale: burst ? 1.05 : 1 }} 
        transition={{ y: burst ? { duration: 0.2 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }, scale: { duration: 0.3, ease: "easeOut" } }}
      />
      
      <motion.p
        onClick={handleOpen}
        animate={{ opacity: burst ? 0 : [0.6, 1, 0.6] }} 
        transition={{ repeat: burst ? 0 : Infinity, duration: 2, ease: "easeInOut" }}
        style={{
          fontFamily: 'Cormorant, serif', fontSize: '1.2rem', letterSpacing: '3px',
          color: '#333', fontWeight: 'bold', margin: 0, cursor: 'pointer', zIndex: 10,
          textShadow: '0 2px 4px rgba(255,255,255,0.6)'
        }}
      >
        TAP TO OPEN
      </motion.p>
    </motion.div>
  );
}