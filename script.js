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
    fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  } else {
    alert('Please enter a main ingredient')
  }
}

// Event Listeners
submit.addEventListener('submit', searchMeal)