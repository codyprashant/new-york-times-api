//News Categories
var navHeadings = ['home', 'world','politics','magazine', 'technology','science','health','sports','arts','fashion','food','travel'];
//Month Names
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//New York Times Developers API
var api_key = 'CZbpvgNGWNNclm7AoGqR4evpNQi3wDyB';
//setting activeTab session value default as home
sessionStorage.setItem("activeTab", 'home');

//Creating Header with Navbar by DOM elements
function createHeader(){
 var header = document.createElement('header');
 var nav = document.createElement('nav');
 nav.setAttribute('class', 'navbar navbar-expand-xl navbar-dark fixed-top bg-dark');

 var navA = document.createElement("a");
  navA.setAttribute("class", "navbar-brand");
  navA.setAttribute("onclick", "getNews('home')");
  navA.setAttribute("href", "#");
  navA.innerText = "New York Times";

  var navButton = document.createElement("button");
  navButton.setAttribute("class", "navbar-toggler");
  navButton.setAttribute("type", "button");
  navButton.setAttribute("data-toggle", "collapse");
  navButton.setAttribute("data-target", "#navbarCollapse");
  navButton.setAttribute("aria-controls", "navbarCollapse");
  navButton.setAttribute("aria-expanded", "false");
  navButton.setAttribute("aria-label", "Toggle navigation");

  var navButtonSpan = document.createElement("span");
  navButtonSpan.setAttribute("class", "navbar-toggler-icon");
  navButton.appendChild(navButtonSpan);

  var navDiv = document.createElement("div");
  navDiv.setAttribute("class", "collapse navbar-collapse");
  navDiv.setAttribute("id", "navbarCollapse");

  var navDivUl = document.createElement("ul");
  navDivUl.setAttribute("class", "navbar-nav ml-auto");

for(let i = 0; i< navHeadings.length; i++){
  
  var li = document.createElement("li");
  li.setAttribute("class", "nav-item text-uppercase");
  li.id = navHeadings[i];

  var liA = document.createElement("a");
  liA.setAttribute("class", "nav-link");
  liA.setAttribute("onclick", "getNews('"+navHeadings[i]+"')");
  liA.href = "#";
  liA.innerText = navHeadings[i];
  li.appendChild(liA);
  navDivUl.appendChild(li);
}
  
  navDiv.appendChild(navDivUl);
  nav.append(navA, navButton, navDiv);
  header.appendChild(nav);
  return header;
}

//Creating footer by DOM elements
function createFooter() {
    var foot = document.createElement("footer");
    foot.setAttribute("class", "footer fixed-bottom mt-auto py-2");
  
    var footDiv = document.createElement("div");
    footDiv.setAttribute("class", "container-fluid");
  
    var footDivSpan = document.createElement("span");
    footDivSpan.setAttribute("class", "text-muted");
    footDivSpan.innerHTML =
      'Designed with <i class="fas fa-heart" style="color:red"></i> by Prashant Gupta(<a href="https://github.com/codyprashant/new-york-times-api" target="_blank" style="color: crimson;">@codyPrashant</a>)';
  
    footDiv.appendChild(footDivSpan);
    foot.appendChild(footDiv);
  
    return foot;
  }

  //Creating Main Section by DOM elements
  function createMain(){
    var main = document.createElement('main');
    main.setAttribute('role', 'main');
    main.setAttribute('class', 'flex-shrink-0');

    var container = document.createElement('div');
    container.setAttribute('class', 'container-fluid');
    container.id = 'newYorkTimes'
    main.append(container);
    return main;
  }

// Api call using fetch with async and await
  async function getNews(category){
    try{
    //Api Call
      var data = await fetch('https://api.nytimes.com/svc/topstories/v2/'+category+'.json?api-key='+api_key);
      if(data.status == 200 && data.statusText == 'OK')
      {
        var jsonData = await data.json();
        createCard(category, jsonData)
      } else{
        generateErrorSection(category, data);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  // handling and showing error message on UI
  async function generateErrorSection(category, data){
    document.getElementById('newYorkTimes').innerHTML = '';
    var container = document.getElementById('newYorkTimes');
    var tabActive = await sessionStorage.getItem("activeTab");

    document.getElementById(tabActive).setAttribute("class", "nav-item text-uppercase");
    document.getElementById(category).setAttribute("class", "nav-item text-uppercase active");

    var h1 = document.createElement('h1');
    h1.setAttribute('class','mt-5');
    h1.innerText = 'Something Went Wrong...';

    var h2 = document.createElement('h2');
    h2.setAttribute('class','mt-3');
    h2.innerText = 'Please try again later. We are receiving "'+data.status+': '+data.statusText+'"';


    container.append(h1, h2);
    await sessionStorage.setItem("activeTab", category);
  }

  //creating Card with data received from APi Call
  async function createCard(category, jsonData){
    document.getElementById('newYorkTimes').innerHTML = '';
    var container = document.getElementById('newYorkTimes');
    var tabActive = await sessionStorage.getItem("activeTab");

    document.getElementById(tabActive).setAttribute("class", "nav-item text-uppercase");
    document.getElementById(category).setAttribute("class", "nav-item text-uppercase active");

    var h1 = document.createElement('h1');
    h1.setAttribute('class','mt-5 text-uppercase');
    h1.innerText = category;

    var deck = document.createElement('div');
    deck.setAttribute('class', 'card-deck mt-4');

    var mainRow = document.createElement('div');
    mainRow.setAttribute('class', 'row');

    //Iterating and creating cards dynamically on the basis of received JSON data results
    for(let i =0; i< jsonData.results.length; i++){

        var maincol = document.createElement('div');
        maincol.setAttribute('class', 'col-12 colStyle')

        var card = document.createElement('div');
        card.setAttribute('class', 'card');

        var row = document.createElement('div');
        row.setAttribute('class', 'row ');

        var content = document.createElement('div');
        content.setAttribute('class', 'col-8')
        
        // News section of card
        var contentBody = document.createElement('div');
        contentBody.setAttribute('class', 'card-body');

        var section = document.createElement('h4');
        section.setAttribute('class', 'card-title text-uppercase section-card');
        section.innerHTML = jsonData.results[i].section;

        var title = document.createElement('h5');
        title.setAttribute('class', 'card-title titlecard');
        title.innerHTML = jsonData.results[i].title;

        var createdDate = document.createElement('p');
        createdDate.setAttribute('class', 'card-text  date-card');

        var date = document.createElement('small');
        date.setAttribute('class', 'text-muted');
        date.innerText = formatDate(jsonData.results[i].created_date);

        createdDate.appendChild(date);

        var abstract = document.createElement('p');
        abstract.setAttribute('class', 'card-text abstract-card');
        abstract.innerText = jsonData.results[i].abstract;

        var link = document.createElement('a');
        link.setAttribute('class', 'card-link continueReading');
        link.href = jsonData.results[i].short_url;
        link.innerText = 'Continue Reading';
        link.target = '_blank';

        var footer = document.createElement('footer');
        footer.setAttribute('class', 'blockquote-footer float-right');
        footer.innerText = jsonData.results[i].byline;

        contentBody.append(section, title, createdDate, abstract, link, footer);
        content.appendChild(contentBody);

        // Image section of card
        var contentImage = document.createElement('div');
        contentImage.setAttribute('class', 'col-4');

        var img = document.createElement('img');
        img.setAttribute('class', 'card-img img-thumbnail imgStyle' );
        if(jsonData.results[i].multimedia != null){img.src = jsonData.results[i].multimedia[0].url}
        else{img.src = 'images/common.jpg'};

        contentImage.appendChild(img);

        row.append(content, contentImage);
        card.append(row);

        maincol.append(card);
        mainRow.append(maincol);
    }
    container.append(h1, mainRow);
    await sessionStorage.setItem("activeTab", category);
}

  // Function to format Received timestamp into required format using Date objects
function formatDate(dateString){
    let dateObj = new Date(dateString);
    let month = monthNames[dateObj.getMonth()];
    let year = dateObj.getFullYear();
    let output = month  + ',' + year;
    return output;
}

//using all the functions of Header, Main and Footer
var head = createHeader();
var main = createMain();
var foot = createFooter();
document.body.append(head, main, foot);
window.onload = (event) => {getNews('home');};
// getNews('home');