const cv = require('opencv');
const fs = require('fs');

// Define constants
const COLOR = [0, 255, 0];
const THICKNESS = 2;

// Create new camera instance
const camera = new cv.VideoCapture(0);

// Read image from camera
camera.read((err, im) => {
	if (err) throw err;

	const baseIm = im;

	// Verify that image is present (larger than 0px height and width)
	if (im.size()[0] > 0 && im.size()[1] > 0) {
		// Detect faces using the built-in HAAR classifier
		im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
			if (err) throw err;

			const base = `./tmp/[${(new Date()).getTime()}] take-picture`;

			fs.mkdirSync(base);

			// Cycle through the returned faces
			faces.forEach((face, index) => {
				// Frame image to face size and save it
				const faceIm = im.roi(face.x, face.y, face.width, face.height);
				faceIm.save(`${base}/face${index}.jpg`);

				// Draw rectangle around face on base image
				baseIm.rectangle([face.x, face.y], [face.width, face.height], COLOR, THICKNESS);
			});

			// Save base image
			baseIm.save(`${base}/base_pic.jpg`);

			console.log(`Images saved to ${base}/`);
		});
	}
});
