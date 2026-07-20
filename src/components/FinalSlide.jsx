import { motion } from 'framer-motion';

export default function FinalSlide() {
  const themeColor = '#4A3728';

  // Universal ICS file generator string
  const createICSDataURI = () => {
    const calendarEvent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'URL:' + window.location.href,
      'DTSTART:20260822T090000Z',  // Aug 22, 2026
      'DTEND:20260824T180000Z',    // Aug 24, 2026
      'SUMMARY:' + "Praveena & Hari's Wedding Celebration",
      'DESCRIPTION:' + "We look forward to celebrating this beautiful new beginning with you!",
      'LOCATION:' + "Anantapur\\, Andhra Pradesh\\, India",
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarEvent)}`;
  };

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

  return (
    <div style={slideStyle}>
      <div style={{ zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '340px' }}>
        
        {/* Names Stacked Vertically with Heart */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '25px', width: '100%' }}>
          <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: '4.2rem', fontWeight: 'normal', lineHeight: '1' }}>
            Praveena
          </span>
          
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ color: '#E31C25', fontSize: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}
          >
            ♥
          </motion.div>
          
          <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: '4.2rem', fontWeight: 'normal', lineHeight: '1' }}>
            Hari
          </span>
        </div>

        {/* Invitation Message */}
        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.6', margin: '10px 0 30px 0', padding: '0 5px' }}>
          "Your love, presence, and blessings mean the world to us. We look forward to celebrating this beautiful new beginning with you!"
        </p>

        {/* Event Info Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Interactive Date Pill for Native Calendars */}
          <a 
            href={createICSDataURI()} 
            download="wedding-invite.ics"
            style={{ ...pillStyle, cursor: 'pointer', textDecoration: 'none', color: themeColor }}
            title="Click to add to your calendar app"
          >
            📅 August 23
          </a>
          <span style={pillStyle}>Anantapur</span>
          <span style={pillStyle}>2026</span>
        </div>
      </div>
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