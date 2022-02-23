module.exports = (errorFunc) => (req, res, next)=>{
    Promise.resolve(errorFunc(req, res, next)).catch(next);
}