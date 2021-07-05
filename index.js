const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const socket = require('socket.io')
const { v1: uuidv1 } = require('uuid')
const fs = require('fs')
const { json } = require('body-parser')
const app = express()


const server = app.listen(process.env.PORT || 3000,()=>{
    console.log("listening to localhost:3000")
})

const io = socket(server)

io.on('connection',(socket)=>{
    console.log("user connected  "+ socket.id)

    // event 1 waiting for first player to join and then creating a new game for him
    socket.on('first-join',(room)=>{
        console.log(room)
        console.log(socket.id)
        fs.readFile('documents/games.json',(err,data)=>{
            if(err)
                console.log(err)
            else
            {
                const games = JSON.parse(data)
                games.push({
                    room_id: room.room_id,
                    users: [
                        {
                            socket_id: socket.id,
                            name: room.name
                        }
                    ]
                })
                fs.writeFile('documents/games.json',JSON.stringify(games),(err)=>{
                    if(err)
                        console.log("error in writing")
                    else
                        console.log("successfully written")
                })
            }
        })
    })
    //end of event 1


    //event 2 - Waitnig for second player to join

    socket.on('second-join',(room)=>{
        console.log("inside event 2 ")
        console.log(room)
        fs.readFile('documents/games.json',(err,data)=>{
            if(err)
                console.log("error in reading event 2 file")
            else
            {
                const games = JSON.parse(data)
                games.forEach(element => {
                    if(element.room_id == room.room_id)
                    {
                        element.users.push({
                            socket_id: socket.id,
                            name: room.second_name
                        })
                    }
                });
                fs.writeFile('documents/games.json',JSON.stringify(games),(err)=>{
                    if(err)
                        console.log("error in event 2 writing")
                    else{
                        console.log("sending msg to the host")
                        socket.broadcast.to(room.first_socket_id).emit('response-from-event2',{
                            second_socket_id: socket.id,
                            name: room.second_name
                        })
        
                    }
                })
            }
        })
    })

    socket.on('inside-game',(room)=>{
        var arr = room.arr
        var flag = 0
        if(arr[0][0] == arr[0][1] && arr[0][1]!="" && arr[0][1] == arr[0][2])
        {
            flag = 1;
        }
        else if(arr[1][0] == arr[1][1] && arr[1][1]!="" && arr[1][1] == arr[1][2])
        {
            flag = 1;
        }
        else if(arr[2][0] == arr[2][1] && arr[2][1]!="" && arr[2][1] == arr[2][2])
        {
            flag = 1;
        }
        else if(arr[0][0] == arr[1][0] && arr[1][0]!="" && arr[1][0] == arr[2][0])
        {
            flag = 1;
        }
        else if(arr[0][1] == arr[1][1] && arr[1][1]!="" && arr[1][1] == arr[2][1])
        {
            flag = 1;
        }
        else if(arr[0][2] == arr[1][2] && arr[1][2]!="" && arr[1][2] == arr[2][2])
        {
            flag = 1;
        }
        else if(arr[0][0] == arr[1][1] && arr[1][1]!="" && arr[1][1] == arr[2][2])
        {
            flag = 1;
        }
        else if(arr[0][2] == arr[1][1] && arr[1][1]!="" && arr[1][1] == arr[2][0])
        {
            flag = 1;
        }
        if(flag == 1)
        {
            io.to(socket.id).emit('win',{
                str: "you won"
            })
            io.to(room.socket_id).emit('lose',{
                arr: arr
            })
            
        }
        else
        {
            console.log("playing game")
            socket.broadcast.to(room.socket_id).emit('inside-game',{
                arr: arr
            })
        }

    })

    socket.on('play-again',(room)=>{
        io.to(room.socket_id).emit('play-again',{
            str: "play-again"
        })
    })
    

    socket.on('disconnect',()=>{
        console.log("user disconnected")
    })
    
})

app.set('view engine','ejs')

app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json())

app.get('/',function(req,res){
    res.render('mainpage.ejs')
})

app.get('/tictactoe',function(req,res){
    res.render('home.ejs')
})
app.get('/sudoku',function(req,res){
    res.render('sudoku.ejs')
})

app.post('/newgame',(req,res)=>{
    res.render('tic.ejs',{
        room_id: uuidv1(),
        name: req.body.name
    })
})

app.post('/joingame',(req,res)=>{
    const room_id = req.body.room
    const second_name = req.body.name;
    fs.readFile('documents/games.json',(err,data)=>{
        if(err)
            res.status(500).end()
        else
        {
            const games = JSON.parse(data)
            var flag = 0
            var first_name = ''
            var first_socket_id = ''
            games.forEach(element => {
                if(element.room_id == room_id)
                {
                    flag = 1;
                    first_name = element.users[0].name
                    first_socket_id = element.users[0].socket_id
                }
            });
            if(flag == 1)
            {
                res.render('tic2.ejs',{
                    first_name: first_name,
                    first_socket_id: first_socket_id,
                    second_name: second_name,
                    room_id: room_id
                })
            }
            else
            {
                res.render('home.ejs')
            }
        }
        
    })
})