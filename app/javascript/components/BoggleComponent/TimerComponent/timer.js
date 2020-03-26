import React from "react";
import './timer.css';

export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isTimeStarted: false,
            isTimeUp: false,
            timer_time_ms : 120,  //2 min 30 sec in second
            timer_minute: 0,
            timer_second: 0,
            stop_watch: 0
        };
        this.setNextInterval;
        this.secondsRemaining;
        this.updateTimer = this.updateTimer.bind(this);
        
    }
    componentDidMount(){
        console.log(this.state.timer_time_ms);
        this.startTimer();

    }

    
    
    
    
    startTimer = ()=>{
        this.setNextInterval = setInterval(this.updateTimer,1000);
        let time_in_sec = this.state.timer_time_ms;
        this.secondsRemaining = time_in_sec;
        this.setState({
            isTimeStarted : true
        });
    }

    updateTimer(){
        var minutes = Math.floor((this.secondsRemaining/60));
        var seconds = Math.floor((this.secondsRemaining%60));
        var watch = minutes+' : ' + seconds;
        this.setState({
            timer_minute : minutes,
            timer_second : seconds
            
            
            
        });
        if(minutes<=9){
            this.setState({
                timer_minute : "0"+minutes
            })
        }
        if(seconds<=9){
            this.setState({
                timer_second : "0"+seconds
            })
        }
        if(minutes===0 & seconds===0){
            clearInterval(this.setNextInterval);

            this.setState({
                isTimeUp : !this.state.isTimeUp
            });

            console.log(this.state.isTimeUp);

            this.disableFurtherInput();
        }

        this.secondsRemaining--

    }

    disableFurtherInput (){
        console.log("disableFurtherInput method called");
        this.props.disableCheck(true);
    }


    render(){
        return (
            <div>Timer :    {this.state.timer_minute} : {this.state.timer_second}</div>
        );
    }
}