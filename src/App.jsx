import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Importing all the components
import EnvelopeIntro from './components/EnvelopeIntro';
import HeroSlide from './components/HeroSlide';
import RSVPSlide from './components/RSVPSlide';
import EventCards from './components/EventCards';
import FinalSlide from './components/FinalSlide';
import FamilySlide from './components/FamilySlide';
import CountdownSection from './components/CountdownSection';
import AdminDashboard from './components/AdminDashboard';

let sealAudio = null;
let innerAudio = null;

function App() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false); // NEW: Track auto-scroll
  
  const videoRef = useRef(null);
  const introSlideRef = useRef(null); // NEW: Reference to the slide container

  useEffect(() => {
    if (inviteOpen) return;
    sealAudio = new Audio("/song-seal.mp3");
    sealAudio.loop = true;
    const start = () => sealAudio.play().catch(() => {});
    document.addEventListener("touchstart", start, { once: true });
  }, [inviteOpen]);

  useEffect(() => {
    if (!inviteOpen) return;
    if (sealAudio) { sealAudio.pause(); sealAudio = null; }
    innerAudio = new Audio("/song-inner.mp3");
    innerAudio.loop = true;
    innerAudio.play().catch(() => {});
    
    // NEW: Force play the intro video the moment the envelope opens
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inviteOpen]);

  useEffect(() => {
    const pauseAllAudio = () => {
      if (sealAudio) sealAudio.pause();
      if (innerAudio) innerAudio.pause();
    };

    const resumeAppropriateAudio = () => {
      if (!document.hidden) {
        if (!inviteOpen && sealAudio) {
          sealAudio.play().catch(() => {});
        } else if (inviteOpen && innerAudio) {
          innerAudio.play().catch(() => {});
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAllAudio();
      } else {
        resumeAppropriateAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", pauseAllAudio); 
    window.addEventListener("pagehide", pauseAllAudio);
    window.addEventListener("focus", resumeAppropriateAudio);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", pauseAllAudio);
      window.removeEventListener("pagehide", pauseAllAudio);
      window.removeEventListener("focus", resumeAppropriateAudio);
    };
  }, [inviteOpen]);

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
      videoRef.current.play(); // Keeps playing in the background
    }
    
    // NEW: Auto-scroll to the next slide only once
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
        onInteract={() => {}}
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
          ref={introSlideRef} // NEW: Attached reference here
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
              pointerEvents: 'none' // NEW: Stops iOS from hijacking clicks
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
        {/* <RSVPSlide /> */}
        <FinalSlide />
      </div>
    </>
  );
}

export default App;