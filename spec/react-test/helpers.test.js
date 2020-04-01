import * as helper from './../../app/javascript/components/BoggleComponent/Engine/helpers.js'

describe("Test generateAlphabets function", () => {
    test("1. Generated alphabets should match Boggle number of boxes", () => {
        const sum = 25;
        const alphabet_distribution = [
            { 'letter': 'a', 'frequency': 5, 'cumulativefrequency': 5 },
            { 'letter': 'b', 'frequency': 8, 'cumulativefrequency': 13 },
            { 'letter': 'c', 'frequency': 10, 'cumulativefrequency': 23 },
            { 'letter': 'd', 'frequency': 2, 'cumulativefrequency': 25 },
        ];
        const box_size = 5;
        const received = helper.generateAlphabets(sum, alphabet_distribution, box_size);
        const expected = Math.pow(box_size, 2);



        expect(received).toHaveLength(expected);


    });

    test("2. Generated alphabets should be random selection but from the alphabet_distribution array", () => {
        const sum = 25;
        const alphabet_distribution = [
            { 'letter': 'a', 'frequency': 5, 'cumulativefrequency': 5 },
            { 'letter': 'b', 'frequency': 8, 'cumulativefrequency': 13 },
            { 'letter': 'c', 'frequency': 10, 'cumulativefrequency': 23 },
            { 'letter': 'd', 'frequency': 2, 'cumulativefrequency': 25 },
        ];
        const box_size = 5;
        const received = helper.generateAlphabets(sum, alphabet_distribution, box_size);
        expect(received).toMatch(new RegExp(/([a-c]+)/));


    });
});


describe("Test generatePossibleMoves function", () => {
    test("1. Generate Possible moves generated must match with possible moves(neighbor box) from each box", () => {
        const selected_alphabets = "abcdefghi";
        const size = "3";
        const expected = {
            "0": { "value": "a", "possible_moves": [1, 3, 4] },
            "1": { "value": "b", "possible_moves": [2, 4, 0, 5, 3] },
            "2": { "value": "c", "possible_moves": [5, 1, 4] },
            "3": { "value": "d", "possible_moves": [4, 6, 0, 7, 1] },
            "4": { "value": "e", "possible_moves": [5, 7, 3, 1, 8, 6, 0, 2] },
            "5": { "value": "f", "possible_moves": [8, 4, 2, 7, 1] },
            "6": { "value": "g", "possible_moves": [7, 3, 4] },
            "7": { "value": "h", "possible_moves": [8, 6, 4, 3, 5] },
            "8": { "value": "i", "possible_moves": [7, 5, 4] }
        }

        const received = helper.generatePossibleMoves(selected_alphabets, size);

        expect(received[0]).toEqual(expected[0]);
        expect(received[9]).toEqual(expected[9]);



    });


});


describe("Test calculateMoveRight function", () => {
    test("1. Corner right on first row should not have another box on right side", () => {
        const i = 2;
        const current_row = 0;
        const box_size = 3;

        const received = helper.calculateMoveRight(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("2. Corner right on last row should not have another box on right side", () => {
        const i = 8;
        const current_row = 2;
        const box_size = 3;

        const received = helper.calculateMoveRight(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("3. When Box has another box on right", () => {
        const i = 4;
        const current_row = 1;
        const box_size = 3;

        const received = helper.calculateMoveRight(i, current_row, box_size)

        expect(received).toEqual(5);
    });
});

describe("Test calculateMoveBottom function", () => {
    test("1. Corner bottom on first column should not have another box on bottom side", () => {
        const i = 6;
        const current_row = 2;
        const box_size = 3;

        const received = helper.calculateMoveBottom(i, current_row, box_size)

        expect(received).toEqual(null);
    });

    test("2. When Box has another box on bottom", () => {
        const i = 4;
        const current_row = 1;
        const box_size = 3;

        const received = helper.calculateMoveBottom(i, current_row, box_size)

        expect(received).toEqual(7);
    });
});


describe("Test calculateMoveLeft function", () => {
    test("1. Corner left on first row should not have another box on left side", () => {
        const i = 0;
        const current_row = 0;
        const box_size = 3;

        const received = helper.calculateMoveLeft(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("2. Corner left on last row should not have another box on left side", () => {
        const i = 6;
        const current_row = 2;
        const box_size = 3;

        const received = helper.calculateMoveLeft(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("3. When Box has another box on left", () => {
        const i = 4;
        const current_row = 1;
        const box_size = 3;

        const received = helper.calculateMoveLeft(i, current_row, box_size)

        expect(received).toEqual(3);
    });
});



describe("Test calculateMoveTop function", () => {
    test("1. Top Left Corner on first column should not have another box on top", () => {
        const i = 0;
        const current_row = 0;
        const box_size = 3;

        const received = helper.calculateMoveTop(i, current_row, box_size)

        expect(received).toEqual(null);
    });

    test("2. When Box has another box on top", () => {
        const i = 4;
        const current_row = 1;
        const box_size = 3;

        const received = helper.calculateMoveTop(i, current_row, box_size)

        expect(received).toEqual(1);
    });
});




describe("Test calculateMoveBottomRight function", () => {
    test("1. Bottom most right corner box should not have another box on bottom right corner", () => {
        const i = 8;
        const current_row = 2;
        const box_size = 3;

        const received = helper.calculateMoveBottomRight(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("2. Top most right corner box should not have another box on its bottom right corner", () => {
        const i = 2;
        const current_row = 0;
        const box_size = 3;

        const received = helper.calculateMoveBottomRight(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("3. When Box has another box on Bottom Right", () => {
        const i = 4;
        const current_row = 1;
        const box_size = 3;

        const received = helper.calculateMoveBottomRight(i, current_row, box_size)

        expect(received).toEqual(8);
    });
});


describe("Test calculateMoveBottomLeft function", () => {
    test("1. Bottom most left corner box should not have another box on its bottom left corner", () => {
        const i = 6;
        const current_row = 2;
        const box_size = 3;

        const received = helper.calculateMoveBottomLeft(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("2. Bottom most right corner box should not have another box on its bottom Left corner", () => {
        const i = 8;
        const current_row = 2;
        const box_size = 3;

        const received = helper.calculateMoveBottomLeft(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("3. When Box has another box on Bottom Left", () => {
        const i = 4;
        const current_row = 1;
        const box_size = 3;

        const received = helper.calculateMoveBottomLeft(i, current_row, box_size)

        expect(received).toEqual(6);
    });
});



describe("Test calculateMoveTopLeft function", () => {
    test("1. Top most left corner box should not have another box on its top left corner", () => {
        const i = 0;
        const current_row = 0;
        const box_size = 3;

        const received = helper.calculateMoveTopLeft(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("2. Bottom most left corner box should not have another box on its top Left corner", () => {
        const i = 6;
        const current_row = 2;
        const box_size = 3;

        const received = helper.calculateMoveTopLeft(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("3. When Box has another box on top Left", () => {
        const i = 4;
        const current_row = 1;
        const box_size = 3;

        const received = helper.calculateMoveTopLeft(i, current_row, box_size)

        expect(received).toEqual(0);
    });
});



describe("Test calculateMoveTopRight function", () => {
    test("1. Top most right corner box should not have another box on its top right corner", () => {
        const i = 2;
        const current_row = 0;
        const box_size = 3;

        const received = helper.calculateMoveTopRight(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("2. Bottom most right corner box should not have another box on its top right corner", () => {
        const i = 8;
        const current_row = 2;
        const box_size = 3;

        const received = helper.calculateMoveTopRight(i, current_row, box_size)

        expect(received).toEqual(null);
    });
    test("3. When Box has another box on top right", () => {
        const i = 4;
        const current_row = 1;
        const box_size = 3;

        const received = helper.calculateMoveTopRight(i, current_row, box_size)

        expect(received).toEqual(2);
    });
});



describe("Test validateWord function", () => {
    test("1. Few word validation in 3X3 box Eg: [[r | t | y][a | u | b][i | l | s]]", () => {
        const selected_alphabets = "rryaubils";
        const possibleMoves = {
            "0": { "value": "r", "possible_moves": [1, 3, 4] },
            "1": { "value": "r", "possible_moves": [2, 4, 0, 5, 3] },
            "2": { "value": "y", "possible_moves": [5, 1, 4] },
            "3": { "value": "a", "possible_moves": [4, 6, 0, 7, 1] },
            "4": { "value": "u", "possible_moves": [5, 7, 3, 1, 8, 6, 0, 2] },
            "5": { "value": "b", "possible_moves": [8, 4, 2, 7, 1] },
            "6": { "value": "i", "possible_moves": [7, 3, 4] },
            "7": { "value": "l", "possible_moves": [8, 6, 4, 3, 5] },
            "8": { "value": "s", "possible_moves": [7, 5, 4] }
        }

        const received_1 = helper.validateWord("ruby",selected_alphabets,possibleMoves);
        const received_2 = helper.validateWord("rails",selected_alphabets,possibleMoves);
        const received_3 = helper.validateWord("ruay",selected_alphabets,possibleMoves);
        const received_4 = helper.validateWord("a",selected_alphabets,possibleMoves);
        const received_5 = helper.validateWord("railur",selected_alphabets,possibleMoves);
        const received_6 = helper.validateWord("rtr",selected_alphabets,possibleMoves);
        const received_7 = helper.validateWord("rrur",selected_alphabets,possibleMoves);
        const received_8 = helper.validateWord("railuryb",selected_alphabets,possibleMoves);
        const received_9 = helper.validateWord("railurybs",selected_alphabets,possibleMoves);
        const received_10 = helper.validateWord("raiurybsl",selected_alphabets,possibleMoves);
        const received_11 = helper.validateWord("railsbyr",selected_alphabets,possibleMoves);

        expect(received_1).toBe(true);
        expect(received_2).toBe(true);
        expect(received_3).toBe(false);
        expect(received_4).toBe(false);
        expect(received_5).toBe(true);
        expect(received_6).toBe(false);
        expect(received_7).toBe(true);
        expect(received_8).toBe(true);
        expect(received_9).toBe(true);
        expect(received_10).toBe(true);
        expect(received_11).toBe(true);
        
    });
    
});
