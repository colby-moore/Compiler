var lastBackpatch;

arrayForCodeGen = [];
arrayForVarDecl = [];

stringHeapVar = [];

lengthOfEachString = [];


function codeGenInitiate(){
  if (ast.cur.name == "Block") {
    console.log(ast.cur.name.childNodes);
    var blockCounter = 1;
    var curScope = 0;
    var nameCount = 0;
    var nameCount2 = 0;
    var nameCount3 = 0;
    var tempCounter = 0;
    for (var i = 0; i < ast.cur.children.length; i++) {

      // MAYBE...
      // Right here we need to check if block child also = "block" for scope code gen
      // if (ast.cur.children[nameCount].name == "block"){
      //``
      // }
      if(ast.cur.children[nameCount].name == "Block") {
        blockCounter++;
        var tempNameCount2 = 0;
        console.log("2nd block found");
        if (nameCount2 > 0) {
          nameCount2 = tempNameCount2;
        }
        curScope++;
        console.log(ast.cur.children[nameCount].children);
        // var tempBlockCounter = 0;
        for (var p = 0; p < ast.cur.children[nameCount].children.length; p++) {
          console.log("current scope " + curScope);
          testerBlock(nameCount,nameCount2,tempCounter, curScope, blockCounter);
          tempCounter++;
          nameCount2++;
          // tempCounter++;
        }
        // blockChecker();
        curScope-=1;
        console.log("current scope " + curScope);
      }
      else if(ast.cur.children[nameCount].name == "VarDecl") {

        // Type: int, string, bool | VarDecl: identifier | Backpatch: T + counter
        var declarations = {type:ast.cur.children[nameCount].children[0].name, varDecl:ast.cur.children[nameCount].children[1].name, backpatch:"T" + tempCounter, scope:curScope };
        if (ast.cur.children[nameCount].children[0].name == "int") {
          console.log("INT");
          arrayForVarDecl.push(declarations);
          console.log("Looking for scope");
          console.log(arrayForVarDecl);
          arrayForCodeGen.push("A9","00","8D","T"+tempCounter,"00");

        }
        else if (ast.cur.children[nameCount].children[0].name == "string") {
          console.log("STRING");
          arrayForVarDecl.push(declarations);
          console.log(arrayForVarDecl);
          arrayForCodeGen.push("A9","00","8D","T"+tempCounter,"00");
        }
        else if (ast.cur.children[nameCount].children[0].name == "boolean"){
          console.log("BOOLEAN");
          arrayForVarDecl.push(declarations);
          arrayForCodeGen.push("A9","00","8D","T"+tempCounter,"00");
        }
        tempCounter++;
      }
      else if (ast.cur.children[nameCount].name == "AssignmentStatement") {
          var cur = 0;
          for (var i = 0; i < arrayForVarDecl.length; i++) {
            console.log("Check these out");
            console.log(ast.cur.children[nameCount].children[0].name);
            console.log(arrayForVarDecl[cur].varDecl);
            var tempTable = arrayForVarDecl[cur].backpatch;
            // if  current nodes name  ==  one of the nodes from variable declaration
            if (ast.cur.children[nameCount].children[0].name == arrayForVarDecl[cur].varDecl && arrayForVarDecl[cur].scope == curScope && arrayForVarDecl[cur].type == "int") {
              console.log("assign test for scope " + arrayForVarDecl[cur].scope + curScope);
              var addZero = "0" + ast.cur.children[nameCount].children[1].name;
              arrayForCodeGen.push("A9",addZero,"8D",tempTable,"00");
            }
            else if (ast.cur.children[nameCount].children[0].name == arrayForVarDecl[cur].varDecl && arrayForVarDecl[cur].scope == curScope && arrayForVarDecl[cur].type == "string") {
              console.log("STRINGGG");
              var stringCounter = 0;
              stringChild = ast.cur.children[nameCount].children[1].name;
              lengthOfEachString.push(stringChild.length+1);
              console.log("THIS IS STRINGCHILD "+ stringChild);
              for (var h = 0; h < stringChild.length; h++) {
                console.log("Still working");
                stringHeapVar.push(stringChild[stringCounter])
                stringCounter++;
                if (h == stringChild.length-1) {
                  stringHeapVar.push("!");
                  // Later check if we find the hex value of ! and replace / push with a 00
                }
              }
              // var heapLocation = 256 - stringHeapVar.length;
              // for loop through entire code gen before printing and replace these TBD with calulations
              // Need to count how many string we have
              // First iteration is 256 - total string length
              // Second iteration 256 - array[1] + array[2]
              // third iteration is 256 - array[2]
              console.log("Heap Location Calculation " + stringHeapVar.length);
              arrayForCodeGen.push("A9","TBD","8D",tempTable,"00");
            }
            else if (ast.cur.children[nameCount].children[0].name == arrayForVarDecl[cur].varDecl && arrayForVarDecl[cur].scope == curScope && arrayForVarDecl[cur].type == "boolean"){
              var boolValue = ast.cur.children[nameCount].children[1].name;
              if (boolValue == "true") {
                arrayForCodeGen.push("A9","01","8D",tempTable,"00");
              }
              else {
                if (boolValue == "false") {
                  arrayForCodeGen.push("A9","00","8D",tempTable,"00");
                }
              }
            }
            cur++;
          }

        // now we need to record what the AssignmentStatement says
        // in test cast a = 5 so we can go to our code gen and replace 00 with 05

        // if (tempAssignVarArray[0] == backpatchArray[0] ) {
        //   console.log("THEY MATCHHH!!!!!!");
        // }
      }
      else if(ast.cur.children[nameCount].name == "PrintStatement") {
        console.log("FOUND PRINT HOMIEEE");
        console.log(arrayForVarDecl);
        for (var i = 0; i < arrayForVarDecl.length; i++) {
          if (ast.cur.children[nameCount].children[0].name == arrayForVarDecl[i].varDecl && arrayForVarDecl[i].scope == curScope && arrayForVarDecl[i].type == "int" ) {
            console.log("FOUND PRINT HOMIEEE AGAAAIIINNN");
            console.log(ast.cur.children[nameCount].children[0].name);
            arrayForCodeGen.push("AC",arrayForVarDecl[i].backpatch,"00","A2","01","FF");
          }
          else if (ast.cur.children[nameCount].children[0].name == arrayForVarDecl[i].varDecl && arrayForVarDecl[i].scope == curScope && arrayForVarDecl[i].type == "string" ) {
              arrayForCodeGen.push("AC",arrayForVarDecl[i].backpatch,"00","A2","02","FF");
          }
        }
        if (arrayForVarDecl.length == 0 && ast.cur.children[nameCount].children[0].name.length > 1){
          console.log(ast.cur.children[nameCount].children[0].name.length);
          var stringCounter = 0;
          stringChild = ast.cur.children[nameCount].children[0].name;
          lengthOfEachString.push(stringChild.length+1);
          console.log("THIS IS STRINGCHILD "+ stringChild);
          for (var h = 0; h < stringChild.length; h++) {
            console.log("Still working");
            stringHeapVar.push(stringChild[stringCounter])
            stringCounter++;
            if (h == stringChild.length-1) {
              stringHeapVar.push("!");
              // Later check if we find the hex value of ! and replace / push with a 00
            }
          }
          // var heapLocation = 256 - stringHeapVar.length;
          // for loop through entire code gen before printing and replace these TBD with calulations
          // Need to count how many string we have
          // First iteration is 256 - total string length
          // Second iteration 256 - array[1] + array[2]
          // third iteration is 256 - array[2]
          console.log("Heap Location Calculation " + stringHeapVar.length);
          arrayForCodeGen.push("A0","TBD","A2","02","FF");

        }
        else if (arrayForVarDecl.length == 0) {
          console.log("arrayForVarDecl is empty");
          console.log(ast.cur.children[nameCount].children[0].name.length);
          arrayForCodeGen.push("A0","0"+ast.cur.children[nameCount].children[0].name,"A2","01","FF");
        }
      }
      else if(ast.cur.children[nameCount].name == "IfStatement") {
        alert("IfStatements under construction.");
      }
      else if(ast.cur.children[nameCount].name == "WhileStatement") {
        alert("WhileStatements under construction.");
      }
      else if (ast.cur.children[nameCount].name == "$"){
        console.log("$ end of block");
        var leftoverCodeGenArray = [];
        console.log("This is the length of our code gen before our 00 inputs " + arrayForCodeGen.length);
        lastBackpatch = arrayForCodeGen.length;
        if (arrayForCodeGen.length <= 256) {
          console.log("Less than 256");
          var leftoverCodeGen = 256 - arrayForCodeGen.length;
          console.log(leftoverCodeGen);
          for (var i = 0; i < leftoverCodeGen; i++) {
            arrayForCodeGen.push("00");
          }
          // console.log("leftoverCodeGenArray" + " " + leftoverCodeGenArray);
          // arrayForCodeGen.concat(leftoverCodeGenArray);
          // console.log(arrayForCodeGen);
        }
        else if (arrayForCodeGen.length > 256) {
          document.getElementById('codeGeneration').value += 'ERROR: Exceeding memory limit. Please refresh'
          throw new Error("ERROR: Exceeding memory limit.");
        }
      }
      console.log(ast.cur.children[nameCount].name);
      nameCount++;
    }
    findTempTable();
    stringHeap();
    heapLocationToDetermin();
    // myFunction();
    showTable();
    codeGenScopeCheck();
  }
}

function findTempTable(tempTable) {
  tempTableArray = []
  var now = 0
  for (var m = 0; m < arrayForVarDecl.length; m++) {
    tempTableArray.push(arrayForVarDecl[m].backpatch)
  }
  console.log("findTempTable");
  console.log(tempTableArray);
  for (var y = 0; y < tempTableArray.length; y++) {
    for (var o = 0; o < arrayForCodeGen.length; o++) {
      if (arrayForCodeGen[o] == tempTableArray[now]) {
        var lastBackpatchToHex = lastBackpatch + now + 1;
        var hexStringArray = [];
        hexStringArray.push(lastBackpatchToHex.toString(16));
        if (hexStringArray[0].length == 1) {
          // arrayForCodeGen[o] = "0"+hexStringArray[0].toUppercase();
          tempHexStringArray = [];
          tempHexStringArray.push(hexStringArray[0].toUpperCase());
          console.log(tempHexStringArray);
          arrayForCodeGen[o] = "0" + tempHexStringArray[0];
        }
        else if (hexStringArray[0].length > 1){
          tempHexStringArray = [];
          tempHexStringArray.push(hexStringArray[0].toUpperCase());
          console.log(tempHexStringArray);
          arrayForCodeGen[o] = tempHexStringArray[0];
        }

      }
    }
    now++;
  }
}

function heapLocationToDetermin(){
  var TBDCounter = 0;
  indexGreaterThanOneSum = []
  var temp1;
  var temp2 = 1;
  for (var i = 0; i < arrayForCodeGen.length; i++) {
    if (arrayForCodeGen[i] == "TBD"){
      console.log("FOUND THE TBD ELEMENT");
      TBDCounter++;
      if (TBDCounter == 1) {
        var helloHeapForOne = 256 - stringHeapVar.length;
        var heapToHex1 = helloHeapForOne.toString(16).toUpperCase();
        arrayForCodeGen[i] = heapToHex1;
      }
      else if (TBDCounter > 1) {
        console.log("In tbdcounter > 1 this many times " + TBDCounter);
        var tempStringTotal = 0;
        for (temp1 = temp2; temp1 < lengthOfEachString.length; temp1++) {
          console.log(lengthOfEachString[temp1]);
          tempStringTotal += lengthOfEachString[temp1];
        }
        console.log(tempStringTotal);
        indexGreaterThanOneSum.push(tempStringTotal);
        temp2++;
        var helloHeapForMultiple = 256 - indexGreaterThanOneSum[0];
        var heapToHex2 = helloHeapForMultiple.toString(16).toUpperCase();
        arrayForCodeGen[i] = heapToHex2;
        indexGreaterThanOneSum = [];
      }
    }
  }
  console.log(indexGreaterThanOneSum);
  console.log(TBDCounter);
}

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

function hexSpacer() {
  console.log("HEXSPACER");
  // for (var i = 0; i < hexArray.length; i++) {
  //     console.log(hexArray[]);
  // }
}



// This function stores strings in the heap
function stringHeap(){
  hexArray = [];
  console.log(stringHeapVar);
  console.log(stringHeapVar.length);
  var lengthForHeap = stringHeapVar.length;
  for (var i = 0; i < stringHeapVar.length; i++) {
    hexArray.push(toHex(stringHeapVar[i]));
    if (hexArray[i] == "21") {
      hexArray[i] = "00"
    }
  }
  console.log(hexArray);
  console.log(hexArray.length);
  for (var i = 0; i < lengthForHeap; i++) {
    arrayForCodeGen.pop();
  }

  for (var i = 0; i < hexArray.length; i++) {
    arrayForCodeGen.push(hexArray[i].toUpperCase());
  }
  // var newHeapVar = stringHeapVar.join('');
  // console.log("new heap push " + newHeapVar);
  // // newHeapVar.toString();
  // // console.log("slice" + " " +stringHeapVar.slice());
  // hexArray = [];
  // console.log(newHeapVar);
  // hexArray.push(toHex(newHeapVar));
  // console.log("HEX ARRAY " + hexArray);
  // console.log("heapvar 1:" + " "+ newHeapVar[0]);
  // console.log("heapvar 2:" + " "+ newHeapVar[1]);
  // console.log("heapvar 3:" + " "+ newHeapVar[2]);
  // console.log("heapvar 4:" + " "+ newHeapVar[3]);
  // console.log("heapvar 5:" + " "+ newHeapVar[4]);
  // var whereToHeap = 256 - lengthForHeap-1;
  // console.log("Where to heap" + " " + whereToHeap);
  // console.log(lengthForHeap);
  // // var fakeArray = [];
  // // fakeArray.push("A9","00","8D","T0","00","00","00","00","00","00","00","00","00","00","00","00","00");
  // // console.log(fakeArray);
  // var tempLength = arrayForCodeGen.length - lengthForHeap;
  // console.log(tempLength);
  // // for (var k = 0; k < array.length; k++) {
  // //   array[i]
  // // }
  // pushHexArrayAsElements();
  // arrayForCodeGen.splice(tempLength, lengthForHeap-1, );
  console.log(arrayForCodeGen.length);
  console.log(arrayForCodeGen);
  console.log(lengthOfEachString);
  // hexSpacer();
  // console.log(fakeArray);
}

function pushHexArrayAsElements(){
  console.log("This is hex Array before push " + hexArray);
}

function showTable(){
  var count = 0;
  for (var i = 0; i < arrayForCodeGen.length; i++) {
    count++;
    if (count == 16) {
      document.getElementById('codeGeneration').value += arrayForCodeGen[i] + "\n";
      count = 0;
    }
    else {
      document.getElementById('codeGeneration').value += arrayForCodeGen[i] + " "

    }

  }

}

function codeGenScopeCheck(){

  console.log("This is a symbol Table copy " + symbolTableCopy[1]);

}

// Test function
// ========================================================================================================================
//
// function testerfunc(){
//   var three = 5;
//   if (three == 3){
//     var tempVar = "tempVar three"
//   }
//   else if (three == 4) {
//     var tempVar = "tempVar four"
//   }
//   else if (three == 5) {
//     var tempVar = "tempVar five"
//   }
//   console.log(tempVar);
//
// }


// ast.cur.children[nameCount].children[nameCount2].name
// ast.cur.children[nameCount].children[nameCount2].children[0].name

function testerBlock(nameCount, nameCount2, tempCounter, curScope, blockCounter) {
  console.log(blockCounter);
  if (blockCounter == 2) {
    console.log("blockCounter == 2");
    var tempBlock = ast.cur.children[nameCount].children[nameCount2];
  }
  else if (blockCounter == 3) {
    console.log("blockCounter == 3");
    var tempBlock = ast.cur.children[nameCount].children[nameCount2].children[nameCount3];
  }
  else {
    console.log("blockCounter end reached");
  }
  if (tempBlock.name == "Block") {
    blockCounter++;
    for (var p = 0; p < tempBlock.length; p++) {
      testerBlock(nameCount, nameCount2, tempCounter, curScope, blockCounter);
    }
  }
  else if(tempBlock.name == "VarDecl") {
    console.log("THIS IS WHERE VARDECL NEEDS TO BE PICKLE RICK");
    // Type: int, string, bool | VarDecl: identifier | Backpatch: T + counter
    var declarations = {type:ast.cur.children[nameCount].children[nameCount2].children[0].name, varDecl:ast.cur.children[nameCount].children[nameCount2].children[1].name, backpatch:"T" + tempCounter, scope:curScope };
    if (ast.cur.children[nameCount].children[nameCount2].children[0].name == "int") {
      console.log("2nd vardecl INT");
      arrayForVarDecl.push(declarations);
      console.log(arrayForVarDecl);
      arrayForCodeGen.push("A9","00","8D","T"+tempCounter,"00")

    }
    else if (ast.cur.children[nameCount].children[nameCount2].children[0].name == "string") {
      console.log("STRING");
      arrayForVarDecl.push(declarations);
      console.log(arrayForVarDecl);
      arrayForCodeGen.push("A9","00","8D","T"+tempCounter,"00");
    }
    else if (ast.cur.children[nameCount].children[nameCount2].children[0].name  == "boolean"){
      console.log("BOOLEAN");
      arrayForVarDecl.push(declarations);
      console.log(arrayForVarDecl);
      arrayForCodeGen.push("A9","00","8D","T"+tempCounter,"00");
    }
    // tempCounter++;
  }
  else if (tempBlock.name == "AssignmentStatement") {
      var cur = 0;
      for (var n = 0; n < arrayForVarDecl.length; n++) {
        console.log(arrayForVarDecl[cur].varDecl);
        var tempTable = arrayForVarDecl[cur].backpatch;
        // if  current nodes name  ==  one of the nodes from variable declaration
        if (ast.cur.children[nameCount].children[nameCount2].children[0].name == arrayForVarDecl[cur].varDecl && arrayForVarDecl[cur].scope == curScope && arrayForVarDecl[cur].type == "int") {
          console.log("FOUND 2ND ASSIGNMENT STATEMENT INT");
          console.log("Scope " + arrayForVarDecl[cur].scope + curScope );
          var addZero = "0" + ast.cur.children[nameCount].children[nameCount2].children[1].name;
          arrayForCodeGen.push("A9",addZero,"8D",tempTable,"00");
        }
        else if (ast.cur.children[nameCount].children[nameCount2].children[0].name == arrayForVarDecl[cur].varDecl && arrayForVarDecl[cur].scope == curScope && arrayForVarDecl[cur].type == "string") {
          console.log("2nd assigned STRINGGG");
          console.log(stringHeapVar);
          console.log(ast.cur.children[nameCount].children[nameCount2].children[1].name);
          // stringHeapVar.push(ast.cur.children[nameCount].children[nameCount2].children[1].name.toString());
          var stringCounter = 0;
          stringChild = ast.cur.children[nameCount].children[nameCount2].children[1].name;
          lengthOfEachString.push(stringChild.length+1);
          console.log("LENGTH OF EACH STRING 2ND TIME " + stringChild.length);
          console.log("THIS IS STRINGCHILD "+ stringChild);
          console.log(stringChild[stringCounter]);
          for (var h = 0; h < stringChild.length; h++) {
            console.log("Still working");
            stringHeapVar.push(stringChild[stringCounter])
            stringCounter++;
            if (h == stringChild.length-1) {
              stringHeapVar.push("!");
              // Later check if we find the hex value of ! and replace / push with a 00
            }
          }
          // var heapLocation = 256 - stringHeapVar.length;
          // for loop through entire code gen before printing and replace these TBD with calulations
          // Need to count how many string we have
          // First iteration is 256 - total string length
          // Second iteration 256 - array[1] + array[2]
          // third iteration is 256 - array[2]
          console.log("Heap Location Calculation " + stringHeapVar.length);
          arrayForCodeGen.push("A9","TBD","8D",tempTable,"00");
        }
        else if (ast.cur.children[nameCount].children[nameCount2].children[0].name == arrayForVarDecl[cur].varDecl && arrayForVarDecl[cur].scope == curScope && arrayForVarDecl[cur].type == "boolean"){
          var boolValue = ast.cur.children[nameCount].children[nameCount2].children[1].name;
          if (boolValue == "true") {
            arrayForCodeGen.push("A9","01","8D",tempTable,"00");
          }
          else {
            if (boolValue == "false") {
              arrayForCodeGen.push("A9","00","8D",tempTable,"00");
            }
          }
        }
        cur++;
      }

    // now we need to record what the AssignmentStatement says
    // in test cast a = 5 so we can go to our code gen and replace 00 with 05

    // if (tempAssignVarArray[0] == backpatchArray[0] ) {
    //   console.log("THEY MATCHHH!!!!!!");
    // }
  }
  else if(tempBlock.name == "PrintStatement") {
    for (var i = 0; i < arrayForVarDecl.length; i++) {
      if (ast.cur.children[nameCount].children[nameCount2].children[0].name == arrayForVarDecl[i].varDecl && arrayForVarDecl[i].scope == curScope ) {
        console.log("FOUND PRINT HOMIEEE AGAAAIIINNN 2");
        arrayForCodeGen.push("AC",arrayForVarDecl[i].backpatch,"00","A2","01","FF");
      }
    }
    if (arrayForVarDecl.length == 0 && ast.cur.children[nameCount].children[nameCount2].children[0].name.length > 1){
      console.log(ast.cur.children[nameCount].children[0].name.length);
      var stringCounter = 0;
      stringChild = ast.cur.children[nameCount].children[nameCount2].children[0].name;
      lengthOfEachString.push(stringChild.length+1);
      console.log("THIS IS STRINGCHILD "+ stringChild);
      for (var h = 0; h < stringChild.length; h++) {
        console.log("Still working");
        stringHeapVar.push(stringChild[stringCounter])
        stringCounter++;
        if (h == stringChild.length-1) {
          stringHeapVar.push("!");
          // Later check if we find the hex value of ! and replace / push with a 00
        }
      }
      // var heapLocation = 256 - stringHeapVar.length;
      // for loop through entire code gen before printing and replace these TBD with calulations
      // Need to count how many string we have
      // First iteration is 256 - total string length
      // Second iteration 256 - array[1] + array[2]
      // third iteration is 256 - array[2]
      console.log("Heap Location Calculation " + stringHeapVar.length);
      arrayForCodeGen.push("A0","TBD","A2","02","FF");

    }
    else if (arrayForVarDecl.length == 0) {
      console.log("arrayForVarDecl is empty");
      console.log(ast.cur.children[nameCount].children[0].name.length);
      arrayForCodeGen.push("A0","0"+ast.cur.children[nameCount].children[nameCount2].children[0].name,"A2","01","FF");
    }
  }
  else if(ast.cur.children[nameCount].children[nameCount2].name == "IfStatement") {
    alert("IfStatements under construction.");
  }
  else if(ast.cur.children[nameCount].children[nameCount2].name == "WhileStatement") {
    alert("WhileStatements under construction.");
  }
  else{
    console.log("epsilon");
  }
  // nameCount2++;
  console.log("name counts:");
  console.log(nameCount);
  console.log(nameCount2);

}
