import React from 'react';

import './boggle-square.css';


export default class BoggleSquare extends React.Component{
    render(){
        return(
            
                <button className="square">{this.props.alphabet}</button>
            
        )
    }
}