function sendResponse(durum, field, value, res, code) {
  res.status(code || 200).json({ durum: durum, [field]: value });
}

module.exports = sendResponse;
