const express = require('express');
const router = express.Router();

const TRAKT_HEADERS = {
  'trakt-api-version': '2',
  'trakt-api-key': process.env.TRAKT_CLIENT_ID,
  'Content-Type': 'application/json',
};

router.get('/show/:showId', async (req, res) => {
  const { showId } = req.params;
  try {
    const url = `https://api.trakt.tv/shows/${showId}?extended=full`;
    const r = await fetch(url, { headers: TRAKT_HEADERS });
    if (!r.ok) throw new Error(`Trakt error ${r.status}`);
    const show = await r.json();

    res.render('show', {
      title: show.title || 'Untitled',
      year: show.year || 'N/A',
      tagline: show.tagline || '—',
      overview: show.overview || '暂无简介',
    });
  } catch (err) {
    console.error(err);
    res.render('show', { title: 'Error', year: '', tagline: '', overview: '加载失败，请稍后再试。' });
  }
});

module.exports = router;
