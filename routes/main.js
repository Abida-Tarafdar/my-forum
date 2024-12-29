// Create a new router
const express = require("express");
const app = express.Router();


var forumData = {forumName: "HiveFocus"};

    //Handle our routes

    app.get('/',function(req, res) {
        res.render('index.ejs', forumData);
    });

    app.get('/garden',function(req, res) {
        res.render('garden.ejs', forumData);
    });

    app.get('/about', function(req, res) {
        res.render('about.ejs', forumData);
    });

    // app.get('/search', function(req, res) {
    //    res.render('search.ejs', forumData);
    //     const keyword = req.query.keyword;
    //     const sql = `SELECT posts.*, users.username, topics.name as topic
    //                  FROM posts
    //                  JOIN users ON posts.user_id = users.id
    //                  JOIN topics ON posts.topic_id = topics.id
    //                  WHERE posts.content LIKE ?`;
    //     db.query(sql, ['%' + keyword + '%'], (err, results) => {
    //         if (err) throw err;
    //         res.render('posts.ejs', { ...forumData, posts: results });
    //     });
    //  });

    app.get('/search', function(req, res) {
        res.render('search.ejs', forumData);
    });


    app.get('/search_result', function(req, res) {
        //const searchText = req.query.search_text;
        //const category = req.query.category;
        // TODO: search in the database
       // res.send(`Search text: ${searchText}, Category: ${category}`);
        res.send("You searched for " + req.query.search_text + " in " + req.query.category);
        //res.render('search.ejs', { searchText, category });
    });

    //registration form submision
    app.get('/register', function(req, res) {
        res.render("register.ejs", forumData);
    });

    //succesful submission page
    app.post("/registered", (req,res) => { 
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered! We will send an email to ' + req.body.email + ' for verification. Happy studying!');   
      }); 

      
    // Sign in page 
    app.get('/login', function(req, res) {
        res.render("login.ejs", forumData);
    });

    // Sign in form 
    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        db.query(sql, [email, password], (err, results) => {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }
            if (results.length > 0) {
    
                res.send(`Welcome back, ${results[0].first_name}!`);
            } else {
                // Authentication failed
                res.status(401).send("Invalid email or password. Please try again.");
            }
        });
    });

    app.get('/flashcards', (req, res) => {
        const user_id = req.session.user_id; 
      
        const sql = "SELECT * FROM flashcards WHERE user_id = ?";
        db.query(sql, [user_id], (err, flashcards) => {
            if (err) throw err;
    
            // Render flashcards page
            res.render('flashcards.ejs', { flashcards });
        });
    });


    app.get('/addflashcard', (req, res) => {
        res.render('addflashcard.ejs'); 
    });

    app.post('/addflashcard', (req, res) => {
        const { title, question, answer } = req.body;
        //doesnt require login
        const user_id = 1;  
    
        // Insert the new flashcard into the database
        const sql = "INSERT INTO flashcards (user_id, title, question, answer) VALUES (?, ?, ?, ?)";
        
        db.query(sql, [user_id, title, question, answer], (err, result) => {
            if (err) throw err;
    
            // After successful insertion, redirect to the flashcards page
            res.redirect('/flashcards');
        });
    });
    

    app.get('/topics', function(req, res) {
        const sql = "SELECT * FROM topics";
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.render('topics.ejs', { ...forumData, topics: results });
        });
    });


    //--DISCUSSION THREAD--//
    // Add new post
    app.post('/addpost', function(req, res) {
        const {content } = req.body;
        const user_id = 1;  // User 1 defsult


        // SQL query to insert the new post
        const sql = "INSERT INTO posts (content, user_id) VALUES (?, ?)";

        db.query(sql, [ content, user_id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error adding the post.");
            }

            // Redirect to the posts page after adding the post
            res.redirect('/posts');
        });
    });

    app.get('/posts', function(req, res) {
        const sqlPosts = `
            SELECT posts.*, users.username, topics.name as topic, replies.id as reply_id, replies.content as reply_content, replies.user_id as reply_user_id
            FROM posts
            JOIN users ON posts.user_id = users.id
            JOIN topics ON posts.topic_id = topics.id
            LEFT JOIN replies ON posts.id = replies.post_id
            ORDER BY posts.id DESC;
        `;
        const sqlTopics = "SELECT * FROM topics"; 
    
        db.query(sqlPosts, (err, postsResult) => {
            if (err) {
                console.log(err);  // Log error if SQL query fails
                return res.status(500).send("Error fetching posts.");
            }
    
            db.query(sqlTopics, (err, topicsResult) => {
                if (err) {
                    console.log(err);  
                    return res.status(500).send("Error fetching topics.");
                }
                
                // Organize the data with replies
                let postsWithReplies = [];
                postsResult.forEach((row) => {
                    let post = postsWithReplies.find(p => p.id === row.id);
                    if (!post) {
                        post = {
                            id: row.id,
                            title: row.title,
                            content: row.content,
                            username: row.username,
                            topic: row.topic,
                            replies: []
                        };
                        postsWithReplies.push(post);
                    }
    
                    if (row.reply_id) {
                        post.replies.push({
                            id: row.reply_id,
                            content: row.reply_content,
                            user_id: row.reply_user_id
                        });
                    }
                });
    
                // combined posts page and add posts ineto one
                res.render('posts.ejs', { forumData, posts: postsWithReplies, topics: topicsResult });
            });
        });
    });
    


    app.post('/addreply/:post_id', function(req, res) {
        const postId = req.params.post_id;
        const { content } = req.body;
        
        const userId = 1; // assume user_id 1 if not logged in
        
        const sql = "INSERT INTO replies (post_id, user_id, content) VALUES (?, ?, ?)";
        db.query(sql, [postId, userId, content], (err, result) => {
            if (err) throw err;
            // redirect back to the posts page after submitting the reply
            res.redirect('/posts');
        });
    });
    
    // delete replies
    app.post('/delete-reply/:id', function(req, res) {
        const replyId = req.params.id;

        const sql = "DELETE FROM replies WHERE id = ?";
        
        db.query(sql, [replyId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error deleting the reply.");
            }
            
            // redirect back to the posts page after deleting the reply
            res.redirect('/posts');
        });
    });




    app.get('/profile/:id', function(req, res) {
        const sql = "SELECT * FROM users WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            res.render('profile.ejs', { ...forumData, user: result[0] });
        });
    });

    app.get('/topicdetails/:id', function(req, res) {
        const sql = "SELECT * FROM topics WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            res.render('topicdetails.ejs', { ...forumData, topic: result[0] });
        });
    });

    app.get('/deletepost/:id', function(req, res) {
        const sql = "DELETE FROM posts WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            res.redirect('/posts');
        });
    });

    app.get('/replies/:post_id', function(req, res) {
        const sql = `SELECT replies.*, users.username
                     FROM replies
                     JOIN users ON replies.user_id = users.id
                     WHERE replies.post_id = ?`;
        db.query(sql, [req.params.post_id], (err, results) => {
            if (err) throw err;
            res.render('replies.ejs', { ...forumData, replies: results });
        });
    });

// Export the router object so index.js can access it
module.exports = app;

