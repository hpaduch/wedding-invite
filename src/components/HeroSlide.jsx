import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export default function HeroSlide() {
  const slideRef = useRef(null);
  const groomRef = useRef(null);
  const brideRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    gsap.fromTo(groomRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, delay: 0.3 });
    gsap.fromTo(brideRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, delay: 0.3 });
  }, []);

  return (
    <div 
      ref={slideRef}
      style={{
        height: '100vh', width: '100%', position: 'relative', overflow: 'hidden',
        scrollSnapAlign: 'start', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', textAlign: 'center',
        backgroundColor: '#000'
      }}
    >
      <motion.img 
        src="/couple.webp" 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', 
          y: yBg, 
          zIndex: 1 // FIX: Moved from -1 to 1 so it sits above the black background
        }}
      />
      
      {/* Vignette Edge Fade Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)',
        zIndex: 2 // FIX: Sits above the image
      }}></div>
      
      <div style={{ 
        paddingTop: '10vh', 
        position: 'relative', // FIX: Required for zIndex to take effect on a static element
        zIndex: 3,            // FIX: Sits above the overlay
        width: '100%',
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' 
      }}>
        <p style={{ 
          fontFamily: 'Cormorant, serif', 
          fontSize: '1.2rem', 
          marginBottom: '25vh', 
          letterSpacing: '2px' 
        }}>
          Join us as we begin our forever...
        </p>
        
        <h1 ref={groomRef} style={{ 
          fontFamily: '"Great Vibes", cursive', 
          fontSize: 'clamp(60px, 18vw, 90px)', 
          fontWeight: 'normal',
          margin: 0 
        }}>
          Praveena
        </h1>
        
        <div style={{ width: '60px', height: '2px', backgroundColor: '#ffd700', margin: '10px auto', boxShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}></div>
        
        <h1 ref={brideRef} style={{ 
          fontFamily: '"Great Vibes", cursive', 
          fontSize: 'clamp(60px, 18vw, 90px)', 
          fontWeight: 'normal',
          margin: 0 
        }}>
          Hari
        </h1>
      </div>
    </div>
  );
}