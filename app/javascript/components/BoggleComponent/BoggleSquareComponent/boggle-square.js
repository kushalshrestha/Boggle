import React from 'react';

import './boggle-square.css';


export default class BoggleSquare extends React.Component{
    render(){
        return(
            <div>
                <button className="square">{this.props.alphabet}</button>
            </div>
        )
    }
}