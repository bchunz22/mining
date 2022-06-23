function preload() {
  img = loadImage('minedollars.png');
  img1 = loadImage('gameboard.png');   
  imginfoblack = loadImage('infoblack.png');
  imgusdt = loadImage('usdtinfo.png');
  imgeth = loadImage('ethinfo.png');
  imgbch = loadImage('bchinfo.png');
  imgusdc = loadImage('usdcinfo.png');
  imgbtc = loadImage('btcinfo.png');
  
}

let coinBase = 0;
let mineDollars = 0;
let numDays = 0;
let packages = [];
let gameStart = 0;
let totalAvailable = 0;
let usdtCount = 0;
let ethCount = 0;
let bchCount = 0;
let usdcCount = 0;
let btcCount = 0;
let bsv2count = 0;
let password = '';

let totalProfit = 0;
let todaysProfit = 0;


function setup() {
  createCanvas(1200, 700);
  image(img, 0, 0);
  
  input = createInput();
  input1 = createInput();
  passcode = createInput();
  input.position(902, 351);
  input1.position(902, 404);
  passcode.position(902, 457);

  button1 = createButton('submit');
  button1.position(796, 509);
  button1.mousePressed(initializeGame);
  
  textSize(20);
  textFont('Georgia');
  text('MineDollars Starting Amount:', 629, 365);
  text('Coinbase Starting Amount:', 629, 421); 
    
  depositInput = createInput();
  withdrawalInput = createInput();
    
}

function draw() {
    if (gameStart == 1) {
        screenGraphics();
    }
}

function initializeGame() {
    coinBase = float(input1.value());
    mineDollars = float(input.value());
    password = passcode.value();
    totalAvailable = mineDollars;
    clear();
    input.hide();
    input1.hide();
    button1.hide();
    passcode.hide();
    drawBoard();
    gameStart = 1;
    
}

function mousePressed() {
    if (password == '0000') {
        console.log(mouseX, mouseY);
        ifButtonPressed(mouseX, mouseY);
    }
}

class Package {
    constructor(cost1, duration1, dailyRate1, exprPayout1, identifier1) {
        this.cost = cost1;
        this.duration = duration1;
        this.dailyRate = dailyRate1;
        this.days = 0;
        this.exprPayout = exprPayout1;
        this.identifier = identifier1;
    }
}

function createPackage(pack) {
    if (pack == 'USDT' && usdtCount == 0) {
        if ((totalAvailable - 10) >= 0) {
            totalAvailable -= 10;
            packages.push(new Package(10, 1, 0.6, 10, 'USDT'));
            packageCounter('USDT', 1);
        }        
    } else if (pack == 'ETH') {
        if ((totalAvailable - 100) >= 0) {
            totalAvailable -= 100;
            packages.push(new Package(100, 3, 2, 100, 'ETH'));
            packageCounter('ETH', 1);
        }
    } else if (pack == 'BCH') {
        if ((totalAvailable - 780) >= 0) {
            totalAvailable -= 780;
            packages.push(new Package(780, 10, 17.16, 780, 'BCH'));
            packageCounter('BCH', 1);
        }
    } else if (pack == 'USDC') {
        if ((totalAvailable - 1200) >= 0) {
            totalAvailable -= 1200;
            packages.push(new Package(1200, 14, 27.48, 1200, 'USDC'));
            packageCounter('USDC', 1);
        }
    } else if (pack == 'BTC') {
        if ((totalAvailable - 3000) >= 0) {
            totalAvailable -= 3000;
            packages.push(new Package(3000, 30, 66, 3000, 'BTC'));
            packageCounter('BTC', 1);
        }
    } else if (pack == 'BSV2') {
        if ((totalAvailable - 3600) >= 0) {
            totalAvailable -= 3600;
            packages.push(new Package(3600, 21, 0, 6170.4, 'BSV2'));
            packageCounter('BSV2', 1);
        }
    }
    drawBoard();
}

function packageProcessor() {
    todaysProfit = 0;
    for (let i = (packages.length - 1); i >= 0; i--) {
            mineDollars += packages[i].dailyRate;
            totalProfit += packages[i].dailyRate;
            totalAvailable += packages[i].dailyRate;
            todaysProfit += packages[i].dailyRate;
            packages[i].days++;
            if(packages[i].dailyRate == 0) {
                if (packages[i].days == packages[i].duration) {
                    mineDollars = mineDollars + (packages[i].exprPayout - packages[i].cost);
                    totalProfit = totalProfit + (packages[i].exprPayout - packages[i].cost);
                    totalAvailable = packages[i].exprPayout;
                    todaysProfit = todaysProfit + (packages[i].exprPayout - packages[i].cost);
                    packageCounter(packages[i].identifier, -1);
                }
            } else if (packages[i].days == packages[i].duration) {
                totalAvailable += packages[i].exprPayout;
                packageCounter(packages[i].identifier, -1);
                packages.splice(i, 1);
            } 
    }
    drawBoard();
}

function packageCounter(type, count) {
    if (type == 'USDT') {
        usdtCount += count;
    }
    if (type == 'ETH') {
        ethCount += count;
    }
    if (type == 'BCH') {
        bchCount += count;
    }
    if (type == 'USDC') {
        usdcCount += count;
    }
    if (type == 'BTC') {
        btcCount += count;
    }
    if (type == 'BSV2') {
        bsv2count += count;
    }
    drawBoard();
}

function drawBoard() {
    clear();
    image(img1, 0, 0);
    
    depositInput.position(905, 444);
    withdrawalInput.position(945, 542);
    
    //round all the numbers to look pretty on screen
    mineDollars = round(mineDollars, 2);
    coinBase = round(coinBase, 2);
    totalAvailable = round(totalAvailable, 2);
    totalProfit = round(totalProfit, 2);
    todaysProfit = round(todaysProfit, 2);
    
    //show minedollars and coinbase amounts
    textSize(20);
    fill(255, 255, 255);
    textFont('Helvetica');
    text('$' + mineDollars, 945, 124);
    text('$' + coinBase, 917, 229);
    text('Available', 332, 148);
    text(usdtCount, 260, 120);
    text(ethCount, 260, 195);
    text(bchCount, 260, 276);
    text(usdcCount, 260, 360);
    text(btcCount, 260, 444);
    text(bsv2count, 260, 514);
    textSize(30);
    text('$' + totalAvailable, 430, 125);
    text('Todays Profit: ' + todaysProfit, 264, 560);
    text('Total Profit: ' + totalProfit, 264, 599);
    textSize(40);
    text(numDays, 1082, 352);
}

function keyPressed() {
    if (keyCode == SHIFT) {
        numDays++;
        packageProcessor();
        drawBoard();
    }
}

function ifButtonPressed(mouseX, mouseY) {
    //USTD Button
    if (mouseX > 30 && mouseX < 252 && mouseY > 77 && mouseY < 140) {
        createPackage('USDT');
    }
    // ETH Button
    if (mouseX > 28 && mouseX < 252 && mouseY > 156 && mouseY < 218) {
        createPackage('ETH');
    }
    //BCH button
    if (mouseX > 28 && mouseX < 252 && mouseY > 238 && mouseY < 299) {
        createPackage('BCH');
    }
    //USDC Button
    if (mouseX > 28 && mouseX < 252 && mouseY > 324 && mouseY < 383) {
        createPackage('USDC');
    }
    //BTC Button
    if (mouseX > 28 && mouseX < 252 && mouseY > 406 && mouseY < 467) {
        createPackage('BTC');
    }
    //BSV2 Button
    if (mouseX > 28 && mouseX < 252 && mouseY > 487 && mouseY < 549) {
        createPackage('BSV2');
    }
    
    //Next day button pressed
    if (mouseX > 772 && mouseX < 1072 && mouseY > 305 && mouseY < 372 && gameStart == 1) {
        numDays++;
        packageProcessor();
        drawBoard();
    }
    //checks if the deposit button was pressed and does the deposit if so
    if (mouseX > 713 && mouseX < 764 && mouseY > 432 && mouseY < 476) {
        amount = float(depositInput.value());
        if (amount > 0 && (coinBase - amount) >= 0) {
            mineDollars += amount;
            totalAvailable += amount;
            coinBase -= amount; 
            depositInput.value('');
            drawBoard();
        }
    }
    //checks if the withdrawal button was pressed and does the withdrawal if so
    if (mouseX > 712 && mouseX < 761 && mouseY > 524 && mouseY < 571) {
        amount = float(withdrawalInput.value());
        if (amount > 0 && (mineDollars - amount) >= 0) {
            coinBase += amount - 10;
            mineDollars -= amount;
            totalAvailable -= amount;
            withdrawalInput.value('');
            drawBoard();
        }
    }
    if (gameStart == 1) {
        drawBoard();
    }
}
//Sees where the mouse is and draws a circle on the button
function screenGraphics() {
    this.x = 338;
    this.y = 202;
    //USTD Button
    if (mouseX > 30 && mouseX < 252 && mouseY > 77 && mouseY < 140) {
        c = color(255,255,255);
        fill(c);
        circle(54, 109, 20);
        image(imgusdt, this.x, this.y);
    } else if (mouseX > 28 && mouseX < 252 && mouseY > 156 && mouseY < 218) {
        c = color(255,255,255);
        fill(c);
        circle(54, 187, 20);
        image(imgeth, this.x, this.y);
    } else if (mouseX > 28 && mouseX < 252 && mouseY > 238 && mouseY < 299) {
        c = color(255,255,255);
        fill(c);
        circle(54, 269, 20);
        image(imgbch, this.x, this.y);
    } else if (mouseX > 28 && mouseX < 252 && mouseY > 324 && mouseY < 383) {
        c = color(255,255,255);
        fill(c);
        circle(54, 353, 20);
        image(imgusdc, this.x, this.y);
    } else if (mouseX > 28 && mouseX < 252 && mouseY > 406 && mouseY < 467) {
        c = color(255,255,255);
        fill(c);
        circle(54, 436, 20);
        image(imgbtc, this.x, this.y);
    } else if (mouseX > 28 && mouseX < 252 && mouseY > 487 && mouseY < 549) {
        c = color(255,255,255);
        fill(c);
        circle(54, 521, 20);
    } else {
        c = color(0, 0, 0);
        fill(c);
        circle(54, 436, 20);
        c = color(0, 0, 0);
        fill(c);
        circle(54, 187, 20);
        c = color(0, 0, 0);
        fill(c);
        circle(54, 109, 20);
        image(imginfoblack, this.x, this.y);
        c = color(0, 0, 0);
        fill(c);
        circle(54, 269, 20);
        c = color(0, 0, 0);
        fill(c);
        circle(54, 353, 20); 
        c = color(0, 0, 0);
        fill(c);
        circle(54, 521, 20);
    }
    //next Day Button
    if (mouseX > 772 && mouseX < 1072 && mouseY > 305 && mouseY < 372) {
        c = color(255,255,255);
        fill(c);
        circle(810, 340, 30);
        circle(1026, 340, 30);
    } else {
        c = color(0, 0, 0);
        fill(c);
        circle(810, 340, 30);
        circle(1026, 340, 30);
    } 
    
    //Deposit button
    if (mouseX > 714 && mouseX < 764 && mouseY > 433 && mouseY < 478) {
        c = color(0, 0, 0);
        noStroke();
        fill(c);
        circle(739, 455, 30);
    } else {
        c = color(255,255,255);
        noStroke();
        fill(c);
        circle(739, 455, 30);
    }
    //Withdrawal button
    if (mouseX > 712 && mouseX < 764 && mouseY > 523 && mouseY < 569) {
        c = color(0, 0, 0);
        noStroke();
        fill(c);
        circle(738, 548, 30);
    } else {
        c = color(255,255,255);
        noStroke();
        fill(c);
        circle(738, 548, 30);
    }
}