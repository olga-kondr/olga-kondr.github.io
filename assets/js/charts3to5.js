// taken from https://www.movable-type.co.uk/scripts/latlong.html
function haversine(coords) {
    let res = 0;
    for (let i = 0; i < coords.length - 1; i = i + 2) {
        let lat1 = coords[i][1];
        let lat2 = coords[i + 1][1];
        let long1 = coords[i][0];
        let long2 = coords[i + 1][0];
        const R = 6371e3; // metres
        const fi1 = lat1 * Math.PI / 180; // φ, λ in radians
        const fi2 = lat2 * Math.PI / 180;
        const deltaFi = (lat2 - lat1) * Math.PI / 180; // Δφ 
        const deltaLambda = (long2 - long1) * Math.PI / 180; // Δλ

        const a = Math.sin(deltaFi / 2) * Math.sin(deltaFi / 2) +
            Math.cos(fi1) * Math.cos(fi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres
        res += d / 1000; // in km 
    }
    return res; // in km
}

// Chart 3
// inspired by https://d3-graph-gallery.com/graph/boxplot_show_individual_points.html
function renderChart3(dataElements, startYear = 2011, interval = 4) {
    let endYear = startYear + interval;
    if (endYear > 2015) {
        endYear = 2015;
    }

    let data = dataElements.map((o) => ({
        name: o.Name,
        lat: +o.Latitude,
        long: +o.Longitude,
        year: +o.Year
    }));

    data = data.filter(d => d.year >= startYear & d.year <= endYear);
    let dataGrouped = d3.group(data, d => d.name);
    let dt = [];
    let names = [];
    dataGrouped.forEach(storm => {
        let coords = [];
        for (let i = 0; i < storm.length - 1; i++) {
            coords.push([storm[i].long, storm[i].lat]);
            coords.push([storm[i + 1].long, storm[i + 1].lat]);
        }

        names.push(storm[0].name);
        let temp = {
            'name': storm[0].name,
            'year': storm[0].year,
            'coords': coords,
        };
        dt.push(temp);
    });

    // calculating strom length
    dt.forEach(element => { element.length = haversine(element.coords).toFixed(2); });

    let maxLength = 0;
    let minLength = 0;
    dt.forEach(el => {
        let val = +el.length;
        if (maxLength < val) {
            maxLength = val;
        };
        if (minLength > val) {
            minLength = val;
        };
    });

    let years = new Set(data.map((o) => { if (o.year >= startYear & o.year <= endYear) return o.year; }));
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
        .domain([0, maxLength + 1]).nice()
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

    d3.selectAll('#chart3 > *').remove();
    const svg = d3.select('#chart3')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'box');

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);

    // calculate quartiles, median, min and max --> these info are then used to draw boxes.
    let suma = d3.rollup(dt, function(d) {
            min = d3.quantile(d.map(function(g) { return +g.length; }).sort((a, b) => d3.ascending(a, b)), 0);
            k1 = d3.quantile(d.map(function(g) { return +g.length; }).sort((a, b) => d3.ascending(a, b)), .25);
            k2 = d3.quantile(d.map(function(g) { return +g.length; }).sort((a, b) => d3.ascending(a, b)), .5);
            k3 = d3.quantile(d.map(function(g) { return +g.length; }).sort((a, b) => d3.ascending(a, b)), .75);
            max = d3.quantile(d.map(function(g) { return +g.length; }).sort((a, b) => d3.ascending(a, b)), 1);
            return ({ k1: k1, median: k2, k3: k3, min: min, max: max });
        },
        function(d) { return d.year; });

    svg
        .selectAll('verticals')
        .data(suma)
        .enter()
        .append('line')
        .attr('x1', function(d) { return (x(d[0]) + x.bandwidth() / 2) })
        .attr('x2', function(d) { return (x(d[0]) + x.bandwidth() / 2) })
        .attr('y1', function(d) { return (y(d[1].min)) })
        .attr('y2', function(d) { return (y(d[1].max)) })
        .attr('stroke', 'black')
        .style('width', 40);

    let boxWidth = x.bandwidth() / 1.5;

    svg
        .selectAll('boxes')
        .data(suma)
        .enter()
        .append('rect')
        .attr('x', function(d) { return (x(d[0]) - boxWidth / 2) + x.bandwidth() / 2 })
        .attr('y', function(d) { return (y(d[1].k3)) })
        .attr('height', function(d) { return (y(d[1].k1) - y(d[1].k3)) })
        .attr('width', boxWidth)
        .attr('stroke', 'black')
        .style('fill', '#5982cf');

    svg
        .selectAll('median')
        .data(suma)
        .enter()
        .append('line')
        .attr('x1', function(d) { return (x(d[0]) - boxWidth / 2) + x.bandwidth() / 2 })
        .attr('x2', function(d) { return (x(d[0]) + boxWidth / 2) + x.bandwidth() / 2 })
        .attr('y1', function(d) { return (y(d[1].median)) })
        .attr('y2', function(d) { return (y(d[1].median)) })
        .attr('stroke', 'black')
        .style('width', 80);

    // div for the tooltip
    let tooltip = d3.select('#chart3').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // add tooltips
    let showTt = (e, d) => {
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);
        console.log(e, d);
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

        tooltip.html('In ' + d.year + ' ' + d.name + '\'s' + '<br/>' + 'length was ' + d.length + ' km')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    svg
        .selectAll('points')
        .data(dt)
        .enter()
        .append('circle')
        .attr('cx', function(d) { return (x(d.year) + x.bandwidth() / 2 - jitterWidth / 2 + Math.random() * jitterWidth) })
        .attr('cy', function(d) { return (y(d.length) + Math.random() * jitterHeight) })
        .attr('r', 4)
        .style('fill', '#4873f2')
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
        .text('Length in km');
}

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
        console.log(e, d);
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

function chart3listener(dataElements) {
    renderChart3(dataElements);
    // chart3 update year range listener
    d3.select('#chart3slider').on('change', function(d) {
        selectedValue = +this.value;
        document.getElementById('chart3year').innerHTML = selectedValue;
        renderChart3(dataElements, selectedValue);
    });
}

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

// Charts 4-5
function renderCharts4to5(dataElements) {
    chart4listener(dataElements);
    chart5listener(dataElements);
}

// load data
Promise.all([
    d3.csv('https://gist.githubusercontent.com/olga-kondr/0ffc7e15398f5c8e424ee35152d0aa39/raw/1c2d4097dc652534914f5a6bca2ee5c56706ecbe/atlantic_cleaned.csv'),
    d3.csv('https://gist.githubusercontent.com/olga-kondr/d39b5ce41ab7efdddf5ba82539ba0bfb/raw/e3b4874d752da237630b7188dd76ad7db9f03a96/atlantic_full_updated.csv'),
]).then(
    function(initialize) {
        let data45 = initialize[0];
        let data3 = initialize[1];
        renderCharts4to5(data45);
        chart3listener(data3);
    }
);