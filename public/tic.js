
const butClick = ()=>{
  var board = document.getElementsByClassName("values")
  var k =0
  for(i=0;i<3;i++)
  {
      for(j=0;j<3;j++)
          board[k++].innerHTML = ""
  }
  console.log("value of playAgain in 1 is " + playAgain)
  if(playAgain == 0)
  {
    playAgain = 1;
    let turn = document.getElementById("turn")
    turn.innerHTML = "waiting to join"
  }
  else
  {
    let turn = document.getElementById("turn")
    turn.innerHTML = "yours turn"
    document.getElementById("main-score-board").style.display = "block"
    console.log(second_name + "  joined " + " socket id = " + socket_id)
    let on = document.getElementById("1") 
    let tw = document.getElementById("2")
    let th = document.getElementById("3")
    let fo = document.getElementById("4")
    let fi = document.getElementById("5")
    let si = document.getElementById("6")
    let se = document.getElementById("7")
    let ei = document.getElementById("8")
    let ni = document.getElementById("9")
    on.addEventListener('click',fun)
    tw.addEventListener('click',fun)
    th.addEventListener('click',fun)
    fo.addEventListener('click',fun)
    fi.addEventListener('click',fun)
    si.addEventListener('click',fun)
    se.addEventListener('click',fun)
    ei.addEventListener('click',fun)
    ni.addEventListener('click',fun)
  }
  let but = document.getElementById("but")
  but.style.display = "none"
}


let but = document.getElementById("but")
but.addEventListener('click',butClick)


function fun(e)
{
    let id = e.target.id
    var flag = 0;
    var days = document.getElementById(id).children;
    if(value === 1 && days[0].innerHTML == "" )
    {
      days[0].innerHTML = "O";
      flag = 1;
    }
    else if(value === 0 && days[0].innerHTML == "")
    {
      days[0].innerHTML = "X";
      flag = 1;
    }

    if(flag == 1)
    { 
      let on = document.getElementById("1") 
      let tw = document.getElementById("2")
      let th = document.getElementById("3")
      let fo = document.getElementById("4")
      let fi = document.getElementById("5")
      let si = document.getElementById("6")
      let se = document.getElementById("7")
      let ei = document.getElementById("8")
      let ni = document.getElementById("9")
      on.removeEventListener('click',fun)
      tw.removeEventListener('click',fun)
      th.removeEventListener('click',fun)
      fo.removeEventListener('click',fun)
      fi.removeEventListener('click',fun)
      si.removeEventListener('click',fun)
      se.removeEventListener('click',fun)
      ei.removeEventListener('click',fun)
      ni.removeEventListener('click',fun)
      let turn = document.getElementById("turn")
      turn.innerHTML = second_name + " turn"
      var values = document.getElementsByClassName("values")
      let arr = []
      let first = []
      let second = []
      let third = []
      first.push(values[0].innerHTML)
      first.push(values[1].innerHTML)
      first.push(values[2].innerHTML)
      second.push(values[3].innerHTML)
      second.push(values[4].innerHTML)
      second.push(values[5].innerHTML)
      third.push(values[6].innerHTML)
      third.push(values[7].innerHTML)
      third.push(values[8].innerHTML)
      arr.push(first)
      arr.push(second)
      arr.push(third)
      console.log(arr)
      socket.emit('inside-game',{
        socket_id: socket_id,
        arr: arr,
        id: id
      })
    }
}