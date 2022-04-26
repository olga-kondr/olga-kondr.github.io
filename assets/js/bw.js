function renderChartbl(dataElements) {
    let width = 300;
    let height = 300;

    let years = new Set(dataElements.map((o) => +o.year));
    let maxWind = d3.max(dataElements.map((o) => +o.max_wind));

    let data = dataElements.map((o) => ({
        name: o.name,
        max_wind: +o.max_wind,
        year: +o.year
    }));

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };

    let x = d3
        .scaleLinear()
        .domain([2004, 2016]).nice()
        .range([margin.left, width - margin.right]);

    let y = d3
        .scaleLinear()
        .domain([0, maxWind]).nice()
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

    const svg = d3.select('#bl')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    // div for the tooltip
    var tooltip = d3.select('#bl').append('div')
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

        tooltip.html('In ' + d.year + ' ' + d.name + '\'s' + '<br/>' + 'speed was ' + d.max_wind + ' kn')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    data = data.filter(d => d.year >= 2005);
    svg.append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('fill', '#66a61e')
        .attr('cx', d => x(d.year))
        .attr('cy', d => y(d.max_wind))
        .attr('r', '0.3em')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

function renderChartwh(dataElements) {
    let width = 300;
    let height = 300;

    let years = new Set(dataElements.map((o) => +o.year));
    let pr = d3.max(dataElements.map((o) => +o.min_pressure));

    let data = dataElements.map((o) => ({
        name: o.name,
        pressure: +o.min_pressure,
        year: +o.year
    }));

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };

    let x = d3
        .scaleLinear()
        .domain([2004, 2016]).nice()
        .range([margin.left, width - margin.right]);

    let y = d3
        .scaleLinear()
        .domain([850, pr]).nice()
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

    const svg = d3.select('#wh')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    // div for the tooltip
    var tooltip = d3.select('#wh').append('div')
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

        tooltip.html('In ' + d.year + ' ' + d.name + '\'s' + '<br/>' + 'minimum pressure was ' + '<br/>' + d.pressure + ' millibars')
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
        .attr('fill', '#ffa61e')
        .attr('cx', d => x(d.year))
        .attr('cy', d => y(d.pressure))
        .attr('r', '0.3em')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

function renderChartbl1(dataElements) {
    let width = 300;
    let height = 300;

    let years = new Set(dataElements.map((o) => +o.year));
    let maxWind = d3.max(dataElements.map((o) => +o.max_wind));

    let data = dataElements.map((o) => ({
        name: o.name,
        max_wind: +o.max_wind,
        year: +o.year
    }));

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };

    let x = d3
        .scaleLinear()
        .domain([2004, 2016]).nice()
        .range([margin.left, width - margin.right]);

    let y = d3
        .scaleLinear()
        .domain([0, maxWind]).nice()
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

    const svg = d3.select('#bl1')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    // div for the tooltip
    var tooltip = d3.select('#bl1').append('div')
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

        tooltip.html('In ' + d.year + ' ' + d.name + '\'s' + '<br/>' + 'speed was ' + d.max_wind + ' kn')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    data = data.filter(d => d.year >= 2005);
    svg.append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('fill', '#66a61e')
        .attr('cx', d => x(d.year))
        .attr('cy', d => y(d.max_wind))
        .attr('r', '0.3em')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

function renderChartwh1(dataElements) {
    let width = 300;
    let height = 300;

    let years = new Set(dataElements.map((o) => +o.year));
    let pr = d3.max(dataElements.map((o) => +o.min_pressure));

    let data = dataElements.map((o) => ({
        name: o.name,
        pressure: +o.min_pressure,
        year: +o.year
    }));

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };

    let x = d3
        .scaleLinear()
        .domain([2004, 2016]).nice()
        .range([margin.left, width - margin.right]);

    let y = d3
        .scaleLinear()
        .domain([850, pr]).nice()
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

    const svg = d3.select('#wh1')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    // div for the tooltip
    var tooltip = d3.select('#wh1').append('div')
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

        tooltip.html('In ' + d.year + ' ' + d.name + '\'s' + '<br/>' + 'minimum pressure was ' + '<br/>' + d.pressure + ' millibars')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    data = data.filter(d => d.year >= 2005);
    svg.append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('fill', '#ffa61e')
        .attr('cx', d => x(d.year))
        .attr('cy', d => y(d.pressure))
        .attr('r', '0.3em')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}


function renderCharts10(dataElements) {
    renderChartbl(dataElements);
    renderChartwh(dataElements);
    renderChartbl1(dataElements);
    renderChartwh1(dataElements);
}
d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/0ffc7e15398f5c8e424ee35152d0aa39/raw/1c2d4097dc652534914f5a6bca2ee5c56706ecbe/atlantic_cleaned.csv',
).then(data => renderCharts10(data));