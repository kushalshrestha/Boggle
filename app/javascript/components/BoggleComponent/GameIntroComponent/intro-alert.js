import React,{Component} from "react";
import {Container, Row, Col,Button, Alert,ButtonToolbar, ButtonGroup, Card} from "react-bootstrap";


export default class GameConfiguration extends React.Component{
    constructor(props){
        super(props);
        this.state={
            game_type_options: [{"type":"Classic Boggle",
                                "description": "Attempt to find words in sequences of adjacent letters"},
                                {"type":"Boggle Toggle",
                                "description": "Toggle your available words from the box."},
                            ],
            board_size_options : ['3 X 3', '4 X 4', '5 X 5', '6 X 6'],
            board_size : 4,
            game_type : "Classic Boggle"
            
        }
    }

    setBoardSize(event){
        console.log('key: ',event.target.value);
        var value = event.target.value;
        
        this.setState({
            board_size : value 
        },()=>{
            // alert("Board size set to : "+this.state.board_size);
            // alert("Board Type set to : "+this.state.game_type);
        });
        

    }

    setBoardType(event){
        console.log('key: ',event.target.value);
        var value = event.target.value;
        
        this.setState({
            game_type : value 
        },()=>{
            // alert("Board size set to : "+this.state.board_size);
            // alert("Board Type set to : "+this.state.game_type);
        });
        

    }

    startGame(){
        this.props.start(this.state.board_size, this.state.game_type);
    }

    render(){
        <div data-toggle="buttons">
        <div className="btn-group">
            <label className="btn btn-default">
            <input type="radio" name="lorem"/> Lorem 
            </label>
            <label className="btn btn-default">
            <input type="radio" name="lorem"/> ipsum 
            </label>
            
        </div>
      
        </div>
        let game_type_list = this.state.game_type_options.map((game, i)=>
                                        <Col key={i} xs={6}>
                                          <div className="radio" key={i}>
                                            <label>
                                            <input type="radio" 
                                            name="radio-input" 
                                            value={game.type} onClick={this.setBoardType.bind(this)}/> {game.type}
                                            <span className="checkmark"></span>

                                            </label>
                                            
                                            </div>  
                                        <Card>
                                        <Card.Body>
                                            <Card.Title>{game.type}</Card.Title>
                                            <Card.Text>
                                            {game.description}
                                            </Card.Text>
                                        </Card.Body>
                                        </Card>
                                        </Col>);
        let box_size_list = this.state.board_size_options.map((board_size,i)=>
                       <div>
                        <label className="btn btn-default">
                        <input type="radio" 
                                name="board-size"
                                value={i+3} 
                                onClick={this.setBoardSize.bind(this)}/> {board_size}
                        <span className="checkmark"></span>
                        </label>
                        </div>
                       
                       
        );

        return(
            <Container>
                <Row>
                <Col></Col>
                <Col xs={10}>  
                        <Alert show={this.state.show} variant="success">
                            <Alert.Heading>Welcome to Boggle Toggle</Alert.Heading>
                            <hr/>
                            <h5>Game Configuration</h5>
                            
                         
                            <Container>
                                <Row>
                                    <Col xs={2}>
                                        <p>Select Box Size : </p>
                                        
                                            {box_size_list}
                                        
                                    </Col>
                                    <Col xs={8}>
                                    <p>Select Game Type :</p>
                                    <Row>
                                        {game_type_list}
                                    </Row>
                                    </Col>
                                    <Col xs={2}>
                                    <Button variant="primary" onClick={()=>this.startGame(this)}>Start</Button>
                                    
                                        
                                    </Col>
                                </Row>
                            
                            </Container>
                            

                            
                            
                            <hr />
                            
                            <Container>
                            
                            </Container>
                            
                        </Alert>
                </Col>
                <Col></Col>
                </Row>
            
            </Container>
            )
    }

}