import { useState, useEffect } from 'react';

export default function CountdownSection() {
  const themeColor = '#4A3728';

  const createICSDataURI = () => {
    const calendarEvent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'URL:' + window.location.href,
      'DTSTART:20260822T090000Z',
      'DTEND:20260824T180000Z',
      'SUMMARY:' + "Praveena & Hari's Wedding Celebration",
      'DESCRIPTION:' + "We look forward to celebrating this beautiful new beginning with you!",
      'LOCATION:' + "Anantapur\\, Andhra Pradesh\\, India",
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarEvent)}`;
  };
  
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

  return (
    <div style={slideStyle}>
      <div style={{ maxWidth: '350px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <p style={{ fontStyle: 'italic', margin: '0 0 2px 0', fontSize: '1.05rem' }}>
          The countdown begins...
        </p>
        
        <h1 style={{ fontSize: '4.5rem', margin: '0', fontWeight: 'bold', lineHeight: '1' }}>
          {daysToGo}
        </h1>
        
        <p style={{ fontSize: '1.2rem', fontWeight: '600', letterSpacing: '2px', margin: '2px 0 0 0' }}>
          DAYS TO GO
        </p>
        
        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2.3rem', margin: '2px 0 10px 0' }}>
          For the Big Day!
        </p>

        {/* Universal Download target for device calendar integration */}
        <a href={createICSDataURI()} download="wedding-invite.ics" style={{ display: 'block', width: '100%', cursor: 'pointer' }}>
          <img 
            src="/calendar.jpg" 
            alt="August Calendar - Click to add to your calendar app" 
            style={calendarImageStyle} 
          />
        </a>
        
      </div>
    </div>
  );
}

const calendarImageStyle = {
  width: '100%',
  maxWidth: '260px', 
  height: 'auto',
  objectFit: 'contain',
  marginTop: '5px',
  mixBlendMode: 'multiply'
};