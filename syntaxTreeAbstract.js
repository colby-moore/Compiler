var counter = 0;
var ast = new astTree();

var scopeCounter = -1;

var symbolTable =[];
var symbolCheck = [];
var temp;



function matchMe (token, counter){

	if(token == foundTokensCopy[counter][0]){
		ast.addNode(token, 'leaf');
    console.log('expected Token: ' + token + ' Token Found: ' + foundTokensCopy[counter][0]);
	}

	else{

    console.log("current token ast" + token + "This did not work " + foundTokensCopy[counter][0] );
		//error

	}



}

function astRun(){
  //console.log(foundTokensCopy[counter][0]);

	astProgram();

}


//production Program ::== Block $

function astProgram(){

	astBlock();
	matchMe('$', counter);
	// console.log(symbolTable);
	// var newArr = [];
	// while(symbolCheck.length) newArr.push(symbolCheck.splice(0,3));
	// console.log(newArr)
	document.getElementById('ast').value += ast.toString() + "\n"
  // console.log("got an identifier")
  // console.log(ast.toString());
  //do we need a counter here still?
  counter++;
}



//production Block ::== { StatementList }

function astBlock(){
  // matchMe('{', counter);
	ast.addNode('Block','branch');
	scopeCounter++
	counter++;

	astStatementList();
  ast.endChildren();

	// matchMe('}', counter);
	// ast.addNode('}','branch');
  counter++;

}


//production StatementList ::== Statement StatementList
//					       ::== e
function astStatementList(){
  // Assign operator = here i think is wrong... need to find an identifier?
  console.log("got to statementlist ");
	if (foundTokensCopy[counter][0] == 'print'){
		astStatement();
    ast.endChildren();
    ast.endChildren();
		astStatementList();
    ast.endChildren();
    ast.endChildren();
    console.log('got past the if');

	}
  // extends to here for the identifier question
	else if(foundTokensCopy[counter][1] == 'identifier'){
    astStatement();
    ast.endChildren();
    ast.endChildren();
		astStatementList();
    ast.endChildren();
    ast.endChildren();

	}
	else if (foundTokensCopy[counter][0] == 'int'){
    console.log('got past the if type');
    astStatement();
    ast.endChildren();
    ast.endChildren();
		astStatementList();
    ast.endChildren();
    ast.endChildren();
	}
  else if (foundTokensCopy[counter][0] == 'string'){
    astStatement();
    ast.endChildren();
    ast.endChildren();
		astStatementList();
    ast.endChildren();
    ast.endChildren();
	}
  else if (foundTokensCopy[counter][0] == 'boolean'){
    astStatement();
    ast.endChildren();
    ast.endChildren();
		astStatementList();
    ast.endChildren();
    ast.endChildren();
	}
	else if (foundTokensCopy[counter][1] == 'while'){
    astStatement();
    ast.endChildren();
    ast.endChildren();
		astStatementList();
    ast.endChildren();
    ast.endChildren();
	}
	else if (foundTokensCopy[counter][1] == 'if'){
    astStatement();
    ast.endChildren();
    ast.endChildren();
		astStatementList();
    ast.endChildren();
    ast.endChildren();

	}
	else if (foundTokensCopy[counter][0] == '{'){
    astStatement();
    ast.endChildren();
    ast.endChildren();
		astStatementList();
    ast.endChildren();
    ast.endChildren();
	}
	else{
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
function astStatement(){
  console.log('got to here');
	if (foundTokensCopy[counter][0] == 'print'){
    console.log('found print');
    astPrintStatement();
    ast.endChildren();
    ast.endChildren();

	}
  // extends to here for the identifier question
	else if(foundTokensCopy[counter][1] == 'identifier'){
		astAssignmentStatement();
    ast.endChildren();

    console.log("got to identifier 2");

	}
	else if (foundTokensCopy[counter][0] == 'int'){
		astVarDecl();
    ast.endChildren();


	}
  else if (foundTokensCopy[counter][0] == 'string'){
		astVarDecl();
    ast.endChildren();


	}
  else if (foundTokensCopy[counter][0] == 'boolean'){
		astVarDecl();
    ast.endChildren();


	}
	else if (foundTokensCopy[counter][0] == 'while'){
		astWhileStatement();
    ast.endChildren();


	}
	else if (foundTokensCopy[counter][0] == 'if'){
		astIfStatement();
    ast.endChildren();


	}
	else if (foundTokensCopy[counter][0] == '{'){
		astBlock();
    ast.endChildren();




	}
  else{
    console.log('error');
  }







}

//Production PrintStatement ::== print ( Expr )
function astPrintStatement(){
  ast.addNode('PrintStatement','branch');
	matchMe('print', counter);
  counter++;
	matchMe('(', counter);
  counter++;
	astExpr();
  ast.endChildren();
	matchMe (')', counter);
  counter++;


}
//
// //Production AssignmentStatement ::== Id = Expr
function astAssignmentStatement(){
  ast.addNode('AssignmentStatement','branch');

	astID();
  ast.endChildren();

	matchMe('=', counter);
  counter++;
	astExpr();
  ast.endChildren();



}

//Production VarDecl ::== type Id
function astVarDecl(){
  ast.addNode('VarDecl','branch');
	asttype();
  ast.endChildren();

	astID();
  ast.endChildren();



}
//
// //Production WhileStatement ::== while BooleanExpr Block
function astWhileStatement(){
  ast.addNode('WhileStatement','branch');
	matchMe('while', counter);
  counter++;
	astBooleanExpr();
  ast.endChildren();

	astBlock();
  ast.endChildren();


}
//
// //production IfStatement ::== if BooleanExpr Block
function astIfStatement(){
  ast.addNode('IfStatement','branch');
	matchMe('if', counter);
  counter++;
	astBooleanExpr();
  ast.endChildren();

	astBlock();
  ast.endChildren();



}
//
// //Expr ::== IntExpr
// //     ::== StringExpr
// //	   ::== BooleanExpr
// //     ::== Id
//
function astExpr(){
  // ast.addNode('Expr','branch');
	if(foundTokensCopy[counter][1] == "digit"){
    console.log('its a gooda digit');
		astIntExpr();
    ast.endChildren();


	}
	else if (foundTokensCopy[counter][0] == '"'){
		astStringExpr();
    ast.endChildren();

	}
	else if (foundTokensCopy[counter][0] == '(' || foundTokensCopy[counter][0] == 'false' || foundTokensCopy[counter][0] == 'true'){
		astBooleanExpr();
    ast.endChildren();


	}
	else if (foundTokensCopy[counter][1] == 'identifier' ) {
		astID();
    ast.endChildren();


	}


}
//
// //production IntExpr ::== digit intop Expr
// //					 ::== digit
function astIntExpr(){
  // ast.addNode('IntExpr','branch');
	if (foundTokensCopy[counter][1] == 'digit'){
		astdigit();
    ast.endChildren();

    console.log("this is the next look ahead: " + foundTokensCopy[counter][0]);
    if (foundTokensCopy[counter][0] == '+') {
      astintop();
      ast.endChildren();

      astExpr();
      ast.endChildren();

    }


	// }
	// else if (foundTokensCopy[counter][0] == '+'){
	// 	astdigit();
  //   astExpr();
	}


}
//
// //production StringExpr ::== " CharList "
function astStringExpr(){
  // ast.addNode('StringExpr','branch');
	matchMe('"', counter);
  counter++;
	astCharList();
  ast.endChildren();

	matchMe('"', counter);
  counter++;

}
//
// //production BooleanExpr ::== ( Expr boolop Expr )
// //						 ::== boolval
//
function astBooleanExpr(){
  // ast.addNode('BooleanExpr','branch');
	if ( foundTokensCopy[counter][0] == '('){
		matchMe('(', counter);
    counter++;
		astExpr();
    ast.endChildren();

		astboolop();
    ast.endChildren();

		astExpr();
    ast.endChildren();

    matchMe(')', counter);
    counter++;
	}
	else{
		astboolval();
    ast.endChildren();


	}


}
//
// //production Id ::== char
//
function astID(){
  // ast.addNode('ID','branch');
	astchar();
  ast.endChildren();


}
//
// //production CharList ::== char CharList
// //					  ::== space CharList
// //					  ::== ε
function astCharList(){
  // ast.addNode('CharList','branch');
	if (foundTokensCopy[counter][1] == 'string expression' ){
		astchar();
    ast.endChildren();

		astCharList();
    ast.endChildren();

	}
	else{
		// e production
	}


}

function myFunction(){

}
//
// //production type ::== int | string | boolean
function asttype(){
  // ast.addNode('type','branch');
	if (foundTokensCopy[counter][1] == 'int'){
		matchMe('int', counter);
		symbolCheck.push(foundTokensCopy[counter][1]);
		alert('pushed to temparray');

		counter++;
		symbolCheck.push(foundTokensCopy[counter][0]);
		symbolCheck.push(scopeCounter);

				if(symbolTable.length == 0){
					alert('symbol table 0');
					symbolTable.push(symbolCheck);
					console.log(symbolTable);
				}
				else {

					for(var i = 0; i < symbolTable.length; i++) {
						alert('inside of loop1');
			    	var cube = symbolTable[i];
			    for(var j = 0; j < cube.length; j++) {
						alert('inside of loop2');
						// if (symbolCheck[j][0] == symbolCheck[i][0] &&   symbolCheck[j][1] == symbolCheck[i][1] && symbolCheck[j][2] == symbolCheck[i][2] )
							if (symbolCheck[j][0] != symbolCheck[i][0] &&  symbolCheck[j][1] != symbolCheck[i][1] && symbolCheck[j][2] != symbolCheck[i][2] ) {
									alert('inside of if');
									symbolCheck.concat(symbolTable);
							}
							else {
								alert('inside of else');
								console.log("ERROR SCOPE OR TYPE INTERFERENCE!");
							}
							console.log('symbol table: ' + symbolTable);
							symbolCheck = [];
							console.log('hey boss symbol table after clear ' + symbolTable);
			    }
				}



		}

	}
	else if (foundTokensCopy[counter][1] == 'string'){
		matchMe('string', counter);
		symbolCheck.push(foundTokensCopy[counter][1]);

		counter++;
		symbolCheck.push(foundTokensCopy[counter][0]);
		symbolCheck.push(scopeCounter);

				if(symbolTable.length == 0){
					alert('symbol table 0');
					symbolTable.push(symbolCheck);
					console.log(symbolTable);
				}
				else {

					for(var i = 0; i < symbolTable.length; i++) {
						alert('inside of loop3');
			    	var cube = symbolTable[i];
			    for(var j = 0; j < cube.length; j++) {
						alert('inside of loop4');
						// if (symbolCheck[j][0] == symbolCheck[i][0] &&   symbolCheck[j][1] == symbolCheck[i][1] && symbolCheck[j][2] == symbolCheck[i][2] )
							if (symbolCheck[j][0] != symbolCheck[i][0] &&  symbolCheck[j][1] != symbolCheck[i][1] && symbolCheck[j][2] != symbolCheck[i][2] ) {
									alert('inside of if');
									symbolCheck.concat(symbolTable);
							}
							else {
								alert('inside of else');
								console.log("ERROR SCOPE OR TYPE INTERFERENCE!");
							}
							console.log('symbol table: ' + symbolTable);
							symbolCheck = [];
							console.log('hey boss symbol table after clear ' + symbolTable);
			    }
				}



		}
	}
	else if (foundTokensCopy[counter][1] == 'boolean'){
		matchMe('boolean', counter);
		symbolCheck.push(foundTokensCopy[counter][1]);

		counter++;
		symbolCheck.push(foundTokensCopy[counter][0]);
		symbolCheck.push(scopeCounter);

				if(symbolTable.length == 0){
					alert('symbol table 0');
					symbolTable.push(symbolCheck);
					console.log(symbolTable);
				}
				else {

					for(var i = 0; i < symbolTable.length; i++) {
						alert('inside of loop5');
						var cube = symbolTable[i];
					for(var j = 0; j < cube.length; j++) {
						alert('inside of loop6');
						// if (symbolCheck[j][0] == symbolCheck[i][0] &&   symbolCheck[j][1] == symbolCheck[i][1] && symbolCheck[j][2] == symbolCheck[i][2] )
							if (symbolCheck[j][0] != symbolCheck[i][0] &&  symbolCheck[j][1] != symbolCheck[i][1] && symbolCheck[j][2] != symbolCheck[i][2] ) {
									alert('inside of if');
									symbolCheck.concat(symbolTable);
							}
							else {
								alert('inside of else');
								console.log("ERROR SCOPE OR TYPE INTERFERENCE!");
							}
							console.log('symbol table: ' + symbolTable);
							symbolCheck = [];
							console.log('hey boss symbol table after clear ' + symbolTable);
					}
				}



		}
	}


}

// //production char ::== a | b | c ... z
function astchar(){
  // ast.addNode('char','branch');
  if (foundTokensCopy[counter][1].search(T_Char) != -1){
		    ast.addNode(foundTokensCopy[counter][0] , 'leaf')
        counter++;
	}
  else {
    console.log('no work');
  }

}

//
// //production digit ::== 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
function astdigit(){
  // ast.addNode('digit','branch');
  ast.addNode(foundTokensCopy[counter][0] , 'leaf')
  counter++;
}

// //production boolop ::== == | !=

function astboolop(){
  // ast.addNode('boolop','branch');
	if (foundTokensCopy[counter][0] == '=='){
		matchMe('==', counter);
    counter++;
	}
	else if (foundTokensCopy[counter][0] == '!='){
		matchMe('!=', counter);
    counter++;
	}

}
//
// //production boolval ::== false | true
function astboolval(){
  // ast.addNode('boolval','branch');
	if (foundTokensCopy[counter][1]== 'false'){
		matchMe('false', counter);
    counter++;
	}
	else if (foundTokensCopy[counter][1] == 'true'){
		matchMe('true', counter);
    counter++;
	}

}
//
// //production intop ::== +
function astintop(){
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

    this.root = null;  // Note the NULL root node of this tree.
    this.cur = {};     // Note the EMPTY current node of the tree we're building.


    // -- ------- --
    // -- Methods --
    // -- ------- --

    // Add a node: kind in {branch, leaf}.
    this.addNode = function(name, kind) {
        // Construct the node object.
        var node = { name: name,
                     children: [],
                     parent: {}
                   };

        // Check to see if it needs to be the root node.
        if ( (this.root == null) || (!this.root) )
        {
            // We are the root node.
            this.root = node;
        }
        else
        {
            // We are the children.
            // Make our parent the CURrent node...
            node.parent = this.cur;
            // ... and add ourselves (via the unfrotunately-named
            // "push" function) to the children array of the current node.
            this.cur.children.push(node);
        }
        // If we are an interior/branch node, then...
        if (kind == "branch")
        {
            // ... update the CURrent node pointer to ourselves.
            this.cur = node;
        }
    };

    // Note that we're done with this branch of the tree...
    this.endChildren = function() {
        // ... by moving "up" to our parent node (if possible).
        if ((this.cur.parent !== null) && (this.cur.parent.name !== undefined))
        {
            this.cur = this.cur.parent;
        }
        else
        {
            // TODO: Some sort of error logging.
            // This really should not happen, but it will, of course.
        }
    };

    // Return a string representation of the tree.
    this.toString = function() {
        // Initialize the result string.
        var traversalResult = "";

        // Recursive function to handle the expansion of the nodes.
        function expand(node, depth)
        {
            // Space out based on the current depth so
            // this looks at least a little ast-like.
            for (var i = 0; i < depth; i++)
            {
                traversalResult += "-";
            }

            // If there are no children (i.e., leaf nodes)...
            if (!node.children || node.children.length === 0)
            {
                // ... note the leaf node.
                traversalResult += "[" + node.name + "]";
                traversalResult += "\n";
            }
            else
            {
                // There are children, so note these interior/branch nodes and ...
                traversalResult += "<" + node.name + "> \n";
                // .. recursively expand them.
                for (var i = 0; i < node.children.length; i++)
                {
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
