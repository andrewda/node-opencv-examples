const cv = require('opencv');

// Define constants
const COLOR = [0, 255, 0];
const THICKNESS = 2;

// Create new camera and window instances
const camera = new cv.VideoCapture(0);
const window = new cv.NamedWindow('Video', 0);

// Set camera resolution (250x250)
camera.setWidth(250);
camera.setHeight(250);

// Update window every 100ms
setInterval(() => {
	// Read image from camera
	camera.read(function(err, im) {
		if (err) throw err;

		// Verify that image is present (larger than 0px height and width)
		if (im.size()[0] > 0 && im.size()[1] > 0) {
			// Detect faces using the built-in HAAR classifier
			im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
				if (err) throw err;

				// Cycle through the returned faces
				faces.forEach((face) => {
					// Draw a rectange around the face
					im.rectangle([face.x, face.y], [face.width, face.height], COLOR, THICKNESS);
				});

				// Show image in window
				window.show(im);
				window.blockingWaitKey(0, 50);
			});
		}
	});
}, 100);
