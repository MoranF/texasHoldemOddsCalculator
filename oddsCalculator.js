var app = angular.module('pokerChanses', []);
var oddsCalculator = new oddsCalculator();

var player1 = {
	id: 1,
	cards: [
		{
			value:12, symbol:3
		},
		{
			value:11, symbol:3
		}
	]
}
var player2 = {
	id: 2,
	cards: [
		{
			value:10, symbol:2
		},
		{
			value:10, symbol:1
		}
	]
}
console.log(oddsCalculator.calculate([player1,player2],[{value:9, symbol:1},{value:5, symbol:1},{value:0, symbol:0},{value:10, symbol:0}]));




