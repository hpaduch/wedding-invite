import { useState } from 'react'; //[cite: 4]
import { Users, CheckCircle, XCircle, ShieldAlert } from 'lucide-react'; //[cite: 4]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //[cite: 4]
  const [password, setPassword] = useState(''); //[cite: 4]
  const [rsvps, setRsvps] = useState([]); //[cite: 4]
  const [loading, setLoading] = useState(false); //[cite: 4]

  const ADMIN_PASSWORD = "OurWedding2026"; //[cite: 4]

  const handleLogin = (e) => { //[cite: 4]
    e.preventDefault(); //[cite: 4]
    if (password === ADMIN_PASSWORD) { //[cite: 4]
      setIsAuthenticated(true); //[cite: 4]
      fetchRSVPs(); //[cite: 4]
    } else {
      alert("Incorrect passcode. Access Denied."); //[cite: 4]
    }
  };

  const fetchRSVPs = async () => {
    setLoading(true); //[cite: 4]
    try {
      const response = await fetch('/api/rsvps');
      if (response.ok) {
        const data = await response.json();
        setRsvps(data);
      } else {
        console.error('Failed to fetch RSVPs');
      }
    } catch (error) {
      console.error("Error fetching RSVPs:", error); //[cite: 4]
    } finally {
      setLoading(false); //[cite: 4]
    }
  };

  const totalAttending = rsvps.reduce((acc, curr) => curr.attending === 'yes' ? acc + curr.guests : acc, 0); //[cite: 4]
  const totalDeclined = rsvps.filter(r => r.attending === 'no').length; //[cite: 4]

  if (!isAuthenticated) { //[cite: 4]
    return (
      <div style={authScreenStyle}> {/*[cite: 4] */}
        <div style={cardStyle}> {/*[cite: 4] */}
          <ShieldAlert size={40} color="#E57373" style={{ marginBottom: '15px' }} /> {/*[cite: 4] */}
          <h2>Admin Access Only</h2> {/*[cite: 4] */}
          <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}> {/*[cite: 4] */}
            <input //[cite: 4]
              type="password" //[cite: 4]
              placeholder="Enter Admin Passcode" //[cite: 4]
              value={password} //[cite: 4]
              onChange={(e) => setPassword(e.target.value)} //[cite: 4]
              style={inputStyle} //[cite: 4]
            />
            <button type="submit" style={btnStyle}>Unlock Dashboard</button> {/*[cite: 4] */}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={dashboardContainerStyle}> {/*[cite: 4] */}
      <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', marginBottom: '20px' }}> {/*[cite: 4] */}
        RSVP Management Center {/*[cite: 4] */}
      </h1>

      <div style={metricsGridStyle}> {/*[cite: 4] */}
        <div style={metricCardStyle}><Users size={20} /> <strong>{totalAttending}</strong> Attending</div> {/*[cite: 4] */}
        <div style={metricCardStyle}><XCircle size={20} color="#E57373" /> <strong>{totalDeclined}</strong> Declined</div> {/*[cite: 4] */}
      </div>

      {loading ? <p>Loading responses...</p> : ( //[cite: 4]
        <div style={{ width: '100%', overflowX: 'auto', marginTop: '20px' }}> {/*[cite: 4] */}
          <table style={tableStyle}> {/*[cite: 4] */}
            <thead>
              <tr style={{ backgroundColor: '#4A3728', color: 'white' }}> {/*[cite: 4] */}
                <th style={thTdStyle}>Guest Name</th> {/*[cite: 4] */}
                <th style={thTdStyle}>Attending?</th> {/*[cite: 4] */}
                <th style={thTdStyle}>Count</th> {/*[cite: 4] */}
                <th style={thTdStyle}>Notes / Team</th> {/*[cite: 4] */}
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => ( //[cite: 4]
                <tr key={rsvp.id} style={{ borderBottom: '1px solid #ddd' }}> {/*[cite: 4] */}
                  <td style={thTdStyle}>{rsvp.name}</td> {/*[cite: 4] */}
                  <td style={thTdStyle}> {/*[cite: 4] */}
                    {rsvp.attending === 'yes' ? //[cite: 4]
                      <span style={{ color: 'green', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14}/> Yes</span> : //[cite: 4]
                      <span style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '4px' }}><XCircle size={14}/> No</span> //[cite: 4]
                    }
                  </td>
                  <td style={thTdStyle}>{rsvp.guests}</td> {/*[cite: 4] */}
                  <td style={{ ...thTdStyle, fontStyle: 'italic', color: '#666' }}>{rsvp.notes || '-'}</td> {/*[cite: 4] */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const authScreenStyle = { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', padding: '20px', boxSizing: 'border-box' }; //[cite: 4]
const cardStyle = { background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '320px', textAlign: 'center' }; //[cite: 4]
const inputStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem', textAlign: 'center' }; //[cite: 4]
const btnStyle = { backgroundColor: '#4A3728', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }; //[cite: 4]
const dashboardContainerStyle = { padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: '#4A3728', fontFamily: 'sans-serif' }; //[cite: 4]
const metricsGridStyle = { display: 'flex', gap: '15px', marginBottom: '20px' }; //[cite: 4]
const metricCardStyle = { flex: 1, background: '#fcfaf7', padding: '15px', borderRadius: '8px', border: '1px solid #eadecf', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }; //[cite: 4]
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '10px', textAlign: 'left', minWidth: '500px' }; //[cite: 4]
const thTdStyle = { padding: '12px 15px', borderBottom: '1px solid #eee', fontSize: '0.9rem' }; //[cite: 4]