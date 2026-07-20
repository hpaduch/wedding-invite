export default function FamilySlide() {
  const slideStyle = {
    height: '100vh', 
    width: '100%',
    boxSizing: 'border-box',
    scrollSnapAlign: 'start',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    backgroundImage: 'url(/FamBackground.webp)',
    backgroundSize: 'cover', backgroundPosition: 'center',
    padding: '20px',
    paddingTop: '10vh',
    textAlign: 'center'
  };

  const imgStyle = {
    width: '90%',
    maxWidth: '400px',
    display: 'block',
    margin: '0 auto 20px auto',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
    WebkitMaskComposite: 'source-in',
    maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
    maskComposite: 'intersect'
  };

  // Helper for consistent name styling
  const nameStyle = { 
    fontSize: '3rem', 
    color: '#4a4a4a', 
    margin: '0', 
    fontFamily: '"Great Vibes", cursive', // Applied calligraphy font
    fontWeight: 'normal' 
  };

  return (
    <>
      {/* Slide 1: Bride's Family */}
      <div style={slideStyle}>
        <img src="/BrideFam.webp" alt="Praveena's Family" style={imgStyle} />
        <h2 style={nameStyle}>Praveena</h2>
        <p style={{ fontStyle: 'italic', color: '#7a7a7a', margin: '8px 0', fontFamily: 'Cormorant, serif' }}>D/o</p>
        <div style={{ color: '#4a4a4a', fontWeight: '600', letterSpacing: '0.5px' }}>
          <p style={{ margin: '2px 0' }}>Smt. S. MANJULA</p>
          <p style={{ margin: '2px 0' }}>Sri. S. KEDARNATH</p>
        </div>
      </div>

      {/* Slide 2: Groom's Family */}
      <div style={slideStyle}>
        <img src="/GroomFam.webp" alt="Hari's Family" style={imgStyle} />
        <h2 style={nameStyle}>Hari</h2>
        <p style={{ fontStyle: 'italic', color: '#7a7a7a', margin: '8px 0', fontFamily: 'Cormorant, serif' }}>S/o</p>
        <div style={{ color: '#4a4a4a', fontWeight: '600', letterSpacing: '0.5px' }}>
          <p style={{ margin: '2px 0' }}>Smt. P. NAGARANI</p>
          <p style={{ margin: '2px 0' }}>Sri. P. NARENDRA BABU</p>
        </div>
      </div>
    </>
  );
}