import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSlide() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null); 
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (bgVideoRef.current) {
              bgVideoRef.current.defaultMuted = true;
              bgVideoRef.current.muted = true;
              bgVideoRef.current.play().catch(() => {});
            }
            
            if (videoRef.current) {
              videoRef.current.defaultMuted = true;
              videoRef.current.muted = true;
              
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setShowPlayOverlay(false);
                  })
                  .catch(() => {
                    setShowPlayOverlay(true); 
                  });
              }
            }
          } else {
            if (bgVideoRef.current) bgVideoRef.current.pause();
            if (videoRef.current) videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setShowPlayOverlay(false); 
        
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

  return (
    <div 
      ref={containerRef}
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
        defaultMuted
        playsInline
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', 
          filter: 'blur(35px) brightness(0.8)', 
          transform: 'scale(1.2)', 
          zIndex: 0,
          pointerEvents: 'none' 
        }}
      />

      {/* LAYER 2: Main Foreground Video */}
      <video 
        ref={videoRef}
        src="/AnimatedIntro.mp4" 
        autoPlay
        muted
        defaultMuted
        playsInline
        onEnded={handleVideoEnded}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'contain', 
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Custom Play Overlay for Low Power Mode */}
      {showPlayOverlay && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 20,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(3px)'
          }}
        >
          <div style={{
            padding: '15px 30px', border: '1px solid #D4AF37', borderRadius: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff',
            fontFamily: '"Great Vibes", cursive', fontSize: '2rem',
            textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Tap to Play
          </div>
        </motion.div>
      )}
      
      {/* LAYER 3: Decoupled Text Container */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} 
        style={{ 
          position: 'relative', zIndex: 3, width: '100%', height: '100%', 
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
        }} 
      >
        {/* Absolutely positioned at the top */}
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }} 
          style={{ 
            position: 'absolute',
            top: '6dvh', // Pinned exactly to the top, safely below the status bar
            color: '#4A3728', 
            fontFamily: '"Great Vibes", cursive', 
            fontSize: '2.4rem', 
            fontWeight: 'normal', 
            margin: 0,
            width: '100%',
            textAlign: 'center',
            textShadow: '0px 0px 8px rgba(255, 255, 255, 0.8)'
          }}
        >
          Join us as we begin our forever...
        </motion.p>
        
        {/* The names remain perfectly locked in the middle */}
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

      {/* LAYER 4: Swipe Up Arrow */}
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