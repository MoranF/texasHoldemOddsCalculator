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
		var lastCardValue = -1;
		var straightLength = 0;
		var lastSymbol = -1;
		var handCards = [];
		for(var i = cards.length - 1; i >= 0; i--) {
			if(lastCardValue === cards[i].value + 1 && lastSymbol === cards[i].symbol) {
				straightLength++;
				if(straightLength === 5) {
					for(var j = i; j < i + 5; j++) {
						handCards.push(cards[j]);
					}
					return {
						cards: handCards,
						handStrength: 8
					};
				}
				lastCardValue = cards[i].value;
			}
			else {
				if(i < 4) {
					return null;
				}
				lastCardValue = cards[i].value;
				lastSymbol = cards[i].symbol;
				straightLength = 1;
			}
		}
		// if last card is ace, we need to check if can be ace,2,3,4,5 straight
		if(straightLength === 3 && cards[cards.length -1].value === 13 && cards[0].value === 0 && lastSymbol === cards[cards.length -1].symbol) {
			for(var m = 0; m < 3; m++) {
				handCards.push(cards[m]);
			}
			handCards.push(cards[cards.length - 1]);
			return {
				cards: handCards,
				handStrength: 8
			};
		}
		else {
			return null;
		}
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
				if(i < 3) {
					return null;
				}
				cardValue = cards[i].value;
				sameValueCardsNumber = 1;
			}
		}
	};

	var isFullHouse = function(cards) {
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
					cardValue = -1;
					sameValueCardsNumber = 0;
					for(var m = cards.length - 1; m >= 0; m--) {
						if(cards[m].value === cardValue) {
							sameValueCardsNumber++;
							if (sameValueCardsNumber === 2) {
								for (var n = m; n < i + 2; n++) {
									handCards.push(cards[n]);
								}
								handCards.sort(sortCardsByValue);
								return {
									cards: handCards,
									handStrength: 6
								};
							}
						}
						else {
							if(m < 1) {
								return null;
							}
							cardValue = cards[m].value;
							sameValueCardsNumber = 1;
						}
					}
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
		var lastCardValue = -1;
		var straightLength = 0;
		var handCards = [];
		for(var i = cards.length - 1; i >= 0; i--) {
			if(lastCardValue === cards[i].value + 1) {
				straightLength++;
				if(straightLength === 5) {
					for(var j = i; j < i + 5; j++) {
						handCards.push(cards[j]);
					}
					return {
						cards: handCards,
						handStrength: 4
					};
				}
				lastCardValue = cards[i].value;
			}
			else {
				if(i < 4) {
					return null;
				}
				lastCardValue = cards[i].value;
				straightLength = 1;
			}
		}
		// if last card is ace, we need to check if can be ace,2,3,4,5 straight
		if(straightLength === 4 && cards[cards.length -1].value === 13 && cards[0].value === 0) {
			for(var m = 0; m < 4; m++) {
				handCards.push(cards[m]);
			}
			handCards.push(cards[cards.length - 1]);
			return {
				cards: handCards,
				handStrength: 4
			};
		}
		else {
			return null;
		}
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
					if(handCards.length === 4) {
						handCards.push(cards[cards.length - 1]);
						return {
							cards: handCards,
							handStrength: 2
						};
					}
				}
			}
			else {
				if(i < 1) {
					return null;
				}
				cardValue = cards[i].value;
				sameValueCardsNumber = 1;
			}
		}
		return null;
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
					//add the 3 highest card possible to hand
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
				if(i < 1) {
					return null;
				}
				cardValue = cards[i].value;
				sameValueCardsNumber = 1;
			}
		}
	};

	//hand strength: straight flush = 8, four of a kind = 7, full house = 6, flush = 5, straight = 4, three of a kind = 3, two pairs = 2, one pair = 1, high card = 0
	this.calculateHandStrength = function(cards) {
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
