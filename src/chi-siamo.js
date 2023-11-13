let sun = document.getElementById('sun');
let cardWrapper = document.getElementById('peopleWrapper');
let openTrigger = true;
let teachers = [
    { name: 'Carlo', languages: 'HTML, Danza, Battute', url: '../media/carlo.png' },
    { name: 'Mattia', languages: 'Bootstrap, JS, DOM', url: '../media/mattia.png' },
    { name: 'Donato', languages: 'PHP, BanHammer, Videogame', url: '../media/donato.png' },
    { name: 'Valerio', languages: 'React, Pokémon, Mentore', url: '../media/valerio.png' },
]

//Dimensioni del div = 30rem
/// [Creazione delle card insegnanti]
teachers.forEach((item, i) => {
    let card = document.createElement('div');
    let image = document.createElement('img');
    card.classList.add('planet-teach');
    image.src = `${item.url}`;
    card.appendChild(image);
    cardWrapper.appendChild(card);
    card.style.rotate = `${i * 75}deg`;
    image.style.rotate = `-${i * 75}deg`;
    card.style.animationDelay = `${i * 3}s`;

    /// [Evento click]
    card.addEventListener('click', (event) => {
        let cards = document.querySelectorAll('.planet-teach');
        if (openTrigger) {
            sun.style.left = '10vw';
            cards.forEach(element => {
                element.style.animationPlayState = 'paused';
                element.style.left = 'calc(10vw + 10rem)';
            });
            let teacherInfo = document.createElement('div');
            let url = `..${event.srcElement.currentSrc.slice(21)}`;
            url = teachers.filter(element => element.url == url)[0];
            let name = url.name;
            let description = url.languages;

            teacherInfo.id = 'temporaryCard';
            teacherInfo.style.position = 'absolute';
            teacherInfo.style.top = '20vh';
            teacherInfo.style.right = '10vw';
            teacherInfo.style.width = '30vw';
            teacherInfo.style.height = '20vh';
            teacherInfo.style.minHeight = '30rem';
            teacherInfo.style.zIndex = -1;
            teacherInfo.style.padding = '4rem';
            teacherInfo.style.paddingLeft = '18rem';
            teacherInfo.innerHTML = `
            <h2>${String(name)}</h2>
            <p>${String(description)}</p>`;

            console.log(url, name, description)

            teacherInfo.classList.add('card');
            event.srcElement.parentElement.className = 'selected-planet';
            event.srcElement.parentElement.style.position = 'absolute';
            event.srcElement.parentElement.style.left = '60vw';

            cardWrapper.appendChild(teacherInfo);
        } else {
            sun.style.left = 'calc(50% - var(--size)/2)';
            event.srcElement.parentElement.className = 'planet-teach';
            event.srcElement.parentElement.style.animationPlayState = 'running';
            event.srcElement.parentElement.style.left = 'calc(50% - var(--size)*.25)';

            cards.forEach(element => {
                element.style.animationPlayState = 'running';
                element.style.left = 'calc(50% - var(--size)*.25)';
            });

            cardWrapper.removeChild(document.getElementById('temporaryCard'));
        };

        openTrigger = !openTrigger;
    });
});