let body = document.querySelector('body');
localStorage.setItem('mode', 'light');


/// [Navbar]

let nav = document.querySelector('nav');
document.addEventListener('scroll', () => {
    if(window.scrollY == 0){
        nav.classList.remove('bg-body-tertiary');
        console.log(nav.style)
    } else {
        nav.classList.add('bg-body-tertiary');
    }
});


/// [dark mode]
let darkModeToggler = document.createElement('button');
darkModeToggler.classList.add('position-fixed', 'btn', 'fa-solid', 'fa-lightbulb', 'fa-2x', 'z-5', 'bg-light', 'text-black');
darkModeToggler.style.bottom = '4rem';
darkModeToggler.style.left = '3vw';

darkModeToggler.addEventListener('click', () => {
    let modeToggler = localStorage.getItem('mode');
    if (modeToggler == 'light') {
        localStorage.setItem('mode','dark');
        document.documentElement.style.setProperty('--bs-primary-rgb', '53, 16, 119');
        document.documentElement.style.setProperty('--bs-secondary-rgb', '1, 70, 192');
        document.documentElement.style.setProperty('--bs-light-rgb', '0, 0, 34');
        document.documentElement.style.setProperty('--bs-white-rgb', '0, 0, 34');
        document.documentElement.style.setProperty('--bs-dark-rgb', '248,249,250');
        document.documentElement.style.setProperty('--bs-black-rgb', '248,249,250');

    } else {
        localStorage.setItem('mode','light');
        document.documentElement.style.setProperty('--bs-primary-rgb', '1, 70, 192');
        document.documentElement.style.setProperty('--bs-secondary-rgb', '53, 16, 119');
        document.documentElement.style.setProperty('--bs-light-rgb', '248,249,250');
        document.documentElement.style.setProperty('--bs-white-rgb', '248,249,250');
        document.documentElement.style.setProperty('--bs-dark-rgb', '0, 0, 34');
        document.documentElement.style.setProperty('--bs-black-rgb', '0, 0, 34');

    /*--bs-color-white: #e2e3e3;
    --bs-success: #198754;
    --bs-info: #0dcaf0;
    --bs-warning: #ffc107;
    --bs-danger: #ea505a;
    --bs-light: #f8f9fa;
    --bs-dark: #212529;
    --bs-primary-rgb: 1, 70, 192;
    --bs-secondary-rgb: 53, 16, 119;
    --bs-success-rgb: 25, 135, 84;
    --bs-info-rgb: 13, 202, 240;
    --bs-warning-rgb: 255, 193, 7;
    --bs-danger-rgb: 234, 80, 90;
    --bs-light-rgb: 248,249,250;
    --bs-dark-rgb: 0, 0, 34; */

    }
})

body.appendChild(darkModeToggler);


/// [bottone per andare ad inizio pagina]

let toUp = document.createElement('button');

toUp.classList.add('position-fixed', 'btn', 'fa-solid', 'fa-shuttle-space', 'fa-4x', 'z-5', 'text-black');
toUp.style.bottom = '4rem';
toUp.style.right = '2vw';

toUp.addEventListener('click', () => scroll(0, 0));

body.appendChild(toUp);