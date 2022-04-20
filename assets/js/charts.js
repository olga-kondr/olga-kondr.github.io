// inspired by http://bl.ocks.org/ndobie/336055eed95f62350ec3
var colors0 = ['#c464d9', '#ff6060', '#ff8f20', '#ffd821', '#fff795', '#00faf4', '#5ebaff']; // 0%
var colors4 = ['#dca2e8', '#ffa0a0', '#ffbc79', '#ffe87a', '#fffabf', '#63fffb', '#9ed6ff']; // 40%
var colors6 = ['#e7c1f0', '#ffbfbf', '#ffd2a6', '#ffefa6', '#fffcd5', '#97fffd', '#bfe3ff']; // 60%

// Chart-Table 1.1
function addTable(data, columns, colors4) {
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

    // let color = d3.scaleOrdinal()
    //     .domain(rows)
    //     .range(colors);

    rows = tbody.selectAll('tr')
        .style('background-color', (e, i) => colors4[i]); //color);

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
    addTable(dataElements, columns, colors4);
};

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/03ffdd2935e38acd6688991780546a12/raw/3e482541c7d2b96bf7ab6e7e95e451a02a71aa23/scale.csv'
).then(data => renderChart1_1(data));

// Chart 2.1
function renderChart2_1(dataElements) {

    let width = 600;
    let height = 500;
    let offset = 200;

    let data = new Map();
    dataElements.forEach(element => {
        data.set(element.Type, +element.Value);
    });
    let dt = Array.from(data.entries());
    for (let i = 0; i < dt.length; i++) {
        dt[i].push(i);
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

        tooltip.html('Type ' + d[0])
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    svg.selectAll('rect')
        .data(dt)
        .enter()
        .append('rect')
        .attr('transform', `translate(0, ${y()})`)
        .attr('fill', 'blue')
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

function renderChart2_2(dataElements) {

    let width = 600;
    let height = 500;
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
    const svg = d3.select("#chart22")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(decade)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0));

    const y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    // scale for small groups inside a big ones
    const xSubgroup = d3.scaleBand()
        .domain(type)
        .range([0, x.bandwidth()])
        .padding([0.05]);

    const color = d3.scaleOrdinal()
        .domain(type)
        .range(d3.schemeCategory10);

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

    svg.append("g")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x(d.decade)}, 0)`)
        .selectAll("rect")
        .data(function(d) { return arr.map(function(key) { return { key: d.type, value: d.value }; }); })
        .join("rect")
        .attr("x", d => xSubgroup(d.key))
        .attr("y", d => y(d.value))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => color(d.key))
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/4e92d9ecab44d7894731a16b8f1f5c71/raw/3aa458955b5c58f2f406ebd4144a4ff79cebae00/atlantic_hist.csv',
).then(data => renderChart2_2(data));