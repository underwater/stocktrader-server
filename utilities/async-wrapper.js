///TODO: Understand why AsyncWrapper needed? https://thecodebarbarian.com/80-20-guide-to-express-error-handling
module.exports.AsyncWrapper = function AsyncWrapper(fn) {
    return (req, res, next) => {
        return fn(req, res).catch(next);
    };
};
