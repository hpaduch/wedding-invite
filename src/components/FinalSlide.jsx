import { motion } from 'framer-motion';

export default function FinalSlide() {
  const themeColor = '#4A3728';

  const slideStyle = {
    height: '100vh', 
    width: '100%', 
    position: 'relative', 
    overflow: 'hidden',
    scrollSnapAlign: 'start',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundImage: 'url(/FamBackground.webp)', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    color: themeColor,
    boxSizing: 'border-box',
    padding: '0 20px'
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div style={slideStyle}>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
        style={{ zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '340px' }}
      >
        
        {/* Names Stacked Vertically with Heart */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '25px', width: '100%' }}>
          <motion.span variants={textAnimation} style={{ fontFamily: 'Great Vibes, cursive', fontSize: '4.2rem', fontWeight: 'normal', lineHeight: '1' }}>
            Praveena
          </motion.span>
          
          <motion.div variants={textAnimation}>
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ color: '#E31C25', fontSize: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}
            >
              ♥
            </motion.div>
          </motion.div>
          
          <motion.span variants={textAnimation} style={{ fontFamily: 'Great Vibes, cursive', fontSize: '4.2rem', fontWeight: 'normal', lineHeight: '1' }}>
            Hari
          </motion.span>
        </div>

        {/* Invitation Message */}
        <motion.p variants={textAnimation} style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.6', margin: '10px 0 30px 0', padding: '0 5px' }}>
          "Your love, presence, and blessings mean the world to us. We look forward to celebrating this beautiful new beginning with you!"
        </motion.p>

        {/* Event Info Pills */}
        <motion.div variants={textAnimation} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={pillStyle}>
             August 23
          </span>
          <span style={pillStyle}>Anantapur</span>
          <span style={pillStyle}>2026</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

const pillStyle = {
  border: '1px solid rgba(74, 55, 40, 0.25)',
  background: 'rgba(255, 255, 255, 0.4)', 
  borderRadius: '20px',
  padding: '6px 16px',
  fontSize: '0.85rem',
  fontWeight: '500',
  letterSpacing: '0.5px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px'
};