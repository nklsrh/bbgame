var DEVICE = "PC";
var browser = navigator.userAgent;
// Are we running in a PlayBook browser?
if (browser.indexOf("PlayBook") > -1 || browser.indexOf("BlackBerry") > -1) {
  // Are we running in WebWorks
  if (typeof blackberry != 'undefined') {
    DEVICE = "PB";    
  } else {
    DEVICE = "PB-Browser";
  }
} else {
  DEVICE = "PC";
}

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
stats.domElement.style.zIndex = '100';