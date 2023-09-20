chrome.storage.local.get("shows", (res) => {
  console.log(res);
  for (const iterator of res.shows) {
    renderShow(iterator);
  }
});

function renderShow(show) {
  const { name, image } = show.show;  
  
  const title = document.createElement("h3");
  title.textContent = name;

  const showImage = document.createElement("img");
  showImage.src = image?.medium ?? null;
  
  const showDiv = document.createElement("div");
  showDiv.appendChild(title);
  showDiv.appendChild(showImage);

  document.body.appendChild(showDiv);
}