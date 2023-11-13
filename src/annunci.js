/// [Locazioni di memoria]
/* Colori CSS */
let bsWarning = '#ffc107';
let bsSecondary = '#351077';

/* Locazioni di memoria */
let sideMenu = document.getElementById("sideMenu");
let cardWrapper = document.getElementById("cardWrapper");

/* Categoria */
let categoryWrapper = document.getElementById('categoryWrapper');
let filteredArray;

/* Prezzo */
let priceValue = document.getElementById("range");
let input = document.getElementById('maxPrezzo');

/* Input */
let inputBtn = document.getElementById('wordSearcher');


/* Popolare la pagina */
let nomenclature = {
    "id": "p",
    "name": "h4",
    "description": "p",
    "features": "li",
    "price": "h6",
    "keywords": "p",
    "url": "p",
    "category": "p",
    "subcategory": "p",
    "like": ""
};


////[Main]
sideMenu.classList.add('col-2', 'text-black');


function addData(element, property, location) {
    let object = document.createElement(nomenclature[property]);
    object.innerText = element[property];
    object.style.gridArea = property;

    location.appendChild(object);
    return object;
};

/// [Menu laterale]
/* Categoria */
function addRadio(data) {
    let categories = data.map((element => element.category));
    categories.sort();
    let uniqueCategories = [];

    categories.forEach(element => {
        if (element != uniqueCategories[uniqueCategories.length - 1]) { uniqueCategories.push(element) }
    });

    uniqueCategories.forEach((element) => {
        let radio = document.createElement('div');
        radio.classList.add('form-check');
        radio.innerHTML =
            `<input class="form-check-input" type="radio" name="flexRadioDefault" id="${element}">
            <label class="form-check-label text-dark" for="${element}">
            ${element}
            </label>`;

        categoryWrapper.appendChild(radio);
    });
};


/* Popolare la pagina */
function addContent(object, arrayProperties) {
    let div = document.createElement('div');
    div.classList.add('card', 'bg-white', 'col-12', 'col-md-3', 'rounded-5', 'p-0', 'm-3', 'justify-content-between', 'ultimiAnnunciWrapperCard', 'text-truncate', 'text-dark');

    arrayProperties.forEach((property) => {
        addData(object, property, div);
    });

    let image = document.createElement('img');
    image.src = `https://picsum.photos/200/30${Math.ceil(Math.random() * 9)}`;
    image.style.gridArea = 'img';
    div.appendChild(image);

    /* Button area */
    let row = document.createElement('div');
    row.classList.add('row', 'justify-content-center');

    /* Like button */
    let like = document.createElement('button');
    like.style.gridArea = 'button'
    like.innerHTML = '<i class="fa-regular fa-heart"></i>';
    like.classList.add('like', 'm-2', 'mx-4');
    like.style.gridArea = 'like';
    like.addEventListener('click', () => {
        console.dir(div);
        if (div.like == false) {
            like.innerHTML = '<i class="fa-solid fa-heart"></i>';
            div.like = true;
        } else {
            like.innerHTML = '<i class="fa-regular fa-heart"></i>';
            div.like = false;
        };

    });
    row.appendChild(like);

    /* Acquista */
    let buy = document.createElement('button');
    buy.href = '';
    buy.style.gridArea = 'acquista';
    buy.classList = [...buy.classList, 'acquista']
    buy.innerHTML = '<i class="fa-solid fa-cart-shopping text-secondary"></i>';
    row.appendChild(buy);
    

    div.appendChild(row);
    cardWrapper.appendChild(div);
}


/* Applico le funzioni al database */
fetch('./data.json').then(response => response.json()).then(data => {

    let dataItems = data.items;
    let start = 0;
    let newData_price;
    let newData_text;

    addRadio(dataItems);
    range.max = Math.ceil(Math.max(...data.items.map(el => Number(el.price))));
    input.max = range.max;
    range.value = range.max;
    input.value = range.max;

    function populate(data, length = 6) {
        cardWrapper.innerHTML = '';

        for (let i = start; i < length; i++) {
            addContent(data[i], ["name", "description", "category", "price"]);
        };
    };

    populate(dataItems, 6);

    ///[Radio]
    let radios = document.querySelectorAll('.form-check');

    function filterArray(item, filter, checker, data) {
        let newData = data.items.filter((el) => checker == 'All' ? el : el[filter] == checker);

        item.addEventListener('click', () => {
            let length = newData.length >= 6 ? 6 : newData.length;
            populate(newData, length);


            /// [Prezzo]
            range.max = Math.ceil(Math.max(...newData.map(el => Number(el.price))));
            input.max = range.max;
            range.value = range.max;
            input.value = range.max;

            input.onchange = function () {
                range.value = input.value;
                let newData_price = newData.filter(el => el.price <= input.value);
                console.log(range.value);
                populate(newData_price, length);
            };
            priceValue.onchange = function () {
                input.value = range.value;
                newData_price = newData.filter(el => Number(el.price) <= input.value);
                populate(newData_price, length);
            };

            /// [Input]
            inputBtn.addEventListener('click', () => {
                let inputValue = document.getElementById('wordFilter').value.toLowerCase();
                newData_text = newData_price.filter(el => el.name.toLowerCase().includes(inputValue));
                populate(newData_text, length);
            })
        }
        );
    };

    radios.forEach(element => {
        filterArray(element, 'category', element.innerText, data)
    });

});

