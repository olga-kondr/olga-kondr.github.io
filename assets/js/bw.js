let width = 350;
let height = 300;

function renderChartbl(dataElements) {

    let data = dataElements;
    let prices = dataElements.map((o) => +o.Price);
    let dates = dataElements.map((o) => o.Date);

    let margin = ({ top: 45, right: 25, bottom: 45, left: 45 });

    let color = d3.scaleSequential(d3.interpolatePiYG)
        .domain(d3.extent(prices)).nice();

    let x = d3.scaleBand()
        .domain(dates)
        .range([margin.left, width - margin.right])
        .paddingInner(0.07)
        .paddingOuter(0.07);

    let y = d3.scaleLinear()
        .domain(d3.extent(prices)).nice()
        .range([height - margin.bottom, margin.top]);

    // function with g arg assigned to xAxis
    let xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    // function with g arg assigned to yAxis
    let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    const svg = d3.select("#bl")
        .append("svg")
        .attr("width", width)
        .attr('height', height);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("text")
        .attr("fill", "black")
        .attr("x", width / 6)
        .attr("y", "30")
        .style("font-size", "14px")
        .text("Highest Prices in 2022, EPAM Systems Inc.");

    // Add tooltips
    var tooltip = d3.select("#bl").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    let showTt = (e, d) => {
        tooltip.transition()
            .duration(200)
            .style("opacity", .85);

        tooltip.style("position", "absolute")
            .style("text-align", "center")
            .style("padding", "5px")
            .style("font-size", "12.5px")
            .style("background", "rgb(231, 231, 229)")
            .style("border", "0px")
            .style("border-radius", "6px")
            .style("pointer-events", "none");
        tooltip.html("On " + d.Date + " Price Was $" + d.Price + ".")
            .style("left", (e.pageX) + "px")
            .style("top", (e.pageY) + "px");
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("transform", `translate(0, ${y()})`)
        .attr("fill", d => color(d.Price))
        .attr("width", x.bandwidth())
        .attr("height", d => (height - y(d.Price) - margin.top))
        .attr("x", d => x(d.Date))
        .attr("y", d => y(d.Price))
        .on("mouseenter", showTt)
        .on("mouseleave", hideTt);

    svg.append("text")
        .attr("fill", "black")
        .attr("x", width / 3)
        .attr("y", height - 5)
        .style("font-size", "14px")
        .text("Date");

    svg.append("text")
        .attr("fill", "black")
        .attr("x", height / 3)
        .attr("y", "-15")
        .attr("transform", "translate(30, 300) rotate(270)")
        .style("font-size", "14px")
        .text("Price ($)");
}

function renderChartwh(dataElements) {
    let data = dataElements;
    let prices = dataElements.map((o) => +o.Price);
    let formatDay = d3.timeFormat("%a %d");
    let dates = dataElements.map((o) => o.Date);

    let margin = ({ top: 45, right: 25, bottom: 45, left: 45 });

    let x = d3.scaleBand()
        .domain(dates)
        .range([margin.left, width - margin.right])
        // .tickFormat(function(d) { return formatDay(new Date(d)); })
        .paddingInner(0.07)
        .paddingOuter(0.07);

    let y = d3.scaleLinear()
        .domain([0, d3.max(prices)]).nice()
        .range([height - margin.bottom, margin.top]);

    // function with g arg assigned to xAxis
    let xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    // function with g arg assigned to yAxis
    let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    const svg = d3.select("#wh")
        .append("svg")
        .attr("width", width)
        .attr('height', height);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("text")
        .attr("fill", "black")
        .attr("x", width / 6)
        .attr("y", "30")
        .style("font-size", "14px")
        .text("Highest Stock Prices in March 2022, EPAM Systems Inc.");

    // Add tooltips
    var tooltip = d3.select("#wh").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    let showTt = (e, d) => {
        tooltip.transition()
            .duration(200)
            .style("opacity", .85);

        tooltip.style("position", "absolute")
            .style("text-align", "center")
            .style("padding", "5px")
            .style("font-size", "12.5px")
            .style("background", "rgb(231, 231, 229)")
            .style("border", "0px")
            .style("border-radius", "6px")
            .style("pointer-events", "none");
        tooltip.html("On " + d.Date + " Price Was $" + d.Price + ".")
            .style("left", (e.pageX) + "px")
            .style("top", (e.pageY) + "px");
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("transform", `translate(0, ${y()})`)
        .attr("fill", "#63ae3a")
        .attr("width", x.bandwidth())
        .attr("height", d => (height - y(d.Price) - margin.top))
        .attr("x", d => x(d.Date))
        .attr("y", d => y(d.Price))
        .on("mouseenter", showTt)
        .on("mouseleave", hideTt);

    svg.append("text")
        .attr("fill", "black")
        .attr("x", width / 3)
        .attr("y", height - 5)
        .style("font-size", "14px")
        .text("Date");

    svg.append("text")
        .attr("fill", "black")
        .attr("x", height / 3)
        .attr("y", "-15")
        .attr("transform", "translate(30, 300) rotate(270)")
        .style("font-size", "14px")
        .text("Price ($)");
}

function renderChartbl1(dataElements) {

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
    // let width = 300;
    // let height = 300;

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


function renderCharts(dataElements) {
    renderChartbl1(dataElements);
    renderChartwh1(dataElements);
}

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/0ffc7e15398f5c8e424ee35152d0aa39/raw/1c2d4097dc652534914f5a6bca2ee5c56706ecbe/atlantic_cleaned.csv',
).then(data => renderCharts(data));

function renderChartsA(dataElements) {
    renderChartbl(dataElements);
    renderChartwh(dataElements);
}
d3.csv(
    "https://gist.githubusercontent.com/olga-kondr/f135bc5196e7776149d0c54941013105/raw/e6b4bf2ecc926a9fe88ab01f20db814fdc06e460/h_price_mar.csv",
).then(data => renderChartsA(data));