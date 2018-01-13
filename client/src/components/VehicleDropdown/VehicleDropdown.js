import React from "react";
import { Link } from "react-router-dom";
class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }
    handleClick(e) {
        e.preventDefault();
        this.setState({
            isVisible: !this.state.isVisible
        });
    }
    renderDropdown() {
        return (
            <ul className="dropdown">
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
            </ul>
        );
    }
render() {
    return (
        <div className="dropdown">
            <button class="btn btn-primary" type="button" onClick={(e) => this.handleClick(e)} tabindex="1" onFocus={(e) => this._handleClick(e)}>Dropdown &#8605;
        <span className="caret"></span></button>
            {this.state.isVisible ? this.renderDropdown() : null}
        </div>
    );
    }
}
export default DropDown;