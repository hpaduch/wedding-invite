import { useState, useEffect, useRef } from 'react';

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
  const videoRef = useRef(null);

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
  }, [inviteOpen]);

  // FIX: Listen for user switching tabs or minimizing browser
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause whatever song is currently active
        if (sealAudio) sealAudio.pause();
        if (innerAudio) innerAudio.pause();
      } else {
        // Resume the correct song based on invitation status
        if (!inviteOpen && sealAudio) {
          sealAudio.play().catch(() => {});
        } else if (inviteOpen && innerAudio) {
          innerAudio.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          maxWidth: "430px",
          margin: "0 auto",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        <div 
          onClick={handleVideoClick}
          style={{
            height: '100vh',
            width: '100%',
            scrollSnapAlign: 'start',
            backgroundColor: '#000',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        <HeroSlide />
        <FamilySlide />
        <EventCards />
        <CountdownSection />
        <RSVPSlide />
        <FinalSlide />
      </div>
    </>
  );
}

export default App;