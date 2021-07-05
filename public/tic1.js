

    socket.emit('first-join',{
        room_id: room_id,
        name: first_name
    })

    socket.on('response-from-event2',(res)=>{
        alert("player joined")
        second_name = res.name
        socket_id = res.second_socket_id
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
        playAgain = 0
        score1++
        document.getElementById("1box").innerHTML = score1
        console.log("you win")
        let turn = document.getElementById("turn")
        turn.innerHTML = "YOU WIN"
        let but = document.getElementById("but")
        but.style.display = "block"

    })
    socket.on('lose',(data)=>{
        playAgain = 0
        score2++
        document.getElementById("2box").innerHTML = score2
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

    socket.on('play-again',(data)=>{
        console.log("play-again")
        console.log("value of playAgain in 1 is " + playAgain)
        if(playAgain == 0)
            playAgain = 1;
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
    })