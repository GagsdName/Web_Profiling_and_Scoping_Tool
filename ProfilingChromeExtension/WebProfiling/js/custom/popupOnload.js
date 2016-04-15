function pageLoaded() {
    document.getElementById("siteSpiderGo").addEventListener("click",clickGo);
    chrome.extension.getBackgroundPage().popupLoaded(document);
	var spiderbutton = document.getElementById('spiderButton');
	spiderButton.onclick=function(){
	tour_formOnload();
	};
	}
function tour_formOnload(){
//alert("yha bhi ");
	var tour = new Tour({
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
    element: "#start",
    title: "Avoid Arguments",
	prev: -1,
	next: 1,
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
    window.close();
}
  
window.addEventListener("load",pageLoaded);

