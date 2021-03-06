import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class PriceBreakDown extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps) {
            this.setState({
                userData: newProps && newProps.userData
            })
        }
    }

    handleClick = () => {
        this.props.history.push('/home');
    }

    render() {
        //const { userData } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const perDayPrice = userData && userData.price && userData.price.perDay;
        return (
            <div>
                <h2>Price Breakdown</h2>
                <div>
                    <table id="t01" className="user-table">
                        <tr>
                            <th>Day</th>
                            <th>Room Price</th>
                            <th>Room Tax</th>
                            <th>Room Fees</th>
                        </tr>
                        {
                            perDayPrice && perDayPrice.map((data, index) => (
                                <tr key={index}>
                                    <td>Day {index + 1}</td>
                                    <td>{data.RoomPrice}</td>
                                    <td>{data.RoomTax}</td>
                                    <td>{data.RoomFees}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
                <button className="btn btn-danger" onClick={this.handleClick}>
                    Previous
                </button>

            </div>
        )
    }
}

export default withRouter(PriceBreakDown);
