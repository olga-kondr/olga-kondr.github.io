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
    'https://gist.githubusercontent.com/olga-kondr/03ffdd2935e38acd6688991780546a12/raw/556241bc3da1e43ea9e8324af36aaf9266a06998/scale.csv',
).then(data => renderChart1_1(data));

// Chart 2.1.1
function renderChart2_1(dataElements) {

    let offset = 200;
    let width2 = width / 2;

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
        .range([margin.left, width2 - margin.right])
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
        .attr('width', width2)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    d3.selectAll('g.tick')
        .attr('class', 'forTicks');

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', offset - 20)
        .attr('y', '15')
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('Types of Weather Events in the Atlantic Ocean');

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', offset - 20)
        .attr('y', '35')
        .attr('font-size', '100%')
        .attr('font', 'inherit')
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
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('Type');

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', '5')
        .attr('y', '-10')
        .attr('transform', 'translate(30, 300) rotate(270)')
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('Count');
}

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/b362bb1db98f6b4555514f4d4e639aa6/raw/c6a0275510db13bd790f99713b8f8e8c109da8ca/atlantic_full_types_count.csv',
).then(data => renderChart2_1(data));

// Chart 2.1.2
function renderChart2_1_2(dataElements) {

    let offset = 200;
    let width2 = width / 2;

    let data = new Map();
    dataElements.forEach(element => {
        data.set(element.Type, +element.Value);
    });
    let dt = Array.from(data.entries());
    for (let i = 0; i < dt.length; i++) {
        dt[i].push(i);
        dt[i].push(getColorByAbbr(dt[i][0]));
    }

    let margin = ({ top: 45, right: 25, bottom: 45, left: 55 });

    let x = d3.scaleBand()
        .domain(data.keys())
        .range([margin.left, width2 - margin.right])
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

    let svg = d3.select('#histogram212')
        .append('svg')
        .attr('width', width2)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', offset - 20)
        .attr('y', '15')
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('Types of Weather Events in the Atlantic Ocean');

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', offset - 20)
        .attr('y', '35')
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('from 1851 to 2015');

    // div for the tooltip
    var tooltip = d3.select('#histogram212').append('div')
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
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('Type');

    svg.append('text')
        .attr('fill', 'black')
        .attr('x', '5')
        .attr('y', '-15')
        .attr('transform', 'translate(30, 300) rotate(270)')
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('Count');
}

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/6bff2a50f6dd59769e809017dda76b0a/raw/b9e645c14ae5a2e6378f4b96f8e8615a84c88b0f/atlantic_full_types_count_2.csv',
).then(data => renderChart2_1_2(data));

// Chart 2.2.1
function renderChart2_2_1(dataElements, startId = 12, endId = 16) {
    let data = dataElements.map(o => ({
        id: +o.id,
        decade: o.Decade,
        type: o.Type,
        value: +o.Value
    }));

    let decade = new Set(data.map((o) => {
        if (o.id >= startId & o.id <= endId) return o.decade;
    }));
    if (decade.has(undefined)) {
        decade.delete(undefined);
    }
    console.log(decade);
    let type = new Set(dataElements.map(o => o.Type));
    console.log('type', type);
    let max = d3.max(dataElements.map(o => +o.Value));
    console.log('val', max);
    let margin = ({ top: 45, right: 45, bottom: 45, left: 45 });

    // clear svg
    d3.selectAll('#chart22 > *').remove();
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
        .paddingInner(0.07)
        .paddingOuter(0.07);

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));


    const y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    svg.append('g')
        .call(d3.axisLeft(y));

    d3.selectAll('g.tick')
        .attr('class', 'forTicks');

    // scale for small groups inside a big ones
    const xSubgroup = d3.scaleBand()
        .domain(type)
        .range([0, x.bandwidth()])
        .paddingInner(0.04)
        .paddingOuter(0.04);

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

        let dscr = colorShortClassifications.filter(o => o.abbr == d.key);
        tooltip.html(d.key + ' - ' + dscr[0].descr + '<br/>' + 'Total Count per Decade ' + d.value)
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    let arr = Array.from(type);
    data = data.filter(d => d.id >= startId & d.id <= endId);
    svg.append('g')
        .selectAll('g')
        .data(data)
        .join('g')
        .attr('transform', d => `translate(${x(d.decade)}, 0)`)
        .selectAll('rect')
        .data(function(d) { return arr.map(function(key) { return { key: d.type, value: d.value }; }); })
        .join('rect')
        .attr('x', d => { return xSubgroup(d.key); })
        .attr('y', d => y(d.value))
        .attr('width', xSubgroup.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('fill', d => color(d.key))
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}
// Chart 2.2.2
function renderChart2_2_2(dataElements, startId = 12, endId = 16) {
    let data = dataElements.map(o => ({
        id: +o.id,
        decade: o.Decade,
        type: o.Type,
        value: +o.Value
    }));
    let decade = new Set(data.map((o) => { if (o.id >= startId & o.id <= endId) return o.decade; }));
    if (decade.has(undefined)) {
        decade.delete(undefined);
    }
    let type = new Set(dataElements.map(o => o.Type));
    let max = d3.max(dataElements.map(o => +o.Value))

    let margin = ({ top: 45, right: 45, bottom: 45, left: 45 });

    // clear svg
    d3.selectAll('#chart222 > *').remove();
    // append the svg object to the body of the page
    const svg = d3.select('#chart222')
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
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    svg.append('g')
        .call(d3.axisLeft(y));

    d3.selectAll('g.tick')
        .attr('class', 'forTicks');

    // scale for small groups inside a big ones
    const xSubgroup = d3.scaleBand()
        .domain(type)
        .range([0, x.bandwidth()])
        .padding([0.05]);

    const color = d3.scaleOrdinal()
        .domain(colorsShortDict.keys())
        .range(colorsShortDict.values());

    // div for the tooltip
    var tooltip = d3.select('#chart222').append('div')
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

        let dscr = colorShortClassifications.filter(o => o.abbr == d.key);
        tooltip.html(d.key + ' - ' + dscr[0].descr + '<br/>' + 'Total Count per Decade ' + d.value)
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    let arr = Array.from(type);
    data = data.filter(d => d.id >= startId & d.id <= endId);
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
        .attr('fill', d => color(d.key))
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);
}

function chart221listener(dataElements) {
    renderChart2_2_1(dataElements);
    // chart221 update year range listener
    d3.select('#chart221slider').on('change', function(d) {
        selectedValue = +this.value;
        console.log('selectedValue', selectedValue);
        renderChart2_2_1(dataElements, selectedValue, selectedValue + 4);
    });
}

function chart222listener(dataElements) {
    renderChart2_2_2(dataElements);
    // chart2 update year range listener
    d3.select('#chart222slider').on('change', function(d) {
        selectedValue = +this.value;
        renderChart2_2_2(dataElements, selectedValue, selectedValue + 5);
    });
}

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/fc564b646d49715ff3dfa3a1abc1dcb8/raw/e844f9361a6bf685b28881ba9574c099b94fe05b/atlantic_full_hist_10_1851_by_highest_id.csv',
).then(data => chart221listener(data));

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/a004dc4307ab9a6539a883d32b072904/raw/b66c0b8fe6979a0f05947cd8e229a896d2f73e56/atlantic_full_hist_10_1851_by_highest_2_id.csv',
).then(data => chart222listener(data));