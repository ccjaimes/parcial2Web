import React, { Component } from 'react';
import { FormattedMessage, FormattedNumber, FormattedPlural, FormattedDate } from 'react-intl';
class Det extends Component {
    getOne = () => {
        return <FormattedMessage id="million" />
    }
    getMany = () => {
        return <FormattedMessage id="millions" />
    }
    callDad = () => {
        console.log("click");
        this.props.met(this.props.movie.id);
    }
    render() {
        return (
            <tr  onClick={() => this.callDad()}>
                <th scope="row">{this.props.movie.id}</th>
                <td>{this.props.movie.name}</td>
                <td>{this.props.movie.directedBy}</td>
                <td>{this.props.movie.country}</td>
                <td>{this.props.movie.budget} <FormattedPlural value={this.props.movie.budget} one={this.getOne()} other={this.getMany()} /></td>
                <td><FormattedDate
					value={new Date(this.props.movie.releaseDate)}
					year='numeric'
					month='long'
					day='numeric'
					weekday='long'
				/></td>
                <td><FormattedNumber value={this.props.movie.views} /></td>
            </tr>
        );
    }
}

export default Det;