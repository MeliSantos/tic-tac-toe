let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

function init() {
    render();
}

function render() {
    let table = '<table class="tic-tac-toe">';
    for (let row = 0; row < 3; row++) {
        table += '<tr>';
        for (let col = 0; col < 3; col++) {
            const idx = row * 3 + col;
            let value = fields[idx];
            let display = '';
            if (value === 'O') display = 'O';
            else if (value === 'X') display = 'X';
            table += `<td id="cell-${idx}">${display}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('content').innerHTML = table;
}