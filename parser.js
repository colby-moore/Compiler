var parseCounter = 0;
var tree = new Tree();

function match (token, parseCounter){

	if(token == foundTokensCopy[parseCounter][0]){
		tree.addNode(token, 'leaf');
    console.log('expected Token: ' + token + ' Token Found: ' + foundTokensCopy[parseCounter][0]);
	}

	else{

    console.log("current token parse" + token + "This did not work " + foundTokensCopy[parseCounter][0] );
		//error

	}



}

function parser(){
  //console.log(foundTokensCopy[parseCounter][0]);

	parse_Program();

}


//production Program ::== Block $

function parse_Program(){
  tree.addNode('Program','branch');
	parse_Block();
	match('$', parseCounter);
  astRun();
  document.getElementById('parse').value += tree.toString() + "\n"
  // console.log("got an identifier")
  // console.log(tree.toString());
  //do we need a counter here still?
  parseCounter++;
}

//production Block ::== { StatementList }

function parse_Block(){
  tree.addNode('Block','branch');
  match('{', parseCounter);
  parseCounter++;

	parse_StatementList();
  tree.endChildren();

	match('}', parseCounter);
  parseCounter++;

}


//production StatementList ::== Statement StatementList
//					       ::== e
function parse_StatementList(){
  tree.addNode('StatementList','branch');
  // Assign operator = here i think is wrong... need to find an identifier?
  console.log("got to statementlist ");
	if (foundTokensCopy[parseCounter][0] == 'print'){
		parse_Statement();
    tree.endChildren();
    tree.endChildren();
		parse_StatementList();
    tree.endChildren();
    tree.endChildren();
    console.log('got past the if');

	}
  // extends to here for the identifier question
	else if(foundTokensCopy[parseCounter][1] == 'identifier'){
    parse_Statement();
    tree.endChildren();
    tree.endChildren();
		parse_StatementList();
    tree.endChildren();
    tree.endChildren();

	}
	else if (foundTokensCopy[parseCounter][0] == 'int'){
    console.log('got past the if type');
    parse_Statement();
    tree.endChildren();
    tree.endChildren();
		parse_StatementList();
    tree.endChildren();
    tree.endChildren();
	}
  else if (foundTokensCopy[parseCounter][0] == 'string'){
    parse_Statement();
    tree.endChildren();
    tree.endChildren();
		parse_StatementList();
    tree.endChildren();
    tree.endChildren();
	}
  else if (foundTokensCopy[parseCounter][0] == 'boolean'){
    parse_Statement();
    tree.endChildren();
    tree.endChildren();
		parse_StatementList();
    tree.endChildren();
    tree.endChildren();
	}
	else if (foundTokensCopy[parseCounter][1] == 'while'){
    parse_Statement();
    tree.endChildren();
    tree.endChildren();
		parse_StatementList();
    tree.endChildren();
    tree.endChildren();
	}
	else if (foundTokensCopy[parseCounter][1] == 'if'){
    parse_Statement();
    tree.endChildren();
    tree.endChildren();
		parse_StatementList();
    tree.endChildren();
    tree.endChildren();

	}
	else if (foundTokensCopy[parseCounter][0] == '{'){
    parse_Statement();
    tree.endChildren();
    tree.endChildren();
		parse_StatementList();
    tree.endChildren();
    tree.endChildren();
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
function parse_Statement(){
  tree.addNode('Statement','branch');
  console.log('got to here');
	if (foundTokensCopy[parseCounter][0] == 'print'){
    console.log('found print');
    parse_PrintStatement();
    tree.endChildren();
    tree.endChildren();

	}
  // extends to here for the identifier question
	else if(foundTokensCopy[parseCounter][1] == 'identifier'){
		parse_AssignmentStatement();
    tree.endChildren();

    console.log("got to identifier 2");

	}
	else if (foundTokensCopy[parseCounter][0] == 'int'){
		parse_VarDecl();
    tree.endChildren();


	}
  else if (foundTokensCopy[parseCounter][0] == 'string'){
		parse_VarDecl();
    tree.endChildren();


	}
  else if (foundTokensCopy[parseCounter][0] == 'boolean'){
		parse_VarDecl();
    tree.endChildren();


	}
	else if (foundTokensCopy[parseCounter][0] == 'while'){
		parse_WhileStatement();
    tree.endChildren();


	}
	else if (foundTokensCopy[parseCounter][0] == 'if'){
		parse_IfStatement();
    tree.endChildren();


	}
	else if (foundTokensCopy[parseCounter][0] == '{'){
		parse_Block();
    tree.endChildren();




	}
  else{
    console.log('error');
  }







}

//Production PrintStatement ::== print ( Expr )
function parse_PrintStatement(){
  tree.addNode('PrintStatement','branch');
	match('print', parseCounter);
  parseCounter++;
	match('(', parseCounter);
  parseCounter++;
	parse_Expr();
  tree.endChildren();
	match (')', parseCounter);
  parseCounter++;


}
//
// //Production AssignmentStatement ::== Id = Expr
function parse_AssignmentStatement(){
  tree.addNode('AssignmentStatement','branch');

	parse_ID();
  tree.endChildren();

	match('=', parseCounter);
  parseCounter++;
	parse_Expr();
  tree.endChildren();



}

//Production VarDecl ::== type Id
function parse_VarDecl(){
  tree.addNode('VarDecl','branch');
	parse_type();
  tree.endChildren();

	parse_ID();
  tree.endChildren();



}
//
// //Production WhileStatement ::== while BooleanExpr Block
function parse_WhileStatement(){
  tree.addNode('WhileStatement','branch');
	match('while', parseCounter);
  parseCounter++;
	parse_BooleanExpr();
  tree.endChildren();

	parse_Block();
  tree.endChildren();


}
//
// //production IfStatement ::== if BooleanExpr Block
function parse_IfStatement(){
  tree.addNode('IfStatement','branch');
	match('if', parseCounter);
  parseCounter++;
	parse_BooleanExpr();
  tree.endChildren();

	parse_Block();
  tree.endChildren();



}
//
// //Expr ::== IntExpr
// //     ::== StringExpr
// //	   ::== BooleanExpr
// //     ::== Id
//
function parse_Expr(){
  tree.addNode('Expr','branch');
	if(foundTokensCopy[parseCounter][1] == "digit"){
    console.log('its a gooda digit');
		parse_IntExpr();
    tree.endChildren();


	}
	else if (foundTokensCopy[parseCounter][0] == '"'){
		parse_StringExpr();
    tree.endChildren();

	}
	else if (foundTokensCopy[parseCounter][0] == '(' || foundTokensCopy[parseCounter][0] == 'false' || foundTokensCopy[parseCounter][0] == 'true'){
		parse_BooleanExpr();
    tree.endChildren();


	}
	else if (foundTokensCopy[parseCounter][1] == 'identifier' ) {
		parse_ID();
    tree.endChildren();


	}


}
//
// //production IntExpr ::== digit intop Expr
// //					 ::== digit
function parse_IntExpr(){
  tree.addNode('IntExpr','branch');
	if (foundTokensCopy[parseCounter][1] == 'digit'){
		parse_digit();
    tree.endChildren();

    console.log("this is the next look ahead: " + foundTokensCopy[parseCounter][0]);
    if (foundTokensCopy[parseCounter][0] == '+') {
      parse_intop();
      tree.endChildren();

      parse_Expr();
      tree.endChildren();

    }


	// }
	// else if (foundTokensCopy[parseCounter][0] == '+'){
	// 	parse_digit();
  //   parse_Expr();
	}


}
//
// //production StringExpr ::== " CharList "
function parse_StringExpr(){
  tree.addNode('StringExpr','branch');
	match('"', parseCounter);
  parseCounter++;
	parse_CharList();
  tree.endChildren();

	match('"', parseCounter);
  parseCounter++;

}
//
// //production BooleanExpr ::== ( Expr boolop Expr )
// //						 ::== boolval
//
function parse_BooleanExpr(){
  tree.addNode('BooleanExpr','branch');
	if ( foundTokensCopy[parseCounter][0] == '('){
		match('(', parseCounter);
    parseCounter++;
		parse_Expr();
    tree.endChildren();

		parse_boolop();
    tree.endChildren();

		parse_Expr();
    tree.endChildren();

    match(')', parseCounter);
    parseCounter++;
	}
	else{
		parse_boolval();
    tree.endChildren();


	}


}
//
// //production Id ::== char
//
function parse_ID(){
  tree.addNode('ID','branch');
	parse_char();
  tree.endChildren();


}
//
// //production CharList ::== char CharList
// //					  ::== space CharList
// //					  ::== ε
function parse_CharList(){
  tree.addNode('CharList','branch');
	if (foundTokensCopy[parseCounter][1] == 'string expression' ){
		parse_char();
    tree.endChildren();

		parse_CharList();
    tree.endChildren();

	}
	else{
		// e production
	}


}
//
// //production type ::== int | string | boolean
function parse_type(){
  tree.addNode('type','branch');
	if (foundTokensCopy[parseCounter][1] == 'int'){
		match('int', parseCounter);
    parseCounter++;
	}
	else if (foundTokensCopy[parseCounter][1] == 'string'){
		match('string', parseCounter);
    parseCounter++;
	}
	else if (foundTokensCopy[parseCounter][1] == 'boolean'){
		match('boolean', parseCounter);
    parseCounter++;
	}


}

// //production char ::== a | b | c ... z
function parse_char(){
  tree.addNode('char','branch');
  if (foundTokensCopy[parseCounter][1].search(T_Char) != -1){
		    tree.addNode(foundTokensCopy[parseCounter][0] , 'leaf')
        parseCounter++;
	}
  else {
    console.log('no work');
  }

}

//
// //production digit ::== 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
function parse_digit(){
  tree.addNode('digit','branch');
  tree.addNode(foundTokensCopy[parseCounter][0] , 'leaf')
  parseCounter++;
}

// //production boolop ::== == | !=

function parse_boolop(){
  tree.addNode('boolop','branch');
	if (foundTokensCopy[parseCounter][0] == '=='){
		match('==', parseCounter);
    parseCounter++;
	}
	else if (foundTokensCopy[parseCounter][0] == '!='){
		match('!=', parseCounter);
    parseCounter++;
	}

}
//
// //production boolval ::== false | true
function parse_boolval(){
  tree.addNode('boolval','branch');
	if (foundTokensCopy[parseCounter][1]== 'false'){
		match('false', parseCounter);
    parseCounter++;
	}
	else if (foundTokensCopy[parseCounter][1] == 'true'){
		match('true', parseCounter);
    parseCounter++;
	}

}
//
// //production intop ::== +
function parse_intop(){
	match('+', parseCounter);
  parseCounter++;

}

//-----------------------------------------
// treeDemo.js
//
// By Alan G. Labouseur, based on the 2009
// work by Michael Ardizzone and Tim Smith.
//-----------------------------------------

function Tree() {
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
            // this looks at least a little tree-like.
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
