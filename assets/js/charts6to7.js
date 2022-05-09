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

    let data = dataElements.map((o) => ({
        name: o.name,
        lat: +o.lat,
        long: +o.long,
        year: +o.year
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
    console.log('dt-->', dt);

    const color = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemePaired);

    dt.forEach(storm => {
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
            .style('stroke', '#fff')
            .style('stroke-linecap', 'round')
            .style('stroke-width', 5);
        svg.selectAll('stormPoints')
            .data(storm.points)
            .join('path')
            .attr('d', function(d) { return path(d) })
            .style('fill', 'none')
            .style('stroke', color(storm.name))
            .style('stroke-linecap', 'round')
            .style('stroke-width', 4);
    });
}


function renderChart7(dataGeo, dataElements, startYear = 2011, interval = 4) {

    let widthCh6 = 1000;
    let heightCh6 = 800;

    let endYear = startYear + interval;
    if (endYear > 2015) {
        endYear = 2015;
    }

    d3.selectAll('#chart7map > *').remove();
    let svg = d3.select('#chart7map')
        .append('svg')
        .attr('width', widthCh6)
        .attr('height', heightCh6);

    // map and projection
    const projection = d3.geoMercator()
        .scale(270)
        .translate([widthCh6 / 2, heightCh6 / 2 * 1.3]);

    // console.log('width', widthCh6);
    // console.log('height', heightCh6);

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
        name: o.name,
        lat: +o.lat,
        long: +o.long,
        year: +o.year
    }));

    // console.log('data', data);

    data = data.filter(d => d.year >= startYear & d.year <= endYear);
    // console.log('data', data);
    let dataGrouped = d3.group(data, d => d.name);
    // console.log('dataGrouped', dataGrouped);
    let dt = [];
    let names = [];
    dataGrouped.forEach(storm => {
        let coords = [];
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
        names.push(storm[0].name);
        let temp = {
            'name': storm[0].name,
            'year': storm[0].year,
            'coords': coords
        };
        dt.push(temp);
    });

    const color = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemePaired);
    // console.log('dt   ->', dt);
    dt.forEach(storm => {
        svg.selectAll('myPath')
            .data(storm.coords)
            .join('path')
            .attr('d', function(d) {
                // console.log('d.coords', d);
                return path(d)
            })
            .style('fill', 'none')
            .style('stroke', color(storm.name))
            .style('stroke-width', 4);
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
    d3.select('#chart7slider1').on('change', function(d) {
        selectedValue = +this.value;
        v = d3.select('#chart7slider2').value;
        renderChart7(dataGeo, dataElements, selectedValue, v);
    });
    d3.select('#chart7slider2').on('change', function(d) {
        selectedValue = +this.value;
        v = d3.select('#chart7slider1').value;
        renderChart7(dataGeo, dataElements, v, selectedValue);
    });
}

// Charts
function renderCharts6to7(dataGeo, dataElements) {
    chart6listener(dataGeo, dataElements);
    chart7listener(dataGeo, dataElements);
}

// Load world shape AND list of connection
Promise.all([
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'), // World shape
    d3.csv('https://gist.githubusercontent.com/olga-kondr/0ffc7e15398f5c8e424ee35152d0aa39/raw/1c2d4097dc652534914f5a6bca2ee5c56706ecbe/atlantic_cleaned.csv'),
]).then(
    function(initialize) {
        let dataGeo = initialize[0];
        let dataElements = initialize[1];
        renderCharts6to7(dataGeo, dataElements);
    }
);