let options = [
    'CA',
    'AZ',
    'WA',
    'NY',
    'OR',
    'TX',
    'TS',
    'ML',
    'MX'
];
let autoContainer = document.querySelector(".container");
let autoModel = model(options);
let autoView = view(autoContainer, autoModel);

function view(container, model) {
    let optionsList = container.querySelector(".optionsList");
    let input = container.querySelector(".inputText");
    input.addEventListener('input', function(e) {
        let text = e.target.value;
        model.filter(text.toUpperCase());
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

function model(options) {
    let _options = options;
    let _subscriber = null;

    function filter(text) {
        if (text === "")
            return;
        let res = [];
        for (option of _options) {
            if (option.includes(text))
                res.push(option);
        }
        _subscriber(res);
    }

    return {
        subscribe: function(fn) {
            if (!_subscriber) _subscriber = fn;
        },
        filter: filter
    }
}
