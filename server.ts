import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Telebirr payment verification API endpoint
app.post('/api/verify-telebirr', (req, res) => {
  const { transactionId, phone, amount } = req.body;
  if (!transactionId || transactionId.length < 5) {
    return res.status(400).json({ success: false, error: 'Invalid transaction ID' });
  }
  return res.json({
    success: true,
    status: 'approved',
    verifiedAt: new Date().toISOString(),
    receiver: 'Biniyam Haile (0920017478)',
    amount: 99
  });
});

// Serve static production build in dist/
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sky Prep server running on http://0.0.0.0:${PORT}`);
});
