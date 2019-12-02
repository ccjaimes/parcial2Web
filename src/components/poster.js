import React, { Component } from 'react';

class Poster extends Component {

    render() {
        if (typeof this.props.info === 'undefined') {
            return (<div></div>);
        }
        return (
            <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={this.props.info.poster} alt="Poster" />
                <div className="card-body">
                    <h4 className="card-title">{this.props.info.name}</h4>
                    <p className="card-text">{this.props.info.description}</p>
                    <h5>Cast: {this.props.info.cast}</h5>
                </div>
            </div>
        );
    }
}

export default Poster;