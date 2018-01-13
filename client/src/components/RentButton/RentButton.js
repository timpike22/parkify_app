import React from "react";
import { Link } from "react-router-dom";
// Depending on the current path, this component sets the "active" className on the appropriate navigation link item
class RentButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isAvailable: true };
    }
    handleChange(e){
        this.setState({ isAvailable: false });
        console.log(...this.state)
    }
    render(){
            const isAvailable = this.state.isAvailable;
        return(
            <button onClick={(e)=>this.handleChange(e)} type="button" class="btn btn-primary">Rent</button >
        );
    }
}
export default RentButton;