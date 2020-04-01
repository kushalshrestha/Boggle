import React,{Component} from "react";
import BoggleSquare from './BoggleSquareComponent/boggle-square';
import InputField from './InputComponent/input-field';
import ScoreList from './ScoreListComponent/score-list';
import GameConfiguration from './GameIntroComponent/intro-alert'; 
import {Container, Row, Col,Button, Alert,ButtonToolbar, ButtonGroup, Card} from "react-bootstrap";
import './boggle.css';
import mytext from './letter-frequency.json';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIRequestService from './Engine/service';
import {notify} from './Engine/toast';

export default class Board extends React.Component{

    constructor(props){
        super(props);
        this.state={
            box_size: 4,
            game_type: "Classic Boggle",
            alphabet_distribution:[],
            sum:0,
            isDataLoaded: false,
            selected_alphabets:'',
            isAlphabetGenerated: false,
            isPossibleMoveCalculated: false,
            isAlertShown: false,
            possibleMoves: {},
            entered_value:"",
            valid_word:"",
            show: true, 
            setShow : true
            

        }
        
    };

    callbackFunction=(data)=>{
        this.setState({
            entered_value : data.toLowerCase()
        },()=>{
            this.validateWord(this.state.entered_value);
        });
        
    }

    callBackFromIntroAlert=(size,type)=>{
        this.setState({
            box_size : size,
            game_type : type,
            isAlertShown : !this.state.isAlertShown

        },()=>{
           
            this.importReferenceTableValue();
        })
    }

    validateWord(word){
        
        var boggle_alphabets = this.state.selected_alphabets;
        var possible_movesList = this.state.possibleMoves;
        
        var first_word = word.charAt(0);
        var match_pos=[];

        
        //finding possible indexes of starting word
        for(var i=0,j=(boggle_alphabets.length-1);i<boggle_alphabets.length;i++,j--){
            
            if(i>=j){
                if(boggle_alphabets.charAt(i)==first_word){
                    match_pos.push(i);
                }
                break; 
            }

            if(boggle_alphabets.charAt(i)==first_word){
                match_pos.push(i);
            }
            if(boggle_alphabets.charAt(j)==first_word){
                match_pos.push(j);
            }
            
        }

        
        var result = this.checkTraverseValidity(1,match_pos,possible_movesList,boggle_alphabets,word);
        
        if(result===true ){
            this.fetchAPIResponse(word);
        }
        if(result===false & word.length>1){
            notify(word,null);
        }


    
    }

    fetchAPIResponse(word){
        this.apiRequestService = new APIRequestService(word);
        this.apiRequestService.fetchAPIResponse().then(async response => {
           const data = await response;
           if(data!=200){
               const error=(data && data.message);
               return Promise.reject(error);
           }
           if(word.length>1){
               this.setState({
                   valid_word : word
               });
               notify(word,0);
           }
           
       })
       .catch(error =>{
           notify(word,1);
       })
    }

    checkTraverseValidity(position,match_position,possible_movesList,boggle_alphabets,entered_word){
        // console.log(position+"st/nd/th letter in entered word matches on following positions: "+JSON.stringify(match_position));
       var match_position_next=[];
        
        for(var j=0;j<match_position.length;j++){
            var index=match_position[j];
            for(var k=0;k<possible_movesList[index].possible_moves.length;k++){
                if(entered_word.charAt(position)==boggle_alphabets.charAt(possible_movesList[index].possible_moves[k])){
                    match_position_next.push(possible_movesList[index].possible_moves[k]);
                }
            }
            
        }

        if(match_position_next.length==0 && position!=(entered_word.length-1)){
            return false;
        }else if(match_position_next.length>=1 && position==(entered_word.length-1)){
            return true;
        }else{
            return(this.checkTraverseValidity(position+1,match_position_next,possible_movesList,boggle_alphabets,entered_word));
        }

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
                    this.generateAlphabets();
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
            }
        }

        this.setState(()=>{
            return{ 
                selected_alphabets: selected,
                isAlphabetGenerated : true
            }
        },()=>{
            this.generatePossibleMoves();
            
        }
        );  
    }

    generatePossibleMoves(){
        var available_characters = this.state.selected_alphabets;
        var possiblities={};
        let box_size=parseInt(this.state.box_size);
    
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
            index_detail={"value": available_characters.charAt(i),
                         "possible_moves": possible_move_index};
            
            possiblities[i]=index_detail;
        }
    
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
        if((target_row-current_row)==0 && target_index<Math.pow(box_size,2)){
            return target_index;
        }
        return null;
    }
    calculateMoveBottom(i, current_row, box_size, available_characters){
        var target_index=i+box_size;
        var target_row=Math.floor(target_index/box_size);
        if((target_row-current_row)==1 && target_index<Math.pow(box_size,2)){
            return target_index;
        }
        return null;
    }
    calculateMoveLeft(i, current_row, box_size, available_characters){
        var target_index=i-1;
        var target_row=Math.floor(target_index/box_size);
        if((target_row-current_row)==0 && target_index>=0){
            return target_index;
        }
        return null;
    }
    calculateMoveTop(i, current_row, box_size, available_characters){
        var target_index=i-box_size;
        var target_row=Math.floor(target_index/box_size);
        if((current_row-target_row)==1 && target_index>=0){
            return target_index;
        }
        return null;
    }
    calculateMoveBottomRight(i, current_row, box_size, available_characters){
        var target_index=i+(box_size+1);
        var target_row=Math.floor(target_index/box_size);
        if((target_row-current_row)==1 && target_index<Math.pow(box_size,2)){
            return target_index;
        }
        return null;
    }
    calculateMoveBottomLeft(i, current_row, box_size, available_characters){
        var target_index=i+(box_size-1);
        var target_row=Math.floor(target_index/box_size);
        if((target_row-current_row)==1 && target_index<Math.pow(box_size,2)){
            return target_index;
        }
        return null;
    }
    calculateMoveTopLeft(i, current_row, box_size, available_characters){
        var target_index=i-(box_size+1);
        var target_row=Math.floor(target_index/box_size);
        if((current_row-target_row)==1 && target_index>=0){
            return target_index;
        }
        return null;
    }
    calculateMoveTopRight(i, current_row, box_size, available_characters){
        var target_index=i-(box_size-1);
        var target_row=Math.floor(target_index/box_size);
        if((current_row-target_row)==1 && target_index>=0){
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

        let toggle;
        if(this.state.game_type==='Classic Boggle'){
            toggle=null;
        }else{
            toggle = (<Button variant="primary" onClick={()=>this.generateAlphabets()}>Toggle</Button>);
        } 

        if(!this.state.isAlertShown){
            return(
            <GameConfiguration start={this.callBackFromIntroAlert}/>
            )
        }
        else if(!this.state.isPossibleMoveCalculated){
            return(<div><p>LOADING</p></div>)
        }
        else{
            return(
                <div>
                    <Container>
                        <Row>

                            <Col xs={8} className="">
                            {toggle}
                            <br/><br/>
                                {this.createBoggleBoard()}
                            </Col>
                            
                            <Col xs={4} className="entries">
                                <Container>
                                    <Row>
                                        <InputField parentCallback = {this.callbackFunction}/>
                                    </Row>
                                    <Row>
                                        <ScoreList value={this.state.valid_word}></ScoreList>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Container>
                                <Row>
                                    <Col><p>Entered: {this.state.entered_value}</p></Col>
                                </Row>
                                
                            </Container>
                        </Row>
                    </Container>
                    <ToastContainer />  
                </div>
            )
        }
        
    }

}