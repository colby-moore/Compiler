var T_Space = /[ \s]/;
var T_LBracket = /[{]/;
var T_RBracket = /[}]/;
var T_LParen = /[(]/;
var T_RParen = /[)]/;
var T_Plus = /[+]/;
var T_Equals = /[==]/;
var T_Notequal = /[!=]/;
var T_Assign = /[=]/;
var T_Quote = /[" ]/;
var T_True = /[true]/;
var T_False = /[false]/;
var T_Int = /[int]/;
var T_String = /[string]/;
var T_While = /[while]/;
var T_If = /[if]/;
var T_Print = /[print]/;
var T_Boolean = /[boolean]/;
var T_Digit = /[0-9]/;
var T_Char = /[a-z]/;
var T_Newline = /[ \r\n]/;
var T_Eol = /[$]/;

// Array to store the tokens that are found
var foundTokens = [];
var foundTokensCopy = [];
var state;
var lexemecount = [];
var lexerBegin = 0;
var tokenCheck;
// var failCount = 0;
var programCounter;
var tempToken;

// function failReset() {
//     failCount = 0;
// }

var newToken = class {
    constructor(desc, type, line_number) {
        this.desc = desc;
        this.type = type;
        this.line_number = line_number;

    }
}

function lexerRun() {
    // someFunction();
    // failReset();

    lexer();
}

function test(){
    console.trace();
}


function lexer(isToken) {
    programCounter = 1;
    line_number = 1;
    var input_text = document.getElementById('input').value;

    console.log("Scanning " + programCounter);
    document.getElementById('output').value += "scanning programs " + '\n';


    for (lexerBegin = 0; lexerBegin < input_text.length; lexerBegin++) {
        current = input_text[lexerBegin];
        status = true;

        // console.log("this is the current " + current.charCodeAt(0));
        // console.log(tokenCheck);
        tokenCheck = false;
        isSpace(current);
        isLBracket(current);
        isRBracket(current);
        isLParen(current);
        isRParen(current);
        isPlus(current);
        isDigit(current);
        isEol(current);
        checkForMultiChars(newToken, lexerBegin, input_text);
        checkForSymbolTokens(newToken, lexerBegin, input_text);
        checkForString(newToken, lexerBegin, input_text);
        // console.log(tokenCheck);


        if (tokenCheck == false) {
            document.getElementById('output').value += 'ERROR: Lex unsuccessful, killing lexer.'
            throw new Error("ERROR: Lex unsuccessful, killing lexer.");
        }


    }
    parser();

}

function testCaseTwo() {
  document.getElementById("input").value += '{' + '\n'
  document.getElementById("input").value += 'int a' + '\n'
  document.getElementById("input").value += 'a = 0' + '\n'
  document.getElementById("input").value += 'string z' + '\n'
  document.getElementById("input").value += 'z = "bond"' + '\n'
  document.getElementById("input").value += 'while (a != 9) {' + '\n'
  document.getElementById("input").value += 'if (a != 5) {' + '\n'
  document.getElementById("input").value += 'print("bond")' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += '{' + '\n'
  document.getElementById("input").value += 'a = 1 + a' + '\n'
  document.getElementById("input").value += 'string b' + '\n'
  document.getElementById("input").value += 'b = "james bond"' + '\n'
  document.getElementById("input").value += 'print(b)' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += '{}' + '\n'
  document.getElementById("input").value += 'boolean c' + '\n'
  document.getElementById("input").value += 'c = true' + '\n'
  document.getElementById("input").value += 'boolean d' + '\n'
  document.getElementById("input").value += 'd = (true == (true == false))' + '\n'
  document.getElementById("input").value += 'd = (a == b)' + '\n'
  document.getElementById("input").value += 'd = (1 == a)' + '\n'
  document.getElementById("input").value += 'd = (1 != 1)' + '\n'
  document.getElementById("input").value += 'd = ("string" == 1)' + '\n'
  document.getElementById("input").value += 'd = (a != "string")' + '\n'
  document.getElementById("input").value += 'd = ("string" != "string")' + '\n'
  document.getElementById("input").value += 'if (d == true){' + '\n'
  document.getElementById("input").value += 'int c' + '\n'
  document.getElementById("input").value += 'c = 1 + d' + '\n'
  document.getElementById("input").value += 'if (c == 1){' + '\n'
  document.getElementById("input").value += 'print("ugh")' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += 'while("string" == a){' + '\n'
  document.getElementById("input").value += 'while(1 == true){' + '\n'
  document.getElementById("input").value += 'a = 1 + "string"' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += '}$' + '\n'

}

function testCaseOne() {
  document.getElementById("input").value += '{' + '\n'
  document.getElementById("input").value += 'int a' + '\n'
  document.getElementById("input").value += 'string b' + '\n'
  document.getElementById("input").value += 'a = 5' + '\n'
  document.getElementById("input").value += 'b = "this is a test"' + '\n'
  document.getElementById("input").value += '{' + '\n'
  document.getElementById("input").value += 'boolean c' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += '}$' + '\n'

}

function testCaseThree() {
  document.getElementById("input").value += '{' + '\n'
  document.getElementById("input").value += 'int a' + '\n'
  document.getElementById("input").value += 'string b' + '\n'
  document.getElementById("input").value += 'a = 5' + '\n'
  document.getElementById("input").value += 'c = true' + '\n'
  document.getElementById("input").value += '{' + '\n'
  document.getElementById("input").value += 'boolean c' + '\n'
  document.getElementById("input").value += '}' + '\n'
  document.getElementById("input").value += '}$' + '\n'

}

function testCaseFour() {
  document.getElementById("input").value += '{' + '\n'
  document.getElementById("input").value += 'int a' + '\n'
  document.getElementById("input").value += 'string b' + '\n'
  document.getElementById("input").value += '}' + '\n'

}

function checkForMultiChars(newToken, forward, input_text) {
    state = 0;
    tempToken = '';
    var run = true;

    while (run) {

        switch (state) {
            case 0:
                // console.log('this is the multichar forward ' + forward);
                if ((input_text[forward]).search(T_Char) != -1) {
                    // console.log('this is the current character at case 0' + input_text[forward]);
                    tempToken += input_text[forward];
                    forward++;
                    state = 1;
                    break;
                    // console.log("char found")
                } else {
                    run = false;
                    break;
                }
            case 1:
                // console.log('this is the current character at case 1' + input_text[forward]);
                if (input_text[forward] == undefined) {
                    // console.log('this is the current character at case 1' + input_text[forward]);
                    var isToken = new newToken(tempToken, "identifier", line_number);
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    // console.log('found a token boss' + tempToken);
                    // document.getElementById('output').value += "lexer: token found at line number "+ foundTokens[2]+' "' + foundTokens[0] //foundTokens++;
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        // console.log("got an identifier")
                    foundTokens = [];
                    tokenCheck = true;
                    lexerBegin = forward;
                    run = false;
                    break;
                } else if ((input_text[forward]).search(T_Char) != -1) {
                    // console.log('this is the current character at case 1' + input_text[forward]);
                    tempToken += input_text[forward];
                    forward++;
                    state = 2;
                    break;
                } else {
                    console.log('current: ' + input_text[forward]);
                    var isToken = new newToken(tempToken, "identifier", line_number);
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    // console.log('found a token boss' + tempToken);
                    // document.getElementById('output').value += "lexer: token found at line number "+ foundTokens[2]+' "' + foundTokens[0] //foundTokens++;
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        // console.log("got an identifier")
                    foundTokens = [];
                    tokenCheck = true;
                    // lexerBegin = forward;
                    run = false;
                    break;
                }

            case 2:
                if (tempToken == 'if') {
                    lexerBegin = forward;
                    var isToken = new newToken(tempToken, "if", line_number);
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    // console.log('case 2 ELSE got a if');
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    // console.log('found a token boss');
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                    foundTokens = [];
                    tokenCheck = true;
                    run = false;
                    break;
                } else if ((input_text[forward]).search(T_Char) != -1) {
                    tempToken += input_text[forward];
                    if (tempToken == 'int') {
                        lexerBegin = forward;
                        var isToken = new newToken(tempToken, "int", line_number);
                        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                        // console.log('case 2 ELSE got an int');
                        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                        // console.log('found a token boss');
                        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        foundTokens = [];
                        tokenCheck = true;
                        run = false;
                        break;
                    } else if (tempToken == 'false') {
                        lexerBegin = forward;
                        var isToken = new newToken(tempToken, "false", line_number);
                        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                        // console.log('case 2 ELSE got a false');
                        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                        // console.log('found a token boss');
                        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        foundTokens = [];
                        tokenCheck = true;
                        run = false;
                        break;
                    } else if (tempToken == 'true') {
                        lexerBegin = forward;
                        var isToken = new newToken(tempToken, "true", line_number);
                        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                        // console.log('case 2 ELSE got a false');
                        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                        // console.log('found a token boss');
                        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        foundTokens = [];
                        tokenCheck = true;
                        run = false;
                        break;
                    } else if (tempToken == 'string') {
                        lexerBegin = forward;
                        var isToken = new newToken(tempToken, "string", line_number);
                        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                        // console.log('case 2 ELSE got a string');
                        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                        // console.log('found a token boss');
                        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        foundTokens = [];
                        tokenCheck = true;
                        run = false;
                        break;
                    } else if (tempToken == 'while') {
                        lexerBegin = forward;
                        var isToken = new newToken(tempToken, "while", line_number);
                        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                        // console.log('case 2 ELSE got a while');
                        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                        // console.log('found a token boss');
                        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        foundTokens = [];
                        tokenCheck = true;
                        run = false;
                        break;
                    } else if (tempToken == 'print') {
                        lexerBegin = forward;
                        var isToken = new newToken(tempToken, "print", line_number);
                        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                        // console.log('case 2 ELSE got a print');
                        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                        // console.log('found a token boss');
                        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        foundTokens = [];
                        tokenCheck = true;
                        run = false;
                        break;
                    } else if (tempToken == 'boolean') {
                        lexerBegin = forward;
                        var isToken = new newToken(tempToken, "boolean", line_number);
                        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                        // console.log('case 2 ELSE got a print');
                        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                        // console.log('found a token boss');
                        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                        foundTokens = [];
                        tokenCheck = true;
                        run = false;
                        break;
                    } else {
                        forward++;
                        state = 2;
                        break;
                    }
                } else {
                    document.getElementById('output').value += 'unrecognized token' + "\n"
                    console.log('unrecognized token');
                    tokenCheck = false;
                    run = false;
                    break;


                }
            default:
                console.log('default case');
        }
    }
}

function checkForSymbolTokens(newToken, forward, input_text) {
    state = 0;
    tempToken = '';
    var run = true;

    while (run) {
        switch (state) {
            case 0:
                // console.log('this is the current character at case 0' + input_text[forward]);
                if ((input_text[forward]) == '!') {
                    tempToken += input_text[forward];
                    state = 2;
                    forward++;
                    break;
                    // console.log('this is the lexerBegin count' +lexerBegin);
                    // console.log('this is temp at case 3' +tempToken);
                } else if ((input_text[forward]) == '=') {
                    tempToken += input_text[forward];
                    forward++;
                    state = 1;
                    break;
                    //   console.log('this is the lexerBegin count' +lexerBegin);
                    //   console.log('this is temp at case 3' +tempToken);
                } else {

                    run = false;
                    break;
                }
            case 1:
                // console.log('this is the current character at case 1' + input_text[forward]);
                // console.log('this is case 1 expression ' + (input_text[forward]).search(T_Equals));
                if ((input_text[forward]) == '=') {
                    tempToken += input_text[forward];
                    lexerBegin = forward;
                    var isToken = new newToken(tempToken, "equals", line_number);
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    // console.log('case 3 ELSE got a ==');
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                    foundTokens = [];
                    tokenCheck = true;
                    run = false;
                    break;
                } else {
                    var isToken = new newToken(current, "assign", line_number);
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    // console.log('found a token boss' + tempToken);
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                    foundTokens = [];
                    tokenCheck = true;
                    // console.log("got an assign")
                    run = false;
                    break;
                }
            case 2:
                // console.log('this is the current character at case 2' + input_text[forward]);
                // console.log('this is case 2 expression ' + (input_text[forward]).search(T_Equals));
                if ((input_text[forward]) == '=') {
                    console.log('case 2');
                    tempToken += input_text[forward];
                    lexerBegin = forward;
                    var isToken = new newToken(tempToken, "not equals", line_number);
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    // console.log('case 3 ELSE got a !=');
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                    foundTokens = [];
                    tokenCheck = true;
                    run = false;
                    break;
                } else {
                    console.log('unrecognized token');
                    tokenCheck = false;
                    run = false;
                    break;
                }
        }
    }
}
// function createAndPush (current){
//     var isToken = new newToken(current, "true", line_number);
//     foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
// console.log("lexer: " + foundTokens[1]+ " "+ foundTokens[0] );
//     console.log('found a token boss');
//     document.getElementById('output').value += "lexer: token found at line number "+ foundTokens[2]+' "' + foundTokens[0] //foundTokens++;
//
//
//
// }

function checkForString(newToken, forward, input_text) {
    state = 0;
    tempToken = '';
    var run = true;

    while (run) {

        switch (state) {
            case 0:
                // console.log('this is the multichar forward ' + forward);
                if ((input_text[forward]) == '"') {
                    tempToken += input_text[forward];
                    var isToken = new newToken(tempToken, "quote", line_number);
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    // console.log('case 3 ELSE got a ==');
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                    foundTokens = [];
                    tempToken = '';
                    tokenCheck = true;
                    forward++;
                    state = 1; //this is a loop
                    // console.log('this is the lexerBegin count' +lexerBegin);
                    // console.log('this is temp at case 3' +tempToken);
                } else {
                    run = false;
                    break;
                }
            case 1:
                // console.log('this is the current character at case 1' + input_text[forward]);
                if ((input_text[forward]).search(T_Char) != -1) {
                    tempToken += input_text[forward];
                    forward++;
                    state = 2;
                } else {
                    // TODO: might need to add here

                    console.log('invalid string');
                    run = false;
                    break;
                }
            case 2:
                // console.log('this is the current character at case 1' + input_text[forward]);
                if ((input_text[forward]).search(T_Char) != -1) {
                    tempToken += input_text[forward];
                    forward++;
                    state = 2;
                } else if ((input_text[forward]).search(T_Space) != -1) {
                    tempToken += input_text[forward];
                    forward++;
                    state = 2;
                    break;
                } else if ((input_text[forward]) == '"') {
                    var isToken = new newToken(tempToken, "string expression", line_number);
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    // console.log('case 3 ELSE got a ==');
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                    foundTokens = [];
                    tempToken = '';
                    tokenCheck = true;

                    tempToken += input_text[forward];

                    var isToken = new newToken(tempToken, "quote", line_number);
                    lexerBegin = forward;
                    foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                    foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                    // console.log('case 3 ELSE got a ==');
                    console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
                    document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
                    foundTokens = [];
                    tokenCheck = true;

                    run = false;
                    break;

                    // console.log('this is the lexerBegin count' +lexerBegin);
                    // console.log('this is temp at case 3' +tempToken);
                } else {
                    console.log("invalid string");
                    tokenCheck = false;
                    run = false;
                    break;
                }
                // case 3:
                //   if ((input_text[forward]).search(T_Char) != -1) {
                //     tempToken += input_text[forward];
                //     forward++;
                //     state = 3;
                //   }
                //   else if ((input_text[forward]) == '"') {
                //     var isToken = new newToken(tempToken, "string", line_number);
                //       foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                //       foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                //     // console.log('case 3 ELSE got a ==');
                //     console.log("lexer: " + foundTokens[1]+ " "+ foundTokens[0] );
                //     document.getElementById('output').value += "lexer: token found at line number "+ foundTokens[2]+ ' ----->  ' + foundTokens[1]+ " " + foundTokens[0] + "\n"
                //     foundTokens = [];
                //     tempToken = '';
                //     tokenCheck = true;
                //
                //     tempToken += input_text[forward];
                //
                //     var isToken = new newToken(tempToken, "quote", line_number);
                //       foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
                //       foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
                //     // console.log('case 3 ELSE got a ==');
                //     console.log("lexer: " + foundTokens[1]+ " "+ foundTokens[0] );
                //     document.getElementById('output').value += "lexer: token found at line number "+ foundTokens[2]+ ' ----->  ' + foundTokens[1]+ " " + foundTokens[0] + "\n"
                //     foundTokens = [];
                //     tokenCheck = true;
                //
                //     run = false;
                //     break;
                //
                //     // console.log('this is the lexerBegin count' +lexerBegin);
                //     // console.log('this is temp at case 3' +tempToken);
                //   }
                //   else {
                //     console.log("invalid string");
                //     run = false;
                //     break;
                //   }

        }
    }
}

function isLBracket(current) {
    if (current.search(T_LBracket) != -1) {
        var isToken = new newToken(current, "left bracket", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found lbracket');
        //   console.log('this is the lexerBegin count' +lexerBegin);
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isRBracket(current) {
    if (current.search(T_RBracket) != -1) {
        var isToken = new newToken(current, "right bracket", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isLParen(current) {
    if (current.search(T_LParen) != -1) {
        var isToken = new newToken(current, "left paren", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isRParen(current) {
    if (current.search(T_RParen) != -1) {
        var isToken = new newToken(current, "right paren", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isPlus(current) {
    if (current.search(T_Plus) != -1) {
        var isToken = new newToken(current, "plus", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found plus');
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isAssign(current) {
    if (current.search(T_Assign) != -1) {
        var isToken = new newToken(current, "assign", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found assign');
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isQuote(current) {
    if (current.search(T_Quote) != -1) {
        var isToken = new newToken(current, "quote", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found quote');
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isSpace(current) {
    if (current.search(T_Space) != -1) {
        var isToken = new newToken(current, "space", line_number);
        tokenCheck = true;

    } else {

        //document.getElementById('output').value += '0';

    }
}

function isAssign(current) {
    if (current.search(T_Assign) != -1) {
        var isToken = new newToken(current, "assign", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found assign');
        document.getElementById('output').value += "lexer: token found at line number " + foundTokens[2] + ' "' + foundTokens[0] //foundTokens++;
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isDigit(current) {
    if (current.search(T_Digit) != -1) {
        var isToken = new newToken(current, "digit", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found digit');
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isChar(current) {
    if (current.search(T_Char) != -1) {
        var isToken = new newToken(current, "char", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found char');
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isNewline(current) {
    if (current.search(T_Newline) != -1) {
        var isToken = new newToken(current, "new line", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found new line');
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}

function isEol(current) {
    if (current.search(T_Eol) != -1) {
        var isToken = new newToken(current, "End of line", line_number);
        foundTokens.push(isToken.desc, isToken.type, isToken.line_number);
        foundTokensCopy.push([isToken.desc, isToken.type, isToken.line_number]);
        console.log("lexer: " + foundTokens[1] + " " + foundTokens[0]);
        // console.log('hey boss found end of line');
        document.getElementById('output').value += "lexer: token found" + ' ----->  ' + foundTokens[1] + " " + foundTokens[0] + "\n"
        tokenCheck = true;
        foundTokens = [];
    } else {

        //document.getElementById('output').value += '0';

    }
}
