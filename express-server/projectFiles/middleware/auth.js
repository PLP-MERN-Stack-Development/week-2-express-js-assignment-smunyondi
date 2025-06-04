module.exports = (req, res, next) => {
  console.log('API_KEY from env:', process.env.API_KEY); // Add this line
  if (req.headers['x-api-key'] === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }
};