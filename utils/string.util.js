const deleteBearer = (token) => {
  return token.substring(7)
}

module.exports = deleteBearer;