'use strict';

console.log('hey there hey!');

// ******* GLOBAL VARIABLES *******
let voteCount = 25;
let productArray = [];

// ******* DOM REFERENCES *********
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');


// ******* CONSTRUCTOR FUNCTION ********

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}


Product.prototype.myMethod = function () {
  return 'hey';
};

// ****** HELPER FUNTCION / UTILITIES ******
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

let indexArray = [];

function renderImgs() {
  
  while (indexArray.length < 6) {
    let randomNum = randomIndex();
    if (!indexArray.includes(randomNum)) {
      indexArray.push(randomNum);
    }
  }
  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;

}

function renderChart() {

  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productViews.push(productArray[i].views);
    productVotes.push(productArray[i].clicks);
  }

  // Chart.defaults.font.size = 20;
  // Chart.defaults.font.weight = 'bold';

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        data: productVotes,
        label: '# of Votes',
        backgroundColor: [
          'red',
          'blue',
          'yellow',
          'purple',
          'pink',
        ],
        borderColor: [
          'black',
          'red',
        ],
        borderWidth: 2
      },
      {
        data: productViews,
        label: '# of Views',
        backgroundColor: [
          'grey',
        ],
        borderColor: [
          'black',
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


// ***** EVENT HANDLERS **********

function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;

  // TODO: Add clicks to the image that was clicked
  console.log('img clicked >>', imgClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === imgClicked) {
      // increase vote counts
      productArray[i].clicks++;
    }
  }

  // TODO: decrement the vote count
  voteCount--;

  // TODO: call the render img to reload new images
  renderImgs();

  // TODO: after voting rounds have ended... end the clicks!
  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);

     // ********* LOCAL STORAGE STARTS HERE ************
    // STEP 1: STRINGIFY THE DATA
    let stringProducts = JSON.stringify(productArray);

    console.log('duck products >>>', stringProducts);

    // STEP 2: ADD TO LOCAL STORAGE
    localStorage.setItem('myProducts', stringProducts);

  }
}

function handleShowResults() {
  // TODO: Display results - once there are no more votes left
  if (voteCount === 0) {
    renderChart();
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ********* MORE LOCAL STORAGE CODE *********
// STEP 3: PULL DATA OUT OF LOCAL STORAGE
let retreivedProducts = localStorage.getItem('myProducts');
console.log('retreivedProducts >>> ', retreivedProducts);

// STEP 4: PARSE MY DATA INTO CODE MY APP CAN USE

let parsedProducts = JSON.parse(retreivedProducts);

console.log('parsed Products >>>', parsedProducts);

// ****** EXECUTABLE CODE ********

if(retreivedProducts){
  productArray = parsedProducts;
} else{
new Product('sweep', 'png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');
}

console.log('product array after if/else', productArray);
console.log('product array after constructor >> ', productArray);
renderImgs();


imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);