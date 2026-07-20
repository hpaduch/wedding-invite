import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function RsvpSection() {
  const [side, setSide] = useState(null); 
  const [name, setName] = useState(''); 
  const [attending, setAttending] = useState('yes'); 
  const [guests, setGuests] = useState('1'); 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const themeColor = '#4A3728'; 
  const teamPraveenaColor = '#F06292'; 
  const teamHariColor = '#60A5FA';     

  const handleSelectSide = (selectedSide) => { 
    setSide(selectedSide); 
    confetti({ 
      particleCount: 150, 
      spread: 70, 
      origin: { y: 0.6 }, 
      colors: [selectedSide === 'Praveena' ? teamPraveenaColor : teamHariColor] 
    });
  };

const handleRSVPFlow = async () => {
    if (!name.trim()) return alert("Please enter your name."); 
    
    setIsSubmitting(true);
    
    // 1. Silent background DB log
    try {
      await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          attending,
          guests: attending === 'yes' ? parseInt(guests) || 1 : 0,
          notes: `Cheering for Team ${side}`
        })
      });
    } catch (error) {
      console.error('Database sync failed, moving directly to WhatsApp:', error);
    }

    const statusText = attending === 'yes' ? 'Joyfully Yes' : 'Regretfully No';

    // 2. Build a clean, emoji-free text layout using elegant typography
    let text = `*--- WEDDING CELEBRATION ---*\n\n`;
    text += `Woohoo! Counting down the days to celebrate with you both! I'm officially locking in my vote for *Team ${side}*.\n\n`;
    text += `*Guest:* ${name}\n`;
    text += `*Status:* ${statusText}\n`;

    if (attending === 'yes') {
      text += `*Bringing:* ${guests} person(s) total\n`;
    } else {
      text += `\nSending you both so much love and blessings from afar!\n`;
    }
    
    text += `\n_Looking forward to the big day!_`;
    
    // Update loading states before navigating away
    setIsSubmitted(true);
    setIsSubmitting(false);

    // FIX: Use window.location.href instead of window.open to bypass mobile popup blockers
    window.location.href = `https://wa.me/917893959094?text=${encodeURIComponent(text)}`;
  };

  const slideStyle = { 
    minHeight: '100vh', 
    width: '100%', 
    scrollSnapAlign: 'start', 
    backgroundImage: 'url(/Animated.webp)', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    padding: '18vh 20px 0', 
    color: themeColor, 
    textAlign: 'center', 
    boxSizing: 'border-box' 
  };

  return (
    <div style={slideStyle}> {/* */}
      <div style={{ maxWidth: '400px', width: '100%' }}> {/* */}
        {isSubmitted ? (
          <div style={{ background: 'rgba(255,255,255,0.85)', padding: '30px', borderRadius: '16px', marginTop: '20px' }}> {/* */}
            <h2 style={{ color: side === 'Praveena' ? teamPraveenaColor : teamHariColor, fontSize: '2.2rem', fontFamily: 'Great Vibes, cursive', marginBottom: '10px' }}> {/* */}
              Thank You!
            </h2>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Your response has been logged and sent over WhatsApp!</p> {/* */}
          </div>
        ) : !side ? (
          <>
            <p style={{ fontStyle: 'italic', marginBottom: '5px' }}>A little friendly rivalry...</p> 
            <h1 style={{ fontSize: '3.5rem', margin: '0 0 10px 0', fontFamily: 'Great Vibes, cursive' }}>Pick your Side</h1> 
            <p style={{ marginBottom: '40px', fontSize: '1.1rem', fontWeight: '500' }}>Whose side are you cheering for?</p> 
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>  {/* */}
              <div  
                onClick={() => handleSelectSide('Praveena')} 
                style={clickableCard} 
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-6px)'; 
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)'; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'; 
                }}
              >
                <img src="/bride.jpg" alt="Bride" style={imageStyle} />  {/* */}
                <p style={{ margin: '10px 0 0', fontWeight: 'bold', color: teamPraveenaColor }}>Team Praveena</p> 
              </div>

              <div 
                onClick={() => handleSelectSide('Hari')} 
                style={clickableCard} 
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-6px)'; 
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)'; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'; 
                }}
              >
                <img src="/groom.jpg" alt="Groom" style={imageStyle} />  {/* */}
                <p style={{ margin: '10px 0 0', fontWeight: 'bold', color: teamHariColor }}>Team Hari</p> 
              </div>
            </div>
          </>
        ) : (
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>  {/* */}
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'Great Vibes, cursive', marginBottom: '25px', color: side === 'Praveena' ? teamPraveenaColor : teamHariColor }}>  {/* */}
              Team {side}!  {/* */}
            </h2>
            
            <div style={{ width: '100%', maxWidth: '320px' }}>  {/* */}
              <input 
                placeholder="Your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={inputStyle} 
              />
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>  {/* */}
                <button onClick={() => setAttending('yes')} style={toggleBtn(attending === 'yes', side, teamPraveenaColor, teamHariColor)}>  {/* */}
                  Joyfully Yes  {/* */}
                </button>
                <button onClick={() => setAttending('no')} style={toggleBtn(attending === 'no', side, teamPraveenaColor, teamHariColor)}>  {/* */}
                  Regretfully No  {/* */}
                </button>
              </div>
              
              {attending === 'yes' && ( 
                <input 
                  type="number" 
                  min="1" 
                  placeholder="Number of Guests" 
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)} 
                  style={inputStyle} 
                />
              )}
              
              <button disabled={isSubmitting} onClick={handleRSVPFlow} style={rsvpBtn(side, teamPraveenaColor, teamHariColor)}> {/* */}
                {isSubmitting ? 'Processing...' : 'Send RSVP via WhatsApp'} {/* */}
              </button> {/* */}

              <a 
                href="tel:+917893959094" 
                style={{ 
                  display: 'inline-block', 
                  marginTop: '18px', 
                  color: themeColor, 
                  textDecoration: 'underline', 
                  fontSize: '0.95rem',
                  fontWeight: '500' 
                }}
              >
                Or call directly instead
              </a>
            </div>

            <button onClick={() => setSide(null)} style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', marginTop: '20px', color: themeColor, fontSize: '1rem' }}>  {/* */}
              Switch sides  {/* */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const clickableCard = { width: '150px', padding: '20px 10px', background: '#ffffff', border: '1px solid rgba(74, 55, 40, 0.15)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', borderRadius: '16px', transition: 'all 0.3s ease-in-out', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }; 
const imageStyle = { width: '70px', height: '70px', objectFit: 'contain', mixBlendMode: 'multiply' }; 
const inputStyle = { width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid rgba(74, 55, 40, 0.3)', background: 'rgba(255, 255, 255, 0.85)', color: '#4A3728', fontSize: '1rem', boxSizing: 'border-box' }; 
const toggleBtn = (active, side, pinkColor, blueColor) => ({ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid transparent', cursor: 'pointer', fontWeight: active ? 'bold' : '500', background: active ? (side === 'Praveena' ? pinkColor : blueColor) : 'rgba(255, 255, 255, 0.6)', color: active ? '#fff' : '#4A3728', boxShadow: active ? '0 4px 10px rgba(0,0,0,0.15)' : 'none', transition: 'all 0.2s ease' }); 
const rsvpBtn = (side, pinkColor, blueColor) => ({ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: side === 'Praveena' ? pinkColor : blueColor, color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' });