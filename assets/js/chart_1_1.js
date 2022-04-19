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

    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    const color = d3.scaleOrdinal()
        .domain(rows)
        .range(colors);

    rows = tbody.selectAll('tr')
        .style('background-color', color);

    // add data
    // create a cell in each row for each column
    var cells = rows.selectAll('td')
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

function renderData(dataElements) {
    let columns = Object.keys(dataElements[0]);

    // var colors = ['#c464d9', '#ff6060', '#ff8f20', '#ffd821', '#fff795', '#00faf4', '#5ebaff']; // 0%
    var colors = ['#dca2e8', '#ffa0a0', '#ffbc79', '#ffe87a', '#fffabf', '#63fffb', '#9ed6ff']; // 40%
    // var colors = ['#e7c1f0', '#ffbfbf', '#ffd2a6', '#ffefa6', '#fffcd5', '#97fffd', '#bfe3ff']; // 60%

    addTable(dataElements, columns, colors);
};

d3.csv(
    'https://gist.githubusercontent.com/olga-kondr/03ffdd2935e38acd6688991780546a12/raw/3e482541c7d2b96bf7ab6e7e95e451a02a71aa23/scale.csv'
).then(data => renderData(data));