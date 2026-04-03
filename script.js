function getCircleSVG() {
        return `
        <svg width="42" height="42" viewBox="0 0 32 32" style="display:block;margin:auto;">
            <circle
                cx="16" cy="16" r="13.5"
                fill="none"
                stroke="#00B0EF"
                stroke-width="1.5"
                stroke-dasharray="84.823"
                stroke-dashoffset="84.823"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="84.823" to="0"
                    dur="0.7s"
                    fill="freeze"
                />
            </circle>
        </svg>
        `;
}

function getCrossSVG() {
        return `
        <svg width="42" height="42" viewBox="0 0 32 32" style="display:block;margin:auto;">
            <line x1="7" y1="7" x2="25" y2="25" stroke="#FFC000" stroke-width="1.5"
                stroke-dasharray="25.455" stroke-dashoffset="25.455">
                <animate attributeName="stroke-dashoffset" from="25.455" to="0" dur="0.35s" fill="freeze" />
            </line>
            <line x1="25" y1="7" x2="7" y2="25" stroke="#FFC000" stroke-width="1.5"
                stroke-dasharray="25.455" stroke-dashoffset="25.455">
                <animate attributeName="stroke-dashoffset" from="25.455" to="0" dur="0.35s" fill="freeze" />
            </line>
        </svg>
        `;
}
let fields = [
    'cross',
    null,
    'circle',
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
            if (value === 'circle') display = getCircleSVG();
            else if (value === 'cross') display = getCrossSVG();
            table += `<td id="cell-${idx}">${display}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('content').innerHTML = table;
}