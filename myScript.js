
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  //console.log(document.body.scrollTop)
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
    } else {
      document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

s1 = document.getElementById("seq1").value;
s2 = document.getElementById("seq2").value;
p = parseInt(document.getElementById("pot").value);
n = parseInt(document.getElementById("nepot").value);
g = parseInt(document.getElementById("gap").value);
height = 0;
width = 0;
let matrix = [];
empty = [];


//          !!!DO NOT TOUCH!!!
//    SEVERLY UNSAVE WORKING ENVIORMENT
const calculate_all = () => {
  
  //$(".tbd").remove();
  
  function dl_dh() {
    var dh, dl, line_max, line_min, nn;
    line_min = Math.min(height, width);
    line_max = Math.max(height, width);
    dh = 0;
    dl = 0;
    nn = 0;
  
    for (var x = 0; x < line_min; x += 1) {
      if (s1[x - 1] === s2[x - 1]) {
        dh += 1;
      } else {
        nn += 1;
      }
    }
  
    dl = dh * p + nn * n + (line_max - line_min) * g;
    document.getElementById("dl").innerText = "DL= "+dl;
    document.getElementById("dh").innerText = "DH= "+dh;
    //console.log("\nDH = ", dh);
    //console.log("DL = ", dl);
  }
  
  function png_test(x, y) {
    x = x - 2;
    y = y - 2;
  
    if (s1[y] === s2[x]) {
      return p;
    } else {
      if (x === y) {
        return n;
      } else {
        return g;
      }
    }
  }

  function backtrack(x, y, ww1,ww2) {
    var a, b, c, highest, seq1, seq2, seq_max;
    seq_max = Math.max(width, height);
    seq1 = "";
    seq2 = "";
  
    while (seq_max > 0) {
      a = Number.parseInt(matrix[x - 1][y]);
      b = Number.parseInt(matrix[x][y - 1]);
      c = Number.parseInt(matrix[x - 1][y - 1]);
      highest = Math.max(a, b, c);
  
      if (highest === c) {
        seq1 = matrix[0][y - 1].toString() + seq1;
        seq2 = matrix[x - 1][0].toString() + seq2;
        x = x - 1;
        y = y - 1;
      } else {
        if (highest === a) {
          seq1 = "  " + seq1;
          seq2 = matrix[x - 1][0].toString() + seq2;
          x = x - 1;
        } else {
          if (highest === b) {
            seq1 = matrix[0][y - 1].toString() + seq1;
            seq2 = "  " + seq2;
            y = y - 1;
          }
        }
      }
  
      seq_max -= 1;
    }
    
    seq1 = seq1 + matrix[0][width+1].toString();
    seq2 = seq2 + matrix[height+1][0].toString();
    
    document.getElementById(ww1).innerText = seq1;
    document.getElementById(ww2).innerText = seq2;
  }

  if (s1 && s2) {
    width = s1.length;
    height = s2.length;
  }

  function Needleman_Wunsch() {
    var maxi;
  
    for (var x = 0; x<(height + 2); x += 1) {
      matrix.push([]);
  
      for (var y = 0; y<(width+ 2); y += 1) {
        matrix[x].push("");
      }
    }
  
    matrix[1][1] = 0;
    //matrix[1][2] = g;
    //matrix[2][1] = g;
  
    for (var x = 0; x<(height + 2); x += 1) {
      if (x > 1) {
        matrix[x][1] = matrix[x - 1][1] + g;
        matrix[x][0] = s2[x - 2];
      }
    }
  
    for (var y = 0; y<(width+ 2); y += 1) {
      if (y > 1) {
        matrix[1][y] = matrix[1][y - 1] + g;
        matrix[0][y] = s1[y - 2];
      }
    }
  
    for (var x = 0; x<(height + 2); x += 1) {
      for (var y = 0; y<(width + 2); y += 1) {
        if (x > 1 && y > 1) {
          maxi = 0;
  
          if (x === y) {
            matrix[x][y] = matrix[x - 1][y - 1] + png_test(x, y);
          } else {
            maxi = Math.max(matrix[x - 1][y], matrix[x][y - 1], matrix[x - 1][y - 1]);
            matrix[x][y] = maxi + png_test(x, y);
          }
        }
      }
    }
    }
  function Smith_Waterman() {
      var i, j;
    
      //      We create an empty matrix
      for (var x = 0; x < height + 2; x += 1) {
        matrix.push([]);
        for (var y = 0; y < width + 2; y += 1) {
          matrix[x].push("");
        }
      }
      //      Give it a few starter values...
      matrix[1][1] = 0;
      //matrix[1][2] = 0;
      //matrix[2][1] = 0;
    
      //      First column
      for (var x = 0; x < height + 2; x += 1) {
        if (x > 1) {
          matrix[x][1] = 0;
          matrix[x][0] = s2[x - 2];
        }
      }
      //      First row
      for (var y = 0; y < width + 2; y += 1) {
        if (y > 1) {
          matrix[1][y] = 0;
          matrix[0][y] = s1[y - 2];
        }
      }
    
      i = 1;
      j = 1;
      
      //      Main algorithm
      //========================================DO NOT TOUCH================================================
      for (var x = 0; x < height + 2; x += 1) {
        for (var y = 0; y < width + 2; y += 1) {
          if (x > 1 && y > 1) {
            maxi = 0;
    
            if (x === y) {
              matrix[x][y] = matrix[x - 1][y - 1] + png_test(x, y);
              //console.log("X=Y avem: ",matrix[x][y])
            } else {
              const arr = [matrix[x - 1][y], matrix[x][y - 1], matrix[x - 1][y - 1]];
              maxi = Math.max.apply(null, arr);
              matrix[x][y] = maxi + png_test(x, y);
              
            }
    
            if (matrix[x][y] < 0) {
              matrix[x][y] = 0;
            }
          }
        }
      }
    
      for (var x = 0; x < height + 2; x += 1) {
        for (var y = 0; y < width + 2; y += 1) {
          if (x > 1 && y > 1) {
            if (matrix[x][y] > matrix[i][j]) {
              i = x;
              j = y;
            }
          }
        }
      }
    
      
    }
  function Adrian_Beteringhe() {

      for (var x = 0; x<(height + 3); x += 1) {
        matrix.push([]);
        for (var y = 0; y<(width + 2); y += 1) {
          matrix[x].push("");
        }
      }
    
      matrix[1][1] = 0;
      matrix[1][2] = g;
      matrix[2][1] = g;
    
      for (var x = 0; x < height + 2; x += 1) {
        if (x > 1) {
          matrix[x][1] = matrix[x - 1][1] + g;
          matrix[x][0] = s2[x - 2];
        }
      }
    
      for (var y = 0; y < width + 2; y += 1) {
        if (y > 1) {
          matrix[1][y] = matrix[1][y - 1] + g;
          matrix[0][y] = s1[y - 2];
        }
      }
    
      let maxi = 0;
    
      for (var x = 0; x < height + 2; x += 1) {
        for (var y = 0; y < width + 2; y += 1) {
          if (x > 1 && y > 1) {
            if (x === y) {
              matrix[x][y] = matrix[x - 1][y - 1] + png_test(x, y);
            } else {
              const arr = [matrix[x - 1][y], matrix[x][y - 1], matrix[x - 1][y - 1]];
              maxi = Math.max.apply(null, arr);
              matrix[x][y] = maxi + png_test(x, y);
            }
    
            if (x < height + 2) {
              const arr = [matrix[x - 1][y], matrix[x][y - 1], matrix[x - 1][y - 1],-Number.parseInt(matrix[x + 1][y - 1])];
              maxi = Math.max.apply(null, arr);
            }
          }
        }
      }
    
      matrix[height + 2][0] = " ";
    
      for (var y = 0; y < width + 2; y += 1) {
        if (y > 0) {
          matrix[height + 2][y] = matrix[1][width + 2 - y];
        }
      }
    }
    matrix = [];
    new Needleman_Wunsch();
    dl_dh();
    show_matrix(matrix,"#need");
    //document.getElementById("#need").replaceChildren(matrix);
    //document.getElementById("#need").appendChild(matrix);
    backtrack(height+1,width+1,"ns1","ns2");
    //        We delete the previous matrix as to not interfiere with the next function:
    matrix = [];
    new Smith_Waterman();
    show_matrix(matrix,"#smith");
    backtrack(height+1,width+1,"ss1","ss2")
    //        We delete the previous matrix as to not interfiere with the next function:
    matrix = [];
    new Adrian_Beteringhe();
    show_matrix(matrix,"#bete");
    backtrack(height+1,width+1,"bs1","bs2")
    
};
         //   Afisare matrice
function show_matrix(what,where){
  for (var i in what){
    var row = `<tr class="tbd">`;
    for (var j in what[i]){
      //console.log(what[i][j])
    row += `<td>${what[i][j]}</td>`;
    }
    row += `</tr`;
    var table = $(where);
    table.append(row);
    }
};



//      _  _____                                                         _ 
//     | |/ ____|                                                       (_)
//     | | (___        ___      _   _ _ __        __ _ _   _ _ __   ___  _ 
// _   | |\___ \      / _ \    | | | | '_ \      / _` | | | | '_ \ / _ \| |
//| |__| |____) |    |  __/    | |_| | | | |    | (_| | |_| | | | | (_) | |
// \____/|_____/      \___|     \__,_|_| |_|     \__, |\__,_|_| |_|\___/|_|
//                                                __/ |                    
//                                               |___/                      