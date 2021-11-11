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

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ec-8ff2lI/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.SpeechSynthesis;
    speak_data_1 = "The 1st Prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "GOOD")
        {
            document.getElementById("update_gesture").innerHTML = "👍-That is very good.";
        }
        if(results[0].label == "BAD")
        {
            document.getElementById("update_gesture").innerHTML = "👎- That is bad.";
        }
        if(results[0].label == "HI")
        {
            document.getElementById("update_emoji").innerHTML = "🤚- Hi there.";
        }
        if(results[0].label == "AMAZING")
        {
            document.getElementById("update_emoji").innerHTML = "👌- That looks amazing.";
        }
        if(results[0].label == "VICTORY")
        {
            document.getElementById("update_emoji").innerHTML = "✌ - It’s a victory.";
        }
    }
}