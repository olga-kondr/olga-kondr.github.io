// inspired by 
// http://bl.ocks.org/ndobie/336055eed95f62350ec3
// https://d3-graph-gallery.com/graph/violin_jitter.html
// https://bl.ocks.org/motttey/339c1a5ec41c2c3b5da8f07c4169e661

// get width
var width = document.getElementById('objective').offsetWidth / 1.5;
var height = width * 0.7;

// colors used:
var colors0 = ['#c464d9', '#ff6060', '#ff8f20', '#ffd821', '#fff795', '#00faf4', '#5ebaff', '#45b021', '#3e6aff', '#00cac4']; // 0%
var colors4 = ['#dca2e8', '#ffa0a0', '#ffbc79', '#ffe87a', '#fffabf', '#63fffb', '#9ed6ff', '#86e267', '#8ba6ff', '#46fffa']; // 40%
var colors6 = ['#e7c1f0', '#ffbfbf', '#ffd2a6', '#ffefa6', '#fffcd5', '#97fffd', '#bfe3ff', '#aeec9a', '#b2c3ff', '#84fffb']; // 60%
var colors9 = ['#f9effb', '#ffefef', '#fff4e9', '#fffbe9', '#fffef4', '#e5fffe', '#eff8ff', '#ebfae6', '#ecf0ff', '#e0fffe']; // 90%

var colorClassifications = [
    { abbr: 'TD', descr: 'Tropical cyclone of tropical depression intensity (less than 34 knots)', colorHex: colors4[6] },
    { abbr: 'TS', descr: 'Tropical cyclone of tropical storm intensity (34-63 knots)', colorHex: colors4[5] },
    { abbr: 'HU', descr: 'Tropical cyclone of hurricane intensity (> 64 knots)', colorHex: colors4[2] },
    { abbr: 'HU1', descr: 'Hurricane of category one', colorHex: colors4[4] },
    { abbr: 'HU2', descr: 'Hurricane of category two', colorHex: colors4[3] },
    { abbr: 'HU3', descr: 'Hurricane of category three', colorHex: colors4[2] },
    { abbr: 'HU4', descr: 'Hurricane of category four', colorHex: colors4[1] },
    { abbr: 'HU5', descr: 'Hurricane of category five', colorHex: colors4[0] },
    { abbr: 'EX', descr: 'Extratropical cyclone (of any intensity)', colorHex: colors4[7] },
    { abbr: 'SD', descr: 'Subtropical cyclone of subtropical depression intensity (less than 34 knots)', colorHex: colors4[8] },
    { abbr: 'SS', descr: 'Subtropical cyclone of subtropical storm intensity (> 34 knots)', colorHex: colors9[9] }, //colors4[9] },
    { abbr: 'LO', descr: 'A low that is neither a tropical cyclone, a subtropical cyclone, nor an extratropical cyclone (of any intensity)', colorHex: '#000' },
    { abbr: 'WV', descr: 'Tropical Wave (of any intensity)', colorHex: '#ccc' },
    { abbr: 'DB', descr: 'Disturbance (of any intensity)', colorHex: '#ffa0f9' }
];

var colorsDict = new Map();
colorClassifications.forEach(element => colorsDict.set(element.abbr, element.colorHex));

let colorShortClassifications = [
    { abbr: 'TD', descr: 'Tropical cyclone of tropical depression intensity (less than 34 knots)', colorHex: colors4[6] },
    { abbr: 'TS', descr: 'Tropical cyclone of tropical storm intensity (34-63 knots)', colorHex: colors4[5] },
    { abbr: 'HU', descr: 'Tropical cyclone of hurricane intensity (> 64 knots)', colorHex: colors4[2] },
    { abbr: 'EX', descr: 'Extratropical cyclone (of any intensity)', colorHex: colors4[7] },
    { abbr: 'SD', descr: 'Subtropical cyclone of subtropical depression intensity (less than 34 knots)', colorHex: colors4[8] },
    { abbr: 'SS', descr: 'Subtropical cyclone of subtropical storm intensity (> 34 knots)', colorHex: colors9[9] },
    { abbr: 'LO', descr: 'A low that is neither a tropical cyclone, a subtropical cyclone, nor an extratropical cyclone (of any intensity)', colorHex: '#000' },
    { abbr: 'WV', descr: 'Tropical Wave (of any intensity)', colorHex: '#ccc' },
    { abbr: 'DB', descr: 'Disturbance (of any intensity)', colorHex: '#ffa0f9' }
];
var colorsShortDict = new Map();
colorShortClassifications.forEach(element => colorsShortDict.set(element.abbr, element.colorHex));

function getColorByAbbr(abbr) {
    return colorsDict.get(abbr);
}