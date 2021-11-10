prediction_1 = ""

function start_webcam(){
    Webcam.set({
        width : 350,
        heigth : 300,
        image_format : 'png',
        png_quality : 90
    })
    
    camera = document.getElementById("camera")
    Webcam.attach('#camera')
}

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    })
}

console.log('ml5 version : ', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/e6dt4ZXGF/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.SpeechSynthesis;
    speak_data_1 = "The 1st Prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}