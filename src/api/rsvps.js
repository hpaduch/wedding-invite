import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Handle POST request: Save a new RSVP from a guest
  if (req.method === 'POST') {
    const { name, attending, guests, notes } = req.body;
    try {
      await sql`
        INSERT INTO rsvps (name, attending, guests, notes) 
        VALUES (${name}, ${attending}, ${guests}, ${notes})
      `;
      return res.status(200).json({ message: 'RSVP saved successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Handle GET request: Fetch all RSVPs for your Admin Dashboard
  if (req.method === 'GET') {
    try {
      const { rows } = await sql`SELECT * FROM rsvps ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Reject any other HTTP methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}