import React, { Component } from 'react';
import Det from "./det";
import Poster from "./poster";
import { FormattedMessage } from 'react-intl';
import * as d3 from 'd3';

class Parcial extends Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            recent: <Poster info={undefined}/>
        };
        this.showPoster = this.showPoster.bind(this);
    }

    componentDidMount() {
        if (navigator.language.includes('en')) {
            fetch("https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json")
                .then(response => response.json())
                .then((jsonData) => {
                    this.setState({ movies: jsonData });
                    this.drawChart(this.state.movies, this.getRandie);
                });
        }
        else {
            fetch("https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json")
                .then(response => response.json())
                .then((jsonData) => {
                    this.setState({ movies: jsonData });
                    this.drawChart(this.state.movies, this.getRandie);
                })
                
        }
        
    }

    getRandie = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    showPoster = (val) => {
        for(let a of this.state.movies){
            if (a["id"] === val)
            {
                this.setState({movies:this.state.movies, recent:<Poster info={a}/>});
            }
        }
        
    }

    drawChart(data, getRandomColor) {
        const canvas = d3.select(this.refs.canvas);

        const width = 700;
        const height = 300;
        const margin = { top: 10, left: 50, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear()
            .domain([0, 10000000])
            .range([iheight, 0]);

        const x = d3.scaleBand()
            .domain(data.map(d => d.id))
            .range([0, iwidth])
            .padding(0.1);

        const bars = g.selectAll("rect").data(data);

        bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", d => getRandomColor())
            .attr("x", d => x(d.id))
            .attr("y", d => y(d.views))
            .attr("height", d => iheight - y(d.views))
            .attr("width", x.bandwidth())

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand"><FormattedMessage id="movies" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col"><FormattedMessage id="name" /></th>
                                        <th scope="col"><FormattedMessage id="directedBy" /></th>
                                        <th scope="col"><FormattedMessage id="country" /></th>
                                        <th scope="col"><FormattedMessage id="budget" /></th>
                                        <th scope="col"><FormattedMessage id="releaseDate" /></th>
                                        <th scope="col"><FormattedMessage id="views" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.movies.map((e, i) => <Det key={i} movie={e} met={this.showPoster}/>)}
                                </tbody>
                            </table>
                            <div ref="canvas">

                            </div>
                        </div>
                        <div className="col-3">
                            {this.state.recent}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Parcial;