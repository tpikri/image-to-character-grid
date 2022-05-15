//"$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
//"$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^.";
let chars = ".:-=+*#%@";
chars = chars.split("").reverse().join("");
let levels = chars.length-1;

let canvas = undefined;
let video = undefined;
let img = undefined;
let cameraBtn = undefined;
let imgInput = undefined;
let charOutput = undefined;
let charsetInput = undefined;

let engine = undefined;

window.onload = () => {
	canvas = document.getElementsByTagName('canvas')[0];
	video = document.getElementById("video");
	img = document.getElementsByTagName('img')[0];
	cameraBtn = document.getElementById('camera_toggle');
	imgInput = document.getElementById('file_input');
	charOutput = document.getElementById('output');
	charsetInput = document.getElementById('charsetInput');

	charsetInput.value = chars.split("").reverse().join("");
	charsetInput.addEventListener('input', e => setCharset(e.target.value));

	initCamera();
	initPhoto();
}


function setCharset(string){
	chars = string.split("").reverse().join("");
	levels = chars.length-1;
}

function requestCamera(callback){
	video.onloadeddata = callback;

	navigator.mediaDevices
	 .getUserMedia({ audio: false, video: true })
	 .then(stream => {
	 		video.srcObject = stream;
	 });
}

function initCamera(){
	video.addEventListener("play", function() {
      canvas.width = video.videoWidth;
		  canvas.height = video.videoHeight;
		  engine = new PixelEngine(canvas.width, canvas.height, Math.floor(charOutput.clientWidth/10));
      window.requestAnimationFrame(videoFrameTick);
    }, false);
	
	cameraBtn.addEventListener("click", () => {
		let plays = cameraBtn.dataset.plays == 1;

		cameraBtn.dataset.plays = plays ? 0 : 1;
		cameraBtn.querySelector('span').innerHTML = plays ? 'Start Camera' : 'Stop Camera';
		if (plays) video.pause();
		else {
			imgInput.value = '';
			if (video.srcObject === null) 
				requestCamera(() => {
					video.play();
				});
			else 
				video.play();
		}
	});
}


function initPhoto(){
	imgInput.addEventListener('change', function(){
		var files = imgInput.files;
		if (files.length > 0){
			url = URL.createObjectURL(files[0]);
			img.src = url;
		}
	});
	
	img.addEventListener('load', function(){
		if (cameraBtn.dataset.plays == 1)
			cameraBtn.click();

		canvas.width = img.width;
		canvas.height = img.height;
		
		canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
		engine = new PixelEngine(img.width, img.height, Math.floor(charOutput.clientWidth/10));
		var data = canvas.getContext('2d').getImageData(0,0,img.width,img.height).data;
		displayCharacters(data);
	});
}


function videoFrameTick(){
	if (video.paused || video.ended) return;
	
	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
	var data = canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
	displayCharacters(data);
	
	window.requestAnimationFrame(videoFrameTick);
}



function displayCharacters(data){
	var d = engine.calc(data);
	
	htmlStr = "";
	for (var y = 0; y < d.grid.length; y++){
		for (var x = 0; x < d.grid[0].length; x++){
			htmlStr += "<span style='color:rgb("+d.grid[y][x].r+", "+d.grid[y][x].g+", "+d.grid[y][x].b+")'>"+chars[Math.round(levels*(d.grid[y][x].bw-d.bwMin)/(d.bwMax-d.bwMin))]+"</span>";
		}
		htmlStr += "<br>";
	}
	
	charOutput.innerHTML = htmlStr;
}