import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnvelopeIntro({ onComplete, onInteract }) {
  const [opened, setOpened] = useState(false);
  const [skip, setSkip] = useState(false);
  const [burst, setBurst] = useState(false);
  
  const bgVideoRef = useRef(null);

  useEffect(() => {
    // 1. Double-force the mute state directly on the DOM element 
    // to guarantee iOS doesn't block it and show the play button
    if (bgVideoRef.current) {
      bgVideoRef.current.defaultMuted = true;
      bgVideoRef.current.muted = true;
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
    
    setTimeout(() => {
      setOpened(true);
    }, 600);

    setTimeout(() => {
      sessionStorage.setItem("pv-invited", "true");
      onComplete(); 
    }, 1400);
  };

  const ambientDust = Array.from({ length: 40 }).map((_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2, delay: Math.random() * 3, duration: Math.random() * 3 + 3 
  }));

  const confettiEmojis = ['❤️', '🤍', '💕', '💖', '✨'];
  const burstParticles = Array.from({ length: 35 }).map((_, i) => {
    const angle = (Math.random() * 360) * (Math.PI / 180); 
    const distance = Math.random() * 150 + 50; 
    return {
      id: i, emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      x: Math.cos(angle) * distance, y: Math.sin(angle) * distance,
      rotation: Math.random() * 360, size: Math.random() * 1 + 0.8 
    };
  });

  return (
    <motion.div 
      onClick={handleOpen}
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
        muted // Standard React mute
        defaultMuted // 2. FORCES the mute attribute into the HTML for iOS
        playsInline // Standard inline play
        webkit-playsinline="true" // 3. Older iOS fallback to prevent full-screen/play buttons
        controls={false} 
        disablePictureInPicture
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

      <AnimatePresence>
        {burst && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 60, pointerEvents: 'none' }}>
            {burstParticles.map((bp) => (
              <motion.div
                key={bp.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                animate={{ x: bp.x, y: bp.y, opacity: [1, 1, 0], scale: 1, rotate: bp.rotation }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{
                  position: 'absolute', fontSize: `${bp.size}rem`, transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}
              >
                {bp.emoji}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.img 
        src="/PH.jpeg" alt="Tap to open"
        style={{ 
          width: '230px', cursor: 'pointer', mixBlendMode: 'multiply', 
          borderRadius: '50%', zIndex: 10, backgroundColor: '#f5ece0' 
        }} 
        animate={{ y: burst ? 0 : [0, -8, 0], scale: burst ? 1.05 : 1 }} 
        transition={{ y: burst ? { duration: 0.2 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }, scale: { duration: 0.3, ease: "easeOut" } }}
      />
      
      <motion.p
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