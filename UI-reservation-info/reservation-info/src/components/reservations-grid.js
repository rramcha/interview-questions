
const moment = require('moment');
const React = require('react');
const userInfo = require('../app/mock/data.json');
const { GUEST_TYPE: { PRIMARY }, BASE_URI, URI: { GUEST_DETAILS, PRICE_BREAK_DOWN } } = require('./util/constants');

const TemplateReservationsGridPage = React.createClass({

    getInitialState: function () {
        return {
            reservationInfo: userInfo,
        };
    },

    showPrimaryGuest: function (data) {
        const { guestInfo } = data;
        let guestName = [];

        guestInfo.forEach(guest => {
            if (guest.type === PRIMARY) {
                guestName.push(guest.name)
            }
        });

        return guestName;
    },

    navigateToDetailsPage: function (data, index, urlPath) {
        localStorage.setItem("userData", JSON.stringify(data));
        this.props.defaultProps.history.push(urlPath);
    },

    navigateToGuestDetailsPage: function (data, index) {
        this.navigateToDetailsPage(data, index, `${BASE_URI}/${GUEST_DETAILS}`);
    },

    navigateToPriceBreakDownPage: function (data, index) {
        this.navigateToDetailsPage(data, index, `${BASE_URI}/${PRICE_BREAK_DOWN}`);
    },

    aggregateRoomPriceForAllDays: function (data) {
        const result = [data.reduce((acc, n) => {
            for (let prop in n) {
                if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
                else acc[prop] = n[prop];
            }
            return acc;
        }, {})]

        return result
    },

    showTotalPrice: function (data) {
        const { price: { perDay } } = data;
        let totalPricePerDay = [];
        let totalRoomPrice = 0;
        const aggregatedTotal = this.aggregateRoomPriceForAllDays(perDay);

        aggregatedTotal.forEach(data => {
            const { RoomPrice, RoomTax, RoomFees } = data;
            totalRoomPrice = RoomPrice + RoomTax + RoomFees;
            totalPricePerDay.push(totalRoomPrice)
        });

        return totalPricePerDay;
    },

    showAmenities: function (data) {
        const { amenities } = data;
        let amenityName = [];

        amenities.forEach(amenity => {
            amenityName.push(amenity.name)
        });

        return amenityName.join(', ');
    },

    formatDates: function (date) {
        return moment(date).format('ll')
    },

    render() {
        return (
            <div className="template-reservations-grid-page">
                {this.renderReservationsDashboard()}
            </div>
        );
    },

    renderReservationsDashboard: function () {
        const { reservationInfo } = this.props;
        return (
            <table className="user-table">
                {this.renderReservationTableHeaders()}
                {reservationInfo && reservationInfo.map(this.renderReservationsGrid)}
            </table>
        )
    },

    renderReservationTableHeaders: function () {
        return (
            <tr>
                <th>Primary Guest</th>
                <th>Room Name</th>
                <th className="date-range">Dates</th>
                <th>Total Price(US$)</th>
                <th>Amenity Names</th>
            </tr>
        )
    },

    renderReservationsGrid: function (data, index) {
        const { roomDetails: { Name }, startDate, endDate } = data;
        return (
            <tr key={index}>
                <td onClick={() => this.navigateToGuestDetailsPage(data, index)}>
                    <Link {...this.getNavigationProps()}>
                        {this.showPrimaryGuest(data)}
                    </Link>
                </td>
                <td>{Name}</td>
                <td>{this.formatDates(startDate)} - {this.formatDates(endDate)}</td>
                <td className="total-price">
                    <u onClick={() => this.navigateToPriceBreakDownPage(data, index)}>
                        <Link {...this.getNavigationProps()}>
                            {this.showTotalPrice(data)}
                        </Link>
                    </u>
                </td>
                <td> {this.showAmenities(data)}</td>
            </tr>
        )
    },

    getNavigationProps: function () {
        return {
            externalLinkDescription: "External site which may or may not meet accessibility guidelines.",
            newWindowDescription: "Opens new window.",
            href: "#",
            largeSized: true
        };
    }
});

module.exports = TemplateReservationsGridPage;
