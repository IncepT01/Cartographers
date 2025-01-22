startGameButton = document.querySelector("#startGameButton");
gameBoard = document.querySelector("#gameBoard")
title = document.querySelector("#title")
mainGameDiv = document.querySelector("#mainGameDiv")
nextPiece = document.querySelector("#nextPiece")
rotateButton = document.querySelector("#rotateButton")
mirrorButton = document.querySelector("#mirrorButton")
noSpaceButton = document.querySelector("#noSpaceButton")
springPointsText = document.querySelector("#springPointsText")
summerPointsText = document.querySelector("#summerPointsText")
fallPointsText = document.querySelector("#fallPointsText")
winterPointsText = document.querySelector("#winterPointsText")
mission1Text = document.querySelector("#mission1")
mission2Text = document.querySelector("#mission2")
mission3Text = document.querySelector("#mission3")
mission4Text = document.querySelector("#mission4")
mission1Title = document.querySelector("#mission1Title")
mission2Title = document.querySelector("#mission2Title")
mission3Title = document.querySelector("#mission3Title")
mission4Title = document.querySelector("#mission4Title")
mission1Point = document.querySelector("#mission1Point")
mission2Point = document.querySelector("#mission2Point")
mission3Point = document.querySelector("#mission3Point")
mission4Point = document.querySelector("#mission4Point")
mission1TD = document.querySelector("#mission1TD")
mission2TD = document.querySelector("#mission2TD")
mission3TD = document.querySelector("#mission3TD")
mission4TD = document.querySelector("#mission4TD")
timeToPlaceText = document.querySelector("#timeToPlaceText")
timeToLeftText = document.querySelector("#timeLeftText")
pointsText = document.querySelector("#pointsText")
currentSeasonText = document.querySelector("#currentSeasonText")

//Hullám, Erdő, Falu, Hegy, Farm
let images = ["./images/hullam.png", "./images/erdo.png", "./images/falu.png", "./images/hegy.png", "./images/farm.png"]
let seasons = ["Tavasz", "Nyár", "Ősz", "Tél"]
let image = ""
let currentMissions = []
let color
let currentPiece
let timeToPlace
let timeLeft = 28
let points = 0
let lastSeason = seasons[0]
let currentSeason = seasons[0]
let originalPoints = 0
let seasonStartPoint = 0
let mission1PointVal = 0
let mission2PointVal = 0
let mission3PointVal = 0
let mission4PointVal = 0
let isGameOver = false
let mountains = [{ x: 1, y: 1 }, { x: 3, y: 8 }, { x: 5, y: 3 }, { x: 8, y: 9 }, { x: 9, y: 5 }]
let boardInitialised = false
let shuffledElements

const waterColor = "rgb(" + 128 + ", " + 204 + ", " + 225 + ")"
const townColor = "rgb(" + 225 + ", " + 26 + ", " + 26 + ")"
const forestColor = "rgb(" + 71 + ", " + 209 + ", " + 71 + ")"
const farmColor = "rgb(" + 255 + ", " + 223 + ", " + 28 + ")"
const mountainColor = "rgb(" + 236 + ", " + 198 + ", " + 198 + ")"
const defaultBackground = "rgb(" + 255 + ", " + 224 + ", " + 179 + ")"


function handleStartButtonPressed() {

    isGameOver = false

    let row
    let col
    let numbers = []

    shuffledElements = [...elements]
    image = ""
    currentMissions = []
    color
    currentPiece
    timeToPlace
    timeLeft = 28
    points = 0
    lastSeason = seasons[0]
    currentSeason = seasons[0]
    originalPoints = 0
    seasonStartPoints = 0
    mission1PointVal = 0
    mission2PointVal = 0
    mission3PointVal = 0
    mission4PointVal = 0

    springPointsText.innerHTML = "0 pont"
    summerPointsText.innerHTML = "0 pont"
    fallPointsText.innerHTML = "0 pont"
    winterPointsText.innerHTML = "0 pont"
    mission1Point.innerHTML = "Pont: " + mission1PointVal
    mission2Point.innerHTML = "Pont: " + mission2PointVal
    mission3Point.innerHTML = "Pont: " + mission3PointVal
    mission4Point.innerHTML = "Pont: " + mission4PointVal
    currentSeasonText.innerHTML = "Jelenlegi évszak: " + currentSeason

    timeLeftText.innerHTML = "Évszakból hátralévő idő: " + 7 + "/7"

    mission1TD.style.backgroundColor = "lightgreen"
    mission2TD.style.backgroundColor = "lightgreen"
    mission3TD.style.backgroundColor = "rgb(" + 192 + "," + 192 + "," + 192 + ")"
    mission4TD.style.backgroundColor = "rgb(" + 192 + "," + 192 + "," + 192 + ")"

    pointsText.innerHTML = "Összesen: " + points + " pont"


    while (numbers.length < 4) {
        let rnd = getRndInteger(0, missions.basic.length + missions.extra.length)
        if (!numbers.includes(rnd)) {

            if (rnd >= 0 && rnd <= 3) {
                currentMissions[numbers.length] = missions.basic.at(rnd)
            }
            else {
                currentMissions[numbers.length] = missions.extra.at(rnd - missions.basic.length)
            }

            switch (numbers.length) {
                case 0:
                    mission1Title.innerHTML = currentMissions[numbers.length].title + ":"
                    mission1Text.innerHTML = currentMissions[numbers.length].description
                    break;
                case 1:
                    mission2Title.innerHTML = currentMissions[numbers.length].title + ":"
                    mission2Text.innerHTML = currentMissions[numbers.length].description
                    break;
                case 2:
                    mission3Title.innerHTML = currentMissions[numbers.length].title + ":"
                    mission3Text.innerHTML = currentMissions[numbers.length].description
                    break;
                case 3:
                    mission4Title.innerHTML = currentMissions[numbers.length].title + ":"
                    mission4Text.innerHTML = currentMissions[numbers.length].description
                    break;
            }

            numbers.push(rnd)
        }
    }


    if (!boardInitialised) {
        for (let i = 0; i < 11; i++) {
            let tr = document.createElement("tr")
            for (let j = 0; j < 11; j++) {
                let td = document.createElement("td")
                if (i < 10) {
                    row = "" + 0 + i
                }
                else {
                    row = "" + i
                }
                if (j < 10) {
                    col = "" + 0 + j
                }
                else {
                    col = "" + j
                }
                td.id = "t" + row + col
                let img = document.createElement("img")
                img.id = "p" + row + col
                td.style.backgroundColor = defaultBackground
                td.appendChild(img)
                tr.appendChild(td)
            }
            gameBoard.appendChild(tr)
        }

        boardInitialised = true
    } else {
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor = defaultBackground
                document.querySelector("#p" + CoordsToID(i, j)).src = ""
            }
        }
    }

    startGameButton.style.display = "none"
    title.style.display = "block"
    mainGameDiv.style.display = "block"

    for (let i = 0; i < mountains.length; i++) {
        obj = document.querySelector("#t" + CoordsToID(mountains[i].x, mountains[i].y))
        obj.style.backgroundColor = mountainColor
        obj = document.querySelector("#p" + CoordsToID(mountains[i].x, mountains[i].y))
        obj.src = images[3]
    }

    mission1TD.style.backgroundColor = "lightgreen"
    mission2TD.style.backgroundColor = "lightgreen"

    generateNextPiece()
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function IDtoCoords(obj) {
    return {
        x: obj.id.substring(1, 3),
        y: obj.id.substring(3)
    }
}

function CoordsToID(x, y) {
    if (x < 10) {
        x = "" + 0 + x
    }
    if (y < 10) {
        y = "" + 0 + y
    }
    return "" + x + y
}

function rotate() {
    let newShape = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    if (currentPiece.shape[0][0] == 1) {
        newShape[0][2] = 1
    }
    if (currentPiece.shape[0][1] == 1) {
        newShape[1][2] = 1
    }
    if (currentPiece.shape[0][2] == 1) {
        newShape[2][2] = 1
    }
    if (currentPiece.shape[1][0] == 1) {
        newShape[0][1] = 1
    }
    if (currentPiece.shape[1][1] == 1) {
        newShape[1][1] = 1
    }
    if (currentPiece.shape[1][2] == 1) {
        newShape[2][1] = 1
    }
    if (currentPiece.shape[2][0] == 1) {
        newShape[0][0] = 1
    }
    if (currentPiece.shape[2][1] == 1) {
        newShape[1][0] = 1
    }
    if (currentPiece.shape[2][2] == 1) {
        newShape[2][0] = 1
    }

    currentPiece.shape = newShape
    drawNextPiece()
}

function mirror() {
    let newShape = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    if (currentPiece.shape[0][0] == 1) {
        newShape[0][2] = 1
    }
    if (currentPiece.shape[0][1] == 1) {
        newShape[0][1] = 1
    }
    if (currentPiece.shape[0][2] == 1) {
        newShape[0][0] = 1
    }
    if (currentPiece.shape[1][0] == 1) {
        newShape[1][2] = 1
    }
    if (currentPiece.shape[1][1] == 1) {
        newShape[1][1] = 1
    }
    if (currentPiece.shape[1][2] == 1) {
        newShape[1][0] = 1
    }
    if (currentPiece.shape[2][0] == 1) {
        newShape[2][2] = 1
    }
    if (currentPiece.shape[2][1] == 1) {
        newShape[2][1] = 1
    }
    if (currentPiece.shape[2][2] == 1) {
        newShape[2][0] = 1
    }

    currentPiece.shape = newShape
    drawNextPiece()
}

function moveUp() {
    if (currentPiece.shape[0][0] == 0 && currentPiece.shape[0][1] == 0 && currentPiece.shape[0][2] == 0) {
        currentPiece.shape.shift()
        currentPiece.shape.push([0, 0, 0])
    }
}

function moveLeft() {
    let newShape = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    if (currentPiece.shape[0][0] == 0 && currentPiece.shape[1][0] == 0 && currentPiece.shape[2][0] == 0) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (currentPiece.shape[i][j] == 1) {
                    newShape[i][j - 1] = 1
                }
            }
        }
        currentPiece.shape = newShape
    }
}

function drawNextPiece() {

    while (nextPiece.firstChild) {
        nextPiece.removeChild(nextPiece.firstChild)
    }

    switch (currentPiece.type) {
        case "water":
            color = waterColor
            image = images[0]
            break;

        case "town":
            color = townColor
            image = images[2]
            break;

        case "forest":
            color = forestColor
            image = images[1]
            break;

        case "farm":
            color = farmColor
            image = images[4]
            break;

        default:
            color = defaultBackground
            break;
    }

    moveUp()
    moveUp()
    moveLeft()
    moveLeft()

    for (let i = 0; i < 3; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < 3; j++) {
            let td = document.createElement("td")
            let img = document.createElement("img")

            if (currentPiece.shape[i][j] == 1) {
                td.style.backgroundColor = color
                img.src = image
            }
            else {
                td.style.backgroundColor = defaultBackground
            }

            td.style.width = "60px"
            td.style.height = "60px"
            td.appendChild(img)
            tr.appendChild(td)
        }
        nextPiece.appendChild(tr)
    }

}


function generateNextPiece() {

    if (isGameOver) {
        return
    }

    let index = getRndInteger(0, shuffledElements.length)
    currentPiece = shuffledElements[index]
    shuffledElements.splice(index,1)
    timeToPlace = currentPiece.time
    timeToPlaceText.innerHTML = "Lehelyezéshez szükséges idő: " + timeToPlace

    drawNextPiece()
}


function placePiece(event) {

    if (isGameOver) {
        return
    }

    let firstCoords = IDtoCoords(event.target)
    let error = false
    let IDsToColor = []

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (currentPiece.shape[i][j] == 1) {
                let ID = CoordsToID(parseInt(firstCoords.x) + i, parseInt(firstCoords.y) + j)
                IDsToColor.push(ID)
                obj = document.querySelector("#t" + ID)

                if (obj == null) {
                    console.log("A keresett ID nem található.")
                    error = true
                }
                else if (obj.style.backgroundColor != defaultBackground) {
                    error = true
                    console.log("Már foglalt mező!")
                    console.log(obj.style.backgroundColor)
                }

            }
        }
    }

    if (!error) {
        for (let i = 0; i < IDsToColor.length; i++) {
            obj = document.querySelector("#t" + IDsToColor[i])
            obj.style.backgroundColor = color
            obj = document.querySelector("#p" + IDsToColor[i])
            obj.src = image
        }

        timeLeft = timeLeft - timeToPlace

        updateUI()

        generateNextPiece()
    }
}

function updateUI() {
    image = "";

    if (timeLeft / 7 > 3) {
        currentSeasonText.innerHTML = "Jelenlegi évszak: " + seasons[0]
    }
    else if (timeLeft / 7 > 2) {
        currentSeason = seasons[1]
        currentSeasonText.innerHTML = "Jelenlegi évszak: " + currentSeason

        if (currentSeason != lastSeason) {
            shuffledElements = [...elements]
            originalPoints = points
            seasonStartPoint = points
            calculatePoints(currentMissions[0].title)
            mission1PointVal = mission1PointVal + (points - originalPoints)
            mission1Point.innerHTML = "Pont: " + mission1PointVal
            originalPoints = points
            calculatePoints(currentMissions[1].title)
            mission2PointVal = mission2PointVal + (points - originalPoints)
            mission2Point.innerHTML = "Pont: " + mission2PointVal
            pointsText.innerHTML = "Összesen: " + points + " pont"
            springPointsText.innerHTML = points - seasonStartPoint + " pont"
        }

        mission1TD.style.backgroundColor = "rgb(" + 192 + "," + 192 + "," + 192 + ")"
        mission2TD.style.backgroundColor = "lightgreen"
        mission3TD.style.backgroundColor = "lightgreen"

        lastSeason = currentSeason
    }
    else if (timeLeft / 7 > 1) {
        currentSeason = seasons[2]
        currentSeasonText.innerHTML = "Jelenlegi évszak: " + currentSeason

        if (currentSeason != lastSeason) {
            shuffledElements = [...elements]
            originalPoints = points
            seasonStartPoint = points
            calculatePoints(currentMissions[1].title)
            mission2PointVal = mission2PointVal + (points - originalPoints)
            mission2Point.innerHTML = "Pont: " + mission2PointVal
            originalPoints = points
            calculatePoints(currentMissions[2].title)
            mission3PointVal = mission3PointVal + (points - originalPoints)
            mission3Point.innerHTML = "Pont: " + mission3PointVal
            pointsText.innerHTML = "Összesen: " + points + " pont"
            summerPointsText.innerHTML = points - seasonStartPoint + " pont"
        }
        mission2TD.style.backgroundColor = "rgb(" + 192 + "," + 192 + "," + 192 + ")"
        mission3TD.style.backgroundColor = "lightgreen"
        mission4TD.style.backgroundColor = "lightgreen"

        lastSeason = currentSeason
    }
    else if (timeLeft / 7 > 0) {
        currentSeason = seasons[3]
        currentSeasonText.innerHTML = "Jelenlegi évszak: " + currentSeason

        if (currentSeason != lastSeason) {
            shuffledElements = [...elements]
            originalPoints = points
            seasonStartPoint = points
            calculatePoints(currentMissions[2].title)
            mission3PointVal = mission3PointVal + (points - originalPoints)
            mission3Point.innerHTML = "Pont: " + mission3PointVal
            originalPoints = points
            calculatePoints(currentMissions[3].title)
            mission4PointVal = mission4PointVal + (points - originalPoints)
            mission4Point.innerHTML = "Pont: " + mission4PointVal
            pointsText.innerHTML = "Összesen: " + points + " pont"
            fallPointsText.innerHTML = points - seasonStartPoint + " pont"
        }

        mission3TD.style.backgroundColor = "rgb(" + 192 + "," + 192 + "," + 192 + ")"
        mission4TD.style.backgroundColor = "lightgreen"
        mission1TD.style.backgroundColor = "lightgreen"

        lastSeason = currentSeason
    }
    else {
        originalPoints = points
        seasonStartPoint = points
        calculatePoints(currentMissions[3].title)
        mission4PointVal = mission4PointVal + (points - originalPoints)
        mission4Point.innerHTML = "Pont: " + mission4PointVal
        originalPoints = points
        calculatePoints(currentMissions[0].title)
        mission1PointVal = mission1PointVal + (points - originalPoints)
        mission1Point.innerHTML = "Pont: " + mission1PointVal
        BEKERITETT_HEGYEK()
        pointsText.innerHTML = "Összesen: " + points + " pont"
        timeLeftText.innerHTML = "Évszakból hátralévő idő: " + 0 + "/7"
        winterPointsText.innerHTML = points - seasonStartPoint + " pont"
        gameOver()
    }

    if (timeLeft % 7 == 0) {
        timeLeftText.innerHTML = "Évszakból hátralévő idő: " + 7 + "/7"
    }
    else {
        timeLeftText.innerHTML = "Évszakból hátralévő idő: " + timeLeft % 7 + "/7"
    }

    if(isGameOver){
        timeLeftText.innerHTML = "Játék vége"
    }

}

//Ha nem tudjuk lehelyezni az elemet, ezzel a kérhetünk újat, de eggyel több időt veszitünk mintha lehelyeznénk
function noSpace() {
    timeLeft = timeLeft - (timeToPlace+1)
    updateUI()
    generateNextPiece()
}


function gameOver() {
    isGameOver = true

    currentSeasonText.innerHTML = "Játék vége"

    startGameButton.style.display = "block"

    window.scrollTo(0, 0)
}

function calculatePoints(title) {
    switch (title) {
        case "Az erdő széle":
            ERDO_SZELE()
            break;
        case "Álmos-völgy":
            ALMOS_VOLGY()
            break;
        case "Krumpliöntözés":
            KRUMPLIONTOZES()
            break;
        case "Határvidék":
            HATARVIDEK()
            break;
        case "Fasor":
            FASOR()
            break;
        case "Gazdag város":
            GAZDAG_VAROS()
            break;
        case "Öntözőcsatorna":
            ONTOZOCSATORNA()
            break;
        case "Mágusok völgye":
            MAGUSOK_VOLGYE()
            break;
        case "Üres telek":
            URES_TELEK()
            break;
        case "Sorház":
            SORHAZ()
            break;
        case "Páratlan silók":
            PARATLAN_SILOK()
            break;
        case "Gazdag vidék":
            GAZDAG_VIDEK()
            break;
        default:
            console.log("Nincs ilyen mission")
            break;
    }

    pointsText.innerHTML = "Összesen: " + points + " pont"
}

function ERDO_SZELE() {
    for (let i = 0; i < 11; i++) {
        if (document.querySelector("#t" + CoordsToID(0, i)).style.backgroundColor == forestColor) {
            points++
        }
        if (document.querySelector("#t" + CoordsToID(10, i)).style.backgroundColor == forestColor) {
            points++
        }
        if (document.querySelector("#t" + CoordsToID(i, 0)).style.backgroundColor == forestColor) {
            points++
        }
        if (document.querySelector("#t" + CoordsToID(i, 10)).style.backgroundColor == forestColor) {
            points++
        }
    }
    //Sarkok duplán számolva
    if (document.querySelector("#t" + CoordsToID(0, 0)).style.backgroundColor == forestColor) {
        points--
    }
    if (document.querySelector("#t" + CoordsToID(0, 10)).style.backgroundColor == forestColor) {
        points--
    }
    if (document.querySelector("#t" + CoordsToID(10, 0)).style.backgroundColor == forestColor) {
        points--
    }
    if (document.querySelector("#t" + CoordsToID(10, 10)).style.backgroundColor == forestColor) {
        points--
    }
}

function ALMOS_VOLGY() {
    for (let i = 0; i < 11; i++) {
        let count = 0
        for (let j = 0; j < 11; j++) {
            if (document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == forestColor) {
                count++
            }
        }
        if (count == 3) {
            points += 4
        }
    }
}

function KRUMPLIONTOZES() {
    let givePoints = false
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            givePoints = false
            if (document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == waterColor) {
                if (i - 1 >= 0) {
                    if (document.querySelector("#t" + CoordsToID(i - 1, j)).style.backgroundColor == farmColor) {
                        givePoints = true
                    }
                }
                if (i + 1 <= 10) {
                    if (document.querySelector("#t" + CoordsToID(i + 1, j)).style.backgroundColor == farmColor) {
                        givePoints = true
                    }
                }
                if (j - 1 >= 0) {
                    if (document.querySelector("#t" + CoordsToID(i, j - 1)).style.backgroundColor == farmColor) {
                        givePoints = true
                    }
                }
                if (j + 1 <= 10) {
                    if (document.querySelector("#t" + CoordsToID(i, j + 1)).style.backgroundColor == farmColor) {
                        givePoints = true
                    }
                }
            }

            if (givePoints) {
                points += 2
            }
        }
    }
}

function HATARVIDEK() {
    let givePoints = false

    //minden soron
    for (let i = 0; i < 11; i++) {
        givePoints = false
        for (let j = 0; j < 11; j++) {
            if (document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor != defaultBackground) {
                givePoints = true
            }
            else {
                givePoints = false
                break
            }
        }
        if (givePoints) {
            points += 6
        }
    }

    //minden oszlopon
    for (let i = 0; i < 11; i++) {
        givePoints = false
        for (let j = 0; j < 11; j++) {
            if (document.querySelector("#t" + CoordsToID(j, i)).style.backgroundColor != defaultBackground &&
                document.querySelector("#t" + CoordsToID(j, i)).style.backgroundColor != mountainColor) {
                givePoints = true
            }
            else {
                givePoints = false
                break
            }
        }
        if (givePoints) {
            points += 6
        }
    }
}

function FASOR() {
    let maxLength = 0
    let currLength = 0

    //minden oszlopon
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (document.querySelector("#t" + CoordsToID(j, i)).style.backgroundColor == forestColor) {
                currLength++
            }
            else {
                if (currLength > maxLength) {
                    maxLength = currLength
                }
                currLength = 0
            }
        }
    }
    points += maxLength * 2
}

function GAZDAG_VAROS() {
    //farm, forest, water, town, mountain
    tiles = [0, 0, 0, 0, 0]

    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            tiles = [0, 0, 0, 0, 0]
            if (document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == townColor) {
                if (i - 1 >= 0) {
                    if (document.querySelector("#t" + CoordsToID(i - 1, j)).style.backgroundColor == farmColor
                        || document.querySelector("#t" + CoordsToID(i - 1, j)).style.backgroundColor == forestColor
                        || document.querySelector("#t" + CoordsToID(i - 1, j)).style.backgroundColor == waterColor
                        || document.querySelector("#t" + CoordsToID(i - 1, j)).style.backgroundColor == townColor
                        || document.querySelector("#t" + CoordsToID(i - 1, j)).style.backgroundColor == mountainColor) {

                        switch (document.querySelector("#t" + CoordsToID(i - 1, j)).style.backgroundColor) {
                            case farmColor:
                                tiles[0] = 1
                                break
                            case forestColor:
                                tiles[1] = 1
                                break
                            case waterColor:
                                tiles[2] = 1
                                break
                            case townColor:
                                tiles[3] = 1
                                break
                            case mountainColor:
                                tiles[4] = 1
                                break
                        }
                    }
                }
                if (i + 1 <= 10) {
                    if (document.querySelector("#t" + CoordsToID(i + 1, j)).style.backgroundColor == farmColor
                        || document.querySelector("#t" + CoordsToID(i + 1, j)).style.backgroundColor == forestColor
                        || document.querySelector("#t" + CoordsToID(i + 1, j)).style.backgroundColor == waterColor
                        || document.querySelector("#t" + CoordsToID(i + 1, j)).style.backgroundColor == townColor
                        || document.querySelector("#t" + CoordsToID(i + 1, j)).style.backgroundColor == mountainColor) {

                        switch (document.querySelector("#t" + CoordsToID(i + 1, j)).style.backgroundColor) {
                            case farmColor:
                                tiles[0] = 1
                                break
                            case forestColor:
                                tiles[1] = 1
                                break
                            case waterColor:
                                tiles[2] = 1
                                break
                            case townColor:
                                tiles[3] = 1
                                break
                            case mountainColor:
                                tiles[4] = 1
                                break
                        }
                    }
                }
                if (j - 1 >= 0) {
                    if (document.querySelector("#t" + CoordsToID(i, j - 1)).style.backgroundColor == farmColor
                        || document.querySelector("#t" + CoordsToID(i, j - 1)).style.backgroundColor == forestColor
                        || document.querySelector("#t" + CoordsToID(i, j - 1)).style.backgroundColor == waterColor
                        || document.querySelector("#t" + CoordsToID(i, j - 1)).style.backgroundColor == townColor
                        || document.querySelector("#t" + CoordsToID(i, j - 1)).style.backgroundColor == mountainColor) {

                        switch (document.querySelector("#t" + CoordsToID(i, j - 1)).style.backgroundColor) {
                            case farmColor:
                                tiles[0] = 1
                                break
                            case forestColor:
                                tiles[1] = 1
                                break
                            case waterColor:
                                tiles[2] = 1
                                break
                            case townColor:
                                tiles[3] = 1
                                break
                            case townColor:
                                tiles[4] = 1
                                break
                        }
                    }
                }
                if (j + 1 <= 10) {
                    if (document.querySelector("#t" + CoordsToID(i, j + 1)).style.backgroundColor == farmColor
                        || document.querySelector("#t" + CoordsToID(i, j + 1)).style.backgroundColor == forestColor
                        || document.querySelector("#t" + CoordsToID(i, j + 1)).style.backgroundColor == waterColor
                        || document.querySelector("#t" + CoordsToID(i, j + 1)).style.backgroundColor == townColor
                        || document.querySelector("#t" + CoordsToID(i, j + 1)).style.backgroundColor == mountainColor) {

                        switch (document.querySelector("#t" + CoordsToID(i, j + 1)).style.backgroundColor) {
                            case farmColor:
                                tiles[0] = 1
                                break
                            case forestColor:
                                tiles[1] = 1
                                break
                            case waterColor:
                                tiles[2] = 1
                                break
                            case townColor:
                                tiles[3] = 1
                                break
                            case townColor:
                                tiles[4] = 1
                                break
                        }
                    }
                }
            }

            if ((tiles[0] + tiles[1] + tiles[2] + tiles[3] + tiles[4]) >= 3) {
                points += 3
            }
        }
    }

}

function ONTOZOCSATORNA() {
    let farmCount = 0
    let waterCount = 0

    //minden oszlopon
    for (let i = 0; i < 11; i++) {
        waterCount = 0
        farmCount = 0
        for (let j = 0; j < 11; j++) {
            if (document.querySelector("#t" + CoordsToID(j, i)).style.backgroundColor == farmColor) {
                farmCount++
            }
            if (document.querySelector("#t" + CoordsToID(j, i)).style.backgroundColor == waterColor) {
                waterCount++
            }
        }
        if (farmCount > 0 && waterCount > 0 && waterCount == farmCount) {
            points += 4
        }
    }
}

function MAGUSOK_VOLGYE() {
    let x
    let y

    for (let i = 0; i < mountains.length; i++) {
        x = mountains[i].x
        y = mountains[i].y

        if (x - 1 >= 0) {
            if (document.querySelector("#t" + CoordsToID(x - 1, y)).style.backgroundColor == waterColor) {
                points += 3
            }
        }
        if (x + 1 <= 10) {
            if (document.querySelector("#t" + CoordsToID(x + 1, y)).style.backgroundColor == waterColor) {
                points += 3
            }
        }
        if (y - 1 >= 0) {
            if (document.querySelector("#t" + CoordsToID(x, y - 1)).style.backgroundColor == waterColor) {
                points += 3
            }
        }
        if (y + 1 <= 10) {
            if (document.querySelector("#t" + CoordsToID(x, y + 1)).style.backgroundColor == waterColor) {
                points += 3
            }
        }
    }
}

function URES_TELEK() {
    let givePoints = false

    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            givePoints = false
            if (document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == defaultBackground) {
                if (i - 1 >= 0) {
                    if (document.querySelector("#t" + CoordsToID(i - 1, j)).style.backgroundColor == townColor) {
                        givePoints = true
                    }
                }
                if (i + 1 <= 10) {
                    if (document.querySelector("#t" + CoordsToID(i + 1, j)).style.backgroundColor == townColor) {
                        givePoints = true
                    }
                }
                if (j - 1 >= 0) {
                    if (document.querySelector("#t" + CoordsToID(i, j - 1)).style.backgroundColor == townColor) {
                        givePoints = true
                    }
                }
                if (j + 1 <= 10) {
                    if (document.querySelector("#t" + CoordsToID(i, j + 1)).style.backgroundColor == townColor) {
                        givePoints = true
                    }
                }
            }

            if (givePoints) {
                points += 2
            }

        }
    }
}

function SORHAZ() {
    let maxLength = 0
    let currLength = 0
    let sameCount = 0

    //minden oszlopon
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == townColor) {
                currLength++
            }
            else {
                if (currLength > maxLength) {
                    maxLength = currLength
                    sameCount = 1
                }
                else if (currLength == maxLength) {
                    sameCount++
                }
                currLength = 0
            }
        }
    }
    points += maxLength * 2 * sameCount
}

function PARATLAN_SILOK() {
    for (let i = 0; i < 11; i++) {
        givePoints = false
        for (let j = 0; j < 11; j = j + 2) {
            if (document.querySelector("#t" + CoordsToID(j, i)).style.backgroundColor != defaultBackground &&
                document.querySelector("#t" + CoordsToID(j, i)).style.backgroundColor != mountainColor) {
                givePoints = true
            }
            else {
                givePoints = false
                break
            }
        }
        if (givePoints) {
            points += 10
        }
    }
}

function GAZDAG_VIDEK() {
    tiles = [0, 0, 0, 0, 0]

    for (let i = 0; i < 11; i++) {
        tiles = [0, 0, 0, 0, 0]
        for (let j = 0; j < 11; j++) {
            if (document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == farmColor
                || document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == forestColor
                || document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == waterColor
                || document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == townColor
                || document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor == mountainColor) {

                switch (document.querySelector("#t" + CoordsToID(i, j)).style.backgroundColor) {
                    case farmColor:
                        tiles[0] = 1
                        break
                    case forestColor:
                        tiles[1] = 1
                        break
                    case waterColor:
                        tiles[2] = 1
                        break
                    case townColor:
                        tiles[3] = 1
                        break
                    case mountainColor:
                        tiles[4] = 1
                        break
                }
            }
        }
        if ((tiles[0] + tiles[1] + tiles[2] + tiles[3] + tiles[4]) >= 5) {
            points += 4
        }
    }
}

function BEKERITETT_HEGYEK() {
    let x
    let y
    let givePoints

    for (let i = 0; i < mountains.length; i++) {
        givePoints = true

        x = mountains[i].x
        y = mountains[i].y

        if (x - 1 >= 0) {
            if (document.querySelector("#t" + CoordsToID(x - 1, y)).style.backgroundColor == defaultBackground) {
                givePoints = false
            }
        }
        if (x + 1 <= 10) {
            if (document.querySelector("#t" + CoordsToID(x + 1, y)).style.backgroundColor == defaultBackground) {
                givePoints = false
            }
        }
        if (y - 1 >= 0) {
            if (document.querySelector("#t" + CoordsToID(x, y - 1)).style.backgroundColor == defaultBackground) {
                givePoints = false
            }
        }
        if (y + 1 <= 10) {
            if (document.querySelector("#t" + CoordsToID(x, y + 1)).style.backgroundColor == defaultBackground) {
                givePoints = false
            }
        }

        if (givePoints) {
            points += 1
        }
    }
}

startGameButton.addEventListener("click", handleStartButtonPressed)
rotateButton.addEventListener("click", rotate)
mirrorButton.addEventListener("click", mirror)
noSpaceButton.addEventListener("click", noSpace)
delegate(gameBoard, "click", "td", placePiece)


function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}







const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
]


const missions =
{
    "basic": [
        {
            "title": "Az erdő széle",
            "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
        },
        {
            "title": "Álmos-völgy",
            "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
        },
        {
            "title": "Krumpliöntözés",
            "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
        },
        {
            "title": "Határvidék",
            "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
        }
    ],
    "extra": [
        {
            "title": "Fasor",
            "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
        },
        {
            "title": "Gazdag város",
            "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
        },
        {
            "title": "Öntözőcsatorna",
            "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
        },
        {
            "title": "Mágusok völgye",
            "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
        },
        {
            "title": "Üres telek",
            "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
        },
        {
            "title": "Sorház",
            "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
        },
        {
            "title": "Páratlan silók",
            "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
        },
        {
            "title": "Gazdag vidék",
            "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
        }
    ],
}