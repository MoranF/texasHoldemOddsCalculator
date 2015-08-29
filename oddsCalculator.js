var oddsCalculator = function() {

	var sortCardsByValue = function(a,b) {
		if (a.value < b.value)
			return -1;
		if (a.value > b.value)
			return 1;
		return 0;
	};

	var addHighestCardsToArray = function(fromArray, toArray, numberOfCards, fieldName) {
		//the two arrays should be sorted
		if(fieldName) {
			for(var i = numberOfCards; i > 0; i--) {
				toArray.push(fromArray[fromArray.length - i][fieldName]);
			}
		}
		else {
			for(var i = numberOfCards; i > 0; i--) {
				toArray.push(fromArray[fromArray.length - i]);
			}
		}
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
				if(i < 3) {
					return null;
				}
				lastCardValue = cards[i].value;
				lastSymbol = cards[i].symbol;
				straightLength = 1;
			}
		}
		// if last card is ace, we need to check if can be ace,2,3,4,5 straight
		if(straightLength === 4 && cards[cards.length -1].value === 12 && cards[0].value === 0 && lastSymbol === cards[cards.length -1].symbol) {
			for(var m = 0; m < 4; m++) {
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
					cardValue = -1;
					sameValueCardsNumber = 0;
					for(var m = cards.length - 1; m >= 0; m--) {
						if(cards[m].value === cardValue) {
							sameValueCardsNumber++;
							if (sameValueCardsNumber === 2) {
								if(cardValue === setThreeValue) {
									continue;
								}
								for (var n = m; n < m + 2; n++) {
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
						handStrength: 4,
						highestCardValue: handCards[handCards.length - 1].value
					};
				}
				lastCardValue = cards[i].value;
			}
			else {
				if(i < 3) {
					return null;
				}
				lastCardValue = cards[i].value;
				straightLength = 1;
			}
		}
		// if last card is ace, we need to check if can be ace,2,3,4,5 straight
		if(straightLength === 4 && cards[cards.length -1].value === 12 && cards[0].value === 0) {
			for(var m = 0; m < 4; m++) {
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
					addHighestCardsToArray(cards, handCards, 2);
					addHighestCardsToArray(cards, highCardsValues, 2, 'value');
					return {
						cards: handCards,
						handStrength: 3,
						setCardValue: cardValue,
						highCardsValues: highCardsValues
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
					if(handCards.length === 4) {
						for(var i = cards.length - 1; i >= 0; i--) {
							if(cards[i].value !== highPairValue && cards[i].value !== lowPairValue) {
								handCards.push(cards[i]);
								highCardValue = cards[i].value;
								break;
							}
						}
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
					addHighestCardsToArray(cards, handCards, 3);
					addHighestCardsToArray(cards, highCardsValues, 3, 'value');
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
			cards: cards,
			handStrength: 0
		};
	};

	var getNewPack = function() {
		var pack = [];
		for(var i = 0; i <= 12; i++) {
			for(var j = 0; j <= 3; j++) {
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
		return pack;
	};

	var getBetterHandIndex = function(bestHand, playerHand, sortedPropertiesByStrength) {
		var property;
		for(var i = 0; i < sortedPropertiesByStrength.length; i++) {
			property = sortedPropertiesByStrength[i];
			if(bestHand[property].constructor === Array) {
				for(var j = property.length - 1; j >= 0; j--) {
					if(bestHand[property][j] < playerHand[property][j]) {
						return [playerHand.index];
					}
					if(bestHand[property][j] > playerHand[property][j]) {
						return [bestHand.index];
					}
				}
			}
			if(bestHand[property] < playerHand[property]) {
				return [playerHand.index];
			}
			if(bestHand[property] > playerHand[property]) {
				return [bestHand.index];
			}
		}
		return [bestHand.index, playerHand.index];
	};

	var getBestHandPlayerIndex = function(players) {
		var bestHand = {
			handStrength: -1
		};
		var hand;
		var bestHandIndexes = [];
		for(var i = 0; i < players.length; i++) {
			hand = calculateHandStrength(players[i].cards);
			hand.index = players[i].index;
			if(bestHand.handStrength < hand.handStrength) {
				bestHand = hand;
				bestHandIndexes = [];
				bestHandIndexes.push(players[i].index);
			}
			else if(bestHand.handStrength === hand.handStrength) {
				switch(bestHand.handStrength) {
					case 8:
					case 4:
						var properties = ['highestCardValue'];
						bestHandIndexes = getBetterHandIndex(bestHand, hand, properties);
						break;
					case 7:
						var properties = ['setCardValue', 'highCardValue'];
						bestHandIndexes = getBetterHandIndex(bestHand, hand, properties);
						break;
					case 6:
						var properties = ['setThreeValue', 'pairValue'];
						bestHandIndexes = getBetterHandIndex(bestHand, hand, properties);
						break;
					case 3:
					case 1:
						var properties = ['setCardValue', 'highCardsValues'];
						bestHandIndexes = getBetterHandIndex(bestHand, hand, properties);
						break;
					case 2:
						var properties = ['highPairValue', 'lowPairValue', 'highCardValue'];
						bestHandIndexes = getBetterHandIndex(bestHand, hand, properties);
						break;
					case 5:
					case 0:
						for(var j = bestHand.cards.length - 1; j >= 0; j--) {
							if(bestHand.cards[j].value < hand.cards[j].value) {
								bestHand = hand;
								bestHandIndexes = [];
								bestHandIndexes.push(players[i].index);
								break;
							}
							else if(bestHand.cards[j].value === hand.cards[j].value) {
								if(j === 0) {
									bestHandIndexes.push(players[i].index);
								}
							}
							else {
								break;
							}
						}
						break;
				}
			}
		}
		return bestHandIndexes;
	};

	var getPlayersOdds = function(numberOfCardsToOpen, packCards, startFromIndex, currentCards, players, streets) {
		// if(startFromIndex > packCards.length - numberOfCardsToOpen) {
		// 	return players;
		// }
		var index = currentCards.length;
		if(numberOfCardsToOpen === 1) {
			var indexes;
			var newPlayersArray;
			var concatCardsArray;
			var newPlayer = {};
			for(var i = startFromIndex; i < packCards.length; i++) {
				currentCards[index] = packCards[i];
				newPlayersArray = [];
				for(var m = 0; m < players.length; m++) {
					concatCardsArray = players[m].cards.concat(streets);
					concatCardsArray = concatCardsArray.concat(currentCards);
					newPlayer = {
						cards: concatCardsArray.sort(sortCardsByValue),
						index: m
					};
					newPlayersArray.push(newPlayer);
				}
				indexes = getBestHandPlayerIndex(newPlayersArray);
				if(indexes.length === 1) {
					players[indexes[0]].wins++;
				}
			}
			currentCards.pop();
			return players;
		}
		else {
			var result;
			for(var j = startFromIndex; j < packCards.length - numberOfCardsToOpen; j++) {
				currentCards[index] = packCards[j];
				result = getPlayersOdds(numberOfCardsToOpen - 1, packCards, j + 1, currentCards, players, streets);
			}
			currentCards.pop();
			return result;
		}
	};

	var calculatePlayersOdds = function(players, streets, pack) {
		if(!streets) {
			streets = [];
		}
		var maximumStreets = 5;
		var numberOfCardsToOpen = maximumStreets - streets.length;
		var optionsNumber = 1;
		players.forEach(function(player) {
			player.wins = 0;
		});
		for(var c = 0; c < numberOfCardsToOpen; c++) {
			optionsNumber = (optionsNumber * (pack.length - c)) / (c + 1);
		}
		var playersOdds = getPlayersOdds(numberOfCardsToOpen, pack, 0, [], players, streets);
		playersOdds.forEach(function(player) {
			player.wins = player.wins / optionsNumber * 100;
		});
		return playersOdds;
	};

	//players: array of players objects. every player have: cards: [{value, symbol}X2], id: string
	//streets: array for flop, turn and river cards
	this.calculate = function(players, streets) {
		if(!players || players.length === 0) {
			return null;
		}
		var usersCards = [];
		for(var i = 0; i < players.length; i++) {
			players[i].cards.forEach(function(card) {
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

		return calculatePlayersOdds(players, streets, pack);
	};

};
