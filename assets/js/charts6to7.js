// Chart 6 
// https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Paths/
// https://github.com/d3/d3-geo
// https://d3-graph-gallery.com/graph/connectionmap_csv.html

function renderChart6(dataGeo, dataElements, startYear = 2011, interval = 4) {

    let widthCh6 = 1000;
    let heightCh6 = 800;

    let endYear = startYear + interval;
    if (endYear > 2015) {
        endYear = 2015;
    }

    d3.selectAll('#chart6map > *').remove();
    let svg = d3.select('#chart6map')
        .append('svg')
        .attr('width', widthCh6)
        .attr('height', heightCh6);

    // map and projection
    const projection = d3.geoMercator()
        .scale(270)
        .translate([widthCh6 / 2, heightCh6 / 2 * 1.3]);

    // path generator
    const path = d3.geoPath()
        .projection(projection)

    // show the map
    svg.append('g')
        .selectAll('path')
        .data(dataGeo.features)
        .join('path')
        .attr('fill', '#b8b8b8')
        .attr('d', path)
        .style('stroke', '#fff')
        .style('stroke-width', 0);

    // console.log('data elems', dataElements);

    let data = dataElements.map((o) => ({
        name: o.Name,
        lat: +o.Latitude,
        long: +o.Longitude,
        year: +o.Year,
        status: o.Status
    }));

    data = data.filter(d => d.year >= startYear & d.year <= endYear);
    let dataGrouped = d3.group(data, d => d.name);
    let dt = [];
    let names = [];
    dataGrouped.forEach(storm => {
        let coords = [];
        let points = [];
        for (let i = 0; i < storm.length - 1; i++) {
            let tempCoords = {
                type: 'LineString',
                coordinates: [
                    [storm[i].long, storm[i].lat],
                    [storm[i + 1].long, storm[i + 1].lat]
                ]
            }
            coords.push(tempCoords);
        }
        for (let i = 0; i < storm.length; i++) {
            let tempPoints = {
                type: 'LineString',
                coordinates: [
                    [storm[i].long, storm[i].lat],
                    [storm[i].long + 0.01, storm[i].lat + 0.01]
                ]
            }
            points.push(tempPoints);
        }
        names.push(storm[0].name);
        let temp = {
            'name': storm[0].name,
            'year': storm[0].year,
            'coords': coords,
            'points': points,
        };
        dt.push(temp);
    });
    // console.log('dt-->', dt);

    const color = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemePaired);

    dt.forEach(storm => {
        // div for the tooltip
        let tooltip = d3.select('#chart6map').append('div')
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

            tooltip.html(d.year + ' - ' + d.name)
                .style('top', (e.pageY) + 'px')
                .style('left', (e.pageX) + 'px');
        }

        let hideTt = (e, d) => {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        }

        svg.selectAll('stormLines')
            .data(storm.coords)
            .join('path')
            .attr('d', function(d) { return path(d) })
            .style('fill', 'none')
            .style('stroke', color(storm.name))
            .style('stroke-width', 4);
        svg.selectAll('stormPoints')
            .data(storm.points)
            .join('path')
            .attr('d', function(d) { return path(d) })
            .style('fill', 'none')
            .style('stroke', '#ccc')
            .style('stroke-linecap', 'round')
            .style('stroke-width', 5);
        svg.selectAll('stormPointsDot')
            .data(storm.points)
            .join('path')
            .attr('d', function(d) { return path(d) })
            .style('fill', 'none')
            .style('stroke', color(storm.name))
            .style('stroke-linecap', 'round')
            .style('stroke-width', 4.5)
            .datum(storm)
            .on('mouseenter', showTt)
            .on('mouseleave', hideTt);
    });
}


function renderChart7(dataGeo, dataElements, startYear = 2015, interval = 1) {

    let widthCh7 = 1000;
    let heightCh7 = 800;

    let endYear = startYear + interval;
    if (endYear > 2015) {
        endYear = 2015;
    }

    d3.selectAll('#chart7map > *').remove();
    let svg = d3.select('#chart7map')
        .append('svg')
        .attr('width', widthCh7)
        .attr('height', heightCh7);

    // map and projection
    const projection = d3.geoMercator()
        .scale(400)
        .translate([widthCh7 / 1.3, heightCh7 / 1.5 * 1.3]);

    // path generator
    const path = d3.geoPath()
        .projection(projection)

    // show the map
    svg.append('g')
        .selectAll('path')
        .data(dataGeo.features)
        .join('path')
        .attr('fill', '#b8b8b8')
        .attr('d', path)
        .style('stroke', '#fff')
        .style('stroke-width', 0);

    let data = dataElements.map((o) => ({
        name: o.Name,
        lat: +o.Latitude,
        long: +o.Longitude,
        year: +o.Year,
        status: o.Status
    }));

    data = data.filter(d => d.year >= startYear & d.year <= endYear);
    let dataGrouped = d3.group(data, d => d.name);
    let dt = [];
    let names = [];
    dataGrouped.forEach(storm => {
        let coords = [];
        let points = [];
        for (let i = 0; i < storm.length - 1; i++) {
            let tempCoords = {
                type: 'LineString',
                coordinates: [
                    [storm[i].long, storm[i].lat],
                    [storm[i + 1].long, storm[i + 1].lat]
                ]
            }
            coords.push(tempCoords);
        }
        let isHurricane = false;
        for (let i = 0; i < storm.length; i++) {
            let tempPoints = {
                type: 'LineString',
                coordinates: [
                    [storm[i].long, storm[i].lat],
                    [storm[i].long + 0.01, storm[i].lat + 0.01]
                ]
            }
            points.push(tempPoints);
            if (storm[i].status === ' HU' | storm[i].status === 'HU') {
                isHurricane = true;
            }
        }
        names.push(storm[0].name);
        let temp = {
            'name': storm[0].name,
            'year': storm[0].year,
            'hu': isHurricane,
            'coords': coords,
            'points': points,
        };
        dt.push(temp);
    });

    dt = dt.filter(d => d.hu == true);
    const color = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemePaired);

    dt.forEach(storm => {
        // div for the tooltip
        let tooltip = d3.select('#chart7map').append('div')
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

            tooltip.html(d.year + ' - ' + d.name)
                .style('top', (e.pageY) + 'px')
                .style('left', (e.pageX) + 'px');
        }

        let hideTt = (e, d) => {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        }

        svg.selectAll('stormLines')
            .data(storm.coords)
            .join('path')
            .attr('d', function(d) { return path(d) })
            .style('fill', 'none')
            .style('stroke', color(storm.name))
            .style('stroke-width', 4);
        svg.selectAll('stormPoints')
            .data(storm.points)
            .join('path')
            .attr('d', function(d) { return path(d) })
            .style('fill', 'none')
            .style('stroke', '#ccc')
            .style('stroke-linecap', 'round')
            .style('stroke-width', 5);
        svg.selectAll('stormPointsDot')
            .data(storm.points)
            .join('path')
            .attr('d', function(d) { return path(d) })
            .style('fill', 'none')
            .style('stroke', color(storm.name))
            .style('stroke-linecap', 'round')
            .style('stroke-width', 4.5)
            .datum(storm)
            .on('mouseenter', showTt)
            .on('mouseleave', hideTt);
    });
}

function chart6listener(dataGeo, dataElements) {
    renderChart6(dataGeo, dataElements);
    // chart6 update year range listener
    let years = 4;
    let startYear = 2011;
    d3.select('#chart6slider').on('change', function(d) {
        startYear = +this.value;
        renderChart6(dataGeo, dataElements, startYear, years);
    });
    d3.select('#chart6years').on('change', function(d) {
        years = +this.value;
        renderChart6(dataGeo, dataElements, startYear, years);
    });
}


function chart7listener(dataGeo, dataElements) {
    renderChart7(dataGeo, dataElements);
    // chart7 update year range listener
    let years = 1;
    let startYear = 2015;
    d3.select('#chart7slider').on('change', function(d) {
        startYear = +this.value;
        renderChart7(dataGeo, dataElements, startYear, years);
    });
    d3.select('#chart7years').on('change', function(d) {
        years = +this.value;
        renderChart7(dataGeo, dataElements, startYear, years);
    });
}

// Charts
function renderCharts6to7(dataGeo, dataElements) {
    chart6listener(dataGeo, dataElements);
    chart7listener(dataGeo, dataElements);
}

// load world shape and list of trajectories
Promise.all([
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
    // d3.csv('https://gist.githubusercontent.com/olga-kondr/0ffc7e15398f5c8e424ee35152d0aa39/raw/1c2d4097dc652534914f5a6bca2ee5c56706ecbe/atlantic_cleaned.csv'),
    d3.csv('https://gist.githubusercontent.com/olga-kondr/d39b5ce41ab7efdddf5ba82539ba0bfb/raw/e3b4874d752da237630b7188dd76ad7db9f03a96/atlantic_full_updated.csv'),
]).then(
    function(initialize) {
        let dataGeo = initialize[0];
        let dataElements = initialize[1];
        renderCharts6to7(dataGeo, dataElements);
    }
);