const daily = document.querySelector('.daily');
const weekly = document.querySelector('.weekly');
const monthly = document.querySelector('.monthly');
const container = document.querySelector('.container');

function startPage () {
    displayData('weekly', 'week');
    weekly.style.color = 'white';
}

function titleColor (title, cardBox) {
    switch (title) {
        case 'work':
            cardBox.style.backgroundColor = 'hsl(15, 100%, 70%)';
            break;
        case 'play':
            cardBox.style.backgroundColor = 'hsl(195, 74%, 62%)';
            break;
        case 'study':
            cardBox.style.backgroundColor = 'hsl(348, 100%, 68%)';
            break;
        case 'exercise':
            cardBox.style.backgroundColor = 'hsl(145, 58%, 55%)';
            break;
        case 'social':
            cardBox.style.backgroundColor = 'hsl(264, 64%, 52%)';
            break;
         case 'self-care':
            cardBox.style.backgroundColor = 'hsl(43, 84%, 65%)';
            break;
    }
}

function icon (title, cardBox) {
    cardBox.style.backgroundImage = 'url("images/icon-' + title + '.svg")';
}

function newElement (titleElement) {
    const card = document.createElement('div');
    card.className = 'card';
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.innerHTML = titleElement;
    const image = document.createElement('img');
    image.className = 'card-dots';
    image.src = 'images/icon-ellipsis.svg';
    return {card, title, image};
}

function displayHours (currentHours, previousHours) {
    const hours = document.createElement('div');
    hours.className = 'hours';
    hours.innerHTML = currentHours;
    //console.log(hours.innerHTML);
    const previous = document.createElement('div')
    previous.className = 'previous';
    previous.innerHTML = previousHours;
    return {hours, previous};
}

function displayData (time, x) {
    container.innerHTML = '';
    weekly.style.color = '';
    fetch('./data.json')
        .then(res =>res.json())
        .then(data => {
            for (let item of data) {
                const cardBox = document.createElement('div');
                cardBox.className = 'card-box';
                const imageTitle = item.title.replace(/\s+/g, '-').toLowerCase();
                
                // title, background image and color
                titleColor(`${imageTitle}`, cardBox);
                icon(`${imageTitle}`, cardBox);
                const elements = newElement(`${item.title}`)
                const card = elements.card;
                const image = elements.image;
                const title = elements.title;

                // current and previous hours
                const current = `${item.timeframes[time].current}hrs`;
                const previous = `Last ${x} - ${item.timeframes[time].previous}hrs`;
                const timeFormat = displayHours(current, previous); // return {hours, previous};
                const hours = timeFormat.hours;
                const lastPrevious= timeFormat.previous;

                // insert into the container
                card.appendChild(title);
                card.appendChild(image);
                card.appendChild(hours);
                card.appendChild(lastPrevious);
                cardBox.appendChild(card);
                container.appendChild(cardBox);
                console.log(item.title);
            }
        })
}

startPage();

daily.addEventListener('click', function() {
    displayData('daily', 'day');
});
weekly.addEventListener('click', function() {
    displayData('weekly', 'week');
});
monthly.addEventListener('click', function() {
    displayData('monthly', 'month');
});