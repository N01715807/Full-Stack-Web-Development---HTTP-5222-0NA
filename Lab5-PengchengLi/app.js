const express = require('express'); 
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (!process.env.TRAKT_CLIENT_ID) {
  throw new Error('Missing TRAKT_CLIENT_ID in .env');
}

app.use(cors()); 
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });

app.get('/health',(req, res)=>{
    res.json({
        ok: true,
        env: process.env.NODE_ENV || 'dev'
    });
});

app.get('/',(req,res)=>{
    res.render('index');
});

const BASE = 'https://api.trakt.tv';
const HEADERS = {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': process.env.TRAKT_CLIENT_ID,
}
app.get('/movies/trending', async (req, res) =>{
    const url = `${BASE}/movies/trending?limit=10&extended=full,images`;
    const r = await fetch(url,{headers:HEADERS});
    const data = await r.json();
    res.json(data)
});

app.use('/', require('./routes/show'));
app.use('/', require('./routes/anticipated'));

