

const React = require('react');
const { BTN_LABELS: { SEARCH, REFRESH } } = require('./util/constants');

const TemplateSearchReservationsPage = React.createClass({
    getInitialState: function () {
        return {
            userName: ''
        };
    },

    refreshUserInfo: function () {
        this.props.refreshUserInfo();
    },

    searchUsers: function (data) {
        const { target: { value } } = data;
        this.setState({ userName: value })
    },

    filterByUsers: function () {
        const { userName } = this.state;
        this.props.filterByUsers(userName);
    },

    render() {
        return (
            <div className="template-search-reservations-page">
                {this.renderSearchSection()}
            </div>
        );
    },

    renderSearchSection: function () {
        const { userName } = this.state;
        return (
            <FormContainer>
                <div>
                    <span><Input {...this.getSearchInputProps()}
                        onChange={this.searchUsers.bind(this)}
                        value={userName}
                    /></span>
                    <span className="btn-padding">
                        <Button {...this.getSearchButtonProps()} onClick={this.filterByUsers}>
                            {SEARCH}
                        </Button>
                    </span>
                    <span>
                        <Button {...this.getRefreshButtonProps()} onClick={this.refreshUserInfo}>
                            {REFRESH}
                        </Button>
                    </span>
                </div>
            </FormContainer>
        )
    }

});

module.exports = TemplateSearchReservationsPage;
