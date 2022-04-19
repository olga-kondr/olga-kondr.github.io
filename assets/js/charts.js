// inspired by http://bl.ocks.org/ndobie/336055eed95f62350ec3

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
        .style('background-color', '#ccc') //'#eee')
        .text(d => { return d; });

    let rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    let color = d3.scaleOrdinal()
        .domain(rows)
        .range(colors);

    rows = tbody.selectAll('tr')
        .style('background-color', e => color(e)); //color);

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

    // var colors = ['#c464d9', '#ff6060', '#ff8f20', '#ffd821', '#fff795', '#00faf4', '#5ebaff']; // 0%
    let colors = ['#dca2e8', '#ffa0a0', '#ffbc79', '#ffe87a', '#fffabf', '#63fffb', '#9ed6ff']; // 40%
    // var colors = ['#e7c1f0', '#ffbfbf', '#ffd2a6', '#ffefa6', '#fffcd5', '#97fffd', '#bfe3ff']; // 60%

    addTable(dataElements, columns, colors);
};

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/03ffdd2935e38acd6688991780546a12/raw/3e482541c7d2b96bf7ab6e7e95e451a02a71aa23/scale.csv'
).then(data => renderChart1_1(data));

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
        console.log(d);
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