var counter = 0;
var ast = new astTree();

function matchMe (token, counter){

	if(token == foundTokensToParse[counter][0]){
		ast.addNode(token, 'leaf');
    console.log('expected Token: ' + token + ' Token Found: ' + foundTokensToParse[counter][0]);
	}

	else{

    console.log("current token parse" + token + "This did not work " + foundTokensToParse[counter][0] );
		//error

	}



}

function astRun(){
  //console.log(foundTokensToParse[counter][0]);

	parseProgram();

}


//production Program ::== Block $

function parseProgram(){
	ast.addNode('Block','branch');

	parseBlock();
	matchMe('$', counter);
	document.getElementById('ast').value += ast.toString() + "\n"
  // console.log("got an identifier")
  // console.log(ast.toString());
  //do we need a counter here still?
  counter++;
}

//production Block ::== { StatementList }

function parseBlock(){
  matchMe('{', counter);

	counter++;

	parseStatementList();
  ast.endChildren();

	matchMe('}', counter);
	// ast.addNode('}','branch');
  counter++;

}


//production StatementList ::== Statement StatementList
//					       ::== e
function parseStatementList(){
  // Assign operator = here i think is wrong... need to find an identifier?
  console.log("got to statementlist ");
	if (foundTokensToParse[counter][0] == 'print'){
		parseStatement();
    ast.endChildren();
    ast.endChildren();
		parseStatementList();
    ast.endChildren();
    ast.endChildren();
    console.log('got past the if');

	}
  // extends to here for the identifier question
	else if(foundTokensToParse[counter][1] == 'identifier'){
    parseStatement();
    ast.endChildren();
    ast.endChildren();
		parseStatementList();
    ast.endChildren();
    ast.endChildren();

	}
	else if (foundTokensToParse[counter][0] == 'int'){
    console.log('got past the if type');
    parseStatement();
    ast.endChildren();
    ast.endChildren();
		parseStatementList();
    ast.endChildren();
    ast.endChildren();
	}
  else if (foundTokensToParse[counter][0] == 'string'){
    parseStatement();
    ast.endChildren();
    ast.endChildren();
		parseStatementList();
    ast.endChildren();
    ast.endChildren();
	}
  else if (foundTokensToParse[counter][0] == 'boolean'){
    parseStatement();
    ast.endChildren();
    ast.endChildren();
		parseStatementList();
    ast.endChildren();
    ast.endChildren();
	}
	else if (foundTokensToParse[counter][1] == 'while'){
    parseStatement();
    ast.endChildren();
    ast.endChildren();
		parseStatementList();
    ast.endChildren();
    ast.endChildren();
	}
	else if (foundTokensToParse[counter][1] == 'if'){
    parseStatement();
    ast.endChildren();
    ast.endChildren();
		parseStatementList();
    ast.endChildren();
    ast.endChildren();

	}
	else if (foundTokensToParse[counter][0] == '{'){
    parseStatement();
    ast.endChildren();
    ast.endChildren();
		parseStatementList();
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
function parseStatement(){
  console.log('got to here');
	if (foundTokensToParse[counter][0] == 'print'){
    console.log('found print');
    parsePrintStatement();
    ast.endChildren();
    ast.endChildren();

	}
  // extends to here for the identifier question
	else if(foundTokensToParse[counter][1] == 'identifier'){
		parseAssignmentStatement();
    ast.endChildren();

    console.log("got to identifier 2");

	}
	else if (foundTokensToParse[counter][0] == 'int'){
		parseVarDecl();
    ast.endChildren();


	}
  else if (foundTokensToParse[counter][0] == 'string'){
		parseVarDecl();
    ast.endChildren();


	}
  else if (foundTokensToParse[counter][0] == 'boolean'){
		parseVarDecl();
    ast.endChildren();


	}
	else if (foundTokensToParse[counter][0] == 'while'){
		parseWhileStatement();
    ast.endChildren();


	}
	else if (foundTokensToParse[counter][0] == 'if'){
		parseIfStatement();
    ast.endChildren();


	}
	else if (foundTokensToParse[counter][0] == '{'){
		parseBlock();
    ast.endChildren();




	}
  else{
    console.log('error');
  }







}

//Production PrintStatement ::== print ( Expr )
function parsePrintStatement(){
  ast.addNode('PrintStatement','branch');
	matchMe('print', counter);
  counter++;
	matchMe('(', counter);
  counter++;
	parseExpr();
  ast.endChildren();
	matchMe (')', counter);
  counter++;


}
//
// //Production AssignmentStatement ::== Id = Expr
function parseAssignmentStatement(){
  ast.addNode('AssignmentStatement','branch');

	parseID();
  ast.endChildren();

	matchMe('=', counter);
  counter++;
	parseExpr();
  ast.endChildren();



}

//Production VarDecl ::== type Id
function parseVarDecl(){
  ast.addNode('VarDecl','branch');
	parsetype();
  ast.endChildren();

	parseID();
  ast.endChildren();



}
//
// //Production WhileStatement ::== while BooleanExpr Block
function parseWhileStatement(){
  ast.addNode('WhileStatement','branch');
	matchMe('while', counter);
  counter++;
	parseBooleanExpr();
  ast.endChildren();

	parseBlock();
  ast.endChildren();


}
//
// //production IfStatement ::== if BooleanExpr Block
function parseIfStatement(){
  ast.addNode('IfStatement','branch');
	matchMe('if', counter);
  counter++;
	parseBooleanExpr();
  ast.endChildren();

	parseBlock();
  ast.endChildren();



}
//
// //Expr ::== IntExpr
// //     ::== StringExpr
// //	   ::== BooleanExpr
// //     ::== Id
//
function parseExpr(){
  // ast.addNode('Expr','branch');
	if(foundTokensToParse[counter][1] == "digit"){
    console.log('its a gooda digit');
		parseIntExpr();
    ast.endChildren();


	}
	else if (foundTokensToParse[counter][0] == '"'){
		parseStringExpr();
    ast.endChildren();

	}
	else if (foundTokensToParse[counter][0] == '(' || foundTokensToParse[counter][0] == 'false' || foundTokensToParse[counter][0] == 'true'){
		parseBooleanExpr();
    ast.endChildren();


	}
	else if (foundTokensToParse[counter][1] == 'identifier' ) {
		parseID();
    ast.endChildren();


	}


}
//
// //production IntExpr ::== digit intop Expr
// //					 ::== digit
function parseIntExpr(){
  // ast.addNode('IntExpr','branch');
	if (foundTokensToParse[counter][1] == 'digit'){
		parsedigit();
    ast.endChildren();

    console.log("this is the next look ahead: " + foundTokensToParse[counter][0]);
    if (foundTokensToParse[counter][0] == '+') {
      parseintop();
      ast.endChildren();

      parseExpr();
      ast.endChildren();

    }


	// }
	// else if (foundTokensToParse[counter][0] == '+'){
	// 	parsedigit();
  //   parseExpr();
	}


}
//
// //production StringExpr ::== " CharList "
function parseStringExpr(){
  // ast.addNode('StringExpr','branch');
	matchMe('"', counter);
  counter++;
	parseCharList();
  ast.endChildren();

	matchMe('"', counter);
  counter++;

}
//
// //production BooleanExpr ::== ( Expr boolop Expr )
// //						 ::== boolval
//
function parseBooleanExpr(){
  // ast.addNode('BooleanExpr','branch');
	if ( foundTokensToParse[counter][0] == '('){
		matchMe('(', counter);
    counter++;
		parseExpr();
    ast.endChildren();

		parseboolop();
    ast.endChildren();

		parseExpr();
    ast.endChildren();

    matchMe(')', counter);
    counter++;
	}
	else{
		parseboolval();
    ast.endChildren();


	}


}
//
// //production Id ::== char
//
function parseID(){
  // ast.addNode('ID','branch');
	parsechar();
  ast.endChildren();


}
//
// //production CharList ::== char CharList
// //					  ::== space CharList
// //					  ::== ε
function parseCharList(){
  // ast.addNode('CharList','branch');
	if (foundTokensToParse[counter][1] == 'string expression' ){
		parsechar();
    ast.endChildren();

		parseCharList();
    ast.endChildren();

	}
	else{
		// e production
	}


}
//
// //production type ::== int | string | boolean
function parsetype(){
  // ast.addNode('type','branch');
	if (foundTokensToParse[counter][1] == 'int'){
		matchMe('int', counter);
    counter++;
	}
	else if (foundTokensToParse[counter][1] == 'string'){
		matchMe('string', counter);
    counter++;
	}
	else if (foundTokensToParse[counter][1] == 'boolean'){
		matchMe('boolean', counter);
    counter++;
	}


}

// //production char ::== a | b | c ... z
function parsechar(){
  // ast.addNode('char','branch');
  if (foundTokensToParse[counter][1].search(T_Char) != -1){
		    ast.addNode(foundTokensToParse[counter][0] , 'leaf')
        counter++;
	}
  else {
    console.log('no work');
  }

}

//
// //production digit ::== 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
function parsedigit(){
  // ast.addNode('digit','branch');
  ast.addNode(foundTokensToParse[counter][0] , 'leaf')
  counter++;
}

// //production boolop ::== == | !=

function parseboolop(){
  // ast.addNode('boolop','branch');
	if (foundTokensToParse[counter][0] == '=='){
		matchMe('==', counter);
    counter++;
	}
	else if (foundTokensToParse[counter][0] == '!='){
		matchMe('!=', counter);
    counter++;
	}

}
//
// //production boolval ::== false | true
function parseboolval(){
  // ast.addNode('boolval','branch');
	if (foundTokensToParse[counter][1]== 'false'){
		matchMe('false', counter);
    counter++;
	}
	else if (foundTokensToParse[counter][1] == 'true'){
		matchMe('true', counter);
    counter++;
	}

}
//
// //production intop ::== +
function parseintop(){
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
