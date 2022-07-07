let body = document.querySelector("#container");

let p =  document.createElement("p");
p.textContent= "Hey I'm red!";
p.style['color'] = "red";
body.appendChild(p);

let h3 = document.createElement("h3");
h3.textContent = "I'm a blue h3!";
h3.setAttribute('style', 'color: blue;');
body.appendChild(h3);

let div = document.createElement("div");
let h1 = document.createElement("h1");
let p1 = document.createElement("p");

div.setAttribute('style', 'border: 1px solid black; background: pink');
h1.textContent = "I'm in a div";
p1.textContent  = "ME TOO!";

div.appendChild(h1);
div.appendChild(p1);

body.appendChild(div);


const btn = document.querySelector('#btn');
btn.onclick = () => alert('Hello World');

const btn2 = document.querySelector('#btn2');
btn2.addEventListener('click', function (e) {
    e.target.style.background = "blue";
})

const buttons = document.querySelectorAll('#container2>button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        alert(button.id);
    });
});