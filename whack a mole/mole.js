let container = document.querySelector('.container');
let moleModel = model();
let moleView = view(container, moleModel);



function view(container, model) {
    let moleScore = container.querySelector('.score');
    let moleCount = container.querySelector('.click');
    
    function render(data) {
        let arr = data.cells, count = data.count, score = data.score;
        let grid = null;
        // when the click time is less than 9 it can
        // regenerate new grid
        if (count < 10) {
            grid = createGrid(arr);
            let cells = grid.querySelectorAll('.cell');
            moleScore.innerHTML = 'Current Score: ' + score;
            count = count < 0 ? 0 : count;
            moleCount.innerHTML = 'Number of Clicks: ' + count;
            for (cell of cells) {
                cell.addEventListener('click', function(e) {
                    let val = e.target.innerHTML;
                    model.click(val);
                });
            }
        }
    }

    model.subscribe(render);
    render(model.getData());
}

function model() {
    let _data = {
        cells: new Array(9).fill('false'),
        score: 0,
        count: -1
    };
    let _subscriber = null;

    function getData() {
        return _data;
    }

    function click(val) {
        val === 'M' ? _data.score++ : _data.score;
        _data.count++;
        _data.cells = getRandomMole();
        _subscriber(_data);
    }

    function subscribe(fn) {
        if(!_subscriber) _subscriber = fn;
    }

    return {subscribe, getData, click};
}

function createGrid(arr) {
    let grid = document.querySelector('.grid');
    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    for(let i = 0; i < 3; i++) {
        let row = document.createElement('ul');
        for(let j = 0; j < 3; j++) {
            let col = document.createElement('li');
            let index = 3 * i + j;
            if (arr[index] === 'true') col.innerHTML = 'M';
            col.setAttribute('class', 'cell');
            row.append(col);
        }
        grid.appendChild(row);
    }
    return grid;
}

function getRandomMole() {
    let result = new Array(9).fill('false');
    let count = 0;

    while(count < 3) {
        count = 0;
        for(item of result) {
            count += item === 'true' ? 1 : 0;
        }
        if(count === 3) break;
        let random = Math.floor(Math.random() * 9);
        result[random] = 'true';
    }

    return result;
}