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
						handStrength: 8,
						highestCardValue: handCards[handCards.length - 1].value
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
		if(straightLength === 3 && cards[cards.length -1].value === 12 && cards[0].value === 0 && lastSymbol === cards[cards.length -1].symbol) {
			for(var m = 0; m < 3; m++) {
				handCards.push(cards[m]);
			}
			handCards.push(cards[cards.length - 1]);
			return {
				cards: handCards,
				handStrength: 8,
				highestCardValue: 3
			};
		}
		else {
			return null;
		}
	};

	var isFourOfAKind = function(cards) {
		var sameValueCardsNumber = 0;
		var cardValue = -1;
		var handCards = [];
		var highCardValue;
		for(var i = cards.length - 1; i >= 0; i--) {
			if(cards[i].value === cardValue) {
				sameValueCardsNumber++;
				if(sameValueCardsNumber === 4) {
					for(var j = i; j < i + 4; j++) {
						handCards.push(cards[j]);
					}
					cards.splice(i, 4);
					//add highest card possible to hand
					highCardValue = cards[cards.length - 1].value;
					handCards.push(cards[cards.length - 1]);
					handCards.sort(sortCardsByValue);
					return {
						cards: handCards,
						handStrength: 7,
						setCardValue: cardValue,
						highCardValue: highCardValue
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
		var setThreeValue;
		for(var i = cards.length - 1; i >= 0; i--) {
			if(cards[i].value === cardValue) {
				sameValueCardsNumber++;
				if(sameValueCardsNumber === 3) {
					setThreeValue = cardValue;
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
									handStrength: 6,
									setThreeValue: setThreeValue,
									pairValue: cardValue
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
					handStrength: 5,
					highestCardValue: handCards[handCards.length - 1].value
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
						handStrength: 4,
						highestCardValue: handCards[handCards.length - 1].value
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
		if(straightLength === 3 && cards[cards.length -1].value === 12 && cards[0].value === 0) {
			for(var m = 0; m < 3; m++) {
				handCards.push(cards[m]);
			}
			handCards.push(cards[cards.length - 1]);
			return {
				cards: handCards,
				handStrength: 4,
				highestCardValue: 3
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
		var highCardsValues = [];
		for(var i = cards.length - 1; i >= 0; i--) {
			if(cards[i].value === cardValue) {
				sameValueCardsNumber++;
				if(sameValueCardsNumber === 3) {
					for(var j = i; j < i + 3; j++) {
						handCards.push(cards[j]);
					}
					cards.splice(i, 3);
					//add the 2 highest card possible to hand
					handCards.push(cards[cards.length - 2]);
					highCardsValues.push(cards[cards.length - 2].value);
					handCards.push(cards[cards.length - 1]);
					highCardsValues.push(cards[cards.length - 1].value);
					handCards.sort(sortCardsByValue);
					return {
						cards: handCards,
						handStrength: 3,
						setCardValue: cardValue,
						highCardsValues: highCardsValues
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
		var highPairValue;
		var lowPairValue;
		var highCardValue;
		for(var i = cards.length - 1; i >= 0; i--) {
			if(cards[i].value === cardValue) {
				sameValueCardsNumber++;
				if(sameValueCardsNumber === 2) {
					if(highPairValue) {
						lowPairValue = cardValue;
					}
					else {
						highPairValue = cardValue;
					}
					for(var j = i; j < i + 2; j++) {
						handCards.push(cards[j]);
					}
					cards.splice(i, 2);
					if(handCards.length === 4) {
						handCards.push(cards[cards.length - 1]);
						highCardValue = cards[cards.length - 1].value;
						return {
							cards: handCards,
							handStrength: 2,
							highPairValue: highPairValue,
							lowPairValue: lowPairValue,
							highCardValue: highCardValue
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
		var highCardsValues =[];
		for(var i = cards.length - 1; i >= 0; i--) {
			if(cards[i].value === cardValue) {
				sameValueCardsNumber++;
				if(sameValueCardsNumber === 2) {
					for(var j = i; j < i + 2; j++) {
						handCards.push(cards[j]);
					}
					cards.splice(i, 2);
					//add the 3 highest card possible to hand
					handCards.push(cards[cards.length - 3]);
					highCardsValues.push(cards[cards.length - 3].value);
					handCards.push(cards[cards.length - 2]);
					highCardsValues.push(cards[cards.length - 2].value);
					handCards.push(cards[cards.length - 1]);
					highCardsValues.push(cards[cards.length - 1].value);
					handCards.sort(sortCardsByValue);
					return {
						cards: handCards,
						handStrength: 1,
						setCardValue: cardValue,
						highCardsValues: highCardsValues
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
			handCards: cards,
			handStrength: 0
		};
	};

	var getNewPack = function() {
		var pack = [];
		for(var i = 0; i <= 12; i++) {
			for(var j = 0; j <= 3; i++) {
				pack.push({
					value: i,
					symbol: j
				});
			}
		}
		return pack;
	};

	var getPackWithoutSpecificCards = function(pack, cards) {
		if(!pack || pack.length === 0) {
			return null;
		}
		if(!cards || cards.length === 0) {
			return pack;
		}
		cards.forEach(function(card) {
			for(var i = 0; i < pack.length; i++) {
				if(card.value === pack[i].value && card.symbol === pack[i].symbol) {
					pack.splice(i, 1);
					break;
				}
			}
		});
	};

	var getBestHandPlayerId = function(players) {
		var bestHand = {
			handStrength: -1
		};
		var hand;
		var bestHandIds = [];
		for(var i = 0; i < players.length; i++) {
			hand = calculateHandStrength(players[i].cards);
			if(bestHand.handStrength < hand.handStrength) {
				bestHand = hand;
				bestHandIds = [];
				bestHandIds.push(players[i].id);
			}
			else if(bestHand.handStrength === hand.handStrength) {
				switch(bestHand.handStrength) {
					case 8 || 5 || 4:
						if(bestHand.highestCardValue < hand.highestCardValue) {
							bestHand = hand;
							bestHandIds = [];
							bestHandIds.push(players[i].id);
						}
						else if(bestHand.highestCardValue === hand.highestCardValue) {
							bestHandIds.push(players[i].id);
						}
						break;
					case 7:
						if(bestHand.setCardValue < hand.setCardValue) {
							bestHand = hand;
							bestHandIds = [];
							bestHandIds.push(players[i].id);
						}
						else if(bestHand.setCardValue === hand.setCardValue) {
							if(bestHand.highCardValue < hand.highCardValue) {
								bestHand = hand;
								bestHandIds = [];
								bestHandIds.push(players[i].id);
							}
							else if(bestHand.highCardValue === hand.highCardValue) {
								bestHandIds.push(players[i].id);
							}
						}
						break;
					case 6:
						if(bestHand.setThreeValue < hand.setThreeValue) {
							bestHand = hand;
							bestHandIds = [];
							bestHandIds.push(players[i].id);
						}
						else if(bestHand.setThreeValue === hand.setThreeValue) {
							if(bestHand.pairValue < hand.pairValue) {
								bestHand = hand;
								bestHandIds = [];
								bestHandIds.push(players[i].id);
							}
							else if(bestHand.pairValue === hand.pairValue) {
								bestHandIds.push(players[i].id);
							}
						}
						break;
					case 3 || 1:
						if(bestHand.setCardValue < hand.setCardValue) {
							bestHand = hand;
							bestHandIds = [];
							bestHandIds.push(players[i].id);
						}
						else if(bestHand.setCardValue === hand.setCardValue) {
							for(var i = bestHand.highCardsValues.length - 1; i >= 0; i--) {
								if(bestHand.highCardsValues[i] < hand.highCardsValues[i]) {
									bestHand = hand;
									bestHandIds = [];
									bestHandIds.push(players[i].id);
								}
								else if(bestHand.highCardsValues[i] === hand.highCardsValues[i]) {
									if(i === 0) {
										bestHandIds.push(players[i].id);
									}
								}
							}
						}
						break;
					case 2:
						if(bestHand.highPairValue < hand.highPairValue) {
							bestHand = hand;
							bestHandIds = [];
							bestHandIds.push(players[i].id);
						}
						else if(bestHand.highPairValue === hand.highPairValue) {
							if(bestHand.lowPairValue < hand.lowPairValue) {
								bestHand = hand;
								bestHandIds = [];
								bestHandIds.push(players[i].id);
							}
							else if(bestHand.lowPairValue === hand.lowPairValue) {
								if(bestHand.highCardValue < hand.highCardValue) {
									bestHand = hand;
									bestHandIds = [];
									bestHandIds.push(players[i].id);
								}
								else if(bestHand.highCardValue === hand.highCardValue) {
									bestHandIds.push(players[i].id);
								}
							}
						}
						break;
					case 0:
						for(var i = bestHand.handCards.length - 1; i >= 0; i--) {
							if(bestHand.handCards[i] < hand.handCards[i]) {
								bestHand = hand;
								bestHandIds = [];
								bestHandIds.push(players[i].id);
							}
							else if(bestHand.handCards[i] === hand.handCards[i]) {
								if(i === 0) {
									bestHandIds.push(players[i].id);
								}
							}
						}
						break;
				}
			}
		}
		return bestHandIds;
	};

	var calculatePlayersOdds = function(players, streets, pack) {
		var maximumStreets = 5;
		var numberOfCardsToOpen = maximumStreets - streets;
		//for all the cards options- compare between all the players
	};

	//usersCards: array of players objects. every player have: cards: [{value, symbol}X2], id: string
	//streets: array for flop, turn and river cards
	this.calculate = function(players, streets) {
		if(!players || players.length === 0) {
			return null;
		}
		var usersCards = [];
		for(var i = 0; i < players.length; i++) {
			players.cards.forEach(function(card) {
				usersCards.push(card);
			});
		}
		var usedCards;
		if(usersCards) {
			if(usersCards.length % 2 !== 0) {
				return null;
			}
			if(streets) {
				usedCards = usersCards.concat(streets);
			}
			else {
				usedCards = usersCards;
			}
		}
		else {
			return null;
		}
		var pack =  getNewPack();
		pack = getPackWithoutSpecificCards(pack, usedCards);

		var odds;

		return odds;
	};


};
