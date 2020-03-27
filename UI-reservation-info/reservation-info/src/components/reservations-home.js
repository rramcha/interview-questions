
const React = require('react');
const TemplateReservationsDashboardPage = require('./reservations-grid');
const TemplateSearchReservationsPage = require('./search-reservations');
const userInfo = require('../app/mock/data.json');
const { GUEST_TYPE: { PRIMARY } } = require('./util/constants');

const TemplateReservationsHomePage = React.createClass({

    getInitialState: function () {
        return {
            reservationInfo: userInfo
        };
    },

    refreshUserInfo: function () {
        window.location.reload();
    },

    filterByUsers: function (data) {
        if (!data) return;
        const { reservationInfo } = this.state;
        const userName = data.trim().toLowerCase();

        let filteredUsers = reservationInfo.filter(function (data) {
            return data.guestInfo.some(function (guest) {
                if (guest.type === PRIMARY) {
                    let guestName = guest.name.toLowerCase();
                    return guestName.indexOf(userName) > -1
                }
            })
        });

        this.setState({ reservationInfo: filteredUsers })
    },

    render() {
        return (
            <div className="template-reservations-home-page">
                {this.renderReservationsHome()}
            </div>
        );
    },

    renderReservationsHome: function () {
        const { reservationInfo } = this.state;
        return (
            <div>
                <div>
                    <TemplateSearchReservationsPage refreshUserInfo={this.refreshUserInfo} filterByUsers={this.filterByUsers} />
                </div>
                <div>
                    <TemplateReservationsDashboardPage defaultProps={this.props} reservationInfo={reservationInfo} />
                </div>
            </div>
        )
    },
});

module.exports = TemplateReservationsHomePage;
