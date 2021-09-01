const MODEL_URL = './models';
const minConfidence = 0.5;

async function startWebCam() {
    var video = document.querySelector("#videoElement");        //Get video element from HTML

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;                       //Feed webcame stream to video element
            })
            .catch(function (error) {
                console.log("Something went wrong!");
                console.log(error);
            });
    }
}

async function detectFaces()
{
    const inputSrc = document.getElementById('videoElement');
    const overlay = document.getElementById('overlay');
    var fdOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });
    
    const results = await faceapi.detectAllFaces(inputSrc, fdOptions);
    console.log("Detected faces : " + results);
    const dims = faceapi.matchDimensions(overlay, inputSrc, true);
    faceapi.draw.drawDetections(overlay, faceapi.resizeResults(results, dims));
    setTimeout(detectFaces, 50);
}

async function init() {
    console.log(faceapi.nets);
    await startWebCam();
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);

   
}
