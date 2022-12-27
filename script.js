// Can use commas instead of writing 'const' a bunch of times!
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal')

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault() // don't want it to actually submit to a file

  // Clear single meal
  single_mealEl.innerHTML = ''

  // Get search term
  const term = search.value

  // Check if no term
  if(term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for "${term}"</h2>`

        if(data.meals === null) {
          resultHeading.innerHTML = `<h2>There are no search results for that ingredient.  Please try again.</h2>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
            `
            )
            .join(''); // makes into a string so they aren't separated by a comma
        }
      })

    // Clear search text
    search.value = ''
  } else {
    resultHeading.innerHTML = `<h2>Please enter an ingredient.</h2>`
  }
}

// Fetch meal by id
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0]

      addMealToDOM(meal)
    })
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break; // Once there are no ingredients left
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
    </div>
  `
}

// Event Listeners
submit.addEventListener('submit', searchMeal)

// Finding out if meal-info div belongs to element clicked on
mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => { // Goes through all child elements (items)
    if(item.classList) { // Checking if there are classes
      return item.classList.contains('meal-info') // Want to return element that has "meal-info" class
    } else {
      return false
    }
  })

  if(mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID') // Getting value for data-mealID attribute
    
    getMealById(mealID)
  }
})