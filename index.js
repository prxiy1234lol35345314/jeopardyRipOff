var addUser = document.getElementById('addUser')
var userInput = document.getElementById('userInput')
var playerDisplay = document.getElementById('playerDisplay')
var startGameBtn = document.getElementById('startGame')
var questionsTable = document.getElementById('questions')
var activeUser = document.getElementById('activeUser')

var players = new Map([]);
var playerCount = 0
var playerCountMap = new Map([]);
var oldHeight = 0
var activeUserNum = 0

function limitText(limitField, limitNum) {
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    } 
}
userInput.addEventListener('input', function(){
    limitText(userInput, 40)
})

function addNewUser(playerName){
    playerDisplay.style.transition='1s'
    playerDisplay.style.opacity='100'
    playerDisplay.style.width='500px'
    if(players.has(playerName)||playerName==''){
        console.log('player name invalid or used')
        userInput.value=''
        userInput.placeholder='Invalid Name'
    }else{
        console.log('player added')
        
        players.set(playerName, 0);
        //add to leaderboard
        playerDisplay.style.height = oldHeight+36+'px'
        oldHeight = oldHeight+36

        var newPlayerDisplay = document.createElement('p')
        newPlayerDisplay.innerHTML=userInput.value+"            :            "+players.get(playerName)
        userInput.value=''
        
        playerCount++;
        playerCountMap.set(playerCount, playerName);
        setTimeout(() => {
            playerDisplay.appendChild(newPlayerDisplay)
        
        }, 1100);
        
    }
}

function checkLeaderboard(){
    playerDisplay.innerHTML=''
    players.forEach (function(value, key) {
        playerDisplay.innerHTML += "<p/>"+key + ' : ' + value + '<br/>';
      })
}

function question(q, a, t, award, item){
    if(item.disabled==true)return;
    if(document.body.innerHTML.includes('id="questionBox"'))return;
    var questionBox = document.createElement('div')
    questionBox.classList.add('questionBox')
    document.body.appendChild(questionBox)
    questionBox.id='questionBox'

    var que = document.createElement('h3')
    que.style.fontSize='30px'
    que.innerHTML="<span style='font-size:15px'>"+document.getElementById('activeUser').innerHTML+" : "+t+" : "+award+"</span><p/>"+q
    questionBox.appendChild(que)

    var answer = document.createElement('h5')
    answer.classList.add('answer')
    answer.innerHTML=a
    questionBox.appendChild(answer)

    var answerBlur = document.createElement('div')
    answerBlur.classList.add('answerBlur')
    questionBox.appendChild(answerBlur)

    var reveal = document.createElement('button')
    reveal.classList.add('revealAnswer')
    questionBox.appendChild(reveal)
    reveal.innerHTML='Reveal Answer'
    reveal.onclick=function(){
        answerBlur.style.marginTop='0px'
        answerBlur.style.opacity='0'
        reveal.style.opacity='0'
        reveal.style.display='none'
        setTimeout(() => {
            answerBlur.remove()
        }, 1000);
        var correct = document.createElement('button')
        correct.style.fontSize='50px'
        correct.innerHTML="Correct"
        correct.classList.add('grading')
        correct.style.backgroundColor='rgb(93, 189, 211)'
        correct.style.marginRight='10px'
        questionBox.appendChild(correct)
        correct.onclick=function(){
            var awardPoints = players.get(document.getElementById('activeUser').innerHTML)+award
            players.set(document.getElementById('activeUser').innerHTML, awardPoints)
            correct.style.fontSize='20px'
            checkLeaderboard()
            correct.innerHTML='Points awarded'
            correct.disabled=true;
            incorrect.remove()
            item.disabled=true;
            item.style.backgroundColor='grey'
            setTimeout(() => {
                questionBox.remove()
                activeUserNum++
                if(playerCountMap.get(activeUserNum)==undefined){
                    activeUserNum=1;
                }
                activeUser.innerHTML=playerCountMap.get(activeUserNum)
            }, 1000);
        }

        var incorrect = document.createElement('button')
        incorrect.style.fontSize='50px'
        incorrect.innerHTML="Incorrect"
        incorrect.classList.add('grading')
        incorrect.style.backgroundColor='red'
        questionBox.appendChild(incorrect)
        incorrect.onclick=function(){
            incorrect.style.fontSize='20px'
            checkLeaderboard()
            incorrect.innerHTML='No points awarded'
            incorrect.disabled=true;
            correct.remove()
            item.disabled=true;
            item.style.backgroundColor='grey'
            setTimeout(() => {
                questionBox.remove()
                activeUserNum++
                if(playerCountMap.get(activeUserNum)==undefined){
                    activeUserNum=1;
                }
                activeUser.innerHTML=playerCountMap.get(activeUserNum)
            }, 1000);
        }

    }
}

function startNewGame(){
    if(playerDisplay.innerHTML!=""){
    playerDisplay.style.display='none'
    document.getElementById('leaderboardBtn').style.display='block'
    questionsTable.style.display='block'
    userInput.style.display='none'
    addUser.style.display='none'
    winner.style.display='block'
    document.getElementById('startGame').style.display='none'

    activeUserNum++
    if(playerCountMap.get(activeUserNum)==undefined){
        activeUserNum=1;
    }
    activeUser.innerHTML=playerCountMap.get(activeUserNum)




}}



var winner=document.createElement('button')
winner.innerHTML='Choose winners'
document.body.appendChild(winner)
winner.style.marginTop='20px'
winner.style.display='none'

winner.onclick=function(){
    var currentWinner=''
    var currentWinnerNum=0

    players.forEach (function(value, key) {
        console.log('key '+key)
        console.log('value '+value)

        if(currentWinnerNum<value){
            currentWinner=key
            currentWinnerNum=value
        }
        
      })
      alert('The winner is: '+currentWinner+'! \n'+currentWinner+' won with '+currentWinnerNum+' points!')

}




