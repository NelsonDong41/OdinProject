import NavBar from './index';

const bar = new NavBar('Home', 'About', 'Settings');

document.querySelector('body').appendChild(bar.container);
