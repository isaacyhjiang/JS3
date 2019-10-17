let barModel = model();
let bar = document.querySelector(".bar-container");
let barView = view(bar, barModel);

function view(bar, model) {
    let inner = bar.querySelector(".inner");
    function render(data) {
        inner.style.width = data + '%';
    }
    model.subscribe(render);
    render();
}

function model() {
    let _data = 0;
    let _subscriber = null;
    let _intervel;
    let _speed = 10;

    _intervel = setInterval(update, _speed);

    function update() {
        _data++;
        _data = _data > 100 ? 100 : _data;
        _subscriber(_data);

        if (_data >= 100) {
            clearInterval(_intervel);
        }
    }

    return {subscribe: function(fn) {
        if (!_subscriber)
            _subscriber = fn;
        }
    }
}