import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventCards() {
  const events = [
    {
      name: "Reception",
      label: "An Evening of Celebration",
      nameColor: "#f0c848",
      date: "22 August 2026",
      dateTime: "20260822T190000Z", 
      time: "7:00 PM",
      venue: "Dwaraka Convention Hall",
      desc: "A joyous evening of music, laughter, and heartfelt blessings. We invite you to share in our happiness as we embark on this new chapter of togetherness.",
      mapsUrl: "https://maps.app.goo.gl/99SjYxw4eeyYBCtn6",
      calligraphyFont: '"Pinyon Script", cursive',
      bgImage: "/Reception.jpg"
    },
    {
      name: "Wedding",
      label: "The Sacred Union",
      nameColor: "#E57373",
      date: "23 August 2026",
      dateTime: "20260823T103000Z", 
      time: "10:30 AM",
      venue: "Dwaraka Convention Hall",    
      desc: "Witness our sacred union as we perform the traditional rituals, pledging our lives to each other amidst the holy chants of the Muhurtham.",
      mapsUrl: "https://maps.app.goo.gl/your-link",
      calligraphyFont: '"Great Vibes", cursive',
      bgImage: "/wedding-bg.jpg"
    }
  ];

  // Standardized text animation
  const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Reusable delayed arrow for the event slides (White for dark backgrounds)
  const ScrollArrow = () => (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ delay: 5, duration: 1 }}
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
          stroke="rgba(255, 255, 255, 0.9)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.6))' }}
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {events.map((event, index) => (
        <div key={index} style={{
          position: 'relative', // NEW: Required to anchor the absolute animated arrow
          height: '100vh', width: '100%', scrollSnapAlign: 'start',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${event.bgImage})`,
          backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          color: 'white', textAlign: 'center', padding: '0 20px', boxSizing: 'border-box'
        }}>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
          >
            <motion.p variants={textAnimation} style={{ color: event.nameColor, fontSize: '2.5rem', marginBottom: '5px', fontFamily: event.calligraphyFont }}>
              {event.label}
            </motion.p>
            
            <motion.h1 variants={textAnimation} style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: '700', fontSize: '3.5rem', margin: '0 0 15px 0' }}>
              {event.name}
            </motion.h1>
            
            <motion.div variants={textAnimation} style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center', marginBottom: '25px', fontFamily: '"Space Mono", monospace', fontSize: '0.9rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} /> <span>{event.date}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} /> <span>{event.time}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} /> <span>{event.venue}</span>
                </div>
                <a 
                  href={event.mapsUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{
                    backgroundColor: event.nameColor, color: '#000', textDecoration: 'none',
                    padding: '8px 18px', borderRadius: '20px', fontWeight: 'bold', 
                    display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginTop: '4px'
                  }}
                >
                  <MapPin size={14} /> Open in Maps
                </a>
              </div>
            </motion.div>
            
            <motion.p variants={textAnimation} style={{ maxWidth: '85%', lineHeight: '1.6', margin: '5px 0 0 0', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.2rem' }}>
              {event.desc}
            </motion.p>
          </motion.div>

          {/* Mounts the arrow on both event slides */}
          <ScrollArrow />
        </div>
      ))}
    </>
  );
}