import React from "react";
import BoggleSquare from './BoggleSquareComponent/boggle-square';
import {Container, Row, Col} from "react-bootstrap";
import './boggle.css';
 import mytext from './letter-frequency.json';

export default class Board extends React.Component{

    constructor(props){
        super(props);
        this.state={
            box_size: 4,
            alphabet_distribution:[],
            sum:0,
            isDataLoaded: false
        }
    };

    componentDidMount(){
        this.importReferenceTableValue();
    }

    importReferenceTableValue(){
        console.log('here');
        var cumulativefrequency=0;
        var obj={};
        var alphabetList=[];

        mytext.EnglishRelativeFrequency.map((letterDetail,i)=>{
                    cumulativefrequency+=letterDetail.frequency;
                    obj={'letter':letterDetail.letter, 'frequency':letterDetail.frequency,'cumulativefrequency':cumulativefrequency};
                    alphabetList.push(obj);
                    obj={}
                });

        this.setState(()=>{
                    return{
                        alphabet_distribution: alphabetList,
                        sum: cumulativefrequency,
                        isDataLoaded: true
                    }
                },()=>{
                    console.log(this.state.alphabet_distribution);
                }
                );

                
    }


    createBoggleBoard=()=>{
        console.log('Creating Boggle Board');
        let boardRow=[]
        for(let i=0;i<this.state.box_size;i++){
            let boardColumn=[];
            for(let j=0;j<this.state.box_size;j++){
            boardColumn.push(<BoggleSquare key={j}/>);
            }
            boardRow.push(<div className="board-row" key={i}>{boardColumn}</div>);
        }    
        
        return <div>{boardRow}</div>;
    }
    
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs={5} className="board">
                            {this.createBoggleBoard()}
                        </Col>
                    </Row>
                </Container>
            
            </div>
        )
    }

}