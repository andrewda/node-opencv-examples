const cv = require('opencv');

// Define thresholds (RGB)
const LOWER_THRESHOLD = [46, 57, 83];
const UPPER_THRESHOLD = [80, 96, 115];

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
			// Show only colors in range of the lower and upper thresholds
			im.inRange(LOWER_THRESHOLD, UPPER_THRESHOLD);

			// Show image in window
			window.show(im);
			window.blockingWaitKey(0, 50);
		}
	});
}, 100);
