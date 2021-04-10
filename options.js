//let page = document.getElementById("buttonDiv");
// let selectedClassName = "current";
// const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// // Reacts to a button click by marking marking the selected button and saving
// // the selection
// function handleButtonClick(event) {
//   // Remove styling from the previously selected color
//   let current = event.target.parentElement.querySelector(
//     `.${selectedClassName}`
//   );
//   if (current && current !== event.target) {
//     current.classList.remove(selectedClassName);
//   }

//   // Mark the button as selected
//   let color = event.target.dataset.color;
//   event.target.classList.add(selectedClassName);
//   chrome.storage.sync.set({ color });
// }

// // Add a button to the page for each supplied color
// function constructOptions(buttonColors) {
//   chrome.storage.sync.get("color", (data) => {
//     let currentColor = data.color;

//     // For each color we were provided…
//     for (let buttonColor of buttonColors) {
//       // …crate a button with that color…
//       let button = document.createElement("button");
//       button.dataset.color = buttonColor;
//       button.style.backgroundColor = buttonColor;

//       // …mark the currently selected color…
//       if (buttonColor === currentColor) {
//         button.classList.add(selectedClassName);
//       }

//       // …and register a listener for when that button is clicked
//       button.addEventListener("click", handleButtonClick);
//       page.appendChild(button);
//     }
//   });
// }

// Initialize the page by constructing the color options
//constructOptions(presetButtonColors);

// Display the photos in the dimensions of an icon
function constructIcons() {
  chrome.storage.sync.get('imgUrl', (data) => {
    const container = document.getElementById('container')
    console.log(data.imgUrl);
    for (const imgUrl of data.imgUrl) {
      const div = document.createElement('div');
      div.style.width = '100%'
      div.style.textAlign = 'center'
      const img = new Image();
      img.src = imgUrl;
      img.width = 128;
      img.height = 128;    
      const canvas = document.createElement('canvas');
      canvas.width = 128
      const ctx = canvas.getContext('2d');
      img.addEventListener('load', e => {
        ctx.drawImage(img, 0, 0, 128, 128);
      })
      // div.appendChild(img);
      div.appendChild(canvas);
      container.appendChild(div);
    }
  });
}

constructIcons();
