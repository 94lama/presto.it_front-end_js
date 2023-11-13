
/* Dichiarazione locazioni di memoria */

/* Colori CSS */
let bsWarning = '#ffc107';


/* Header */
let testo = document.getElementById('titolo');

let testoFinale = ['p', 'r', 'e', 's', '<span> </span>', 'o'];
let testoAggiornato = '';
let counter = 0;


/* Prima sezione (un po' di numeri) */
let clientiText = document.getElementById('clienti');
let prodottiVendutiText = document.getElementById('prodottiVenduti');
let recensioniText = document.getElementById('recensioni');
let togglerInfo = false;
let togglerPlanet = true;


/* Le nostre recensioni */
let reviewWrapper = document.getElementById('swiper-wrapper-2abe18010e970f910f');


/* i più veloci sul campo */
let velociWrapper = document.getElementById('velociWrapper');

/* ultimi annunci */
let ultimiAnnunci = document.getElementById('ultimiAnnunciWrapper');

/* Funzioni */

/* Header */
/* Testo principale header */
let interval = setInterval(() => {
    if (counter < testoFinale.length) {
        testoAggiornato = testoAggiornato + testoFinale[counter];
        testo.innerHTML = testoAggiornato;

        counter++;
    } else clearInterval(interval);
}, 500);


fetch('./src/data.json').then(response => response.json()).then(dataObj => {

    /* Prima sezione - da non crederci */
    /* Stampa numeri che crescono fino al valore deisderato in 6 secondi */
    function populateInfo(a, dataObj) {
        let info = dataObj.data[a.id];
        let value = 0

        let interval = setInterval(() => {
            /* a.innerText = value; */
            if (value < info) {
                value += info / 50;
                a.innerText = value;
            } else clearInterval(interval)
        }, 100);
    };


    /* Sezione 2 - Le nostre recensioni */

    function cardCreator(container, items, classItems) {

        items.forEach(element => {
            let card = document.createElement('div');
            card.classList.add('card', ...classItems, 'bg-white', `${container.id}Card`, 'text-dark')

            card.innerHTML = `
        <h4 style="grid-area: h4">${element.name}</h4>
        <p style="grid-area: p">${element.description}</p>
        `;

            if (element.rate != null) {
                let image = document.createElement('img');
                image.style.gridArea = 'img';
                image.style.background = `linear-gradient(90deg, ${bsWarning} ${element.rate * 100 / 5}%, transparent ${element.rate * 100 / 5}%)`;
                image.src = './media/reviews.svg';
                image.className = 'stars';
                card.appendChild(image);
            };

            container.appendChild(card);
        });
    }

    /* Definisco le classi da inserire nei div delle recensioni */
    let classes = ['mx-auto', 'p-5', 'bg-white', 'border-3', 'border-black', 'text-center', 'd-flex', 'h-100', 'swiper-slide', 'rounded-5', "w-75"];
    cardCreator(reviewWrapper, dataObj.reviews, classes);

    /* Aggiungo i numeri da non credere */
    let observerInfo = new IntersectionObserver(entries => {
        entries.forEach(element => {
            if (element.isIntersecting && togglerInfo == false) {
                populateInfo(clientiText, dataObj);
                populateInfo(prodottiVendutiText, dataObj);
                populateInfo(recensioniText, dataObj);

                togglerInfo = !togglerInfo;
            };
        });
    });

    observerInfo.observe(recensioniText, { threshold: 1 });


    /* Sezione 3 - I più veloci sul campo */
    /* Definisco le classi da inserire nei div */
    classes = ["card", "align-items-center", "rounded-circle", "p-5", "m-5", "position-relative", "planet"];

    /* Definisco un'array per inserire i lorem */
    let disposableArray = [
        { "name": "Lorem ipsum", "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui dolore recusandae exercitationem, doloribus tempora quaerat?" },
        { "name": "Lorem ipsum", "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui dolore recusandae exercitationem, doloribus tempora quaerat?" },
        { "name": "Lorem ipsum", "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui dolore recusandae exercitationem, doloribus tempora quaerat?" }
    ];

    cardCreator(velociWrapper, disposableArray, classes);


    /* Aggiungo un effetto secondario ai pianeti in caso di fine hover */

    velociWrapper.childNodes.forEach(element => {
        element.isTriggered = false;

        element.addEventListener('mouseenter', () => {

            if (element.isTriggered == false) {
                element.classList.replace('planet', 'selectedPlanet');
                element.isTriggered = !element.isTriggered;

            } else if (element.isTriggered == true) {

                element.classList.replace('selectedPlanet', 'planet');
                element.isTriggered = !element.isTriggered;
            };
        });
    });


    /* annunciWrapper */
    /* definizione delle classi */
    classes = ['card', 'annunci', 'col-12', 'col-md-3', 'm-3', 'p-0', 'rounded-3', 'border-0'];

    /* raccolta dei dati da mostrare (i primi 4 elementi della lista degli oggetti ) */
    disposableArray = [];
    for (let i = 0; i < 3; i++) {
        disposableArray.push(dataObj.items[i]);
    };

    /* Creazione delle card */
    cardCreator(ultimiAnnunci, disposableArray, classes);

    /* aggiunta degli elementi mancanti */
    for (let i = 0; i < ultimiAnnunci.children.length; i++) {
        let element = ultimiAnnunci.children[i];


        let properties = ['id', 'img', 'price', 'features', 'keywords', 'category', 'subcategory', 'like'];
        let replacements = ['', `https://picsum.photos/300/20${Math.floor(Math.random() * 10)}`, 'Non disponibile', '', '', '', '', false]

        for (let j = 0; j < properties.length; j++) {
            let item;
            item = properties[j];

            typeof dataObj.items[i][item] == 'string' ?
                element[item] = dataObj.items[i][item].split(',') :
                typeof dataObj.items[i][item] == 'undefined' ?
                    element[item] = replacements[j] :
                    element[item] = dataObj.items[i][item];
        };


        let price = document.createElement('h5');
        price.style.gridArea = 'h5';
        price.innerText = element.price;
        element.appendChild(price);

        let like = document.createElement('button');
        like.style.gridArea = 'button'
        like.innerHTML = '<i class="fa-regular fa-heart"></i>';
        like.className = 'like';
        like.addEventListener('click', () => {
            console.dir(element);
            if (element.like == false) {
                like.innerHTML = '<i class="fa-solid fa-heart"></i>';
                element.like = true;
            } else {
                like.innerHTML = '<i class="fa-regular fa-heart"></i>';
                element.like = false;
            }
        })
        element.appendChild(like);

        let image = document.createElement('img');
        image.src = element.img;
        image.style.gridArea = 'img';
        image.style.width = '100%';
        image.style.borderRadius = 'var(--bs-border-radius-lg';
        element.appendChild(image);

        let buy = document.createElement('button');
        buy.href = '';
        buy.style.gridArea = 'acquista';
        buy.classList = [...buy.classList, 'acquista']
        buy.innerHTML = '<i class="fa-solid fa-cart-shopping text-secondary"></i>'
        element.appendChild(buy);
    };
});