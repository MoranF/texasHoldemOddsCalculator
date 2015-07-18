var oddsCalculator = function() {

	var sortCardsByValue = function(a,b) {
		if (a.value < b.value)
			return -1;
		if (a.value > b.value)
			return 1;
		return 0;
	}

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
					for(var m = i - 1; m >= 0; m--) {
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

	var getBestHandPlayerIndex = function(players) {
		var bestHand = {
			handStrength: -1
		};
		var hand;
		var bestHandIndexes = [];
		for(var i = 0; i < players.length; i++) {
			hand = calculateHandStrength(players[i].cards);
			if(bestHand.handStrength < hand.handStrength) {
				bestHand = hand;
				bestHandIndexes = [];
				bestHandIndexes.push(players[i].index);
			}
			else if(bestHand.handStrength === hand.handStrength) {
				switch(bestHand.handStrength) {
					case 8:
					case 5:
					case 4:
						if(bestHand.highestCardValue < hand.highestCardValue) {
							bestHand = hand;
							bestHandIndexes = [];
							bestHandIndexes.push(players[i].index);
						}
						else if(bestHand.highestCardValue === hand.highestCardValue) {
							bestHandIndexes.push(players[i].index);
						}
						break;
					case 7:
						if(bestHand.setCardValue < hand.setCardValue) {
							bestHand = hand;
							bestHandIndexes = [];
							bestHandIndexes.push(players[i].index);
						}
						else if(bestHand.setCardValue === hand.setCardValue) {
							if(bestHand.highCardValue < hand.highCardValue) {
								bestHand = hand;
								bestHandIndexes = [];
								bestHandIndexes.push(players[i].index);
							}
							else if(bestHand.highCardValue === hand.highCardValue) {
								bestHandIndexes.push(players[i].index);
							}
						}
						break;
					case 6:
						if(bestHand.setThreeValue < hand.setThreeValue) {
							bestHand = hand;
							bestHandIndexes = [];
							bestHandIndexes.push(players[i].index);
						}
						else if(bestHand.setThreeValue === hand.setThreeValue) {
							if(bestHand.pairValue < hand.pairValue) {
								bestHand = hand;
								bestHandIndexes = [];
								bestHandIndexes.push(players[i].index);
							}
							else if(bestHand.pairValue === hand.pairValue) {
								bestHandIndexes.push(players[i].index);
							}
						}
						break;
					case 3:
					case 1:
						if(bestHand.setCardValue < hand.setCardValue) {
							bestHand = hand;
							bestHandIndexes = [];
							bestHandIndexes.push(players[i].index);
						}
						else if(bestHand.setCardValue === hand.setCardValue) {
							for(var j = bestHand.highCardsValues.length - 1; j >= 0; j--) {
								if(bestHand.highCardsValues[j] < hand.highCardsValues[j]) {
									bestHand = hand;
									bestHandIndexes = [];
									bestHandIndexes.push(players[i].index);
									break;
								}
								else if(bestHand.highCardsValues[j] === hand.highCardsValues[j]) {
									if(i === 0) {
										bestHandIndexes.push(players[i].index);
									}
								}
							}
						}
						break;
					case 2:
						if(bestHand.highPairValue < hand.highPairValue) {
							bestHand = hand;
							bestHandIndexes = [];
							bestHandIndexes.push(players[i].index);
						}
						else if(bestHand.highPairValue === hand.highPairValue) {
							if(bestHand.lowPairValue < hand.lowPairValue) {
								bestHand = hand;
								bestHandIndexes = [];
								bestHandIndexes.push(players[i].index);
							}
							else if(bestHand.lowPairValue === hand.lowPairValue) {
								if(bestHand.highCardValue < hand.highCardValue) {
									bestHand = hand;
									bestHandIndexes = [];
									bestHandIndexes.push(players[i].index);
								}
								else if(bestHand.highCardValue === hand.highCardValue) {
									bestHandIndexes.push(players[i].index);
								}
							}
						}
						break;
					case 0:
						for(var j = bestHand.handCards.length - 1; j >= 0; j--) {
							if(bestHand.handCards[j] < hand.handCards[j]) {
								bestHand = hand;
								bestHandIndexes = [];
								bestHandIndexes.push(players[i].index);
								break;
							}
							else if(bestHand.handCards[j] === hand.handCards[j]) {
								if(j === 0) {
									bestHandIndexes.push(players[i].index);
								}
							}
						}
						break;
				}
			}
		}
		return bestHandIndexes;
	};

	var calculatePlayersOdds = function(players, streets, pack) {
		if(!streets) {
			streets = [];
		}
		var maximumStreets = 5;
		var numberOfCardsToOpen = maximumStreets - streets.length;
		var newPlayersArray = [];
		var newPlayer;
		var packCards = [];
		var indexes;
		var optionsNumber = 1;
		var concatCardsArray;
		players.forEach(function(player) {
			player.wins = 0;
		});
		// numberOfCardsToOpen = 1/2/5
		switch (numberOfCardsToOpen) {
			case 1:
				optionsNumber = pack.length;
				for(var i = 0; i < pack.length; i++) {
					newPlayersArray = [];
					for(var j = 0; j < players.length; j++) {
						concatCardsArray = players[j].cards.concat(streets);
						concatCardsArray.push(pack[i]);
						newPlayer = {
							cards: concatCardsArray.sort(sortCardsByValue),
							index: j
						};
						newPlayersArray.push(newPlayer);
					}
					indexes = getBestHandPlayerIndex(newPlayersArray);
					if(indexes.length === 1) {
						players[indexes[0]].wins++;
					}
				}
				break;
			case 2:
				for(var c = 0; c < numberOfCardsToOpen; c++) {
					optionsNumber = optionsNumber * pack.length - c;
				}
				for(var i = 0; i < pack.length - 1; i++) {
					for(var m = i + 1; m < pack.length; m++) {
						packCards = [pack[i], pack[m]];
						newPlayersArray = [];
						for(var j = 0; j < players.length; j++) {
							newPlayer = {
								cards: players[j].cards.concat(streets).concat(packCards).sort(sortCardsByValue),
								index: j
							};
							newPlayersArray.push(newPlayer);
						}
						indexes = getBestHandPlayerIndex(newPlayersArray);
						if(indexes.length === 1) {
							players[indexes[0]].wins++;
						}
					}
				}
				break;
			case 5:
				for(var c = 0; c < numberOfCardsToOpen; c++) {
					optionsNumber = optionsNumber * pack.length - c;
				}
				for(var i = 0; i < pack.length - 4; i++) {
					for(var m = i + 1; m < pack.length - 3; m++) {
						for(var n = m + 1; n < pack.length - 2; n++) {
							for(var x = n + 1; x < pack.length - 1; x++) {
								for(var y = x + 1; y < pack.length; y++) {
									packCards = [pack[i], pack[m], pack[n], pack[x], pack[y]];
									newPlayersArray = [];
									for(var j = 0; j < players.length; j++) {
										newPlayer = {
											cards: players[j].cards.concat(streets).concat(packCards).sort(sortCardsByValue),
											index: j
										};
										newPlayersArray.push(newPlayer);
									}
									indexes = getBestHandPlayerIndex(newPlayersArray);
									if(indexes.length === 1) {
										players[indexes[0]].wins++;
									}
								}
							}
						}
					}
				}
				break;
		}
		players.forEach(function(player) {
			player.wins = player.wins / optionsNumber;
		});
		return players;
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
