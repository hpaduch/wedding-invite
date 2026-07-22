import { useState } from 'react';
import { 
  Users, CheckCircle, XCircle, ShieldAlert, Trash2, Download, 
  Search, AlertTriangle, Filter, ArrowUpDown, PieChart 
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // --- New Advanced State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttending, setFilterAttending] = useState('all'); // 'all', 'yes', 'no'
  const [filterTeam, setFilterTeam] = useState('all'); // 'all', 'praveena', 'hari'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name', 'guests'

  const ADMIN_PASSWORD = "Letmein$123";
  const teamPraveenaColor = '#F06292'; 
  const teamHariColor = '#60A5FA';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchRSVPs();
    } else {
      alert("Incorrect passcode. Access Denied.");
    }
  };

  const fetchRSVPs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/rsvps');
      if (response.ok) {
        const data = await response.json();
        setRsvps(data);
      } else {
        console.error('Failed to fetch RSVPs');
      }
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRow = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the RSVP for ${name}?`)) return;
    try {
      const response = await fetch(`/api/rsvps?id=${id}`, { method: 'DELETE' });
      if (response.ok) fetchRSVPs();
    } catch (error) {
      console.error("Failed to delete row:", error);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("⚠️ WARNING: This will permanently delete ALL RSVPs. Are you sure?")) return;
    if (!window.confirm("FINAL WARNING: Once deleted, data cannot be recovered. Proceed?")) return;
    try {
      const response = await fetch('/api/rsvps?all=true', { method: 'DELETE' });
      if (response.ok) fetchRSVPs();
    } catch (error) {
      console.error("Failed to clear database:", error);
    }
  };

  const exportToCSV = () => {
    const headers = "Guest Name,Attending,Guests Count,Notes/Team\n";
    const csvData = rsvps.map(r => `"${r.name}","${r.attending}","${r.guests}","${r.notes || ''}"`).join('\n');
    const blob = new Blob([headers + csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Praveena_Hari_RSVPs.csv";
    link.click();
  };

  // --- Data Processing & Metrics ---
  const getTeam = (notes) => {
    if (!notes) return 'unknown';
    const lowerNotes = notes.toLowerCase();
    if (lowerNotes.includes('praveena')) return 'praveena';
    if (lowerNotes.includes('hari')) return 'hari';
    return 'unknown';
  };

  const totalResponses = rsvps.length;
  const attendingGuests = rsvps.filter(r => r.attending === 'yes');
  const totalAttendingCount = attendingGuests.reduce((acc, curr) => acc + curr.guests, 0);
  const totalDeclinedCount = rsvps.filter(r => r.attending === 'no').length;

  const praveenaGuestCount = attendingGuests.filter(r => getTeam(r.notes) === 'praveena').reduce((acc, r) => acc + r.guests, 0);
  const hariGuestCount = attendingGuests.filter(r => getTeam(r.notes) === 'hari').reduce((acc, r) => acc + r.guests, 0);

  // Calculate percentages for the visual chart
  const praveenaPercent = totalAttendingCount > 0 ? (praveenaGuestCount / totalAttendingCount) * 100 : 50;
  const hariPercent = totalAttendingCount > 0 ? (hariGuestCount / totalAttendingCount) * 100 : 50;

  // --- Applying Filters & Sorting ---
  let processedRsvps = [...rsvps].filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAttending = filterAttending === 'all' || r.attending === filterAttending;
    const matchesTeam = filterTeam === 'all' || getTeam(r.notes) === filterTeam;
    return matchesSearch && matchesAttending && matchesTeam;
  });

  processedRsvps.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'guests') return b.guests - a.guests; // Highest guest count first
    if (sortBy === 'oldest') return a.id - b.id; 
    return b.id - a.id; // Newest first (default)
  });

  if (!isAuthenticated) {
    return (
      <div style={authScreenStyle}>
        <div style={cardStyle}>
          <ShieldAlert size={40} color="#E57373" style={{ marginBottom: '15px' }} />
          <h2>Admin Access Only</h2>
          <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={btnStyle}>Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={dashboardContainerStyle}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.2rem', margin: 0 }}>
          RSVP Management
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportToCSV} style={{ ...actionBtnStyle, backgroundColor: '#4CAF50', color: 'white' }}>
            <Download size={16} /> Export CSV
          </button>
          <button onClick={handleClearAll} style={{ ...actionBtnStyle, backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2' }}>
            <AlertTriangle size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* Metrics & Chart Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
        
        {/* Number Cards */}
        <div style={{ display: 'flex', flex: '1 1 300px', gap: '15px' }}>
          <div style={metricCardStyle}>
            <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Total Responses</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{totalResponses}</div>
          </div>
          <div style={metricCardStyle}>
            <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Guests Attending</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'green' }}>{totalAttendingCount}</div>
          </div>
          <div style={metricCardStyle}>
            <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Declined</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E57373' }}>{totalDeclinedCount}</div>
          </div>
        </div>

        {/* Visual Team Chart */}
        <div style={{ ...metricCardStyle, flex: '1 1 300px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', width: '100%' }}>
            <span style={{ fontWeight: 'bold', color: teamPraveenaColor }}><PieChart size={14} style={{display: 'inline', verticalAlign: 'middle'}}/> Team Praveena: {praveenaGuestCount}</span>
            <span style={{ fontWeight: 'bold', color: teamHariColor }}>Team Hari: {hariGuestCount} <PieChart size={14} style={{display: 'inline', verticalAlign: 'middle'}}/></span>
          </div>
          <div style={{ width: '100%', height: '12px', borderRadius: '10px', display: 'flex', overflow: 'hidden', backgroundColor: '#eee' }}>
            <div style={{ width: `${praveenaPercent}%`, backgroundColor: teamPraveenaColor, transition: 'width 0.5s ease' }}></div>
            <div style={{ width: `${hariPercent}%`, backgroundColor: teamHariColor, transition: 'width 0.5s ease' }}></div>
          </div>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div style={controlsContainerStyle}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '32px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', padding: '0 10px', borderRadius: '6px', border: '1px solid #ccc' }}>
          <Filter size={16} color="#666" />
          <select value={filterAttending} onChange={(e) => setFilterAttending(e.target.value)} style={selectStyle}>
            <option value="all">All Statuses</option>
            <option value="yes">Attending</option>
            <option value="no">Declined</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', padding: '0 10px', borderRadius: '6px', border: '1px solid #ccc' }}>
          <Filter size={16} color="#666" />
          <select value={filterTeam} onChange={(e) => setFilterTeam(e.target.value)} style={selectStyle}>
            <option value="all">All Teams</option>
            <option value="praveena">Team Praveena</option>
            <option value="hari">Team Hari</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', padding: '0 10px', borderRadius: '6px', border: '1px solid #ccc' }}>
          <ArrowUpDown size={16} color="#666" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectStyle}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
            <option value="guests">Guest Count</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      {loading ? <p>Loading responses...</p> : (
        <div style={{ width: '100%', overflowX: 'auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#4A3728', color: 'white' }}>
                <th style={thTdStyle}>Guest Name</th>
                <th style={thTdStyle}>Attending?</th>
                <th style={thTdStyle}>Guests</th>
                <th style={thTdStyle}>Team</th>
                <th style={{ ...thTdStyle, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedRsvps.map((rsvp) => {
                const team = getTeam(rsvp.notes);
                const isPraveena = team === 'praveena';
                const isHari = team === 'hari';
                
                return (
                  <tr key={rsvp.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={thTdStyle}><strong>{rsvp.name}</strong></td>
                    <td style={thTdStyle}>
                      {rsvp.attending === 'yes' ?
                        <span style={{ color: 'green', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14}/> Yes</span> :
                        <span style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '4px' }}><XCircle size={14}/> No</span>
                      }
                    </td>
                    <td style={thTdStyle}>{rsvp.guests > 0 ? rsvp.guests : '-'}</td>
                    <td style={thTdStyle}>
                       {isPraveena && <span style={{ color: teamPraveenaColor, fontWeight: 'bold' }}>Team Praveena</span>}
                       {isHari && <span style={{ color: teamHariColor, fontWeight: 'bold' }}>Team Hari</span>}
                       {!isPraveena && !isHari && <span style={{ color: '#888' }}>-</span>}
                    </td>
                    <td style={{ ...thTdStyle, textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDeleteRow(rsvp.id, rsvp.name)}
                        style={{ background: 'none', border: 'none', color: '#E57373', cursor: 'pointer', padding: '4px' }}
                        title="Delete this RSVP"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {processedRsvps.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>No RSVPs match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Styles ---
const authScreenStyle = { height: '100dvh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', padding: '20px', boxSizing: 'border-box' };
const cardStyle = { background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '320px', textAlign: 'center' };
const inputStyle = { padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.9rem', outline: 'none' };
const selectStyle = { padding: '10px 4px', border: 'none', background: 'transparent', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' };
const btnStyle = { backgroundColor: '#4A3728', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const actionBtnStyle = { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', border: 'none', fontSize: '0.9rem' };
const dashboardContainerStyle = { padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', color: '#4A3728', fontFamily: 'sans-serif' };
const metricsGridStyle = { display: 'flex', gap: '15px', marginBottom: '20px' };
const metricCardStyle = { flex: 1, background: 'white', padding: '15px 20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' };
const controlsContainerStyle = { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px', padding: '15px', backgroundColor: '#fcfaf7', borderRadius: '8px', border: '1px solid #eadecf' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' };
const thTdStyle = { padding: '14px 15px', fontSize: '0.95rem' };