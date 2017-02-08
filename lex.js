
function tokenizer(input){
    var current = 0;
    var token = [];

    while( current < input.length){
        var char = input[current];
    }

    {
      var T_LBracket = /[{]/;
      var T_RBracket = /[}]/;
      var T_LParen = /[(]/;
      var T_RParen = /[)]/;
      var T_Plus  = /[+]/;
      var T_Equals  = /[==]/;
      var T_Notequal = /[!=]/;
      var T_Assign = /[=]/;
      var T_Quote = /["]/;
      var T_True = /[true]/;
      var T_False = /[false]/;
      var T_Int = /[int]/;
      var T_String = /[string]/;
      var T_While = /[while]/;
      var T_If  = /[if]/;
      var T_Print = /[print]/;
      var T_Digit = /[0-9]/;
      var T_Char = /[a-z]/;
      var T_Eol = /[$]/;
      var {/*this is whitespace*/} =  /[whitespace]/;
    }
}

function LBracket (case 0){
    if input[current] = /{/
      return token(T_LBracket);
}

function RBracket (case 1){
    if input[current] = /}/
      return token(T_RBracket);
}
function LBracket (case 0){
    if input[current] = /{/
      return token(T_LBracket);
}
function LBracket (case 0){
    if input[current] = /{/
      return token(T_LBracket);
}


  console.log(5 + 6);
  console.log("hey its me");
