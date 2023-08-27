let title = document.querySelector('.card-title').textContent;
const displayContainer = document.querySelector('.work .previous');
let current = document.querySelector('.hours');
let previous = document.querySelector('.previous');
const navBar = document.querySelectorAll('.nav-bar');



// fetch json data from data.json
fetch('./data.json')
    .then(res => res.json()) // convert into js object
    .then(data => {
        //loopthrough json object to find the title
        for (let item of data) {
            if (item.title == title) {
                matchObject = item;
                break;
            }
        }
        current.innerHTML = `${matchObject.timeframes.weekly.current}hrs`;
        previous.innerHTML = `Last week - ${matchObject.timeframes.weekly.previous}hrs`;
        console.log(data[0]);
    })

// queryselector title from html
// loop json
