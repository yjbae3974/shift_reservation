function prevPg(){
    currentPg = document.getElementById("currentPg").innerHTML*1
    if(currentPg - 1 <= 0){ 
    currentPg = document.getElementById("maxPg").innerHTML*1
    }
    else{
    currentPg = currentPg-1
    }
    document.getElementById("currentPg").innerHTML = currentPg
}
function nextPg(){
    currentPg = document.getElementById("currentPg").innerHTML*1
    if(currentPg + 1 > document.getElementById("maxPg").innerHTML*1){ 
    currentPg = 1
    }
    else{
    currentPg = currentPg+1
    }
    document.getElementById("currentPg").innerHTML = currentPg
}