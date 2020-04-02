import React from "react";
import {Container, Row, Col,Button, Badge,Jumbotron} from "react-bootstrap";
import './score-list.css';

export default class ScoreList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            words_list:[],
            invalid_words_list:[],
            score: 0,
        };
        
    }
    static getDerivedStateFromProps(props, state) {
        var points = props.value.length;
        if((props.value).length>=2){
            if(state.words_list.includes(props.value)==false){ 
                
                state.words_list.push(props.value);
                return {score : state.score+points}
            

            }
            
        }
        return null;
        
    }
    
    render(){
        
        var word_array = this.state.words_list;
        var word_items = word_array.map((word,i)=>

            <Badge variant="success" className="cus-badge" key={i}>{word}</Badge>

        );
        
        return(
            <Container>
                <Jumbotron className="cus-jumbotron">
                <Button variant="info">
                Score  : <Badge variant="light" className="cus-score">{this.state.score}</Badge>
                <span className="sr-only">unread messages</span>
                </Button>
                <br/><br/>
                    <h5>Valid Words You Entered:</h5>
                    <p>
                    {word_items}
                    </p>
                    
                   
                </Jumbotron>
                
            </Container>
        );
    }
}