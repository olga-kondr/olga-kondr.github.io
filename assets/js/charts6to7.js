// Chart 6
function renderChart6(dataElements) {
    let width6 = 742;
    let heightFull = 939;
    let height6 = 600;

    let names = new Set(dataElements.map((o) => o.name));
    let latmi = d3.min(dataElements.map((o) => +o.lat));
    let latma = d3.max(dataElements.map((o) => +o.lat));
    let longmi = d3.min(dataElements.map((o) => +o.long));
    let longma = d3.max(dataElements.map((o) => +o.long));

    let data = dataElements.map((o) => ({
        name: o.name,
        lat: +o.lat,
        long: +o.long,
        year: +o.year
    }));

    let margin = { top: 50, right: 25, bottom: 40, left: 40 };
    let x = d3
        .scaleLinear()
        .domain([longmi, longma]).nice()
        .range([margin.left, width6 - margin.right]);

    let y = d3
        .scaleLinear()
        .domain([latmi, latma]).nice()
        .range([height6 - margin.bottom, margin.top]);

    let xAxis = (g) => g
        .attr(
            'transform',
            `translate(0,${height6 - margin.bottom})`
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
        .attr('width', width6)
        .attr('height', height6);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    d3.selectAll('g.tick')
        .attr('class', 'forTicks');

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

    data = data.filter(d => d.year > 2009 & d.year < 2014);
    let dataGrouped = d3.group(data, d => d.name);
    svg.selectAll('.line')
        .data(dataGrouped)
        .join('path')
        .attr('fill', 'none')
        .attr('stroke', d => {
            // console.log('d[0]', d[0]);
            // console.log('d[1]', d[1]);
            return color(d[0]);
        })
        .attr('stroke-width', 1.5)
        .attr('d', function(d) {
            return d3.line()
                .x(function(d) { return x(d.long) })
                .y(function(d) { return y(d.lat) })
                (d[1])
        });

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

function renderChart7(dataElements) {

}

function chart6listener(dataElements) {
    renderChart6(dataElements);
    // chart6 update year range listener
    d3.select('#chart6slider').on('change', function(d) {
        startYear = +this.value;
        // renderChart6(dataElements, selectedValue, selectedValue + 5);
        d3.select('#chart6bin').on('change', function(d) {
            endYear = +this.value;
            // renderChart6(dataElements, startYear, endYear);
        });
    });
}
// Charts
function renderCharts6to7(dataElements) {
    chart6listener(dataElements);
    renderChart7(dataElements);
}
d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/0ffc7e15398f5c8e424ee35152d0aa39/raw/1c2d4097dc652534914f5a6bca2ee5c56706ecbe/atlantic_cleaned.csv',
).then(data => renderCharts6to7(data));