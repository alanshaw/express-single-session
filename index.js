// Enforces 1 concurrent session per user
module.exports = function (idField) {
  idField = idField || "_id"

  var currentSession = {}

  return function (req, res, next) {
    if (!req.user) return next()

    var oldSessionId = currentSession[req.user[idField]]

    if (oldSessionId && oldSessionId != req.sessionID) {
      // Delete old session
      delete req.sessionStore.sessions[oldSessionId]
    }

    currentSession[req.user._id] = req.sessionID
    next()
  }
}

