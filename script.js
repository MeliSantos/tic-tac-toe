function restartGame() {
    // Felder zurücksetzen
    for (let i = 0; i < fields.length; i++) fields[i] = null;
    currentShape = 'circle';
    // Gewinnlinie entfernen, falls vorhanden
    const oldLine = document.querySelector('body > svg[style*="position:absolute"]');
    if (oldLine) oldLine.remove();
    render();
}
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
                    dur="0.4s"
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
    null, null, null,
    null, null, null,
    null, null, null
];

let currentShape = 'circle';

function handleCellClick(idx) {
    if (fields[idx]) return;
    fields[idx] = currentShape;
    const td = document.getElementById('cell-' + idx);
    if (currentShape === 'circle') {
        td.innerHTML = getCircleSVG();
    } else {
        td.innerHTML = getCrossSVG();
    }
    td.onclick = null;
    // Klicksound abspielen
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
    // Nach jedem Zug prüfen, ob das Spiel vorbei ist
    const win = checkWin();
    if (win) {
        drawWinLine(win);
        // Gewinnsound abspielen
        const winSound = document.getElementById('win-sound');
        if (winSound) {
            winSound.currentTime = 0;
            winSound.play();
        }
        // Alle weiteren Klicks deaktivieren
        for (let i = 0; i < 9; i++) {
            document.getElementById('cell-' + i).onclick = null;
        }
    } else {
        currentShape = currentShape === 'circle' ? 'cross' : 'circle';
    }
}

function checkWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // Reihen
        [0,3,6], [1,4,7], [2,5,8], // Spalten
        [0,4,8], [2,4,6]           // Diagonalen
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern;
        }
    }
    return null;
}

function drawWinLine(pattern) {
    // Ermittle die Positionen der Zellen
    const first = document.getElementById('cell-' + pattern[0]);
    const last = document.getElementById('cell-' + pattern[2]);
    const table = first.closest('table');
    const rect1 = first.getBoundingClientRect();
    const rect2 = last.getBoundingClientRect();

    // SVG-Linie über die Tabelle legen
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', 'position:absolute; pointer-events:none; left:0; top:0; width:100vw; height:100vh; z-index:10;');
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', rect1.left + rect1.width/2);
    line.setAttribute('y1', rect1.top + rect1.height/2);
    line.setAttribute('x2', rect2.left + rect2.width/2);
    line.setAttribute('y2', rect2.top + rect2.height/2);
    line.setAttribute('stroke', '#fff');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
    document.body.appendChild(svg);
}

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
            let clickAttr = value ? '' : `onclick="handleCellClick(${idx})"`;
            table += `<td id="cell-${idx}" ${clickAttr}>${display}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('content').innerHTML = table;
}