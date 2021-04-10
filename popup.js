// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractAllImg,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

function extractAllImg() {
  const imgObj = document.getElementsByTagName('img');
  let imgUrl = [];
  for (let i = 0; i < imgObj.length; i++) {
    const str = imgObj[i].src;
    if (str.indexOf('https://') === 0 || str.indexOf('http://') === 0) {
      imgUrl.push(str);
    }
  }
  console.log(imgUrl);
  imgUrl = imgUrl.slice(0, 50);
  chrome.storage.sync.set({ imgUrl });
}