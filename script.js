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
              <h2>${meal.strMeal}</h2>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            </div>
          `
          )
          .join('') // makes into a string so they aren't separated by a comma
        }
      })
  } else {
    resultHeading.innerHTML = `<h2>Please enter an ingredient.</h2>`
  }
}

// Event Listeners
submit.addEventListener('submit', searchMeal)