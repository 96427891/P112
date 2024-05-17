Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function capture(){
    Webcam.snap(function (database) {
        document.getElementById("captured_img").innerHTML = '<img id="saved-img" src="' + database + '"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/eEXJRfo4u/model.json');
function identify(){
    img =  document.getElementById("saved-img");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result1").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Best"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "Rock"){
            document.getElementById("update_emoji").innerHTML = "&#9994;";
        }
        if(results[0].label == "Paper"){
            document.getElementById("update_emoji").innerHTML = "&#9995;";
        }
    }
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "I predict that you are" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rate = 0.1;
    synth.speak(utterThis);
}