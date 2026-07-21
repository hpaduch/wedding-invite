import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import EnvelopeIntro from './components/EnvelopeIntro';
import HeroSlide from './components/HeroSlide';
import RSVPSlide from './components/RSVPSlide';
import EventCards from './components/EventCards';
import FinalSlide from './components/FinalSlide';
import FamilySlide from './components/FamilySlide';
import CountdownSection from './components/CountdownSection';
import AdminDashboard from './components/AdminDashboard';

// A single, continuous background audio instance
let bgAudio = null;

function App() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  
  const videoRef = useRef(null);
  const introSlideRef = useRef(null);

  // Initialize the seamless background music on the very first interaction
  useEffect(() => {
    const startAudio = () => {
      if (!bgAudio) {
        bgAudio = new Audio("/song-inner.mp3"); // Ensure this matches your desired song file
        bgAudio.loop = true;
        bgAudio.play().catch(() => {});
      }
    };

    // Listeners for the very first interaction
    document.addEventListener("touchstart", startAudio, { once: true });
    document.addEventListener("click", startAudio, { once: true });
    
    return () => {
      document.removeEventListener("touchstart", startAudio);
      document.removeEventListener("click", startAudio);
    };
  }, []);

  // Force play the intro video the moment the envelope opens
  useEffect(() => {
    if (inviteOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inviteOpen]);

  // Robust visibility handling to pause music ONLY if they leave the app/browser
  useEffect(() => {
    const pauseAudio = () => {
      if (bgAudio) bgAudio.pause();
    };

    const resumeAudio = () => {
      if (!document.hidden && bgAudio) {
        bgAudio.play().catch(() => {});
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) pauseAudio();
      else resumeAudio();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", pauseAudio); 
    window.addEventListener("pagehide", pauseAudio);
    window.addEventListener("focus", resumeAudio);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", pauseAudio);
      window.removeEventListener("pagehide", pauseAudio);
      window.removeEventListener("focus", resumeAudio);
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }        
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play(); 
    }
    
    if (!hasAutoScrolled && introSlideRef.current && introSlideRef.current.nextElementSibling) {
      setHasAutoScrolled(true);
      introSlideRef.current.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  if (urlParams.get('view') === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <>
      <EnvelopeIntro 
        onComplete={() => setInviteOpen(true)}
        onInteract={() => {
          // Fallback to start audio just in case the document listener missed it
          if (!bgAudio) {
            bgAudio = new Audio("/song-inner.mp3");
            bgAudio.loop = true;
            bgAudio.play().catch(() => {});
          }
        }}
      />
      <div
        className="main-snap-container"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          maxWidth: "430px", margin: "0 auto", overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        <div 
          ref={introSlideRef} 
          onClick={handleVideoClick}
          style={{
            position: 'relative', height: '100dvh', width: '100%',
            scrollSnapAlign: 'start', backgroundColor: '#000',
            overflow: 'hidden', display: 'flex', justifyContent: 'center',
            alignItems: 'center', cursor: 'pointer'
          }}
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            controls={false}
            onEnded={handleVideoEnded}
            style={{ 
              width: '100%', height: '100%', objectFit: 'cover',
              pointerEvents: 'none' 
            }}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 5, duration: 1 }} 
            style={{
              position: 'absolute', bottom: '40px', display: 'flex',
              justifyContent: 'center', pointerEvents: 'none', zIndex: 10
            }}
          >
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.6))' }}>
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        <HeroSlide />
        <FamilySlide />
        <EventCards />
        <CountdownSection />
        <FinalSlide />
      </div>
    </>
  );
}

export default App;