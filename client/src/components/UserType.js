import { React, Component } from 'react';

class UserType extends Component {
    constructor(props) {
        super(props)
        // initial userType state set from props
        this.state = {
            type: this.props.userType
        }
        this.setUserType = this.setUserType.bind(this)
    }

    setUserType(e) {
        this.setState({
            userType: e.target.value
        })
    }

    render() {
        const { userType } = this.state
        return <div>
        <div>
                <input type="radio" checked={userType == "owner"}
                    onClick={this.setUserType} value="owner" /> Space Owner
          <input type="radio" checked={userType == "driver"}
                    onClick={this.setUserType} value="driver" /> Driver
        </div>
            {"Select Type of User: "} {userType}
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        UserType: state.userType
    }
}

export default UserType;