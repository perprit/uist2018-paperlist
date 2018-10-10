function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() { 
    if (rawFile.readyState === 4 && rawFile.status === 200) {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

readTextFile("./entities.json", function(text) {
  var data = JSON.parse(text);
  container = document.getElementById("summary-container");
  for (var key in data) {
    var paper = data[key];

    var card = document.createElement("div");
    card.classList.add("card");
    container.appendChild(card);
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);
    var row1 = document.createElement("div");
    row1.classList.add("row");
    cardBody.appendChild(row1);
    var contentArea = document.createElement("div");
    contentArea.classList.add("col-sm-8");
    row1.appendChild(contentArea);
    var subtype = document.createElement("span");
    subtype.classList.add("badge");
    subtype.classList.add("badge-primary");
    subtype.textContent = paper["subtype"];
    var title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = paper["title"];
    var authorArea = document.createElement("ul");
    for (var i=0; i<paper["authors"].length; i++) {
      var author = document.createElement("li");
      author.textContent = paper["authors"][i]["name"];
      authorArea.appendChild(author);
    }
    var summary = document.createElement("p");
    summary.classList.add("card-text");
    summary.textContent = paper["abstract"];
    var keywordArea = document.createElement("div");
    keywordArea.classList.add("row");
    for (var i=0; i<paper["keywords"].length; i++) {
      var keyword = document.createElement("span");
      keyword.classList.add("badge");
      keyword.classList.add("badge-pill");
      keyword.textContent = paper["keywords"][i];
      keywordArea.appendChild(keyword);
    }

    contentArea.appendChild(subtype);
    contentArea.appendChild(title);
    contentArea.appendChild(authorArea);
    contentArea.appendChild(summary);
    contentArea.appendChild(keywordArea);

    if (paper.hasOwnProperty("image_url")) {
      var imgArea = document.createElement("div");
      imgArea.classList.add("col-sm-4");
      row1.appendChild(imgArea);
      
      var img = document.createElement("img");
      img.setAttribute("src", paper["image_url"]);
      img.classList.add("img-thumbnail");
      img.classList.add("align-middle");
      imgArea.appendChild(img);
    }
  }
});

