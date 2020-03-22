import React from "react";

import BoggleSquare from './BoggleSquareComponent/boggle-square';

import {Container, Row, Col} from "react-bootstrap";


export default class Board extends React.Component{

    constructor(props){
        super(props);
        this.state={
            box_size: 4,
        }
    };

    createBoggleBoard=()=>{
        console.log('Creating Boggle Board');
        let boardRow=[]
        for(let i=0;i<this.state.box_size;i++){
            let boardColumn=[];
            for(let j=0;j<this.state.box_size;j++){
            boardColumn.push(<BoggleSquare key={j}/>);
            }
            boardRow.push(boardColumn);
        }    
        
        return <div>{boardRow}</div>;
    }
    
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs={5}>
                            {this.createBoggleBoard()}
                        </Col>
                    </Row>
                </Container>
            
            </div>
        )
    }

}