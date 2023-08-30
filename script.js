let ntitle = document.querySelector('.card-title').textContent;
const displayContainer = document.querySelector('.work .previous');
//let current = document.querySelector('.hours');
//let previous = document.querySelector('.previous');
const daily = document.querySelector('.daily');
const weekly = document.querySelector('.weekly');
const monthly = document.querySelector('.monthly');
const container = document.querySelector('.container');

function startPage () {
    displayData('weekly', 'week');
    weekly.style.color = 'white';
}

function displayData (time, x) {
    container.innerHTML = '';
    weekly.style.color = '';
    fetch('./data.json')
        .then(res =>res.json())
        .then(data => {
            for (let item of data) {
                console.log(item.timeframes[time]); 
                // create new div for each activity
                const cardBox = document.createElement('div');
                cardBox.className = 'card-box';
                // cardbox - replace image
                const card = document.createElement('div');
                card.className = 'card';
                const title = document.createElement('h3');
                title.className = 'card-title';
                title.innerHTML = `${item.title}`;
                const image = document.createElement('img');
                image.className = 'card-dots';
                image.src = 'images/icon-ellipsis.svg'

                const hours = document.createElement('div');
                hours.className = 'hours';
                hours.innerHTML = `${item.timeframes[time].current}hrs`;
                //console.log(hours.innerHTML);
                const previous = document.createElement('div')
                previous.className = 'previous';
                previous.innerHTML = `Last ${x} - ${item.timeframes[time].previous}hrs`;
                
                
                card.appendChild(title);
                card.appendChild(image);
                card.appendChild(hours);
                card.appendChild(previous);
                cardBox.appendChild(card);
                container.appendChild(cardBox);

                console.log(item.title);
            }
        })
}

//displayData('daily', 'day');
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
    