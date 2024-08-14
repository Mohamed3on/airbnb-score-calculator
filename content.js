const addCommas = (x) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const appendAfter = (element, newElement) => {
  element.parentNode.insertBefore(newElement, element.nextSibling);
};

let hasRun = false;

const getNumberOfReviews = (ratingsDescription) => {
  const regex = /(\d+) reviews/;
  if (ratingsDescription) {
    const text = ratingsDescription.textContent; // Get the text content of the element
    const match = text.match(regex); // Apply the regex

    if (match) {
      const numberOfReviews = parseInt(match[1], 10); // Parse the number from the capturing group
      return numberOfReviews;
    } else {
      console.log('No reviews number found in the text');
    }
  } else {
    console.log('Element not found');
  }
};

const getScore = (ratingElements) => {
  const ratingElementsArray = Array.from(ratingElements);

  const ratingDetails = ratingElementsArray.map((el) => parseInt(el.style.width, 10));
  const ratio = (ratingDetails[0] - ratingDetails[4]) / 100;
  const ratingsDescription = document.querySelector(
    `h2.hpipapi[elementtiming="LCP-target"] > span`
  );
  const numberOfReviews = getNumberOfReviews(ratingsDescription);
  const score = Math.round(numberOfReviews * ratio * ratio);
  const newDiv = document.createElement('div');
  newDiv.innerHTML = `${addCommas(String(score))} (${Math.round(ratio * 100)}%)`;
  appendAfter(document.querySelector('h1'), newDiv);
};

const observer = new MutationObserver(function () {
  const ratingElements = document.querySelectorAll('div.i5cdxym');

  if (ratingElements.length && !hasRun) {
    getScore(ratingElements);
    hasRun = true;
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
