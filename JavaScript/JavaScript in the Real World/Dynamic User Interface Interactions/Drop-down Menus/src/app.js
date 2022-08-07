import NavBar from './index';

const bar = new NavBar('Home', 'About', 'Settings');

document.querySelector('body').appendChild(bar.getContainer());

const newBar = new NavBar("one", "two", "three", "four", "five");

document.querySelector('body').appendChild(newBar.getContainer());