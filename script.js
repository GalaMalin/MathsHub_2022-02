//Анкета

const skill1 = document.getElementById('answer1')
const skillText1 = prompt ("Ваше имя?", "Напишите")

skill1.innerText = skillText1


const skill2 = document.getElementById('answer2')
const skillText2 = confirm ("Вы изучаете JS?")

if (skillText2) {
    skill2.innerText = "JS"
}
else {
    skill2.innerText = "Еще не определился"
}


const skill3 = document.getElementById('answer3')
const skillText3 = prompt ("Нравится ли вам учить этот язык?", "Напишите")

skill3.innerText = skillText3


//GAME

//простое применение рандомной функции для чисел
// const randomValue1 = (Math.random () * 100).toFixed (0)
// const randomValue2 = (Math.random () * 100).toFixed (0)
// const isPlus = Math.random () > 0.5

// const gameEl = document.getElementById ("my_game").children

// if (isPlus) {
//     gameEl[2].innerText = `${randomValue1} + ${randomValue2}`
// }
// else {
//     gameEl[2].innerText = `${randomValue1} - ${randomValue2}`
// }




//Игра 1 Посчитай!
//Подготовительный этап:

//переменная для рандом чисел в диапазоне min - max
const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min ).toFixed(0)
    return randomNum
}

//Формирование матпримера число плюс число - все рандомно
const getTask = () => {

    //переменная для знака
    const symbol = (Math.random() > 0.5) ? "+" : "-"
    //сам пример 
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    //Формирование ответа
    gameState.rightAnswer = eval(task)
    return task
}

//Назначили переменные для массива элементов div с iD my_game
const gameEl = document.getElementById ("my_game").children
const title = gameEl[0]
const title1 = gameEl[1]
const userTask = gameEl[2]
const userAnswer = gameEl[3]
const btnGame = gameEl[4]

//Состояние игры: в процессе - ложно, прав.ответ - отсутствует)
const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}

//объявляем функцию, которая меняет Состояние процесса на противоположное
const toogleGame = () => gameState.taskInProcess = !gameState.taskInProcess 

//Объявляем функцию процесса игры
const startGame = () => {
    //если игра в процессе - истина, то
    if (!gameState.taskInProcess) {
        //меняется заголовок
        title.innerText = "Игра началась!"        
        //очищается поле ввода пользователя
        userAnswer.value = null
        //генерируется задача и показывается пользователю
        userTask.innerText = getTask()
        //становится видимым ранее скрытое окно для ввода ответа
        userAnswer.hidden = false
        //меняется надпись на кнопке
        btnGame.innerHTML = "Проверь!"
        //фокус на окне ввода (инпут)
        userAnswer.focus()
        //меняется процесс Состояние игры - она в процессе
        toogleGame()        
    } else {
        //сравнивается ответ пользователя с правильным (в поле инпут - значениe ввода числа, поэтому value. В текстовых полях используется inner)
        const isRight = gameState.rightAnswer == userAnswer.value
        //выводится результат, добавлением к строке с примером "= ответ"
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        //выводится текст поздравления (если ==, то выводится значение после "?", если не==, то выводится значение после ":")
        title.innerHTML = (isRight) ? '<p style="color: red;">Вы победили!</p>' : "Вы проиграли!"
        //убирается надпись Посчитай
        title1.hidden = true
        //меняется надпись на кнопке
        btnGame.innerHTML = "Начать заново!"        
        //меняется процесс Состояние игры - не активна
        toogleGame()     
    }
}

//Процесс игры:
//Вешаем обработчик событий на элемент кнопку: по ее нажатию запускается функция процесса игры:
btnGame.addEventListener("click", startGame)
//Вешаем обработчик событий на элемент инпут (окно ввода): нажатие кнопки запускает функцию события (e)
userAnswer.addEventListener("keydown", (e) => {
    //если нажат Enter, то запускается функция процесса игры
    if (e.key === "Enter") {
        startGame()
    //не ентер, но если нажат ескейп, то снять фокус с инпута
    } else if (e.key === "Escape") {
        userAnswer.blur()
    }
})



//Игра 2 Выбери

//Подготовительный процесс:
//Объявляем элементы div
const chooseEl = document.querySelectorAll(".choosed_block-container > div")

//Объявляем счетчик
const counterEl = document.querySelector(".choosed_block span")

//Инкапсуляция - скрываем значения, не обращаемся к ним напрямую

//определяем Состояние счетчика через функцию (формируем Состояние)
const counterState = {
    //элемент изначально равен 0    
    countEl: 0,
    //как элемент изменяется 
    setCountValue(value) {
        //увеличить на value (this - обращение функции к самой себе)
        this.countEl += value  
        //вставить значение в span
        counterEl.innerText = this.countEl
    }
}

    //Промежуточные образцы:
    //образец увеличения счетчика: +(плюсом превращаем в число текст счетчика) + 1 (прибавляем единицу)
        //counterEl.innerText = +counterEl.innerText + 1
    //образец уменьшения счетчик: если минус, то текст счетчика сам становится числом
        //counterEl.innerText = counterEl.innerText - 1

    //образец функции, которая меняет Состояние счетчика, т.е. будет принимать в себя какое-то значение value 
    //const changeCount = (value) => {
        //и на это значение value увеличивать элемент счетчика. Пишем += т.к. 0 уже число и value тоже число и можно просто прибавлять и присваивать значение
        //counterState.countEl += value
        //после того, как увеличен элемент счетчика, его нужно вставить в span
        //counterEl.innerText = counterState.countEl
    //}

//определяем функцию по изменению элемента - стрелочную функцию (e) - event (возвращает свойства элемента), нас интересует свойство элемента target
const eventFunc = (e) => {
    //если элемент не имеет никакого класса
    if (e.target.className === "") {              
        //то придаем элементу класс choosed_el
        e.target.className = "choosed_el"
        //и вызываем функцию по изменению Состояния счетчика - value, увеличение на 1
        counterState.setCountValue(1)
    
    //в ином случае
    } else {
        //лишаем элемент класса
        e.target.className = ""
        //и вызываем функцию по изменению Состояния счетчика - value, уменьшение на 1
        counterState.setCountValue(-1)
    }
}

//Процесс игры:
//используем цикл for, так как надо задать одинаковые события нескольким элементам
//задаем перечень переменных i в пределах количества наших элементов
for (let i = 0; i < chooseEl.length; i++) {
    //вешаем на каждый div элемента i обработчик событий - функция addEventListener
    //при действии "клик" запустить функцию по изменению элемента
    chooseEl[i].addEventListener("click", eventFunc)      
}
//можно исключить конкретный элемент (не i) из отмечаемых по клику
//chooseEl[1].removeEventListener("click", eventFunc)


const TimeOutE = () => {alert("Время вышло!")} 
//функция выполнения действия, через какое-то время в миллисекундах (2000 = 2 сек)
//setTimeout (TimeOutE, 2000)

//функция цикличного действия, каждые ... сек. Требует остановки
//setInterval (TimeOutE, 3000)

