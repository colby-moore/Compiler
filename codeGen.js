var codeGenBegin = 0;
var counter = 0;
backpatchArray = [];

function storingTemp(){
  var temp;
  arrayOfThings = [5,2,3]
  temp = arrayOfThings[0]
  console.log("this is temp" + temp);
}


// function createGenarrayay(array){
//
// // This might need to be a linked list instead; add nodes as we go.. TBD
// var array =[
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ['00','00','00','00','00','00','00','00'],
//         ],arrayText='';
//         var count = 0;
// }

function traversal(){
  // For loop that finds first empty element of arrayay
  // Empty element being 0
  for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].length; j++) {



      }

  }

}

function backpatcherAssignment(){
  //temp var
  // if ast.cur.name = AssignmentStatement
  //    and ast.cur.children.name = some element of this array..[a,b,c]
  //      then look ahead for what cur is = to and set temp var to it.
  //        then we need to somehow find correct order of call and exchange
  //        00 in or code gen to 05 for example.
}

function codeGenRulesRoundOne(array){
  storingTemp();
  // Checks what grammer is in play, if int, else if string, ect.
  // If the current child == int and current element is 0, replace 0 with A9
  // Move counter up, replace 0 with 00, 0 with 8D, ect.
  // Else if child == sting | Bool
  // var array2 = []
  // array2 = array;
  if (ast.cur.name == "VarDecl") {
    console.log("FOUND CODE GEN FAMMMMM");
    if (ast.cur.children[0].name == "int") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[0][0] = "A9"
      array[0][1] = "00"
      array[0][2] = "8D"
      array[0][3] = "T0"
      array[0][4] = "XX"
    }
    else if (ast.cur.children[0].name == "string") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[0][0] = "A9"
      array[0][1] = "5D"
      array[0][2] = "8D"
      array[0][3] = "T0"
      array[0][4] = "XX"
    }
    else if (ast.cur.children[0].name == "boolean") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[0][0] = "A9"
      array[0][1] = "00"
      array[0][2] = "8D"
      array[0][3] = "11"
      array[0][4] = "XX"
    }
    console.log(array);
    console.log("this is the packpatch storage" + " " + backpatchArray);
  }
}

function codeGenRulesRoundTwo(array){
  // Checks what grammer is in play, if int, else if string, ect.
  // If the current child == int and current element is 0, replace 0 with A9
  // Move counter up, replace 0 with 00, 0 with 8D, ect.
  // Else if child == sting | Bool
  // var array2 = []
  // array2 = array;
  if (ast.cur.name == "VarDecl") {
    console.log("FOUND CODE GEN FAMMMMM");
    if (ast.cur.children[0].name == "int") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[0][5] = "A9"
      array[0][6] = "00"
      array[0][7] = "8D"
      array[0][8] = "T1"
      array[0][9] = "XX"
    }
    else if (ast.cur.children[0].name == "string") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[0][5] = "A9"
      array[0][6] = "5D"
      array[0][7] = "8D"
      array[0][8] = "T1"
      array[0][9] = "XX"
    }
    else if (ast.cur.children[0].name == "boolean") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[0][5] = "A9"
      array[0][6] = "00"
      array[0][7] = "8D"
      array[0][8] = "11"
      array[0][9] = "XX"
    }
    console.log("this is the packpatch storage" + " " + backpatchArray);
    // showTable(array);
  }
}

function codeGenRulesRoundThree(array){
  // Checks what grammer is in play, if int, else if string, ect.
  // If the current child == int and current element is 0, replace 0 with A9
  // Move counter up, replace 0 with 00, 0 with 8D, ect.
  // Else if child == sting | Bool
  // var array2 = []
  // array2 = array;
  if (ast.cur.name == "VarDecl") {
    console.log("FOUND CODE GEN FAMMMMM");
    if (ast.cur.children[0].name == "int") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[1][2] = "A9"
      array[1][3] = "00"
      array[1][4] = "8D"
      array[1][5] = "T1"
      array[1][6] = "XX"
    }
    else if (ast.cur.children[0].name == "string") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[1][2] = "A9"
      array[1][3] = "5D"
      array[1][4] = "8D"
      array[1][5] = "T1"
      array[1][6] = "XX"
    }
    else if (ast.cur.children[0].name == "boolean") {
      backpatchArray.push(foundTokensCopy[counter+1][0]);
      array[1][0] = "A9"
      array[1][1] = "00"
      array[1][2] = "8D"
      array[1][3] = "11"
      array[1][4] = "XX"
    }
  }
  else {
    console.log("nothing to be found");
  }
  console.log("this is the packpatch storage" + " " + backpatchArray);
  showTable(array);
}

// for (var i = 0; i < array.length; i++) {
//     for (var j = 0; j < array[i].length; j++) {
//       count++;
//       if (count == 8) {
//         document.getElementById('codeGeneration').value += array[i][j]+ "\n";
//         count = 0;
//       }
//       else{document.getElementById('codeGeneration').value += array[i][j]}
//
//
//     }
//
// }
// table();
function showTable(array){
  var count = 0;
  for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].length; j++) {
        count++;
        if (count == 8) {
          document.getElementById('codeGeneration').value += array[i][j]+ "\n";
          count = 0;
        }
        else{document.getElementById('codeGeneration').value += array[i][j]}


      }

  }
}


// function table(){
//   console.log(astTree.length);
//   console.log(ast.toString());
//   console.log(ast.length);
//   for (var i = 0; i < ast.length; i++) {
//     console.log(ast.cur.length);
//     if (ast.toString().cur == 'int') {
//       console.log("FOUND CODE GEN");
//       // array[[0]] == 'O';
//
//     }
//     else {
//       console.log('could not find');
//     }
//   }
//
// }
