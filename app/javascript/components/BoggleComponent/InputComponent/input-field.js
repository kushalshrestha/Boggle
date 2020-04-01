import React from "react";
import './input-field.css';

import Timer from './../TimerComponent/timer';

export default class InputField extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            disable_input : false
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
        this.setState({
          value: ''
        });
        event.preventDefault();
    }

    checkData=(value)=>{
      this.props.parentCallback(value);
    }

    callbackFunction = (childData) => {
      this.setState({
        disable_input : childData
      });
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <h4>Enter a word: </h4>
            <label>
              <input className="input-lg"
                    // (this.state.disable_input?"disabled":"")
                    // className={"input-lg " +(this.state.disable_input?"disabled":"")} 
                    disabled={this.state.disable_input}
                    type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            {/* <input type="submit" value="Submit" /> */}

            <h5><Timer disableCheck={this.callbackFunction}/></h5>
          </form>
        );
      }
}