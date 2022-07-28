export default function component() {
    const container = document.createElement('div');
    container.classList += 'content';


    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = `Nelson's Restaurant Page`;

    container.appendChild(title);

    return container;
}