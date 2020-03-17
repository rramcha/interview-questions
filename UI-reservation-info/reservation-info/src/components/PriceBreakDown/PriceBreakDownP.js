import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class PriceBreakDown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            userData: this.props && this.props.userData,
            index: this.props && this.props.index
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps) {
            this.setState({
                userData: newProps.userData,
                index: newProps.index
            })
        }
    }

    toggle = () => {
        this.setState({
            //modal: !this.state.modal
        })
    }



    render() {
        //const { modal } = this.state;
        const { userData } = this.props;
        console.log("price break down", this.props);
        const perDayPrice = userData && userData.price && userData.price.perDay;
        return (
            <div>

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

            </div>
        )
    }
}

export default withRouter(PriceBreakDown);
