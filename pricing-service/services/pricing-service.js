function randomFeed(stock, min, max) {
    function rand(min, max) {
        return (( Math.random()*100 ) % (max - min) + min).toFixed(2);
    }
    return () => {
        return {
            name: stock,
            price: rand(min, max)
        }
    };
}

module.exports = class PricingService {
    constructor() {
        this.availableStocks = {
            'MSFT': randomFeed('MSFT', 100, 141),
            'AAPL': randomFeed('AAPL', 180, 210),
            'AMZN': randomFeed('AMZN', 45, 300),
            'FB': randomFeed('FB', 180, 299),
            'BRK.B': randomFeed('BRK.B', 60, 120),
            'JPM': randomFeed('JPM', 120, 340),
            'GOOG': randomFeed('GOOG', 135, 400)
        };
    }

    getCurrentPrice(stock) {
        return this.availableStocks[stock]();
    }
};
