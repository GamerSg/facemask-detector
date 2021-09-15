const MODEL_URL = './models';
const minConfidence = 0.5;
var labeledDescriptors = [];
var faceMatcher = null;

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

async function registerFace(img, label)
{
    const results = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

    if (!results.descriptor) {
    return
    }
    labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(
        label,
        [results.descriptor]
      ));
    console.log("Registered "+label);    
    faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
}

async function detectFacesVideo(inputSrc, overlay)
{
    var fdOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });    
    const results = await faceapi.detectAllFaces(inputSrc, fdOptions).withFaceLandmarks().withFaceDescriptors();
    console.log("Detected faces : " + results);
    const dims = faceapi.matchDimensions(overlay, inputSrc, true);
    faceapi.draw.drawDetections(overlay, faceapi.resizeResults(results, dims));

    if(faceMatcher)
    {
        results.forEach(fd => {
            const bestMatch = faceMatcher.findBestMatch(fd.descriptor)
            console.log(bestMatch.toString())
          })
    }

    setTimeout(detectFaces, 50, inputSrc, overlay);
}

async function init() {
    startWebCam();
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    console.log("Loaded models");
}

async function readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });

    return result_base64;
}
