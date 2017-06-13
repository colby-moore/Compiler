var counter = 0;
var ast = new astTree();

var scopeCounter = -1;

var symbolTable = [];
var symbolCheck = [];

var temp;
var newArr = [];


function scopeSymbolCheck() {
    if (symbolTable.length == 0) {
        symbolTable.push(symbolCheck);
        console.log(symbolTable);


        console.log(newArr)
    } else {
        var alreadyInSymbolTable = false;
        for (var i = 0; i < symbolTable.length; i++) {
            var cube = symbolTable[i];
            if (symbolCheck[1] == symbolTable[i][1] && symbolCheck[2] == symbolTable[i][2]) {

                alreadyInSymbolTable = true;
                break;
            }

        }

        if (alreadyInSymbolTable) {
					document.getElementById('symbolCheck').value += "ERROR SCOPE OR TYPE INTERFERENCE!" + "\n"
        } else {
            symbolTable.push(symbolCheck);
            console.log(symbolTable);
        }
    }
}

function matchMe(token, counter) {

    if (token == foundTokensCopy[counter][0]) {
        ast.addNode(token, 'leaf');
        console.log('expected Token: ' + token + ' Token Found: ' + foundTokensCopy[counter][0]);
    } else {

        console.log("current token ast" + token + "This did not work " + foundTokensCopy[counter][0]);
        //error

    }



}

function astRun() {
    //console.log(foundTokensCopy[counter][0]);

    astProgram();

}


//production Program ::== Block $

function astProgram() {

    astBlock();
    matchMe('$', counter);

    console.log('final output');
    document.getElementById('symbolTable').value += 'Symbol Table is type, name, scope, and initialized ' + "\n" + symbolTable + "\n"


    // while(symbolCheck.length) newArr.push(symbolCheck.splice(0,3));
    // console.log(newArr)
    document.getElementById('ast').value += ast.toString() + "\n"
        // console.log("got an identifier")
        // console.log(ast.toString());
        //do we need a counter here still?
    counter++;
    runCodeGen();
}



//production Block ::== { StatementList }

function astBlock() {
    // matchMe('{', counter);
    ast.addNode('Block', 'branch');
    scopeCounter++
    counter++;

    astStatementList();
    //

    // matchMe('}', counter);
    // ast.addNode('}','branch');
    counter++;
    scopeCounter--;
		ast.endChildren();
}


//production StatementList ::== Statement StatementList
//					       ::== e
function astStatementList() {
    // Assign operator = here i think is wrong... need to find an identifier?
    console.log("got to statementlist ");
    if (foundTokensCopy[counter][0] == 'print') {
        astStatement();

        //
        astStatementList();

        //
        console.log('got past the if');

    }
    // extends to here for the identifier question
    else if (foundTokensCopy[counter][1] == 'identifier') {
        astStatement();

        //
        astStatementList();

        //

    } else if (foundTokensCopy[counter][0] == 'int') {
        console.log('got past the if type');
        astStatement();
        //

        astStatementList();
        //

    } else if (foundTokensCopy[counter][0] == 'string') {
        astStatement();
        //

        astStatementList();
        //

    } else if (foundTokensCopy[counter][0] == 'boolean') {
        astStatement();
        //

        astStatementList();
        //

    } else if (foundTokensCopy[counter][1] == 'while') {
        astStatement();
        //

        astStatementList();
        //

    } else if (foundTokensCopy[counter][1] == 'if') {
        astStatement();
        //

        astStatementList();
        //


    } else if (foundTokensCopy[counter][0] == '{') {
        astStatement();
        //

        astStatementList();
        //

    } else {
        console.log("epsilon");
        //epsilon production
    }

}
//
// //production  Statement ::== PrintStatement
// //          			::== AssignmentStatement
// //          			::== VarDecl
// //          			::== WhileStatement
// //          			::== IfStatement
// //          			::== Block
function astStatement() {
    console.log('got to here');
    if (foundTokensCopy[counter][0] == 'print') {
        console.log('found print');
        astPrintStatement();
        //
        //

    }
    // extends to here for the identifier question
    else if (foundTokensCopy[counter][1] == 'identifier') {
        astAssignmentStatement();
        //

        console.log("got to identifier 2");

    } else if (foundTokensCopy[counter][0] == 'int') {
        astVarDecl();
        //


    } else if (foundTokensCopy[counter][0] == 'string') {
        astVarDecl();
        //


    } else if (foundTokensCopy[counter][0] == 'boolean') {
        astVarDecl();
        //


    } else if (foundTokensCopy[counter][0] == 'while') {
        astWhileStatement();
        //


    } else if (foundTokensCopy[counter][0] == 'if') {
        astIfStatement();
        //


    } else if (foundTokensCopy[counter][0] == '{') {
        astBlock();
        //




    } else {
        console.log('error');
    }

}

//Production PrintStatement ::== print ( Expr )
function astPrintStatement() {
    ast.addNode('PrintStatement', 'branch');
    // matchMe('print', counter);
    counter++;
    // matchMe('(', counter);
    counter++;
    astExpr();
    // matchMe(')', counter);
    counter++;
		ast.endChildren();


}
//
// //Production AssignmentStatement ::== Id = Expr
function astAssignmentStatement() {
    ast.addNode('AssignmentStatement', 'branch');


    var symbolObject = astID();
    if (symbolObject === null) {
        document.getElementById('symbolCheck').value += 'ERROR SYMBOL NOT DEFINED' + "\n"
    } else {

        // matchMe('=', counter);
        counter++;

        astExpr(symbolObject, true);
				ast.endChildren();

    }




}

//Production VarDecl ::== type Id
function astVarDecl() {
    ast.addNode('VarDecl', 'branch');
    asttype();


    astID();
		ast.endChildren();
}

//
// //Production WhileStatement ::== while BooleanExpr Block
function astWhileStatement() {
    ast.addNode('WhileStatement', 'branch');
    matchMe('while', counter);
    counter++;
    astBooleanExpr();


    astBlock();

		ast.endChildren();

}
//
// //production IfStatement ::== if BooleanExpr Block
function astIfStatement() {
    ast.addNode('IfStatement', 'branch');
    matchMe('if', counter);
    counter++;
    astBooleanExpr();


    astBlock();

		ast.endChildren();
}
//
// //Expr ::== IntExpr
// //     ::== StringExpr
// //	   ::== BooleanExpr
// //     ::== Id
//
function astExpr(symbolObject, fromAssignemntStatement) {
    // ast.addNode('Expr','branch');
    if (fromAssignemntStatement) {
        if (foundTokensCopy[counter][1] == "digit") {
            if (foundTokensCopy[counter+2][0] == '"'){
              document.getElementById('symbolCheck').value += "ERROR TYPE MISMATCH" + "\n"
              document.getElementById('symbolCheck').value += 'EXPECTED ' + symbolObject[0] + ": " + symbolObject[1] + "\n"
              symbolObject[3] = true;
              astIntExpr();
            }
            else if (symbolObject[0] == 'int') {
                symbolObject[3] = true;
                console.log('its a gooda digit');
								document.getElementById('symbolCheck').value += 'ALL GOOD HERE!: ' + symbolObject[0] + ": " + symbolObject[1] + "\n"
                console.log(foundTokensCopy[counter+2][1] + "THIS IS THE LOGGGGG");
                if (foundTokensCopy[counter+2][0] == '"'){
                  document.getElementById('symbolCheck').value += "ERROR TYPE MISMATCH" + "\n"
                  document.getElementById('symbolCheck').value += 'EXPECTED ' + symbolObject[0] + ": " + symbolObject[1] + "\n"
                }
                astIntExpr();

            }
						else {
								console.log("ERROR TYPE MISMATCH");
								console.log('EXPECTED INT: ' + symbolObject[0]);
                document.getElementById('symbolCheck').value += "ERROR TYPE MISMATCH" + "\n"
                document.getElementById('symbolCheck').value += 'EXPECTED ' + symbolObject[0] + ": " + symbolObject[1] + "\n"
            }

        } else if (foundTokensCopy[counter][0] == '"') {
            if (symbolObject[0] == 'string') {
                symbolObject[3] = true;
                console.log('its a good string dawg');
								document.getElementById('symbolCheck').value += 'ALL GOOD HERE!: ' + symbolObject[0] + ": " + symbolObject[1] + "\n"
                astStringExpr();

            }
						else {
								console.log("ERROR TYPE MISMATCH");
								console.log('EXPECTED STRING: ' + symbolObject[0]);
                document.getElementById('symbolCheck').value += "ERROR TYPE MISMATCH" + "\n"
                document.getElementById('symbolCheck').value += 'EXPECTED ' + symbolObject[0] + ": " + symbolObject[1] + "\n"
            }

        } else if (foundTokensCopy[counter][0] == '(' || foundTokensCopy[counter][0] == 'false' || foundTokensCopy[counter][0] == 'true') {
            if (symbolObject[0] == 'boolean') {
                symbolObject[3] = true;
                console.log('its a good boolean dawg');
								document.getElementById('symbolCheck').value += 'ALL GOOD HERE!: ' + symbolObject[0] + ": " + symbolObject[1] + "\n"
                astBooleanExpr();

            }
						else {
								console.log("ERROR TYPE MISMATCH");
								console.log('EXPECTED BOOLEAN: ' + symbolObject[0]);
                document.getElementById('symbolCheck').value += "ERROR TYPE MISMATCH" + "\n"
                document.getElementById('symbolCheck').value += 'EXPECTED ' + symbolObject[0] + ": " + symbolObject[1] + "\n"
            }


        } else if (foundTokensCopy[counter][1] == 'identifier') {

            var symbolID = astID();
            console.log(symbolID);
            if (symbolID == null) {
								console.log("UNDEFINED VARIABLE");
                document.getElementById('symbolCheck').value += "UNDEFINED VARIABLE " + "\n"
            }
						else if (symbolID[3]) {
                if (symbolObject[0] == symbolID[0]) {
                    console.log("IT IS WEDnsday my dueds");

                }
								else {
										console.log("ERROR TYPE MISMATCH");
										console.log('EXPECTED ID: ' + symbolObject[0]);
                    document.getElementById('symbolCheck').value += 'ERROR TYPE MISMATCH' + "\n"
                }
            }
						else {
							console.log('WARNING UNINITIALIZED VARIABLE');
                document.getElementById('symbolCheck').value += "WARNING UNINITIALIZED VARIABLE " + "\n"
            }



        }

    }
		else {
        if (foundTokensCopy[counter][1] == "digit") {
            console.log('its a gooda digit');
            astIntExpr();

        }
				else if (foundTokensCopy[counter][0] == '"') {
            astStringExpr();

        }
				else if (foundTokensCopy[counter][0] == '(' || foundTokensCopy[counter][0] == 'false' || foundTokensCopy[counter][0] == 'true') {
            astBooleanExpr();

        }
				else if (foundTokensCopy[counter][1] == 'identifier') {
            var symbolID = astID();
            console.log(symbolID);
            if (symbolID == null) {
                document.getElementById('symbolCheck').value += "WARNING: UNDEFINED VARIABLE " + "\n"
            }
						else {
                //
            }

        }
    }



}
//
// //production IntExpr ::== digit intop Expr
// //					 ::== digit
function astIntExpr() {
    // ast.addNode('IntExpr','branch');
    if (foundTokensCopy[counter][1] == 'digit') {
        astdigit();


        console.log("this is the next look ahead: " + foundTokensCopy[counter][0]);
        if (foundTokensCopy[counter][0] == '+') {
            astintop();


            astExpr();


        }


        // }
        // else if (foundTokensCopy[counter][0] == '+'){
        // 	astdigit();
        //   astExpr();
    }



}
//
// //production StringExpr ::== " CharList "
function astStringExpr() {
    // ast.addNode('StringExpr','branch');
    // matchMe('"', counter);
    counter++;
    astCharList();
    //

    // matchMe('"', counter);
    counter++;

}
//
// //production BooleanExpr ::== ( Expr boolop Expr )
// //						 ::== boolval
//
function astBooleanExpr() {
    // ast.addNode('BooleanExpr','branch');
    if (foundTokensCopy[counter][0] == '(') {
        // matchMe('(', counter);
        counter++;
        astExpr();

				ast.addNode
        astboolop();


        astExpr();


        // matchMe(')', counter);
        counter++;
    } else {
        astboolval();



    }
		//


}
//
// //production Id ::== char
//
function astID() {
    // ast.addNode('ID','branch');
    var idCheck = foundTokensCopy[counter][0];
    var idexists = false;
    var i = symbolTable.length-1;
    for (; i > -1; i--) {
        if (idCheck == symbolTable[i][1] && symbolTable[i][2] <= scopeCounter) {
            idexists = true;
            break;
        }
    }

    astchar();


    if (idexists) {
        return symbolTable[i];
    } else {
        return null;
    }


}
//
// //production CharList ::== char CharList
// //					  ::== space CharList
// //					  ::== ε
function astCharList() {
    // ast.addNode('CharList','branch');
    if (foundTokensCopy[counter][1] == 'string expression') {
        astchar();


        astCharList();


    } else {
        // e production
    }


}

//
// //production type ::== int | string | boolean
function asttype() {
    // ast.addNode('type','branch');
    if (foundTokensCopy[counter][1] == 'int') {
        matchMe('int', counter);
        // is a temp array
        symbolCheck.push(foundTokensCopy[counter][1]);

        counter++;
        symbolCheck.push(foundTokensCopy[counter][0]);
        symbolCheck.push(scopeCounter);
        symbolCheck.push(false);

        scopeSymbolCheck();
        symbolCheck = [];
    } else if (foundTokensCopy[counter][1] == 'string') {
        matchMe('string', counter);
        symbolCheck.push(foundTokensCopy[counter][1]);

        counter++;
        symbolCheck.push(foundTokensCopy[counter][0]);
        symbolCheck.push(scopeCounter);
        symbolCheck.push(false);

        scopeSymbolCheck();
        symbolCheck = [];
    } else if (foundTokensCopy[counter][1] == 'boolean') {
        matchMe('boolean', counter);
        symbolCheck.push(foundTokensCopy[counter][1]);

        counter++;
        symbolCheck.push(foundTokensCopy[counter][0]);
        symbolCheck.push(scopeCounter);
        symbolCheck.push(false);


        scopeSymbolCheck();
        symbolCheck = [];
    }


}

// //production char ::== a | b | c ... z
function astchar() {
    // ast.addNode('char','branch');
    if (foundTokensCopy[counter][1].search(T_Char) != -1) {
        ast.addNode(foundTokensCopy[counter][0], 'leaf')
        counter++;
    } else {
        console.log('no work');
    }


}

//
// //production digit ::== 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
function astdigit() {
    // ast.addNode('digit','branch');
    ast.addNode(foundTokensCopy[counter][0], 'leaf')
    counter++;

}

// //production boolop ::== == | !=

function astboolop() {
		ast.addNode(foundTokensCopy[counter][0], 'branch');
		counter++;


}
//
// //production boolval ::== false | true
function astboolval() {
    // ast.addNode('boolval','branch');
    if (foundTokensCopy[counter][1] == 'false') {
        matchMe('false', counter);
        counter++;
    } else if (foundTokensCopy[counter][1] == 'true') {
        matchMe('true', counter);
        counter++;
    }


}
//
// //production intop ::== +
function astintop() {
    matchMe('+', counter);
    counter++;


}

//-----------------------------------------
// treeDemo.js
//
// By Alan G. Labouseur, based on the 2009
// work by Michael Ardizzone and Tim Smith.
//-----------------------------------------

function astTree() {
    // ----------
    // Attributes
    // ----------

    this.root = null; // Note the NULL root node of this tree.
    this.cur = {}; // Note the EMPTY current node of the tree we're building.


    // -- ------- --
    // -- Methods --
    // -- ------- --

    // Add a node: kind in {branch, leaf}.
    this.addNode = function(name, kind) {
        // Construct the node object.
        var node = {
            name: name,
            children: [],
            parent: {}
        };

        // Check to see if it needs to be the root node.
        if ((this.root == null) || (!this.root)) {
            // We are the root node.
            this.root = node;
        } else {
            // We are the children.
            // Make our parent the CURrent node...
            node.parent = this.cur;
            // ... and add ourselves (via the unfrotunately-named
            // "push" function) to the children array of the current node.
            this.cur.children.push(node);
        }
        // If we are an interior/branch node, then...
        if (kind == "branch") {
            // ... update the CURrent node pointer to ourselves.
            this.cur = node;
        }
    };

    // Note that we're done with this branch of the tree...
    this.endChildren = function() {
        // ... by moving "up" to our parent node (if possible).
        if ((this.cur.parent !== null) && (this.cur.parent.name !== undefined)) {
            this.cur = this.cur.parent;
        } else {
            // TODO: Some sort of error logging.
            // This really should not happen, but it will, of course.
        }
    };

    // Return a string representation of the tree.
    this.toString = function() {
        // Initialize the result string.
        var traversalResult = "";

        // Recursive function to handle the expansion of the nodes.
        function expand(node, depth) {
            // Space out based on the current depth so
            // this looks at least a little ast-like.
            for (var i = 0; i < depth; i++) {
                traversalResult += "-";
            }

            // If there are no children (i.e., leaf nodes)...
            if (!node.children || node.children.length === 0) {
                // ... note the leaf node.
                traversalResult += "[" + node.name + "]";
                traversalResult += "\n";
            } else {
                // There are children, so note these interior/branch nodes and ...
                traversalResult += "<" + node.name + "> \n";
                // .. recursively expand them.
                for (var i = 0; i < node.children.length; i++) {
                    expand(node.children[i], depth + 1);
                }
            }
        }
        // Make the initial call to expand from the root.
        expand(this.root, 0);
        // Return the result.
        return traversalResult;
    };
}
