
const React = require('react');
const TemplateNavigateHomePage = require('./navigate-home');
const { PRICE_BREAKDOWN_TITLE, PRICE_BREAKDOWN_FOOTER } = require('./util/constants');

const TemplatePriceBreakDownPage = React.createClass({

    getInitialState: function () {
        return {
            userData: JSON.parse(localStorage.getItem('userData'))
        };
    },

    render() {
        return (
            <div className="template-price-break-down-page">
                {this.renderPriceBreakDown()}
            </div>
        );
    },

    renderPriceBreakDown: function () {
        const { userData: { price: { perDay } } } = this.state;

        return (
            <div>
                <h2 className="price-breakdown-header">{PRICE_BREAKDOWN_TITLE}</h2>
                <div>
                    <table>
                        {this.renderPriceBreakDownTableHeaders()}
                        {perDay && perDay.map(this.renderPriceBreakDownGrid)}
                    </table>
                </div>
                <div className="price-breakdown-footer">{PRICE_BREAKDOWN_FOOTER}</div>
                <div>
                    <TemplateNavigateHomePage defaultProps={this.props} />
                </div>
            </div>
        )
    },

    renderPriceBreakDownTableHeaders: function () {
        return (
            <tr>
                <th>Day</th>
                <th>Room Price</th>
                <th>Room Tax</th>
                <th>Room Fees</th>
            </tr>
        )
    },

    renderPriceBreakDownGrid: function (data, index) {
        const { RoomPrice, RoomTax, RoomFees } = data;
        return (
            <tr key={index}>
                <td>Day {index + 1}</td>
                <td>{RoomPrice}</td>
                <td>{RoomTax}</td>
                <td>{RoomFees}</td>
            </tr>
        )
    }
});

module.exports = TemplatePriceBreakDownPage;
