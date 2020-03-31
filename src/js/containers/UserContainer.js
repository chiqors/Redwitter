import React from 'react';
import { connect } from 'react-redux';
import User from '../components/User';
import { requestUser } from '../actions';

class UsersContainer extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const { username } = this.props.params;
        this.props.getUser(username);
    }

    render() {
        const { user, isLoading } = this.props;

        return (
            <div>
                <User user={user} isLoading={isLoading} updateView={this.props.updateView} />
                { this.props.children }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (user) => {
            if (typeof user === 'string') {
                dispatch(requestUser(user));
            }
        },

        updateView: (e) => {
            const username = e.target.href.split('/').slice(-1)[0];
            dispatch(requestUser(username));
        }
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        isLoading: state.user.isLoading,
        receiveDate: state.user.receiveDate
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
