function renderChartbl(dataElements) {
    let width = 400;
    let height = 300;

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
        .text("Price");
}

function renderChartwh(dataElements) {
    let width = 400;
    let height = 300;

    let data = dataElements;
    let prices = dataElements.map((o) => +o.Price);
    let dates = dataElements.map((o) => o.Date);

    let margin = ({ top: 45, right: 25, bottom: 45, left: 45 });

    let x = d3.scaleBand()
        .domain(dates)
        .range([margin.left, width - margin.right])
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
    let width = 300;
    let height = 300;
    let filterDate = "02/28/2022";
    let dt = dataElements.map((o) => ({
        date: new Date(d3.timeParse("%m-%d-%Y")(o.Date)),
        value: +o.AdjClose,
    }));
    let data = dt.filter(d => d.date >= new Date(filterDate));

    let values = dataElements.map((o) => {
        if (new Date(d3.timeParse("%m-%d-%Y")(o.Date)) >= new Date(filterDate))
            return +o.AdjClose;
    });
    let dates = dataElements.map((o) => new Date(d3.timeParse("%m-%d-%Y")(o.Date)));

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };
    let x = d3.scaleTime()
        .domain([new Date(filterDate), d3.max(dates)])
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
        .domain([0, d3.max(values)]).nice()
        .range([height - margin.bottom, margin.top]);

    let xAxis = (g) => g
        .attr(
            'transform',
            `translate(0,${height - margin.bottom})`
        )
        .call(
            d3.axisBottom(x)
            .ticks(3)
        );

    let yAxis = (g) => g
        .attr(
            'transform',
            `translate(${margin.left},0)`
        )
        .call(d3.axisLeft(y));

    let svg = d3.select('#bl1')
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

        tooltip.html(' $' + d.value + ' ')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", 'green')
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
        )
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);

    svg.append("text")
        .attr("fill", "black")
        .attr("x", "0")
        .attr("y", "10")
        .style("font-size", "14px")
        .text("Highest Prices in 2022, EPAM Systems Inc.");

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
        .text("Price");
}

function renderChartwh1(dataElements) {
    let width = 600;
    let height = 300;
    let filterDate = "12/31/2021";
    let dt = dataElements.map((o) => ({
        date: new Date(d3.timeParse("%m-%d-%Y")(o.Date)),
        value: +o.AdjClose,
    }));
    let data = dt.filter(d => d.date >= new Date(filterDate));

    let values = dataElements.map((o) => {
        if (new Date(d3.timeParse("%m-%d-%Y")(o.Date)) >= new Date(filterDate))
            return +o.AdjClose;
    });
    let dates = dataElements.map((o) => new Date(d3.timeParse("%m-%d-%Y")(o.Date)));

    let margin = { top: 50, right: 25, bottom: 40, left: 80 };
    let x = d3.scaleTime()
        .domain([new Date(filterDate), d3.max(dates)])
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
        .domain([0, d3.max(values)]).nice()
        .range([height - margin.bottom, margin.top]);

    let xAxis = (g) => g
        .attr(
            'transform',
            `translate(0,${height - margin.bottom})`
        )
        .style('font-size', '0.55em')
        .call(
            d3.axisBottom(x)
            .ticks(6)
        );

    let yAxis = (g) => g
        .attr(
            'transform',
            `translate(${margin.left},0)`
        )
        .style('font-size', '0.55em')
        .call(d3.axisLeft(y));

    let svg = d3.select('#wh1')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);


    // horizontal lines y
    function make_y_lines() {
        return d3.axisLeft(y)
            .ticks(5)
    }

    // add y lines
    svg.append("g")
        .style("color", "lightgray")
        .attr(
            'transform',
            `translate(${margin.left},0)`
        )
        .call(make_y_lines()
            .tickSize(-width + margin.right + margin.left)
            .tickFormat("")
        )

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
            .style('padding', '0.15em')
            .style('font-size', '0.75em')
            .style('background', '#ccc')
            .style('border', '0px')
            .style('border-radius', '6px')
            .style('pointer-events', 'none');

        tooltip.html(' $' + d.value + ' ')
            .style('top', (e.pageY) + 'px')
            .style('left', (e.pageX) + 'px');
    }

    let hideTt = (e, d) => {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", '#66921e')
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
        );

    svg.append('g')
        .selectAll('circle')
        .data(data)
        .attr("fill", "none")
        .join('circle')
        .attr('fill', '#66a61e')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.value))
        .attr('r', '0.1em')
        .attr("stroke", '#fff')
        .attr("stroke-width", '0.03em')
        .on('mouseenter', showTt)
        .on('mouseleave', hideTt);

    svg.append("text")
        .attr("fill", "black")
        .attr("x", width / 4)
        .attr("y", "20")
        .style('font-size', '0.75em')
        .text("Stock Prices in 2022, EPAM Systems Inc.");

    svg.append("text")
        .attr("fill", "black")
        .attr("x", height / 2.5)
        .attr("y", "10")
        .attr("transform", "translate(30, 300) rotate(270)")
        .style('font-size', '0.55em')
        .text("Price ($)");
}

function renderCharts(dataElements) {
    renderChartbl1(dataElements);
    renderChartwh1(dataElements);
}

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/2d8cfbc8bab77a21b3abab37f470e174/raw/ace79ef135ac8f917acd46dc73ce5a7c089530b4/spam_stock.csv',
).then(data => renderCharts(data));

function renderChartsA(dataElements) {
    renderChartbl(dataElements);
    renderChartwh(dataElements);
}
d3.csv(
    "https://gist.githubusercontent.com/olga-kondr/f135bc5196e7776149d0c54941013105/raw/e6b4bf2ecc926a9fe88ab01f20db814fdc06e460/h_price_mar.csv",
).then(data => renderChartsA(data));