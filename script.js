
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";

const HOST = "tasty.p.rapidapi.com";
const APP_key = "cd9209b5c5msh05d3c5b7d6e2767p1dd595jsna33064bfd4db";
// console.log(container)


async function fetchAPI() {
  const searchQ = $("#pizza").val();
 const baseURL = `https://tasty.p.rapidapi.com/recipes/list?q=pizza&app_key=${APP_key}`;
  const baseURL2 = `https://www.themealdb.com/api/json/v1/1/random.php`;

  try
  {
  const response = await fetch(baseURL, { 
    "method": "GET", 
    "headers": {
   "x-rapidapi-key": APP_key, 
   "x-rapidapi-host": HOST 
   } 
  });
  const data = await response.json();
  generateHTML(data.results);
  console.log(data.results);

  const response1 = await fetch(baseURL2);
  const data1 = await response1.json();
  displayRandomVideo(data1.meals[0].strYoutube);
  
  }
  catch(err)
  {
    console.log(err);
  }
}
fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=eggs%2C cheese%2C bacon", 
{ "method": "GET", 
"headers": {
   "x-rapidapi-key": "cd9209b5c5msh05d3c5b7d6e2767p1dd595jsna33064bfd4db", "x-rapidapi-host": "tasty.p.rapidapi.com" 
   } 
}) .then(response => { console.log(response); }) .catch(err => { console.error(err); });

function displayRandomVideo(results) {
  $(".search-result").append(`<iframe width="420" height="315"
src="${results}">
</iframe>`);
  }


async function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.thumbnail_url}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.name}</h1>
        </div>
        <br>
        <div id="more">
        <p>
        <font color="white">Nutrition:<br>
          Calories: ${result.nutrition.calories} <br>
          Carbohydrates: ${result.nutrition.carbohydrates} <br>
          fat: ${result.nutrition.fat} <br>
          fiber: ${result.nutrition.fiber} <br>
          protein: ${result.nutrition.protein} <br>
          sugar: ${result.nutrition.sugar} <br>

        </font>
        </p>
        </div>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
//
}


function init()
{
  //fetchAPI();
  searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
  });

}
$(init);


//fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=eggs%2C cheese%2C bacon", 
/*{ "method": "GET", 
"headers": {
   "x-rapidapi-key": "cd9209b5c5msh05d3c5b7d6e2767p1dd595jsna33064bfd4db", "x-rapidapi-host": "tasty.p.rapidapi.com" 
   } 
}) .then(response => { console.log(response); }) .catch(err => { console.error(err); });*/


//https://tasty.p.rapidapi.com/recipes/list?from=0&size=5&tags=under_30_minutes&q=eggs,bacon,cheese;
