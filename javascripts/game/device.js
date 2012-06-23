var DEVICE = "PC";
var browser = navigator.userAgent;
// Are we running in a PlayBook browser?
if (browser.indexOf("PlayBook") > -1 || browser.indexOf("Blackberry") > -1 || browser.indexOf("Dev") > -1) {
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


//  GOOGLE ANALYTICS TRACKING

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-32877724-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
