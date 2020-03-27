
const React = require('react');
const TemplateNavigateHomePage = require('./navigate-home');
const { RESERVATION_TITLE, GUEST_TYPE: { PRIMARY, ADDITIONAL } } = require('./util/constants');

const TemplateGuestDetailsPage = React.createClass({
    getInitialState: function () {
        return {
            primaryGuests: [],
            additionalGuests: [],
            userData: JSON.parse(localStorage.getItem('userData'))
        };
    },

    componentDidMount() {
        const { primaryGuests, additionalGuests } = this.getPrimaryAndAdditionalGuests();

        this.setState({
            primaryGuests,
            additionalGuests
        })
    },

    getPrimaryAndAdditionalGuests: function () {
        const { userData: { guestInfo } } = this.state;
        const primaryGuests = [];
        const additionalGuests = [];

        guestInfo.forEach(guest => {
            if (guest.type === PRIMARY) {
                primaryGuests.push(guest);
            } else if (guest.type === ADDITIONAL) {
                additionalGuests.push(guest);
            }
        });

        return { primaryGuests, additionalGuests };
    },

    render() {
        return (
            <div className="template-guest-details-page">
                {this.renderGuestDetailsPage()}
            </div>
        );
    },

    renderGuestDetailsPage: function () {
        const { userData: { no_of_guests, parkingRequired, reservationStatus }, primaryGuests, additionalGuests } = this.state;

        return (
            <div>
                <h1 className="user-reservation-heading">{RESERVATION_TITLE}</h1>
                <ul className="user-details">
                    <li>No. of Guests: <span className="no-of-guests-section">{no_of_guests}</span></li>
                    <li>Parking Desired: {parkingRequired}</li>
                    <li>Reservation Status: <span className="reservation-status-section">{reservationStatus}</span></li>
                    <li>
                        Primary Guests: <div>{this.renderPrimaryAndSecondaryGuestDetails(primaryGuests)}</div>
                    </li>
                    <li>
                        Additional Guests: <div>{this.renderPrimaryAndSecondaryGuestDetails(additionalGuests)}</div>
                    </li>
                </ul>
                <div>
                    <TemplateNavigateHomePage defaultProps={this.props} />
                </div>
            </div>
        )
    },

    renderPrimaryAndSecondaryGuestDetails: function (guestInfo) {
        return (
            <ul>
                {
                    guestInfo && guestInfo.length ?
                        guestInfo.map(this.renderDetailsSection)
                        : <li className="no-guests-found" />
                }
            </ul>
        )
    },

    renderDetailsSection: function (item, index) {
        const { name, age, address: { streetAddress, city, state, postalCode } } = item;
        return (
            <li key={index} className="guest-Info-section">
                <div>Name: {name}</div>
                <div>Age: {age}</div>
                <div>Address: {`${streetAddress} ${city} ${state} ${postalCode}`}  </div>
            </li>
        )
    }
});

module.exports = TemplateGuestDetailsPage;
