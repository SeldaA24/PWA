/*const container = document.querySelector(".container");
const coffees = [
  {
    name: "Perspiciatis",
    image: "images/coffee1.jpg"
  },
  {
    name: "Voluptatem",
    image: "images/coffee2.jpg"
  },
  {
    name: "Explicabo",
    image: "images/coffee3.jpg"
  },
  {
    name: "Rchitecto",
    image: "images/coffee4.jpg"
  },
  {
    name: " Beatae",
    image: "images/coffee5.jpg"
  },
  {
    name: " Vitae",
    image: "images/coffee6.jpg"
  },
  {
    name: "Inventore",
    image: "images/coffee7.jpg"
  },
  {
    name: "Veritatis",
    image: "images/coffee8.jpg"
  },
  {
    name: "Accusantium",
    image: "images/coffee9.jpg"
  }
];
const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
} */




      let videoStream;
   let video = document.getElementById('videoCam');
   let canvas = document.getElementById('canvas');
   let capturedImage = document.getElementById('capturedImage');

      function openCam(){
         let All_mediaDevices=navigator.mediaDevices
         if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
            console.log("getUserMedia() not supported.");
            return;
         }
         All_mediaDevices.getUserMedia({
            audio: true,
            video: true
         })
         .then(function(vidStream) {
            var video = document.getElementById('videoCam');
            if ("srcObject" in video) {
               video.srcObject = vidStream;
            } else {
               video.src = window.URL.createObjectURL(vidStream);
            }
            video.onloadedmetadata = function(e) {
               video.play();
            }; // Video als Bild gespeicehrt
           videoStream = vidStream;
         })
         .catch(function(e) {
            console.log(e.name + ": " + e.message);
         });
      }
     function captureImage() {
  if (videoStream) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgDataUrl = canvas.toDataURL('image/png');
    capturedImage.src = imgDataUrl;
    capturedImage.style.display = 'block';

    // Im Local Storage speichern
    localStorage.setItem('capturedImage', imgDataUrl);

    // Im Cache speichern
    caches.open('my-cache').then(function (cache) {
      cache.put('/images/captured_image.png', new Response(imgDataUrl));
    });
  }
}


 function stopCam(){
        if(videoStream) {
           const tracks = videoStream.getTracks();
           tracks.forEach(track => track.stop());
           videoStream = null;
        }
     }

 function downloadImage() {
        if (capturedImage.src) {
           const a = document.createElement('a');
           a.href = capturedImage.src;
           a.download = 'captured_image.png';
           a.click();
        }
     }
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  }
     
   

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

