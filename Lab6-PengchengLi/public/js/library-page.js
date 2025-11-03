import { loadXmlDoc, renderDetail } from './libraries.js';

document.addEventListener('DOMContentLoaded', async () => {
  const id = document.body.dataset.id; 
  const xml = await loadXmlDoc('/data/library-data.kml');
  const mount = document.getElementById('library-detail');
  renderDetail(xml, id, mount);
});
