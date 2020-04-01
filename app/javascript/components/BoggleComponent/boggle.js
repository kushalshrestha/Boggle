import React, { Component } from "react";
import BoggleSquare from './BoggleSquareComponent/boggle-square';
import InputField from './InputComponent/input-field';
import ScoreList from './ScoreListComponent/score-list';
import GameConfiguration from './GameIntroComponent/intro-alert';
import { Container, Row, Col, Button} from "react-bootstrap";
import './boggle.css';
import mytext from './letter-frequency.json';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIRequestService from './Engine/service';
import { notify } from './Engine/toast';
import { generateAlphabets, generatePossibleMoves, validateWord } from './Engine/helpers';

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            box_size: 4,
            game_type: "Classic Boggle",
            alphabet_distribution: [],
            sum: 0,
            isDataLoaded: false,
            selected_alphabets: '',
            isAlphabetGenerated: false,
            isPossibleMoveCalculated: false,
            isAlertShown: false,
            possibleMoves: {},
            entered_value: "",
            valid_word: ""
        }

    };

    callbackFunction = (data) => {
        this.setState({
            entered_value: data.toLowerCase()
        }, () => {
            var word = this.state.entered_value;
            var validation_result = validateWord(word, this.state.selected_alphabets, this.state.possibleMoves)
            if (validation_result === true) {
                this.fetchAPIResponse(word);
            }
            if (validation_result === false & word.length > 1) {
                notify(word, null);
            }
        });

    }

    callBackFromIntroAlert = (size, type) => {
        this.setState({
            box_size: size,
            game_type: type,
            isAlertShown: !this.state.isAlertShown

        }, () => {

            this.importReferenceTableValue();
        })
    }


    fetchAPIResponse(word) {
        this.apiRequestService = new APIRequestService(word);
        this.apiRequestService.fetchAPIResponse().then(async response => {
            const data = await response;
            console.log(data);
            if (data != 200) {
                const error = (data);
                return Promise.reject(error);
            }
            if (word.length > 1) {
                this.setState({
                    valid_word: word
                });
                notify(word, 0);
            }

        })
            .catch(error => {
                notify(word, 1);
            })
    }

    importReferenceTableValue() {
        console.log('here');
        var cumulativefrequency = 0;
        var obj = {};
        var alphabetList = [];

        mytext.EnglishRelativeFrequency.map((letterDetail, i) => {
            cumulativefrequency += letterDetail.frequency;
            obj = { 'letter': letterDetail.letter, 'frequency': letterDetail.frequency, 'cumulativefrequency': cumulativefrequency };
            alphabetList.push(obj);
            obj = {}
        });

        this.setState(() => {
            return {
                alphabet_distribution: alphabetList,
                sum: cumulativefrequency,
                isDataLoaded: true
            }
        }, () => {
            var selected = generateAlphabets(this.state.sum, this.state.alphabet_distribution, this.state.box_size);
            var possiblities = generatePossibleMoves(selected, this.state.box_size)
            this.setState(() => {
                return {
                    selected_alphabets: selected,
                    isAlphabetGenerated: true,
                    possibleMoves: possiblities,
                    isPossibleMoveCalculated: true
                }
            });
        }
        );


    }



    createBoggleBoard = () => {
        console.log('Creating Boggle Board');
        let boardRow = []
        for (let i = 0; i < this.state.box_size; i++) {
            let boardColumn = [];
            for (let j = 0; j < this.state.box_size; j++) {
                var index = this.state.box_size * i + j;
                boardColumn.push(<BoggleSquare key={j}
                    alphabet={this.state.selected_alphabets.charAt(index)} />);
            }
            boardRow.push(<div className="board-row" key={i}>{boardColumn}</div>);
        }
        return <div>{boardRow}</div>;
    }



    render() {

        let toggle;
        if (this.state.game_type === 'Classic Boggle') {
            toggle = null;
        } else {
            toggle = (<Button variant="primary" onClick={() => this.generateAlphabets()}>Toggle</Button>);
        }

        if (!this.state.isAlertShown) {
            return (
                <GameConfiguration start={this.callBackFromIntroAlert} />
            )
        }
        else if (!this.state.isPossibleMoveCalculated) {
            return (<div><p>LOADING</p></div>)
        }
        else {
            return (
                <div>
                    <Container>
                        <Row>

                            <Col xs={8} className="">
                                {toggle}
                                <br /><br />
                                {this.createBoggleBoard()}
                            </Col>

                            <Col xs={4} className="entries">
                                <Container>
                                    <Row>
                                        <InputField parentCallback={this.callbackFunction} />
                                    </Row>
                                    <Row>
                                        <ScoreList value={this.state.valid_word}></ScoreList>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            
                        </Row>
                    </Container>
                    <ToastContainer />
                </div>
            )
        }

    }

}