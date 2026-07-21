import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownSection() {
  const themeColor = '#4A3728';

  const calculateDaysLeft = () => {
    const weddingDate = new Date('2026-08-23T00:00:00');
    const today = new Date();
    weddingDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const timeDiff = weddingDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const [daysToGo, setDaysToGo] = useState(calculateDaysLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysToGo(calculateDaysLeft());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const slideStyle = {
    position: 'relative', 
    height: '100vh',              
    minHeight: '100vh',
    width: '100%',
    scrollSnapAlign: 'start',
    backgroundImage: 'url(/FamBackground.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    padding: '18vh 20px 2vh',     
    color: themeColor,
    textAlign: 'center',
    boxSizing: 'border-box',
    overflow: 'hidden'            
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const ScrollArrow = () => (
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
          stroke="#4A3728" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </motion.div>
    </motion.div>
  );

  return (
    <div style={slideStyle}>
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
        style={{ maxWidth: '350px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.p variants={textAnimation} style={{ fontStyle: 'italic', margin: '0 0 2px 0', fontSize: '1.05rem' }}>
          The countdown begins...
        </motion.p>
        
        <motion.h1 variants={textAnimation} style={{ fontSize: '4.5rem', margin: '0', fontWeight: 'bold', lineHeight: '1' }}>
          {daysToGo}
        </motion.h1>
        
        <motion.p variants={textAnimation} style={{ fontSize: '1.2rem', fontWeight: '600', letterSpacing: '2px', margin: '2px 0 0 0' }}>
          DAYS TO GO
        </motion.p>
        
        <motion.p variants={textAnimation} style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.3rem', margin: '2px 0 10px 0' }}>
          For the Big Day!
        </motion.p>

        {/* 
          FIX: Removed the 'motion.div' animation wrapper from this element.
          By rendering it statically, the browser never loses the multiply effect! 
        */}
        <div style={{ display: 'block', width: '100%', marginTop: '10px' }}>
          <img 
            src="/calendar.jpg" 
            alt="August Calendar" 
            style={calendarImageStyle} 
          />
        </div>
      </motion.div>

      <ScrollArrow />
    </div>
  );
}

const calendarImageStyle = {
  width: '100%',
  maxWidth: '260px', 
  height: 'auto',
  objectFit: 'contain',
  mixBlendMode: 'multiply'
};