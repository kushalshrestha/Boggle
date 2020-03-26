import React from "react";
import {Container, Row, Col,Button, Badge,Jumbotron} from "react-bootstrap";
import './score-list.css';

export default class ScoreList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            words_list:[],
            score: 0,
        };
        
    }

    
   
   
    // updateScore(word){
        
        
    //     console.log('called');
    //     console.log(this.state.score);
    //     var points = word.length;
    //     var word_list = this.state.words_list;
    //     word_list.push(word);
    //     this.setState({
    //         score : score+points,
    //         words_list: word_list
    //     },()=>{
    //         console.log(this.state.score);
    //     });
        

       
    //     // return true;
    // }

    render(){
        var points = this.props.value.length;
        console.log(JSON.stringify(word_array));
        console.log("CURRENT PASSED VALUE: "+this.props.value);
        if((this.props.value).length>=2){
            if(this.state.words_list.includes(this.props.value)==false){ 
                
                this.state.words_list.push(this.props.value);
                this.setState({
                   score : this.state.score+points 
                });

            }
        }
        
        var word_array = this.state.words_list;
        console.log(JSON.stringify(word_array));
        var word_items = word_array.map((word,i)=>

            <Badge variant="success" className="cus-badge" key={i}>{word}</Badge>

        );
        
        return(
            <Container>
                <Jumbotron className="cus-jumbotron">
                <Button variant="info">
                Score <Badge variant="light">{this.state.score}</Badge>
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