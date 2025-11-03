export async function loadXmlDoc(path) {
  const res = await fetch(path);
  const text = await res.text();
  const parser = new DOMParser();
  return parser.parseFromString(text, 'application/xml');
}

export function renderList (xml,mount){
    const xmlPlacemark = xml.querySelectorAll("Placemark");
    xmlPlacemark.forEach(pm => {
        const name = pm.querySelector("name")?.textContent ?? 'Unknown';
        const description = pm.querySelector("description")?.textContent ?? 'Unknown';
        const id = pm.getAttribute("id") ?? 'Unknown';

        const div = document.createElement('div');
        div.innerHTML = `
        <h2><a href="/library/${id}">${name}</a></h2>
        <p>${description}</p>
        `;
        mount.appendChild(div);
    });
};

export function renderDetail (xml,mount,id){
    const pm = xml.getElementById(id);
    if(!id){
        mount.textContent = 'NOT FOUND';
        return;
    }
    const name = pm.querySelector('name')?.textContent ?? '';
    const desc = pm.querySelector('description')?.textContent ?? '';
    
    mount.innerHTML = `<h1>${name}</h1><p>${desc}</p>`;
}