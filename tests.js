describe( "odds calculator", function () {
	it("odds calculator defined", function () {
		var calc = new oddsCalculator();
		expect(calc).toBeDefined();

	});

	it("check odds 1", function () {
		var calc = new oddsCalculator();
		var player1 = {
			id: 1,
			cards: [
				{
					value:8, symbol:3
				},
				{
					value:5, symbol:2
				}
			]
		}
		var player2 = {
			id: 2,
			cards: [
				{
					value:11, symbol:2
				},
				{
					value:3, symbol:1
				}
			]
		}
		expect(calc.calculate([player1,player2], [{value: 12, symbol: 3}, {value: 1, symbol: 2}, {value: 9, symbol: 2}])).toEqual([{id: 1,
			cards: [
			{
				value:8, symbol:3
			},
			{
				value:5, symbol:2
			}
		], wins: 24.141414141414142},{
			id: 2,
			cards: [
				{
					value:11, symbol:2
				},
				{
					value:3, symbol:1
				}
			], wins: 74.84848484848486
		}]);
	});


	it("check odds 2", function () {
		var calc = new oddsCalculator();
		var player1 = {
			id: 1,
			cards: [
				{
					value:8, symbol:3
				},
				{
					value:5, symbol:3
				}
			]
		}
		var player2 = {
			id: 2,
			cards: [
				{
					value:11, symbol:3
				},
				{
					value:3, symbol:3
				}
			]
		}
		expect(calc.calculate([player1,player2], [{value: 12, symbol: 3}, {value: 1, symbol: 2}, {value: 9, symbol: 2}, {value: 0, symbol: 3}])).toEqual([{id: 1,
			cards: [
				{
					value:8, symbol:3
				},
				{
					value:5, symbol:3
				}
			], wins: 13.636363636363635},{
			id: 2,
			cards: [
				{
					value:11, symbol:3
				},
				{
					value:3, symbol:3
				}
			], wins: 86.36363636363636
		}]);
	});

	it("check odds 3", function () {
		var calc = new oddsCalculator();
		var player1 = {
			id: 1,
			cards: [
				{
					value:4, symbol:1
				},
				{
					value:12, symbol:2
				}
			]
		}
		var player2 = {
			id: 2,
			cards: [
				{
					value:2, symbol:1
				},
				{
					value:9, symbol:0
				}
			]
		}
		expect(calc.calculate([player1,player2], [{value: 1, symbol: 3}, {value: 11, symbol: 2}, {value: 4, symbol: 2}])).toEqual([{id: 1,
			cards: [
				{
					value:4, symbol:1
				},
				{
					value:12, symbol:2
				}
			], wins: 85.95959595959596},{
			id: 2,
			cards: [
				{
					value:2, symbol:1
				},
				{
					value:9, symbol:0
				}
			], wins: 13.939393939393941
		}]);
	});

	it("check odds 4", function () {
		var calc = new oddsCalculator();
		var player1 = {
			id: 1,
			cards: [
				{
					value:2, symbol:3
				},
				{
					value:7, symbol:2
				}
			]
		}
		var player2 = {
			id: 2,
			cards: [
				{
					value:10, symbol:1
				},
				{
					value:1, symbol:0
				}
			]
		}
		expect(calc.calculate([player1,player2], [{value: 12, symbol: 3}, {value: 2, symbol: 1}, {value: 2, symbol: 2}])).toEqual([{id: 1,
			cards: [
				{
					value:2, symbol:3
				},
				{
					value:7, symbol:2
				}
			], wins: 1.92},{
			id: 2,
			cards: [
				{
					value:10, symbol:1
				},
				{
					value:1, symbol:0
				}
			], wins: 97.78
		}]);
	});

});