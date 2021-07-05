
var buts = document.getElementById("but")
buts.addEventListener('click',()=>{
    var turns = document.getElementById("turn")
    turns.innerHTML = first_name + " turn"
    let but = document.getElementById("but")
    but.style.display = "none"
    socket.emit('play-again',{
        socket_id: socket_id
      })
})



socket.emit('second-join',{
    room_id: room_id,
    second_name: second_name,
    first_socket_id: socket_id
})

socket.on('inside-game',(data)=>{
    console.log("playing game")
    var arr = data.arr
    let turn = document.getElementById("turn")
    turn.innerHTML = "yours turn"
    var board = document.getElementsByClassName("values")
    var k =0
    for(i=0;i<3;i++)
    {
        for(j=0;j<3;j++)
            board[k++].innerHTML = arr[i][j]
    }
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
})

socket.on('win',(data)=>{
    score2++
    document.getElementById("2box").innerHTML = score2
    console.log("you win")
    let turn = document.getElementById("turn")
    turn.innerHTML = "YOU WIN"
    let but = document.getElementById("but")
    but.style.display = "block"
})
socket.on('lose',(data)=>{
    playAgain = 0
    score1++
    document.getElementById("1box").innerHTML = score1
    console.log("you lose")
    var arr = data.arr
    var board = document.getElementsByClassName("values")
    var k =0
    for(i=0;i<3;i++)
    {
        for(j=0;j<3;j++)
            board[k++].innerHTML = arr[i][j]
    }
    let turn = document.getElementById("turn")
    turn.innerHTML = "YOU LOSE"
    let but = document.getElementById("but")
    but.style.display = "block"
})