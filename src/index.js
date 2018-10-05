module.exports = function solveSudoku(matrix) {

  let answers = [];

  class cell {
    constructor (pos, rul, track) {
        this.position = pos;
        this.rule = rul;
        this.trackPosition = track;
    }
}
 
  function horizontalSearch(horizontalPosition, arr) {
    matrix[horizontalPosition].forEach(element =>  { 
      if (element > 0) arr.push(element)
     });
  }

  function verticalSearch(verticalPosition, arr) {
    for (let index = 0; index < 9; index++) {
      if(matrix[index][verticalPosition] > 0)
        arr.push(matrix[index][verticalPosition]);      
    }
  }

  function uniqueRule(matrix) {
    let obj = {};
    matrix.forEach(element =>  { 
      let str = element;
      obj[str] = true;
     });
     return Object.keys(obj);     
  }

  function creatingAllowedRule(arr) {
    let allowedRule = [];
    let chek = false;
    for (let i = 1; i < 10; i++) {
      for (let j = 0; j < arr.length; j++) {
        if(arr[j] == i)
        chek = true;
          }
          if(chek == false) {
            allowedRule.push(i);            
          }  
          chek = false;    
    } 
    return allowedRule;
   }

  function bypassOfMatix() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {         
        if (matrix[i][j] == 0) {   
          let cellPosition = [i,j];  
          answers.push(new cell(cellPosition,undefined,undefined));
        }      
      }    
    } 
}

function createRules(arrayOfPositions) {
  let arrayOfRules = [];
  horizontalSearch(arrayOfPositions[0], arrayOfRules);
  verticalSearch(arrayOfPositions[1], arrayOfRules);
  searchBySquare(arrayOfPositions, arrayOfRules);
  return creatingAllowedRule(uniqueRule(arrayOfRules));
}

function searchBySquare(arrayOfPositions, arrayOfRules) {
  let posX = Math.trunc(arrayOfPositions[0]/3)*3;
  let posY = Math.trunc(arrayOfPositions[1]/3)*3;

  for (let i = 0 + posX; i < 3 + posX; i++) {
    for (let j = 0 + posY; j < 3 + posY; j++) {      
      if (matrix[i][j] > 0) {
        arrayOfRules.push(matrix[i][j]);
      }     
    }    
  }
}


function getSolution(index, mistakeIndicator) {
  if (index < endIteration) {
    
    if(mistakeIndicator) {
      //если есть ошибка
      answers[index].trackPosition++;

      if (answers[index].trackPosition+1 > answers[index].rule.length) {        
        matrix[answers[index].position[0]][answers[index].position[1]] = 0;
        answers[index].rule.length = 0;
        index--;
        getSolution(index, true);
      }
      
      else {        
        matrix[answers[index].position[0]][answers[index].position[1]] = answers[index].rule[answers[index].trackPosition];
        index++;
        getSolution(index, false);
      }
    }
    
    else {
      //если нет ошибки
      
      let arrayOfRules = createRules(answers[index].position);
      
      if(arrayOfRules.length == 0) {
        index--;
        getSolution(index, true);
      }
      
      else {
        matrix[answers[index].position[0]][answers[index].position[1]] = arrayOfRules[0];
        trackNumber = 0;
        answers[index].trackPosition = trackNumber;
        answers[index].rule = arrayOfRules;
        index++;
        getSolution(index, false);
    }
  }

}
else
return matrix;
 
}


bypassOfMatix();

let endIteration = answers.length - 1;

getSolution(0, false);
  return matrix;

}
