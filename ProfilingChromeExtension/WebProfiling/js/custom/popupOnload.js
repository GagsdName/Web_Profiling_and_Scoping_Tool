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
    content: "Start crawling from this page"
  },
   {
    element: "#regex",
    title: "Regular Expression",
    content: "URL Regex you want to limit crawling to"
  },
  {
    element: "#plusone",
    title: "Beyond Restrictions",
    content: "Follow links beyond restriction"
  },
  {
    element: "#inline",
    title: "Inline",
    content: "To crawl inline content"
  },
   {
    element: "#scripts",
    title: "Scripts",
    content: "Crawl any script tags on the page"
  }, {
    element: "#arguments",
    title: "Avoid Arguments",
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

