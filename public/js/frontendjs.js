

function setFlashMessageFadedOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < .05){
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    },4000);
}

function addFlashFromFrontEnd(message){
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('class', 'alert alert-info');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadedOut(flashMessageDiv);
}

function createCard(postData){
    return `<div class="card bg-primary text-white" id="post-${postData.id}">
        
        <div class="view overlay" >
          <img class="img-fluid" src="${postData.thumbnail}" alt="Card image cap">
          <a href="/post/${postData.id}">
            <div class="mask rgba-white-slight"></div>
          </a>
        </div>
    
        
        <div class="card.stretched-link">
    
          
          <h6 class="card-title">${postData.title}</h6>
          
      
          <a href="/routes/post/${postData.id}" class="btn btn-primary stretched-link">Post Details</a>
    
        </div>
    
      </div>`;
}


function executeSearch(){
    let searchTerm = document.getElementById('search-text').value;
    if(!searchTerm){
        location.replace('/');
        return;
    }
    let mainContent = document.getElementById('main-content');
    let mainContent2 = document.getElementById('main-content2');
    let other = document.getElementById('other');
    let searchURL = `/post/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newMainContentHTML = '';
            let newMainContentHTML2 = '';
            let newOther = '';
            let i = 1;
            data_json.results.forEach((row) => {

                if(i % 2 == 0)
                    newMainContentHTML += createCard(row);
                if(i % 2 == 1)
                    newMainContentHTML2 += createCard(row);
                i++;

            });
            mainContent.innerHTML = newMainContentHTML;
            mainContent2.innerHTML = newMainContentHTML2;
            other.innerHTML = newOther;
            if(data_json.message){
                addFlashFromFrontEnd(data_json.message);
            }
        })
        .catch((err) => console.log(err));
}

let flashElement = document.getElementById('flash-message');

if(flashElement){
    setFlashMessageFadedOut(flashElement);
}

let searchButton = document.getElementById('search-button');
if(searchButton){
    searchButton.onclick = executeSearch;
}
