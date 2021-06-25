var express = require('express');
var router = express.Router();

// Google OAuth
const CLIENT_ID = '492060433478-mehqltmg9ov4if33l8ceu05lv42j1hn3.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// test check-in locations
let locations = [
    {
        name: 'Adelaide CBD',
        code: '001',
        coor: [138.6007, -34.9285],
        cases: 20,
        checkins: 30,
        size: 0.7
    },
    {
        name: 'Santos Stadium',
        code: '002',
        coor: [138.5780,-34.9270],
        cases: 10,
        checkins: 30,
        size: 0.3
    }
];

// route for login
router.post('/login', function(req, res, next) {
    // check for user
    if('username' in req.body && 'password' in req.body){
        // check for password from database
        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var query = 'SELECT username, password, firstName, lastName, phone, email FROM User WHERE username = ? AND password = SHA2(?,256);';
            connection.query(query,[req.body.username,req.body.password], async function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if(rows.length > 0){
                  // found user
                  delete rows[0].password;
                  req.session.user = rows[0]['username'];
                  logoutButton.innerHTML = 'Logout';
                  logoutButton.setAttribute('onclick','w')
                  res.json(rows[0]);
              } else {
                  // no matching user
                  res.sendStatus(401);
              }
            });
        });
    }else if('token' in req.body){
        // validate OAuth token
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            req.session.user = payload['email'];
            res.send(req.session.user);
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
        }
        verify().catch(console.error);
    }else{
        res.sendStatus(401);
    }
});

// logout current user from session
router.post('/logout', function(req, res, next) {
    delete req.session.user;
    res.sendStatus(200);
});

// logout current user from session
router.post('/signup', function(req, res, next) {
    // do something
});

// checkin using code
router.post('/checkin', function(req, res, next) {
    let code;

    if('code' in req.body){
        code = req.body.code;
    }

    // validate check-in code
    for(let l of locations){
        if(l['code'] == code){
            // code is valid
            // increment checkin cout
            l['checkins'] ++;
            res.json(l);
            return;
        }
    }

    // code is invalid
    res.sendStatus(400);
});

// GET hostpost locations
router.get('/hotspots', function(req, res, next) {
    res.json(locations);
});

module.exports = router;
