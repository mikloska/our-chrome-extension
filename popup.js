// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

changeColor.innerHTML = 'Grab Images!'
changeColor.style.color = 'white'
changeColor.style.backgroundColor = 'blue'
// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  if(changeColor.innerHTML === 'View Images!'){
    window.open('options.html')
    //<button onclick="window.open('newpage.html', '_blank')" />
  } 
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //let icon = document.getElementById('')
  changeColor.innerHTML = 'View Images!'
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
  chrome.browserAction.setIcon({"16": "images/"})
}