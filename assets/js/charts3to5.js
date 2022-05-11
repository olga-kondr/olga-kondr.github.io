// Chart 4
function renderChart4(dataElements, startYear = 2011, endYear = 2015, numBins = 10) {
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

    d3.selectAll('#chart4 > *').remove();
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
        .attr('d', d3.area()
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

    svg.append('text')
        .attr('fill', '#888')
        .attr('x', -width / 10)
        .attr('y', '-5')
        .attr('transform', 'translate(30, 300) rotate(270)')
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('Wind Speed in Knots (kn)');
}

// Chart 5
function renderChart5(dataElements, startYear = 2011, endYear = 2015, numBins = 10) {
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

    d3.selectAll('#chart5 > *').remove();
    const svg = d3.select('#chart5')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'violin');

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    d3.selectAll('g.tick')
        .attr('class', 'forTicks');

    d3.selectAll('g.tick')
        .attr('class', 'forTicks');

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
        .attr('fill', '#f7cb1b')
        .attr('d', d3.area()
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
        .style('fill', '#f5bc38')
        .attr('stroke', 'white')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);

    svg.append('text')
        .attr('fill', '#888')
        .attr('x', -width / 10)
        .attr('y', '-5')
        .attr('transform', 'translate(30, 300) rotate(270)')
        .attr('font-size', '100%')
        .attr('font', 'inherit')
        .text('Pressure in Millibars');
}


// https://observablehq.com/@sarah37/snapping-range-slider-with-d3-brush - ?

function chart4listener(dataElements) {
    renderChart4(dataElements);
    // chart4 update year range listener
    d3.select('#chart4slider').on('change', function(d) {
        selectedValue = +this.value;
        document.getElementById('chart4year').innerHTML = selectedValue;
        renderChart4(dataElements, selectedValue, selectedValue + 4);
    });
}

function chart5listener(dataElements) {
    renderChart5(dataElements);
    // chart5 update year range listener
    d3.select('#chart5slider').on('change', function(d) {
        selectedValue = +this.value;
        document.getElementById('chart5year').innerHTML = selectedValue;
        renderChart5(dataElements, selectedValue, selectedValue + 4);
    });
}

// Charts
function renderCharts3to5(dataElements) {
    chart4listener(dataElements);
    chart5listener(dataElements);
}
d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/0ffc7e15398f5c8e424ee35152d0aa39/raw/1c2d4097dc652534914f5a6bca2ee5c56706ecbe/atlantic_cleaned.csv',
).then(data => renderCharts3to5(data));