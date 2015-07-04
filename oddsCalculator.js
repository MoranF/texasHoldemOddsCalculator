var oddsCalculator = function() {

	var calculateHandRank = function(handCards, packCards) {

	};

	var calculateBestHandFrom7Cards = function(cards) {
		var bestHandCards;

		return bestHandCards;
	};

	var isStraightFlush = function(cards) {
		var isFlush = isFlush(cards);
		var isStraight = isStraight(cards);
		if(isStraight && isFlush) {
			return {
				handStrength: 8,
				cards: cards,
				highCard: isStraight.highCard
			};
		}
		return null;
	};

	var isFourOfAKind = function(cards) {

	};

	var isFullHouse = function(cards) {

	};

	var isFlush = function(cards) {

	};

	var isStraight = function(cards) {

	};

	var isThreeOfAKind = function(cards) {

	};

	var isTwoPairs = function(cards) {

	};

	var isOnePair = function(cards) {

	};

	//hand strength: straight flush = 8, four of a kind = 7, full house = 6, flush = 5, straight = 4, three of a kind = 3, two pairs = 2, one pair = 1, high card = 0
	var calculateHandStrength = function(cards) {
		if(isStraightFlush(cards)) {
			return {
				cards: cards,
				handStrength: 8
			};
		}
		if(isFourOfAKind(cards)) {
			return {
				cards: cards,
				handStrength: 7
			};
		}
		if(isFullHouse(cards)) {
			return {
				cards: cards,
				handStrength: 6
			};
		}
		if(isFlush(cards)) {
			return {
				cards: cards,
				handStrength: 5
			};
		}
		if(isStraight(cards)) {
			return {
				cards: cards,
				handStrength: 4
			};
		}
		if(isThreeOfAKind(cards)) {
			return {
				cards: cards,
				handStrength: 3
			};
		}
		if(isTwoPairs(cards)) {
			return {
				cards: cards,
				handStrength: 2
			};
		}
		if(isOnePair(cards)) {
			return {
				cards: cards,
				handStrength: 1
			};
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
