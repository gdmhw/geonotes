const Pool = require('pg').Pool;

const bodyParser = require('body-parser');
const uuidv4 = require("uuid/v4"); //generating unique IDs
const bcrypt = require('bcrypt'); //storing pw in hashed format
const LocalStrategy = require('passport-local').Strategy;

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: '',
    password: '',
    port: 5432
});



app.get('/', function(req, res, next){
    res.render('index', { title: "Home", userData: req.user, messages: {
        danger: req.flash('danger'), warning: req.flash("warning"),
        success: req.flash(success)
    }});
    console.log(req.user);  
})

//route for user to register

app.get('/join', function(req, res, next){
    res.render('join', { title: "Join", userData: req.user, messages: {
        danger: req.flash('danger'), warning: req.flash("warning"),
        success: req.flash(success)
    }}); 
});

app.post("/join", async function(req, res){

    try{
        const client = await pool.connect();
        await client.query('BEGIN');
        var pwd = await bcrypt.hash(req.body.password, 5);
        await JSON.stringify(
            client.query("SELECT user_Id from users WHERE email = $1",
            [req.body.name], function(err, result) {
                if(result.rows[0]){
                    req.flash("warning", "This email is registered <a href=`/login`>Log in.</a>");
                    req.redirect('/join');
                }
                else{
                   client.query(`INSERT INTO users (user_Id, email, password) VALUES ($1, $2, $3)`,
                   [uuidv4(), req.body.email, pwd],
                   function(err, result) {
                       if(err){
                           throw error;
                       }
                       else{
                           client.query(`COMMIT`);
                           console.log(result);
                           req.flash(`success`, `New user created`);
                           res.redirect(`login`);
                           return;
                       }
                   });
                }
            }))
            client.release();
    }
    catch(e) {
        throw(e);
    }
})


//Renders page if user logged in
app.get('/notes', function(req, res, next){
    if(req.isAuthenticated()){
        res.render(`notes`, {title: "Notes", userData: req.user,
        messages: {
            danger: req.flash('danger'), warning: req.flash("warning"),
            success: req.flash(success)
        }});
        
    }
    else{
        res.redirect(`/login`);
    }
});


//login
app.get('/login', function(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/notes');

      
        
    }
    else{
        res.render(`login`, {title: "Log in", userData: req.user,
        messages: {
            danger: req.flash('danger'), warning: req.flash("warning"),
            success: req.flash(success)
        }});
    }
});



app.post('/login', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res) {
    if(req.body.remember){
        req.session.cookie.maxAge = 90 * 24 * 60 * 1000;
    }
    else{
        req.session.cookie.expires = false;
    }
    res.redirect('/');
})


//logout
app.get('/logout', function(req, res){
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    req.flash(`success`, "Logged out");
    res.redirect("/")
});


//passport-local strategy

//Passport takes name and pw

//Passport inits connection to db from connection pool

//PostgreSQL selects UUID, if !, login incorrect

//if UUID exists, pw retrieved from db

//encrypted pw compared to user's provided ptext password






passport.use('local', new LocalStrategy({passReqToCallback : true},
        (req, email, password, done) => {
            loginAttempt();
            async function loginAttempt(){
                const client = await pool.connect();
                try{
                    await client.query(`BEGIN`);
                    const currentAccountsDats = await
                    JSON.stringify(client.query(`SELECT user_Id, "email", "password" FROM "users" WHERE "email" = $1`,
                    [email], function(err, result){
                        if(err){
                            return done(err);
                        }
                        if(result.rows[0] == null){
                            req.flash(`danger`, "incorrect login details");
                            return done(null, false);
                        }
                        else{
                            bcrypt.compare(password, result.rows[0].password, function(err, check){
                                if(err){
                                    console.log(`Error checking password`);
                                    return done();
                                }
                                else if(check){
                                    return done(null,
                                        [{email: result.rows[0].email}]);
                                }
                                else{
                                    req.flash(`danger`, `incorrect login details`);
                                    return done(null, false);
                                }
                            });
                        }
                    }))
                }
                catch(e){
                    throw(e);
                }
            };
        }))
        passport.serializeUser(function(user, done){
            done(null, user);
    
        });
        passport.deserializeUser(function(user, done){
            done(null, user);
        });



    




//USERS
//GET
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_Id ASC', (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

//GET
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE user_Id = $1', [id], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows)
    });
};

//POST new user
const createUser = (request, response) => {
    const { user_Id, email, password } = request.body;

    pool.query('INSERT INTO users (user_Id, email, password) VALUES ($1, $2, $3)', 
    [user_Id, email, password], 
    (error, results) => {
        if(error){
            throw error;
        }
        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
};


//PUT updated data in an existing user
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { username, email } = request.body;

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',
                [username, email, id], 
                (error, results) => {
                    if(error){
                        throw error;
                }
                response.status(200).send(`User modified with ID: ${id}`);
    });
};


//DELETE a user
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1',
    [id], 
    (error, results) => {
        if(error){
            throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
});
};


//NOTES
//GET All notes by user ID
//note db: note_id, user_id, note_text
const getUserNotes = (request, response) => {
    const userId = parseInt(request.params.id);
   
    pool.query('SELECT * FROM notes WHERE userId = $1', 
    [userId], 
    (error, results) => {
        if(error){
            throw error;
        }
    response.status(200).json(results.rows);
    });
};




//POST new note
const createNote = (request, response) => {
    const { noteId, userId, note_text, note_lat, note_long } = request.body;
   
    pool.query('INSERT INTO notes (note_Id, userId, note_text, note_lat, note_long) VALUES ($1, $2, $3, $4, $5)', 
    [noteId, userId, note_text, note_lat, note_long], 
    (error, results) => {
        if(error){
            throw error;
        }
    response.status(201).send(`Note added with ID: ${noteId} by user with ID: ${userId}`);
    });
};

//Delete a note
const deleteNote = (request, response) => {
    const noteId = parseInt(request.params.noteId)
    const userId = parseInt(request.params.userId);
   
    pool.query('DELETE FROM notes WHERE noteId = $1', 
    [noteId], 
    (error, results) => {
        if(error){
            throw error;
        }
    response.status(200).send(`Note deleted with ID: ${noteId} by user with ID: ${userId}`);
    });
};




//export functions
module.exports = {
    getUsers,
    getUserById,
    createUser, 
    updateUser,
    deleteUser,
    createNote,
    deleteNote,
    getUserNotes,
    app
};

