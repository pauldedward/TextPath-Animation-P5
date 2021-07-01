
let font;
let text;
let points;
let vehicles = [];
let letterPoints = [];
let alphaSlider;
let strokeSlider;
let fontsizeSlider;
let bgButton;
let resetButton;
let bgcolor = 255;
let spacing = 20;
let alphaValue;
let strokeValue;

function preload() {
    font = loadFont("font.ttf");
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    
    text = prompt("Enter the Name of your loved one");
    if(text === null) {
        text = "Edward";
    }
    alert("Note:\nTry to touch the text.\nDouble click and hold anywhere on website to drive particles in path\nTweak the slider values and have fun");
    
    alphaSlider = createSlider(0,255,255,5);
    alphaSlider.position(width/3,20);
    alphaSlider.style("width",width/2 + "px");

    let fontSliderInit =  200 / text.length;
    fontsizeSlider = createSlider(20,200,fontSliderInit,5);
    fontsizeSlider.position(width/3,40);
    fontsizeSlider.style("width",width/2 + "px");

    let strokeInit = fontSliderInit / 10;
    strokeSlider = createSlider(1,20,strokeInit,1);
    strokeSlider.position(width/3,60);
    strokeSlider.style("width",width/2 + "px");

    bgButton = createButton("ChangeBG");
    bgButton.position(20, 20);
    bgButton.id("bgButton");

    resetButton = createButton("Reset");
    resetButton.position(20, 60);
    resetButton.id("resetButton");

    resetText();
    alphaValue = alphaSlider.value();

    fontsizeSlider.input(()=> resetText());
    fontsizeSlider.mousePressed(()=> resetText());

    alphaSlider.input(()=> {
        alphaValue = alphaSlider.value();
        resetText();
    });

    alphaSlider.mousePressed(()=> {
        alphaValue = alphaSlider.value();
        resetText();
    });

    strokeSlider.input(()=> {
        strokeValue = strokeSlider.value();
    });

    strokeSlider.mousePressed(()=> {
        strokeValue = strokeSlider.value();
    });

    resetButton.mousePressed(function() {
        if(vehicles[0][0]) {
            for(vArray of vehicles) {
                for (v of vArray) {
                    v.x = random(width);
                    v.y = random(height);
                }
            }
        }
    })

    bgButton.mousePressed(function() {
        if(bgcolor == 255) {
            bgcolor = 0
        } else {
            bgcolor = 255;
        }
    })

}

function draw() {

    background(bgcolor,alphaValue);
    for(vArray of vehicles) {
        for (v of vArray) {
            v.behave();
            v.update();
            v.show();
        }
    }

    if(frameCount % 10 == 0 && mouseIsPressed ) {
        for(vArray of vehicles) {
            if(vArray.length > 0) {
                let last = vArray[0].target;
                for(let i = 0; i < vArray.length - 1; i++) {
                    vArray[i].target = vArray[i+1].target;
                }
                vArray[vArray.length - 1].target = last;
            }   
        }
        
    }
}

function resetText() {
        vehicles = [];
        letterPoints = [];
        let cycle = 0;
        let lastpoint = width / 16;
        let fontSize = fontsizeSlider.value();
        for(letter of text) {
        letterPoints.push(font.textToPoints(letter,lastpoint + spacing, height/1.5,fontSize));

        if(letterPoints[cycle].length == 0) {
            lastpoint = lastpoint + 10;
            cycle++;
            continue;
            }

        for(pt of letterPoints[cycle]) {
            if(pt.x > lastpoint) {
                lastpoint = pt.x;
            }
        }
        cycle++;
        }
        
        cycle = 0;
        for(points of letterPoints) {
            vehicles[cycle] = [];
            for(pt of points) {
                vehicles[cycle].push(new Vehicle(pt.x, pt.y, fontSize))
            }
            cycle++;
        }
}