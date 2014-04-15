express-single-session [![Build Status](https://travis-ci.org/alanshaw/express-single-session.svg)](https://travis-ci.org/alanshaw/express-single-session) [![devDependency Status](https://david-dm.org/alanshaw/express-single-session/dev-status.svg)](https://david-dm.org/alanshaw/express-single-session#info=devDependencies)
===
Express middleware that enforces a single session per user.

Example
---

```js
var express = require("express")
  , enforceSingleSession = require("express-single-session")("_id")

var app = express()

app.use(express.session())

function loginMiddleware (req, res, next) {
  // Login your user here - this could be passportjs or whatever
  // Set req.user to be the logged in user
  next()
}

app.post("/login", loginMiddleware, enforceSingleSession, function (req, res) {
  return res.json({message: "Authentication success"})
})
```

Usage
---
Create a new single session middleware function:

```js
var enforceSingleSession = require("express-single-session")()
```

Pass the id field on your user object if different to "_id":

```js
var enforceSingleSession = require("express-single-session")("id")
```

Ensure the middleware that logs in your user adds your logged in user object to `req.user`.

The module stores a map of user ID's to session ID's. When a user is logged in, the module removes the express session (from `req.sessionStore.sessions`) with the session ID it has stored and associates the current `req.sessionID` with that user.