const items = []

function addItem(item) {
    items.push(item);
}

function getCount() {
    return items.length;
}

export { addItem, getCount };