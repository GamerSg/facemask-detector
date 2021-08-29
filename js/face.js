const MODEL_URL = './models';

async function startWebCam() {
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong!");
                console.log(error);
            });
    }
}

async function init() {
    console.log(faceapi.nets);
    await startWebCam();
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
}
