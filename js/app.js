const container = document.querySelector(".container");


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
  .register("./serviceWorker.js", { scope: "./" })

      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
function captureImage(){
  if(videoStream) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgDataUrl = canvas.toDataURL('image/png');
    capturedImage.src = canvas.toDataURL('image/png');
    capturedImage.style.display = 'block';

    // Speichern
    sessionStorage.setItem('capturedImage', imgDataUrl);

    // Speichern Sie das Bild auch im Cache
    caches.open('my-cache').then(function(cache) {
      cache.put('/images/captured_image.png', new Response(imgDataUrl));
    });
  }
}

