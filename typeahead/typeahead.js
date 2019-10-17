let container = document.querySelector(".container");
let typeheadModel = model();
let typeheadView = view(container, typeheadModel);

function view(container, model) {
    let optionsList = container.querySelector('.options');
    let input = container.querySelector('.search');
    input.addEventListener('input', function(e) {
        let text = e.target.value;
        model.search(text);
    });

    function render(data) {
        if (data === null || data.length === 0) {
            optionsList.style.display = 'none';
        } else {
            while (optionsList.firstChild) {
                optionsList.removeChild(optionsList.firstChild);
            }
            for (item of data) {
                let newOption = document.createElement('div');
                newOption.innerHTML = item;
                optionsList.appendChild(newOption);
            }
            optionsList.style.display = 'block';
        }
    }
    model.subscribe(render);
}

function model() {
    let _data = [];
    let _subscriber = null;
    
    function search(text) {
        console.log(text);
        if (text === "") return;
        fetch('https://swapi.co/api/people/?search=' + text)
        .then(response => response.json())
        .then(function(data) {
            for (item of data['results']) {
                _data.push(item['name']);
            }
        });   
        _subscriber(_data);
        _data = [];
    }

    function subscribe(fn) {
        if (!_subscriber) _subscriber = fn;
    }

    return {subscribe, search: search};
}
