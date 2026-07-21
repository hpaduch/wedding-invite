import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function EnvelopeIntro({ onComplete, onInteract }) {
  const [opened, setOpened] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    // Check sessionStorage so guests do not see the envelope again on refresh
    if (sessionStorage.getItem("pv-invited")) {
      setSkip(true);
      onComplete();
    }
  }, [onComplete]);

  if (skip) return null;

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    onInteract?.(); // Start music must happen on tap
    
    setTimeout(() => {
      sessionStorage.setItem("pv-invited", "true");
      onComplete(); // Shows the invite slides
    }, 400);
  };

  return (
    <div 
      onClick={handleOpen}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#f5ece0', 
        display: 'flex', 
        flexDirection: 'column', // Stacks the image and text vertically
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '20px', // Adds space between the logo and the text
        zIndex: 50, transition: 'opacity 0.4s',
        opacity: opened ? 0 : 1, pointerEvents: opened ? 'none' : 'auto'
      }}
    >
      <motion.img 
        src="/PH.jpeg" 
        alt="Tap to open"
        style={{ 
          width: '230px', 
          cursor: 'pointer',
          mixBlendMode: 'multiply', // Removes the white background by blending it
          borderRadius: '50%' // Backup to ensure the edges clip cleanly
        }} 
        animate={{ y: [0, -8, 0] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      
      {/* New animated text to guide the guest */}
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }} // Creates a pulsing effect
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{
          fontFamily: 'Cormorant, serif',
          fontSize: '1.2rem',
          letterSpacing: '3px',
          color: '#555',
          margin: 0,
          cursor: 'pointer'
        }}
      >
        TAP TO OPEN
      </motion.p>
    </div>
  );
}