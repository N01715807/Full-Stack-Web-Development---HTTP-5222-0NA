import { loadXmlDoc, renderList } from './libraries.js';

document.addEventListener('DOMContentLoaded', async () => {
  const xml = await loadXmlDoc('/data/library-data.kml');
  const mount = document.getElementById('libraries-list');
  renderList(xml, mount);
});
