import { motion } from 'framer-motion';

export default function FamilySlide() {
  const slideStyle = {
    position: 'relative', // NEW: Required to anchor the absolute animated arrow
    height: '100dvh', 
    width: '100%',
    boxSizing: 'border-box',
    scrollSnapAlign: 'start',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundImage: 'url(/FamBackground.webp)',
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    padding: '20px',
    paddingTop: '10vh',
    textAlign: 'center',
    overflow: 'hidden'
  };

  const imgStyle = {
    width: '90%',
    maxWidth: '400px',
    display: 'block',
    margin: '0 auto 20px auto',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
    WebkitMaskComposite: 'source-in',
    maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
    maskComposite: 'intersect'
  };

  const nameStyle = { 
    fontSize: '3rem', 
    color: '#4a4a4a', 
    margin: '0', 
    fontFamily: '"Great Vibes", cursive', 
    fontWeight: 'normal' 
  };

  // Standardized text animation
  const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Reusable delayed arrow for both family slides
  const ScrollArrow = () => (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ delay: 3, duration: 1 }}
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
          stroke="#4A3728" // Dark brown to stand out on the light background
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
    <>
      {/* Slide 1: Bride's Family */}
      <div style={slideStyle}>
        <img src="/BrideFam.webp" alt="Praveena's Family" style={imgStyle} />
        
        {/* Animated text block */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }} // Animates children one after another
        >
          <motion.h2 variants={textAnimation} style={nameStyle}>Praveena</motion.h2>
          <motion.p variants={textAnimation} style={{ fontStyle: 'italic', color: '#7a7a7a', margin: '8px 0', fontFamily: 'Cormorant, serif' }}>D/o</motion.p>
          <motion.div variants={textAnimation} style={{ color: '#4a4a4a', fontWeight: '600', letterSpacing: '0.5px' }}>
            <p style={{ margin: '2px 0' }}>Smt. S. MANJULA</p>
            <p style={{ margin: '2px 0' }}>Sri. S. KEDARNATH</p>
          </motion.div>
        </motion.div>

        <ScrollArrow />
      </div>

      {/* Slide 2: Groom's Family */}
      <div style={slideStyle}>
        <img src="/GroomFam.webp" alt="Hari's Family" style={imgStyle} />
        
        {/* Animated text block */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 variants={textAnimation} style={nameStyle}>Hari</motion.h2>
          <motion.p variants={textAnimation} style={{ fontStyle: 'italic', color: '#7a7a7a', margin: '8px 0', fontFamily: 'Cormorant, serif' }}>S/o</motion.p>
          <motion.div variants={textAnimation} style={{ color: '#4a4a4a', fontWeight: '600', letterSpacing: '0.5px' }}>
            <p style={{ margin: '2px 0' }}>Smt. P. NAGARANI</p>
            <p style={{ margin: '2px 0' }}>Sri. P. NARENDRA BABU</p>
          </motion.div>
        </motion.div>

        <ScrollArrow />
      </div>
    </>
  );
}