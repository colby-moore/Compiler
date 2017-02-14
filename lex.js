
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
  var T_Newline = /[\n]/;
  var T_Eol = /[$]/;

var newToken = class {
    constructor(desc, type, line_number){
      this.desc = desc;
      this.type = type;
      this.line_number = line_number;
    }
}

function lexer() {
    var input_text = document.getElementById('input').value;
    var forward = 0;

    for (lexerBegin = 0; lexerBegin<input_text.length; lexerBegin++) {
        var c = input_text[lexerBegin];
    }

}






  console.log(LBracket);
  console.log(5 + 6);
  console.log("hey its me");
