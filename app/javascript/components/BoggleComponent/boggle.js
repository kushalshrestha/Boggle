import React from "react";
import BoggleSquare from './BoggleSquareComponent/boggle-square';
import InputField from './InputComponent/input-field';
import {Container, Row, Col,Button} from "react-bootstrap";
import './boggle.css';
 import mytext from './letter-frequency.json';

export default class Board extends React.Component{

    constructor(props){
        super(props);
        this.state={
            box_size: 7,
            alphabet_distribution:[],
            sum:0,
            isDataLoaded: false,
            selected_alphabets:'',
            isAlphabetGenerated: false,
            isPossibleMoveCalculated: false,
            possibleMoves: {}
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
                
                    this.generateAlphabets();
                    console.log('generateAlphabets called')
                }
                );

                
    }

    generateAlphabets(){
        var min = 1;
        var max = this.state.sum;
        var size = this.state.alphabet_distribution.length;
        var array_list=this.state.alphabet_distribution;
        var total_required_characters = Math.pow(this.state.box_size,2);
        var selected='';
        for(var i=0;i<total_required_characters;i++){
            var random_number = Math.floor(Math.random()*(max-min)+min);
            for(var j=0; j<size;j++){
                if(random_number<=array_list[j].cumulativefrequency){
                    console.log(array_list[j].cumulativefrequency);
                    selected+=array_list[j].letter;
                   
                    break;
                }
                console.log("SELECTED "+selected);
            }
        }

        this.setState(()=>{
            return{ 
                selected_alphabets: selected,
                isAlphabetGenerated : true
            }
        },()=>{
            console.log("GENERATE POSSIBLE MOVESads");
            this.generatePossibleMoves();
            
        }
        );  
    }

    generatePossibleMoves(){
        var available_characters = this.state.selected_alphabets;
        var possiblities={};
        var box_size=this.state.box_size;
    
        for(var i=0; i<available_characters.length; i++){
            var possible_move_index=[];
            var index_detail={};
            var current_row = Math.floor(i/box_size);
            
            
            var right = this.calculateMoveRight(i, current_row, box_size, available_characters);
            var bottom =  this.calculateMoveBottom(i, current_row, box_size, available_characters);
            var left =  this.calculateMoveLeft(i, current_row, box_size, available_characters);
            var top =  this.calculateMoveTop(i, current_row, box_size, available_characters);
            var bottom_right = this.calculateMoveBottomRight(i, current_row, box_size, available_characters);
            var bottom_left =  this.calculateMoveBottomLeft(i, current_row, box_size, available_characters);
            var top_left =  this.calculateMoveTopLeft(i, current_row, box_size, available_characters);
            var top_right =  this.calculateMoveTopRight(i, current_row, box_size, available_characters);
        
            if(right!=null){
                possible_move_index.push(right);
            }
            if(bottom!=null){
                possible_move_index.push(bottom);
            }
            if(left!=null){
                possible_move_index.push(left);
            }
            if(top!=null){
                possible_move_index.push(top);
            }
            if(bottom_right!=null){
                possible_move_index.push(bottom_right);
            }
            if(bottom_left!=null){
                possible_move_index.push(bottom_left);
            }
            if(top_left!=null){
                possible_move_index.push(top_left);
            }
            if(top_right!=null){
                possible_move_index.push(top_right);
            }
            // console.log("for i: "+i+ " Possible moves: "+possible_move_index);
            index_detail={"value": available_characters.charAt(i),
                         "possible_moves": possible_move_index};
            
            possiblities[i]=index_detail;
            
        }
        console.log(JSON.stringify(possiblities));
        this.setState(()=>{
            return{
                possibleMoves: possiblities,
                isPossibleMoveCalculated: true
            }
        },()=>{
            console.log(this.state.possibleMoves);
        }
        );

    }

    calculateMoveRight(i, current_row, box_size, available_characters){
        var target_index=i+1;
        var target_row=Math.floor(target_index/box_size);
        // console.log('i : '+i+' Target Row : '+target_row+' Current Row : '+current_row+' Target Index : '+target_index);
        if((target_row-current_row)==0 && target_index<Math.pow(box_size,2)){
            // console.log("RIGHT "+ available_characters.charAt(target_index));
            return target_index;
        }
        return null;
    }
    calculateMoveBottom(i, current_row, box_size, available_characters){
        var target_index=i+box_size;
        var target_row=Math.floor(target_index/box_size);
        // console.log('i : '+i+' Target Row : '+target_row+' Current Row : '+current_row+' Target Index : '+target_index);
        if((target_row-current_row)==1 && target_index<Math.pow(box_size,2)){
            // console.log("BOTTOM "+ available_characters.charAt(target_index));
            return target_index;
        }
        return null;
    }
    calculateMoveLeft(i, current_row, box_size, available_characters){
        var target_index=i-1;
        var target_row=Math.floor(target_index/box_size);
        // console.log('i : '+i+' Target Row : '+target_row+' Current Row : '+current_row+' Target Index : '+target_index);
        if((target_row-current_row)==0 && target_index>=0){
            // console.log("LEFT "+ available_characters.charAt(target_index));
            return target_index;
        }
        return null;
    }
    calculateMoveTop(i, current_row, box_size, available_characters){
        var target_index=i-box_size;
        var target_row=Math.floor(target_index/box_size);
        // console.log('i : '+i+' Target Row : '+target_row+' Current Row : '+current_row+' Target Index : '+target_index);
        if((current_row-target_row)==1 && target_index>=0){
            // console.log("Top "+ available_characters.charAt(target_index));
            return target_index;
        }
        return null;
    }
    calculateMoveBottomRight(i, current_row, box_size, available_characters){
        var target_index=i+(box_size+1);
        var target_row=Math.floor(target_index/box_size);
        // console.log('i : '+i+' Target Row : '+target_row+' Current Row : '+current_row+' Target Index : '+target_index);
        if((target_row-current_row)==1 && target_index<Math.pow(box_size,2)){
            // console.log("Bottom Right "+ available_characters.charAt(target_index));
            return target_index;
        }
        return null;
    }
    calculateMoveBottomLeft(i, current_row, box_size, available_characters){
        var target_index=i+(box_size-1);
        var target_row=Math.floor(target_index/box_size);
        // console.log('i : '+i+' Target Row : '+target_row+' Current Row : '+current_row+' Target Index : '+target_index);
        if((target_row-current_row)==1 && target_index<Math.pow(box_size,2)){
            // console.log("Bottom Left "+ available_characters.charAt(target_index));
            return target_index;
        }
        return null;
    }
    calculateMoveTopLeft(i, current_row, box_size, available_characters){
        var target_index=i-(box_size+1);
        var target_row=Math.floor(target_index/box_size);
        // console.log('i : '+i+' Target Row : '+target_row+' Current Row : '+current_row+' Target Index : '+target_index);
        if((current_row-target_row)==1 && target_index>=0){
            // console.log("Top Left "+ available_characters.charAt(target_index));
            return target_index;
        }
        return null;
    }
    calculateMoveTopRight(i, current_row, box_size, available_characters){
        var target_index=i-(box_size-1);
        var target_row=Math.floor(target_index/box_size);
        // console.log('i : '+i+' Target Row : '+target_row+' Current Row : '+current_row+' Target Index : '+target_index);
        if((current_row-target_row)==1 && target_index>=0){
            // console.log("Top Right "+ available_characters.charAt(target_index));
            return target_index;
        }
        return null;
    }

    


    createBoggleBoard=()=>{
        console.log('Creating Boggle Board');
        let boardRow=[]
        for(let i=0;i<this.state.box_size;i++){
            let boardColumn=[];
            for(let j=0;j<this.state.box_size;j++){
                var index=this.state.box_size*i+j;
            boardColumn.push(<BoggleSquare key={j}
                                           alphabet={this.state.selected_alphabets.charAt(index)}/>);
            }
            boardRow.push(<div className="board-row" key={i}>{boardColumn}</div>);
        }    
        
        return <div>{boardRow}</div>;
    }
    
    
    render(){
        if(!this.state.isAlphabetGenerated){
            return(<div><p>LOADING</p></div>)
        }
        else{
            return(
                <div>
                    <Container>
                        <Row>
                            <Col xs={8} className="">
                                {this.createBoggleBoard()}
                            </Col>
                            
                            <Col xs={4}><InputField/><Button variant="primary">Primary</Button></Col>

                            
                        </Row>
                    </Container>
                
                </div>
            )
        }
        
    }

}