import { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Phone, ArrowRightLeft } from 'lucide-react'; 

export default function RsvpSection() {
  const [side, setSide] = useState(null); 
  const [name, setName] = useState(''); 
  const [attending, setAttending] = useState('yes'); 
  // FIX: Set to an empty string so the placeholder text is visible
  const [guests, setGuests] = useState(''); 
  
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
    
    // Fallback: If they leave it blank, assume 1 guest
    const guestCount = parseInt(guests) || 1;
    
    try {
      await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          attending,
          guests: attending === 'yes' ? guestCount : 0,
          notes: `Cheering for Team ${side}`
        })
      });
    } catch (error) {
      console.error('Database sync failed, moving directly to WhatsApp:', error);
    }

    const statusText = attending === 'yes' ? 'Joyfully Yes' : 'Regretfully No';

    let text = `*--- WEDDING CELEBRATION ---*\n\n`;
    text += `Woohoo! Counting down the days to celebrate with you both! I'm officially locking in my vote for *Team ${side}*.\n\n`;
    text += `*Guest:* ${name}\n`;
    text += `*Status:* ${statusText}\n`;

    if (attending === 'yes') {
      text += `*Bringing:* ${guestCount} person(s) total\n`;
    } else {
      text += `\nSending you both so much love and blessings from afar!\n`;
    }
    
    text += `\n_Looking forward to the big day!_`;
    
    setIsSubmitted(true);
    setIsSubmitting(false);

    const contactNumber = side === 'Praveena' ? '919502683695' : '917893959094';
    window.location.href = `https://wa.me/${contactNumber}?text=${encodeURIComponent(text)}`;
  };

  const slideStyle = { 
    position: 'relative', 
    minHeight: '100dvh', 
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
    boxSizing: 'border-box',
    overflow: 'hidden'
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const ScrollArrow = () => (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ delay: 2, duration: 1 }} 
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
          stroke="#4A3728" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </motion.div>
    </motion.div>
  );

  return (
    <div style={slideStyle}> 
      <div style={{ maxWidth: '400px', width: '100%' }}> 
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            style={{ background: 'rgba(255,255,255,0.85)', padding: '30px', borderRadius: '16px', marginTop: '20px' }}
          > 
            <h2 style={{ color: side === 'Praveena' ? teamPraveenaColor : teamHariColor, fontSize: '2.2rem', fontFamily: 'Great Vibes, cursive', marginBottom: '10px' }}> 
              Thank You!
            </h2>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Your response has been logged and sent over WhatsApp!</p> 
          </motion.div>
        ) : !side ? (
          <>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ staggerChildren: 0.2 }}
            >
              <motion.p variants={textAnimation} style={{ fontStyle: 'italic', marginBottom: '5px' }}>A little friendly rivalry...</motion.p> 
              <motion.h1 variants={textAnimation} style={{ fontSize: '3.5rem', margin: '0 0 10px 0', fontFamily: 'Great Vibes, cursive' }}>Pick your Side</motion.h1> 
              <motion.p variants={textAnimation} style={{ marginBottom: '40px', fontSize: '1.1rem', fontWeight: '500' }}>Whose side are you cheering for?</motion.p> 
            </motion.div>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>  
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
                <img src="/bride.jpg" alt="Bride" style={imageStyle} />  
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
                <img src="/groom.jpg" alt="Groom" style={imageStyle} />  
                <p style={{ margin: '10px 0 0', fontWeight: 'bold', color: teamHariColor }}>Team Hari</p> 
              </div>
            </div>
          </>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.15 }}
            style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >  
            <motion.h2 variants={textAnimation} style={{ fontSize: '2.5rem', fontFamily: 'Great Vibes, cursive', marginBottom: '25px', color: side === 'Praveena' ? teamPraveenaColor : teamHariColor }}>  
              Team {side}!  
            </motion.h2>
            
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>  
              <motion.input 
                variants={textAnimation}
                placeholder="Your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={inputStyle} 
              />
              
              <motion.div variants={textAnimation} style={{ display: 'flex', gap: '10px', marginBottom: '15px', width: '100%' }}>  
                <button onClick={() => setAttending('yes')} style={toggleBtn(attending === 'yes', side, teamPraveenaColor, teamHariColor)}>  
                  Joyfully Yes  
                </button>
                <button onClick={() => setAttending('no')} style={toggleBtn(attending === 'no', side, teamPraveenaColor, teamHariColor)}>  
                  Regretfully No  
                </button>
              </motion.div>
              
              {attending === 'yes' && ( 
                <motion.input 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  type="number" 
                  min="1" 
                  placeholder="Number of Guests" 
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)} 
                  style={inputStyle} 
                />
              )}
              
              <motion.button variants={textAnimation} disabled={isSubmitting} onClick={handleRSVPFlow} style={rsvpBtn(side, teamPraveenaColor, teamHariColor)}> 
                {isSubmitting ? 'Processing...' : 'Send via WhatsApp'} 
              </motion.button> 

              <motion.a 
                variants={textAnimation}
                href={`tel:+${side === 'Praveena' ? '919502683695' : '917893959094'}`} 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '18px', 
                  color: themeColor, 
                  textDecoration: 'none', 
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  background: 'rgba(255, 255, 255, 0.75)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Phone size={15} /> Or call directly instead
              </motion.a>
            </div>

            <motion.button variants={textAnimation} onClick={() => setSide(null)} style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.75)', 
                border: 'none', 
                textDecoration: 'none', 
                cursor: 'pointer', 
                marginTop: '15px', 
                color: themeColor, 
                fontSize: '0.9rem',
                fontWeight: '600',
                padding: '6px 16px',
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(4px)'
              }}>  
              <ArrowRightLeft size={15} /> Switch sides  
            </motion.button>
          </motion.div>
        )}
      </div>

      {isSubmitted && <ScrollArrow />}
    </div>
  );
}

const clickableCard = { width: '150px', padding: '20px 10px', background: '#ffffff', border: '1px solid rgba(74, 55, 40, 0.15)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', borderRadius: '16px', transition: 'all 0.3s ease-in-out', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }; 
const imageStyle = { width: '70px', height: '70px', objectFit: 'contain', mixBlendMode: 'multiply' }; 
const inputStyle = { width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid rgba(74, 55, 40, 0.3)', background: 'rgba(255, 255, 255, 0.85)', color: '#4A3728', fontSize: '1rem', boxSizing: 'border-box' }; 
const toggleBtn = (active, side, pinkColor, blueColor) => ({ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid transparent', cursor: 'pointer', fontWeight: active ? 'bold' : '500', background: active ? (side === 'Praveena' ? pinkColor : blueColor) : 'rgba(255, 255, 255, 0.6)', color: active ? '#fff' : '#4A3728', boxShadow: active ? '0 4px 10px rgba(0,0,0,0.15)' : 'none', transition: 'all 0.2s ease' }); 
const rsvpBtn = (side, pinkColor, blueColor) => ({ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: side === 'Praveena' ? pinkColor : blueColor, color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' });