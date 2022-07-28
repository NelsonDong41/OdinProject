export default function component() {
    const container = document.createElement('div');
    container.classList += 'content';
    
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = "Menu";
    container.appendChild(title);

    for (let i = 0; i < 8; i++) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menuItem');

        const itemName = document.createElement('h1');
        itemName.textContent = `Menu Item #${i}`;
        const itemDesc = document.createElement('p');
        itemDesc.textContent = 'Default Description for menu item. Blah blah it tastes mad bustin yo';

        menuItem.appendChild(itemName);
        menuItem.appendChild(itemDesc);
        container.appendChild(menuItem);
    }
    return container;
}