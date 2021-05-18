var saannotPage = (ohjeetPage = 0), //current page of rules / guide
  currentCard = -2, //card number/index counter
  cardCount = 203, //manual count of cards available (in /kortit)
  playedCards = [], //array with all the played cards
  warned = false,
  deck = shuffleCards(cardCount); //deck of cards, with shuffled order

function nextCard() {
  //gets and shows the next card
  var kortti = document.getElementById("kortti"); //element (img) in which the card is shown
  next = deck[currentCard + 1]; //next card = current card + 1
  if (next >= 0 && next < deck.length) {
    //if the next card is in the deck
    if (deck[next] >= 192 && deck[next] <= 202 && warned == false) {
      //if the card == salainen
      kortti.src = "extra/salainen.png"; //show a warning
      warned = true;
    } else {
      kortti.src = "kortit/" + deck[next] + ".jpg"; //the next card is shown
      playedCards.push(deck[currentCard]); //card added to played cards
      document.getElementById("counter").style = "visibility: visible"; //the counter is visible
      document.getElementById("counter").innerHTML =
        playedCards.length + "/" + deck.length; //update the counter
      currentCard++; //current card number updated (increased)
      warned = false;
      //console.log(currentCard);
    }
  } else if (currentCard == -2) {
    //if the current card is the "starting card" (-2)
    kortti.src = "extra/ohjeet_0.png"; //show a blank card before showing cards from the deck
    // document.getElementById('counter').style = "visibility: hidden";
    currentCard++; //current card number updated (increased)
    // console.log(currentCard);
  } else if (currentCard > deck.length) {
    kortti.src = "extra/tausta_light.png"; //show a blank card before showing cards from the deck
    document.getElementById("counter").style = "visibility: hidden";
  }
}
function previousCard() {
  //gets and shows the previous card
  var kortti = document.getElementById("kortti"); //element (img) in which the card is shown
  previous = deck[currentCard - 1]; //previous card = current card - 1
  if (previous >= 0 && previous < deck.length) {
    //if the previous card is in the deck
    kortti.src = "kortit/" + deck[previous] + ".jpg"; //show the previous card
    playedCards.pop(); //remove the last played card from played cards
    //console.log(playedCards.length + '/' + deck.length);
    // document.getElementById('counter').style = "visibility: visible";
    document.getElementById("counter").innerHTML =
      playedCards.length + "/" + deck.length; // update the counter
    currentCard--; //current card number updated (decreased)
    // console.log(currentCard);
  } else if (currentCard == 0 || currentCard == -1) {
    //if the previous card is "no card"
    kortti.src = "extra/tausta_light.png"; //show a blank card
    playedCards.pop(); //remove the last played card from played cards
    document.getElementById("counter").style = "visibility: hidden"; //hide the counter
    currentCard = -1; //current card number set to -1 so the rules are not shown again
    // console.log(currentCard);
  }
}
function nextSaanto() {
  //toggles between rule pages
  var saanto = document.getElementById("saannotImg");
  if (saannotPage == 0) {
    saannotPage = 1;
    saanto.src = "extra/säännöt_2.png";
  } else if (saannotPage == 1) {
    saannotPage = 0;
    saanto.src = "extra/säännöt_1.png";
  }
}
function nextOhje() {
  //toggles between guide pages
  var ohje = document.getElementById("ohjeetImg");
  if (ohjeetPage == 0) {
    ohjeetPage = 1;
    ohje.src = "extra/ohjeet_2.png";
  } else if (ohjeetPage == 1) {
    ohjeetPage = 0;
    ohje.src = "extra/ohjeet_1.png";
  }
}
function shuffleCards(count) {
  //"shuffles the deck" i.e. generates an array of card indexes in random order
  let numberRange = []; //array for all the indexes
  for (let i = 0; i < count; i++) {
    //add every index (number within the range) to the array
    numberRange.push(i);
  }

  function shuffle(array) {
    //shuffle the array with the Fisher–Yates Shuffle
    var i = array.length,
      j = 0,
      temp;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  let cards = shuffle(numberRange);

  return cards;
}
function preloadImages(count) {
  var images = [];
  for (var i = 0; i < count; i++) {
    images[i] = new Image();
    images[i].src = "kortit/" + i + ".jpg";
  }
  //console.log(images);
}

function onLoad() {
  preloadImages(cardCount);
}

document.onkeydown = function (e) {
  //keydown event listener
  e = e || window.event;
  // console.log(e.keyCode);
  if (e.keyCode == 39) {
    //right arrow key
    nextCard();
  }
  if (e.keyCode == 37) {
    //left arrow key
    previousCard();
  }
};
