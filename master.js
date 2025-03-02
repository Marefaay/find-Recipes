// setup varidables
let searchInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let resultArea = document.querySelector(".result-area");
let reciipeDetails = document.querySelector(".reciipe-details");
//search bttn events
searchBtn.addEventListener("click", searchRecipe);
function searchRecipe() {
  let recipeSearch = searchInput.value;
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeSearch}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => drawUI(data));
}
function drawUI(data) {
  try {
   
    data.meals.forEach((meal) => {
      console.log(meal);
      resultArea.innerHTML += `
         <div class="result-box">
              <img
                src="${meal.strMealThumb}"
                alt=""
              />
              <div class="result-box-info">
                <h1>${meal.strMeal}</h1>
                <button onclick="getDetails(${meal.idMeal})">Get Details</button>
              </div>
            </div>
        `;
    });
  } catch (e) {
    console.log(e);
  }
}
function getDetails(idmeal) {
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}
`;
  console.log(idmeal);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showDetails(data);
    });
}
function showDetails(data) {
  try {
    reciipeDetails.style.display = "block";

    reciipeDetails.innerHTML = `
        
        <button id="details-btn" onclick="closeDetails()"> 
                <i class="fa-solid fa-xmark" ></i>
        </button>
         <h1 >${data.meals[0].strMeal} Details</h1>
         <h2>Instructions</h2>
         <p>
         ${data.meals[0].strInstructions}
         </p>
         <a href="${data.meals[0].strYoutube}" id="details-link">watch video</a>
      `;
  } catch (e) {
    console.log(e);
  }
}


function closeDetails() {

  reciipeDetails.style.display = "none";
}
