import { Calendar, MapPin, Clock } from 'lucide-react';

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

  // 1. Updated: Blob-based ICS generator
  const downloadICS = (e, event) => {
    e.preventDefault();
    const calendarEvent = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      `DTSTART:${event.dateTime}`,
      `DTEND:${event.dateTime.substring(0, 9)}T220000Z`, 
      `SUMMARY:${event.name} - Praveena & Hari`,
      `DESCRIPTION:${event.desc}`,
      `LOCATION:${event.venue}`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([calendarEvent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.setAttribute('download', `${event.name.toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // 2. New: Google Calendar Link generator
  const getGoogleCalendarUrl = (event) => {
    const gCalUrl = new URL('https://calendar.google.com/calendar/render');
    gCalUrl.searchParams.append('action', 'TEMPLATE');
    gCalUrl.searchParams.append('text', `${event.name} - Praveena & Hari`);
    gCalUrl.searchParams.append('dates', `${event.dateTime}/${event.dateTime.substring(0, 9)}T220000Z`);
    gCalUrl.searchParams.append('details', event.desc);
    gCalUrl.searchParams.append('location', event.venue);
    return gCalUrl.toString();
  };

  return (
    <>
      {events.map((event, index) => (
        <div key={index} style={{
          height: '100vh', width: '100%', scrollSnapAlign: 'start',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${event.bgImage})`,
          backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          color: 'white', textAlign: 'center', padding: '0 20px', boxSizing: 'border-box'
        }}>
          
          <p style={{ color: event.nameColor, fontSize: '2.5rem', marginBottom: '5px', fontFamily: event.calligraphyFont }}>
            {event.label}
          </p>
          
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: '700', fontSize: '3.5rem', margin: '0 0 15px 0' }}>
            {event.name}
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center', marginBottom: '25px', fontFamily: '"Space Mono", monospace', fontSize: '0.9rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} /> <span>{event.date}</span>
              </div>
              
              {/* Added a small container to hold both Apple/Outlook and Google calendar buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button 
                  onClick={(e) => downloadICS(e, event)} 
                  style={calendarButtonStyle}
                >
                  Apple / Outlook
                </button>
                <a 
                  href={getGoogleCalendarUrl(event)} 
                  target="_blank" 
                  rel="noreferrer"
                  style={calendarButtonStyle}
                >
                  Google Calendar
                </a>
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
          </div>
          
          <p style={{ maxWidth: '85%', lineHeight: '1.6', margin: '5px 0 0 0', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.2rem' }}>
            {event.desc}
          </p>
        </div>
      ))}
    </>
  );
}

const calendarButtonStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  textDecoration: 'none',
  padding: '6px 14px',
  borderRadius: '15px',
  fontSize: '0.75rem',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  fontWeight: '500',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  fontFamily: '"Space Mono", monospace'
};