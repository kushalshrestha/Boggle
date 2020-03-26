import React from "react";
import './input-field.css';

export default class InputField extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            value : event.target.value
        });
    }

    handleSubmit(event){
        this.checkData(this.state.value);
        // alert(' A name was submitted : '+this.state.value);
        event.preventDefault();
    }

    checkData=(value)=>{
      this.props.parentCallback(value);
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <h4>Enter a word: </h4>
            <label>
              <input className="input-lg" type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            {/* <input type="submit" value="Submit" /> */}
          </form>
        );
      }
}