var tour;
function pageLoaded() {
    document.getElementById("siteSpiderGo").addEventListener("click",clickGo);
    chrome.extension.getBackgroundPage().popupLoaded(document);
	
	}
function tour_formOnload(){
	tour = new Tour({
  steps: [
  {
    element: "#start",
    title: "Start Page",
	prev: -1,
	next: 1,
    content: "Start crawling from this page"
  },
   {
    element: "#regex",
    title: "Regular Expression",
	prev: 0,
	next: 2,
    content: "URL Regex you want to limit crawling to"
  },
  {
    element: "#plusone",
    title: "Beyond Restrictions",
	prev: 1,
	next: 3,
    content: "Follow links beyond restriction"
  },
  {
    element: "#inline",
    title: "Inline",
	prev: 2,
	next: 4,
    content: "To crawl inline content"
  },
   {
    element: "#scripts",
    title: "Scripts",
	prev: 3,
	next: 5,
    content: "Crawl any script tags on the page"
  }, 
  {
    element: "#arguments",
    title: "Avoid Arguments",
	prev: 4,
	next: 0,
    content: "Avoid Links with Arguments"
  }
]});

// Initialize the tour
tour.init(true);

// Start the tour
	tour.start(true);

}
function clickGo() {
    chrome.extension.getBackgroundPage().popupGo();
    $("#siteSpiderStop").removeClass('hide');
    $("#siteSpiderPause").removeClass('hide');
    $("#siteSpiderStop").val('Stop');
    $("#siteSpiderPause").val('Pause');
}
  
window.addEventListener("load",pageLoaded);

