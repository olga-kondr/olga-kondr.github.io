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
    { abbr: 'SS', descr: 'Subtropical cyclone of subtropical storm intensity (> 34 knots)', colorHex: colors4[9] },
    { abbr: 'LO', descr: 'A low that is neither a tropical cyclone, a subtropical cyclone, nor an extratropical cyclone (of any intensity)', colorHex: '#000' },
    { abbr: 'WV', descr: 'Tropical Wave (of any intensity)', colorHex: '#ccc' },
    { abbr: 'DB', descr: 'Disturbance (of any intensity)', colorHex: '#ffa0f9' }
];

var colorsDict = new Map();
colorClassifications.forEach(element => colorsDict.set(element.abbr, element.colorHex)); //[element.abbr] = element.colorHex);
// console.log('EX == ' + colorsDict.get('EX'));

let colorShortClassifications = [
    { abbr: 'TD', descr: 'Tropical cyclone of tropical depression intensity (less than 34 knots)', colorHex: colors4[6] },
    { abbr: 'TS', descr: 'Tropical cyclone of tropical storm intensity (34-63 knots)', colorHex: colors4[5] },
    { abbr: 'HU', descr: 'Tropical cyclone of hurricane intensity (> 64 knots)', colorHex: colors4[2] },
    { abbr: 'EX', descr: 'Extratropical cyclone (of any intensity)', colorHex: colors4[7] },
    { abbr: 'SD', descr: 'Subtropical cyclone of subtropical depression intensity (less than 34 knots)', colorHex: colors4[8] },
    { abbr: 'SS', descr: 'Subtropical cyclone of subtropical storm intensity (> 34 knots)', colorHex: colors4[9] },
    { abbr: 'LO', descr: 'A low that is neither a tropical cyclone, a subtropical cyclone, nor an extratropical cyclone (of any intensity)', colorHex: '#000' },
    { abbr: 'WV', descr: 'Tropical Wave (of any intensity)', colorHex: '#ccc' },
    { abbr: 'DB', descr: 'Disturbance (of any intensity)', colorHex: '#ffa0f9' }
];
var colorsShortDict = new Map();
colorShortClassifications.forEach(element => colorsShortDict.set(element.abbr, element.colorHex));


// Table 1.1
function addTable(data, columns, colors) {
    // add table
    var table = d3.select('#hurtable')
        .append('table');

    var thead = table.append('thead');
    var tbody = table.append('tbody');

    // add colunms
    thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .style('background-color', '#ccc')
        .text(d => { return d; });

    let rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    // apply lighter background colors
    rows = tbody.selectAll('tr')
        .style('background-color', (e, i) => colors[i]);

    // add data
    // create a cell in each row for each column
    let cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append('td')
        .style('font-family', 'Lato')
        .html(function(d) { return d.value; });

    return table;
}

function renderChart1_1(dataElements) {
    let columns = Object.keys(dataElements[0]);
    addTable(dataElements, columns, colors9);
};

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/03ffdd2935e38acd6688991780546a12/raw/3e482541c7d2b96bf7ab6e7e95e451a02a71aa23/scale.csv'
).then(data => renderChart1_1(data));

function getColorByAbbr(abbr) {
    return colorsDict.get(abbr);
}
// Chart 2.1
function renderChart2_1(dataElements) {

    // let width = 600;
    // let height = 500;
    let offset = 200;

    let data = new Map();
    dataElements.forEach(element => {
        data.set(element.Type, +element.Value);
    });
    let dt = Array.from(data.entries());
    for (let i = 0; i < dt.length; i++) {
        dt[i].push(i);
        dt[i].push(getColorByAbbr(dt[i][0]));
    }

    let margin = ({ top: 45, right: 25, bottom: 45, left: 45 });

    let x = d3.scaleBand()
        .domain(data.keys())
        .range([margin.left, width - margin.right])
        .paddingInner(0.07)
        .paddingOuter(0.07);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data.values())])
        .range([height - margin.bottom, margin.top]);

    // function with g arg assigned to xAxis
    let xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    // function with g arg assigned to yAxis
    let yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    let svg = d3.select('#histogram21') //d3.select('body') 
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', offset - 20)
        .attr('y', '15')
        .style('font-size', '18px')
        .text('Types of Weather Events in the Atlantic Ocean');

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', offset - 20)
        .attr('y', '35')
        .style('font-size', '18px')
        .text('from 1950 to 2015');

    // div for the tooltip
    var tooltip = d3.select('#histogram21').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // add tooltips
    let showTt = (e, d) => {
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);

        tooltip.style('position', 'absolute')
            .style('width', '40')
            .style('color', 'black')
            .style('text-align', 'center')
            .style('padding', '0.35em')
            .style('font-size', '1em')
            .style('background', '#ccc')
            .style('border', '0px')
            .style('border-radius', '6px')
            .style('pointer-events', 'none');

        tooltip.html('Type ' + d[0] + '<br/>' + 'Total Count ' + d[1])
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    // console.log('dt-> ' + dt);
    svg.selectAll('rect')
        .data(dt)
        .enter()
        .append('rect')
        .attr('transform', `translate(0, ${y()})`)
        .attr('fill', d => d[3])
        .attr('width', x.bandwidth())
        .attr('height', d => (height - y(d[1]) - margin.top))
        .attr('x', d => x(d[0]))
        .attr('y', d => y(d[1]))
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', offset + 100)
        .attr('y', height - 5)
        .style('font-size', '14px')
        .text('Type');

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', '5')
        .attr('y', '-10')
        .attr('transform', 'translate(30, 300) rotate(270)')
        .style('font-size', '14px')
        .text('Count');
}

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/07b325bf82966c955ba169a88c8020ab/raw/2b58828db4705b694822b8c973a71fbd53bd9d6b/atlantic_types.csv',
).then(data => renderChart2_1(data));

// Chart 2.2
// color scale issues
function renderChart2_2(dataElements) {
    let data = dataElements.map(o => ({
        decade: o.Decade,
        type: o.Type,
        value: +o.Value
    }));
    let decade = new Set(dataElements.map(o => o.Decade));
    let type = new Set(dataElements.map(o => o.Type));
    let max = d3.max(dataElements.map(o => +o.Value))

    let margin = ({ top: 45, right: 45, bottom: 45, left: 45 });

    // append the svg object to the body of the page
    const svg = d3.select('#chart22')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(decade)
        .range([0, width])
        .padding([0.3]);

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x)); //.tickSize(0));

    const y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    svg.append('g')
        .call(d3.axisLeft(y));

    // scale for small groups inside a big ones
    const xSubgroup = d3.scaleBand()
        .domain(type)
        .range([0, x.bandwidth()])
        .padding([0.05]);

    // doesn't work correctly 
    const color = d3.scaleOrdinal()
        .domain(colorsShortDict.keys())
        .range(colorsShortDict.values());

    // div for the tooltip
    var tooltip = d3.select('#chart22').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // add tooltips
    let showTt = (e, d) => {
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);

        tooltip.style('position', 'absolute')
            .style('width', '40')
            .style('color', 'black')
            .style('text-align', 'center')
            .style('padding', '0.35em')
            .style('font-size', '1em')
            .style('background', '#ccc')
            .style('border', '0px')
            .style('border-radius', '6px')
            .style('pointer-events', 'none');

        tooltip.html('Type ' + d.key + '<br/>' + 'Count ' + d.value)
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    let arr = Array.from(type);

    svg.append('g')
        .selectAll('g')
        .data(data)
        .join('g')
        .attr('transform', d => `translate(${x(d.decade)}, 0)`)
        .selectAll('rect')
        .data(function(d) { return arr.map(function(key) { return { key: d.type, value: d.value }; }); })
        .join('rect')
        .attr('x', d => xSubgroup(d.key))
        .attr('y', d => y(d.value))
        .attr('width', xSubgroup.bandwidth())
        .attr('height', d => height - y(d.value))
        // .attr('fill', d => colorsDict.get(d.key))
        // .attr('fill', function(d) {
        // let tmp = d.key;
        // return colorsDict.get(tmp);
        // })
        .attr('fill', d => color(d.key))
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/4e92d9ecab44d7894731a16b8f1f5c71/raw/3aa458955b5c58f2f406ebd4144a4ff79cebae00/atlantic_hist.csv',
).then(data => renderChart2_2(data));

// Chart 4
function renderChart4(dataElements, startYear = 2010, endYear = 2015, numBins = 10) {
    let dataPrep = dataElements.filter(d => +d.year >= startYear & +d.year <= endYear);
    dataMap = dataPrep.map((o) => ({
        name: o.name,
        maxWind: +o.max_wind,
        year: +o.year
    }));
    let data = [];
    let nm = 'ARLENE';
    let maxWinSpeed = 0;
    let minVal = 1000;
    let maxVal = 0;
    dataMap.forEach(el => {
        let val = +el.maxWind;
        if (nm === el.name) {
            if (maxWinSpeed < val) {
                maxWinSpeed = +val;
            }
        } else {
            data.push({ 'name': nm, 'maxWind': maxWinSpeed, 'year': +el.year })
            nm = el.name;
            maxWinSpeed = val;
        }
        if (minVal > val) {
            minVal = val;
        }
        if (maxVal < val) {
            maxVal = val;
        }
    })

    let years = new Set(data.map((o) => { if (o.year >= startYear & o.year <= endYear) return o.year; }));
    const meanVal = d3.mean(data, (d) => d.maxWind);
    const jitterWidth = 20;
    const jitterHeight = 1.5;

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };

    let x = d3
        .scaleBand()
        .domain(years)
        .padding(0.05)
        .range([margin.left, width - margin.right]);

    let y = d3
        .scaleLinear()
        .domain([0, maxVal + 1]).nice()
        .range([height - margin.bottom, margin.top]);

    let xAxis = (g) => g
        .attr(
            'transform',
            `translate(0,${height - margin.bottom})`
        )
        .call(d3.axisBottom(x));

    let yAxis = (g) => g
        .attr(
            'transform',
            `translate(${margin.left},0)`
        )
        .call(d3.axisLeft(y));

    d3.selectAll("#chart4 > *").remove();
    const svg = d3.select('#chart4')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'violin');

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    let hist = d3.bin()
        .domain(y.domain())
        .thresholds(y.ticks(numBins))
        .value(d => d);

    let suma = d3.rollup(data,
        v => {
            let input = v.map(el => el.maxWind);
            return hist(input);
        },
        d => d.year
    );

    let maxNumber = 0;
    let maxNumberVal = 0;

    suma.forEach((value) => {
        maxWS = value.map(function(d) { return d3.max(d); });
        let valarray = value.map(function(d) { return d3.count(d); });
        let maxN = d3.max(valarray);
        maxWSval = d3.max(maxWS);
        if (maxWSval > maxNumberVal) { maxNumberVal = maxWSval; }
        if (maxN > maxNumber) { maxNumber = maxN; }
    });

    let xNumScale = d3.scaleLinear()
        .range([x.bandwidth() / 2, x.bandwidth()])
        .domain([0, maxNumber]);

    svg.selectAll('violinBands')
        .data(suma).enter()
        .append('g')
        .attr('transform', function(d) { return `translate(${x(d[0])},0)`; })
        .append('path')
        .attr('class', 'violinBands')
        .datum(function(d) { return (d[1]) })
        .style('stroke', 'none')
        .attr('fill', '#66c600')
        .attr("d", d3.area()
            .x0(xNumScale(0))
            .x1(function(d) { return xNumScale(d.length); })
            .y(function(d) { return y(d.x0) })
            .curve(d3.curveCatmullRom)
        );

    // div for the tooltip
    let tooltip = d3.select('#chart4').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // add tooltips
    let showTt = (e, d) => {
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);

        tooltip.style('position', 'absolute')
            .style('width', '40')
            .style('color', 'black')
            .style('text-align', 'center')
            .style('padding', '0.35em')
            .style('font-size', '1em')
            .style('background', '#ccc')
            .style('border', '0px')
            .style('border-radius', '6px')
            .style('pointer-events', 'none');

        tooltip.html('In ' + d.year + ' ' + d.name + '\'s' + '<br/>' + 'speed was ' + d.maxWind + ' kn')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    svg.selectAll('violinPoints')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return (x(d.year) + x.bandwidth() / 2 - Math.random() * jitterWidth)
        })
        .attr('cy', function(d) {
            return y(d.maxWind + Math.random() * jitterHeight);
        })
        .attr('r', 4.5)
        .style('fill', '#66a61e')
        .attr('stroke', 'white')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

// Chart 5
function renderChart5(dataElements, startYear = 2010, endYear = 2015, numBins = 10) {
    let dataPrep = dataElements.filter(d => +d.year >= startYear & +d.year <= endYear);
    dataMap = dataPrep.map((o) => ({
        name: o.name,
        minPressure: +o.min_pressure,
        year: +o.year
    }));
    let data = [];
    let nm = 'ARLENE';
    let minPressureSpeed = 0;
    let minVal = 1000;
    let maxVal = 0;
    dataMap.forEach(el => {
        let val = +el.minPressure;
        if (nm === el.name) {
            if (minPressureSpeed < val) {
                minPressureSpeed = +val;
            }
        } else {
            data.push({ 'name': nm, 'minPressure': minPressureSpeed, 'year': +el.year })
            nm = el.name;
            minPressureSpeed = val;
        }
        if (minVal > val) {
            minVal = val;
        }
        if (maxVal < val) {
            maxVal = val;
        }
    })

    let years = new Set(data.map((o) => { if (o.year >= startYear & o.year <= endYear) return o.year; }));
    const meanVal = d3.mean(data, (d) => d.minPressure);
    const jitterWidth = 30;
    const jitterHeight = 1.5;

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };

    let x = d3
        .scaleBand()
        .domain(years)
        .padding(0.05)
        .range([margin.left, width - margin.right]);

    let y = d3
        .scaleLinear()
        .domain([minVal, maxVal + 10]).nice()
        .range([height - margin.bottom, margin.top]);

    let xAxis = (g) => g
        .attr(
            'transform',
            `translate(0,${height - margin.bottom})`
        )
        .call(d3.axisBottom(x));

    let yAxis = (g) => g
        .attr(
            'transform',
            `translate(${margin.left},0)`
        )
        .call(d3.axisLeft(y));

    d3.selectAll("#chart5 > *").remove();
    const svg = d3.select('#chart5')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'violin');

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    let hist = d3.bin()
        .domain(y.domain())
        .thresholds(y.ticks(numBins))
        .value(d => d);

    let suma = d3.rollup(data,
        v => {
            let input = v.map(el => el.minPressure);
            return hist(input);
        },
        d => d.year
    );

    let maxNumber = 0;
    let maxNumberVal = 0;

    suma.forEach((value) => {
        minP = value.map(function(d) { return d3.max(d); });
        let valarray = value.map(function(d) { return d3.count(d); });
        let maxN = d3.max(valarray);
        minPval = d3.max(minP);
        if (minPval > maxNumberVal) { maxNumberVal = minPval; }
        if (maxN > maxNumber) { maxNumber = maxN; }
    });

    let xNumScale = d3.scaleLinear()
        .range([x.bandwidth() / 2, x.bandwidth()])
        .domain([0, maxNumber]);

    svg.selectAll('violinBands')
        .data(suma).enter()
        .append('g')
        .attr('transform', function(d) { return `translate(${x(d[0])},0)`; })
        .append('path')
        .attr('class', 'violinBands')
        .datum(function(d) { return (d[1]) })
        .style('stroke', 'none')
        .attr('fill', '#cf7515')
        .attr("d", d3.area()
            .x0(xNumScale(0))
            .x1(function(d) { return xNumScale(d.length); })
            .y(function(d) { return y(d.x0) })
            .curve(d3.curveCatmullRom)
        );

    // div for the tooltip
    let tooltip = d3.select('#chart5').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // add tooltips
    let showTt = (e, d) => {
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);

        tooltip.style('position', 'absolute')
            .style('width', '40')
            .style('color', 'black')
            .style('text-align', 'center')
            .style('padding', '0.35em')
            .style('font-size', '1em')
            .style('background', '#ccc')
            .style('border', '0px')
            .style('border-radius', '6px')
            .style('pointer-events', 'none');

        tooltip.html('In ' + d.year + ' ' + d.name + '\'s' + '<br/>' + 'pressure was ' + d.minPressure + ' millibars')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    svg.selectAll('violinPoints')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return (x(d.year) + x.bandwidth() / 2 - Math.random() * jitterWidth)
        })
        .attr('cy', function(d) {
            return y(d.minPressure + Math.random() * jitterHeight);
        })
        .attr('r', 4.5)
        .style('fill', '#df8515')
        .attr('stroke', 'white')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

// Chart 6
function renderChart6(dataElements) {
    // console.log(dataElements);

    let names = new Set(dataElements.map((o) => o.name));
    let latmi = d3.min(dataElements.map((o) => +o.lat));
    let latma = d3.max(dataElements.map((o) => +o.lat));
    let longma = d3.max(dataElements.map((o) => +o.long));
    let longmi = d3.min(dataElements.map((o) => +o.long));

    let data = dataElements.map((o) => ({
        name: o.name,
        lat: +o.lat,
        long: +o.long,
        year: +o.year
    }));

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };
    let x = d3
        .scaleLinear()
        .domain([longmi, longma]).nice()
        .range([margin.left, width - margin.right]);

    let y = d3
        .scaleLinear()
        .domain([latmi, latma]).nice()
        .range([height - margin.bottom, margin.top]);

    let xAxis = (g) => g
        .attr(
            'transform',
            `translate(0,${height - margin.bottom})`
        )
        .call(d3.axisBottom(x));

    let yAxis = (g) => g
        .attr(
            'transform',
            `translate(${margin.left},0)`
        )
        .call(d3.axisLeft(y));

    const svg = d3.select('#chart6')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    const color = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemeCategory10);

    // div for the tooltip
    var tooltip = d3.select('#chart6').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // add tooltips
    let showTt = (e, d) => {
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);

        tooltip.style('position', 'absolute')
            .style('width', '40')
            .style('color', 'black')
            .style('text-align', 'center')
            .style('padding', '0.35em')
            .style('font-size', '1em')
            .style('background', '#ccc')
            .style('border', '0px')
            .style('border-radius', '6px')
            .style('pointer-events', 'none');

        tooltip.html('Year ' + d.year + ' Name: ' + d.name + '\'s')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    // console.log(data);
    data = data.filter(d => d.year >= 2005);
    svg.append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('fill', d => color(d.name))
        .attr('cx', d => x(d.long))
        .attr('cy', d => y(d.lat))
        .attr('r', '0.1em')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

// https://observablehq.com/@sarah37/snapping-range-slider-with-d3-brush - ?

function chart4listener(dataElements) {
    renderChart4(dataElements);
    // chart4 update year range listener
    d3.select("#chart4slider").on("change", function(d) {
        selectedValue = +this.value;
        renderChart4(dataElements, selectedValue, selectedValue + 5);
    });
}

function chart5listener(dataElements) {
    renderChart5(dataElements);
    // chart4 update year range listener
    d3.select("#chart5slider").on("change", function(d) {
        selectedValue = +this.value;
        renderChart5(dataElements, selectedValue, selectedValue + 5);
    });
}
// Charts
function renderCharts(dataElements) {
    chart4listener(dataElements);
    chart5listener(dataElements);
    renderChart6(dataElements);
}
d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/0ffc7e15398f5c8e424ee35152d0aa39/raw/1c2d4097dc652534914f5a6bca2ee5c56706ecbe/atlantic_cleaned.csv',
).then(data => renderCharts(data));