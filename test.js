var test = require("tape")
  , enforceSingleSession = require("./")()

function mockUser () {
  return {_id: Math.floor(Math.random() * 1000)}
}

function mockSessionId () {
  return "s" + Math.floor(Math.random() * 1000)
}

function mockSession (sessionId) {
  var session = {}
  session[sessionId] = {}
  return session
}

test("Test middleware removes old session on new login", function (t) {
  t.plan(3)

  var user = mockUser()

  // Create an existing session
  var session = mockSession(mockSessionId())
  var sessionId = Object.keys(session)[0]

  // This user is logged in, and has a session
  var req = {
    user: user,
    sessionID: sessionId,
    sessionStore: {
      sessions: session
    }
  }

  // Login initially
  enforceSingleSession(req, {}, function () {})

  t.ok(session[sessionId], "Session still exists and nothing weird has happened")

  var newSessionId = mockSessionId()

  // Add the new session
  session[newSessionId] = {}

  // New login request
  req = {
    user: user,
    sessionID: newSessionId,
    sessionStore: {
      sessions: session
    }
  }

  // Login again
  enforceSingleSession(req, {}, function () {})

  t.notOk(session[sessionId], "Old session should no longer exist")
  t.ok(session[newSessionId], "New session should still exist")
})
