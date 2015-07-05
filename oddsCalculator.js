var oddsCalculator = function() {

	var sortCardsByValue = function(a,b) {
		if (a.value < b.value)
			return -1;
		if (a.value > b.value)
			return 1;
		return 0;
	}

	var calculateHandRank = function(handCards, packCards) {

	};

	var isStraightFlush = function(cards) {
	};

	var isFourOfAKind = function(cards) {
		var sameValueCardsNumber = 0;
		var cardValue;
		var handCards = [];
		for(var i = cards.length - 1; i >= 0; i--) {
			if(cards[i].value === cardValue) {
				sameValueCardsNumber++;
				if(sameValueCardsNumber === 4) {
					for(var j = i; j < i + 4; j++) {
						handCards.push(cards[j]);
					}
					cards.splice(i, 4);
					//add highest card possible to hand
					handCards.push(cards[cards.length - 1]);
					handCards.sort(sortCardsByValue);
					return {
						cards: handCards,
						handStrength: 7
					};
				}
			}
			else {
				if(i < 4) {
					return null;
				}
				cardValue = cards[i].value;
				sameValueCardsNumber = 1;
			}
		}
	};

	var isFullHouse = function(cards) {

	};

	var isFlush = function(cards) {
		var symbols = [0,0,0,0];
		var handCards = [];
		var currentSymbolIndex;
		for(var i = cards.length - 1; i >= 0; i--) {
			currentSymbolIndex = cards[i].symbol;
			symbols[currentSymbolIndex]++;
			if(symbols[currentSymbolIndex] === 5) {
				for(var j = i; j < cards.length; j++) {
					if(cards[j].symbol === currentSymbolIndex) {
						handCards.push(cards[j]);
					}
				}
				return {
					cards: handCards,
					handStrength: 5
				};
			}
		}
		return null;
	};

	var isStraight = function(cards) {

	};

	var isThreeOfAKind = function(cards) {
		var sameValueCardsNumber = 0;
		var cardValue;
		var handCards = [];
		for(var i = cards.length - 1; i >= 0; i--) {
			if(cards[i].value === cardValue) {
				sameValueCardsNumber++;
				if(sameValueCardsNumber === 3) {
					for(var j = i; j < i + 3; j++) {
						handCards.push(cards[j]);
					}
					cards.splice(i, 3);
					//add the 2 highest card possible to hand
					handCards.push(cards[cards.length - 1]);
					handCards.push(cards[cards.length - 2]);
					handCards.sort(sortCardsByValue);
					return {
						cards: handCards,
						handStrength: 3
					};
				}
			}
			else {
				if(i < 3) {
					return null;
				}
				cardValue = cards[i].value;
				sameValueCardsNumber = 1;
			}
		}
	};

	var isTwoPairs = function(cards) {

	};

	var isOnePair = function(cards) {
		var sameValueCardsNumber = 0;
		var cardValue;
		var handCards = [];
		for(var i = cards.length - 1; i >= 0; i--) {
			if(cards[i].value === cardValue) {
				sameValueCardsNumber++;
				if(sameValueCardsNumber === 2) {
					for(var j = i; j < i + 2; j++) {
						handCards.push(cards[j]);
					}
					cards.splice(i, 2);
					//add the 2 highest card possible to hand
					handCards.push(cards[cards.length - 1]);
					handCards.push(cards[cards.length - 2]);
					handCards.push(cards[cards.length - 3]);
					handCards.sort(sortCardsByValue);
					return {
						cards: handCards,
						handStrength: 1
					};
				}
			}
			else {
				if(i < 2) {
					return null;
				}
				cardValue = cards[i].value;
				sameValueCardsNumber = 1;
			}
		}
	};

	//hand strength: straight flush = 8, four of a kind = 7, full house = 6, flush = 5, straight = 4, three of a kind = 3, two pairs = 2, one pair = 1, high card = 0
	var calculateHandStrength = function(cards) {
		var handParameters = isStraightFlush(cards);
		if(handParameters) {
			return handParameters;
		}
		handParameters = isFourOfAKind(cards);
		if(handParameters) {
			return handParameters;
		}
		handParameters = isFullHouse(cards);
		if(handParameters) {
			return handParameters;
		}
		handParameters = isFlush(cards);
		if(handParameters) {
			return handParameters;
		}
		handParameters = isStraight(cards);
		if(handParameters) {
			return handParameters;
		}
		handParameters = isThreeOfAKind(cards);
		if(handParameters) {
			return handParameters;
		}
		handParameters = isTwoPairs(cards);
		if(handParameters) {
			return handParameters;
		}
		handParameters = isOnePair(cards);
		if(handParameters) {
			return handParameters;
		}

		return {
			cards: cards,
			handStrength: 0
		};
	};

	//usersCards: array of cards. every two cards belong to single player
	//streets: array for flop, turn and river cards
	//packCards: cards left in the pack
	this.calculate = function(usersCards, streets, packCards) {
		var odds;

		return odds;
	};


};
