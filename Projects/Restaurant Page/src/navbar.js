export default function component() {
    const container = document.createElement('div');
    container.classList.add('navbar');
    const icon = document.createElement('div');
    const spacing = document.createElement('span');
    const home = document.createElement('div');
    const menu = document.createElement('div');
    const contact = document.createElement('div');
    home.classList.add('tab', 'current');
    menu.classList.add('tab');
    contact.classList.add('tab');
    icon.classList.add('icon');
    home.textContent = 'Home';
    menu.textContent = 'Menu';
    contact.textContent = 'Contact';
    container.appendChild(icon);
    container.appendChild(spacing);
    container.appendChild(home);
    container.appendChild(menu);
    container.appendChild(contact);

    return container;
}

