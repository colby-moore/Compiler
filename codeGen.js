function runCodeGen(){

var arr =[
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ['00','00','00','00','00','00','00','00'],
        ],arrText='';
        var count = 0;

        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
              count++;
              if (count == 8) {
                document.getElementById('codeGeneration').value += arr[i][j]+ "\n";
                count = 0;
              }
              else{document.getElementById('codeGeneration').value += arr[i][j]}


            }

        }
        table();
        // for (var i = 0; i < arr.length; i++) {
        //     for (var j = 0; j < arr[i].length; j++) {
        //       count++;
        //       if (count == 8) {
        //         document.getElementById('codeGeneration').value += arr[i][j]+ "\n";
        //         count = 0;
        //       }
        //       else{document.getElementById('codeGeneration').value += arr[i][j]}
        //
        //
        //     }
        //
        // }
}

function table(){
  console.log(ast.toString());
  for (var i = 0; i < ast.toString().length; i++) {
    if (ast == '[int]') {
      arr[[0]] == 'O';

    }
    else {
      console.log('could not find');
    }
  }

}
