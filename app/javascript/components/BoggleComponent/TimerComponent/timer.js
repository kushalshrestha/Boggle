import React from "react";
import './timer.css';
import Popup from './time_up'

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTimeStarted: false,
            isTimeUp: false,
            timer_time_ms: 3,  //2 min 30 sec in second
            timer_minute: 0,
            timer_second: 0,
            stop_watch: 0,
            show_score: false
        };
        this.setNextInterval;
        this.secondsRemaining;
        this.updateTimer = this.updateTimer.bind(this);

    }
    componentDidMount() {
        console.log(this.state.timer_time_ms);
        this.startTimer();

    }

    startTimer = () => {
        this.setNextInterval = setInterval(this.updateTimer, 1000);
        let time_in_sec = this.state.timer_time_ms;
        this.secondsRemaining = time_in_sec;
        this.setState({
            isTimeStarted: true
        });
    }

    updateTimer() {
        var minutes = Math.floor((this.secondsRemaining / 60));
        var seconds = Math.floor((this.secondsRemaining % 60));
        var watch = minutes + ' : ' + seconds;
        this.setState({
            timer_minute: minutes,
            timer_second: seconds



        });
        if (minutes <= 9) {
            this.setState({
                timer_minute: "0" + minutes
            })
        }
        if (seconds <= 9) {
            this.setState({
                timer_second: "0" + seconds
            })
        }
        if (minutes === 0 & seconds === 0) {
            clearInterval(this.setNextInterval);

            this.setState({
                isTimeUp: !this.state.isTimeUp
            });

            console.log(this.state.isTimeUp);

            this.disableFurtherInput();
        }

        this.secondsRemaining--

    }

    toggleScorePopup() {
        console.log("TIME UP");
        this.setState({
            show_score: !this.state.show_score
        });
    }

    disableFurtherInput() {
        console.log("disableFurtherInput method called");
        this.toggleScorePopup();
        this.props.disableCheck(true);
        
    }


    render() {
        if(!this.state.show_score){
            return (
                <div>Timer :    {this.state.timer_minute} : {this.state.timer_second}
    
                </div>
            );
        }else{
            return(<Popup />)
        }
        
    }
}