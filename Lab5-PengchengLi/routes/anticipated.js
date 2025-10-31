const express = require('express');
const router = express.Router();

const TRAKT_HEADERS = {
  'trakt-api-version': '2',
  'trakt-api-key': process.env.TRAKT_CLIENT_ID,
  'Content-Type': 'application/json',
};

router.get('/anticipated', async (req, res) => {
  try {
    const url = 'https://api.trakt.tv/shows/anticipated?limit=20&page=1';
    const r = await fetch(url, { headers: TRAKT_HEADERS });
    if (!r.ok) throw new Error(`Trakt error ${r.status}`);
    const data = await r.json();

    const items = data.map(x => ({
      title: x.show?.title ?? 'Untitled',
      year: x.show?.year ?? 'N/A',
      slug: x.show?.ids?.slug ?? ''
    }));

    res.render('anticipated', { items });
  } catch (err) {
    console.error(err);
    res.render('anticipated', { items: [], error: '加载失败，请稍后再试。' });
  }
});

module.exports = router;
