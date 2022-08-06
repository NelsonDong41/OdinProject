function createHamburger() {
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  for (let i = 0; i < 3; i += 1) {
    const line = document.createElement('span');
    hamburger.appendChild(line);
  }
  return hamburger;
}

function createTabs(...tabs) {
  const tabContainer = document.createElement('div');
  tabContainer.classList.add('tabContainer');
  tabs.forEach((tab) => {
    const tabDiv = document.createElement('div');
    tabDiv.classList.add('tab');
    const text = document.createElement('p');
    text.textContent = tab;
    tabDiv.appendChild(text);
    tabContainer.appendChild(tabDiv);
  });
  return tabContainer;
}

function build(tabs) {
  this.container.classList.add('container');

  const hamburger = createHamburger();
  const tabContainer = createTabs(...tabs);

  this.container.append(hamburger, tabContainer);
}

export default class navBar {
  constructor(...tabs) {
    this.tabs = [...tabs];
    this.container = document.createElement('section');
    build(tabs);
  }

  get container() {
    return this.container;
  }
}
