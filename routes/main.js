module.exports = function(app, forumData) {

    //Handle our routes
    app.get('/', (req, res) => {
        res.render('index.ejs', forumData);
    });

    app.get('/about', (req, res) => {
        res.render('about.ejs', forumData);
    });

    app.get('/topics', (req, res) => {
        const sql = "SELECT * FROM topics";
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.render('topics.ejs', { ...forumData, topics: results });
        });
    });

    app.get('/users', (req, res) => {
        const sql = "SELECT * FROM users";
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.render('users.ejs', { ...forumData, users: results });
        });
    });

    app.get('/posts', (req, res) => {
        const sqlquery = `SELECT posts.*, users.username, topics.name as topic
                     FROM posts
                     JOIN users ON posts.user_id = users.id
                     JOIN topics ON posts.topic_id = topics.id`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('./');
        });
        let newData = Object.assign({}, forumData, {availablePosts:result});
        console.log(newData)
        res.render("posts.ejs", newData)
    });

    app.get('/addpost', (req, res) => {
        const sqlTopics = "SELECT * FROM topics";
        const sqlUsers = "SELECT * FROM users";
        db.query(sqlTopics, (err, topics) => {
            if (err) throw err;
            db.query(sqlUsers, (err, users) => {
                if (err) throw err;
                res.render('addpost.ejs', { ...forumData, topics, users });
            });
        });
    });

    app.post('/addpost', (req, res) => {
        const { user_id, topic_id, content } = req.body;
        const sql = "INSERT INTO posts (user_id, topic_id, content) VALUES (?, ?, ?)";
        db.query(sql, [user_id, topic_id, content], (err, result) => {
            if (err) throw err;
            res.redirect('/posts');
        });
    });

    app.get('/search', (req, res) => {
        res.render('search.ejs', forumData);
    });

    app.get('/search_result', (req, res) => {
        router.get('/search_result', function (req, res) {
            // TODO: search in the database
            res.send(req.query);
         });
        // const keyword = req.query.keyword;
        // const sql = `SELECT posts.*, users.username, topics.name as topic
        //              FROM posts
        //              JOIN users ON posts.user_id = users.id
        //              JOIN topics ON posts.topic_id = topics.id
        //              WHERE posts.content LIKE ?`;
        // db.query(sql, ['%' + keyword + '%'], (err, results) => {
        //     if (err) throw err;
        //     res.render('posts.ejs', { ...forumData, posts: results });
        // });
    });

    

    app.get('/profile/:id', (req, res) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            res.render('profile.ejs', { ...forumData, user: result[0] });
        });
    });

    app.get('/topicdetails/:id', (req, res) => {
        const sql = "SELECT * FROM topics WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            res.render('topicdetails.ejs', { ...forumData, topic: result[0] });
        });
    });

    app.get('/deletepost/:id', (req, res) => {
        const sql = "DELETE FROM posts WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            res.redirect('/posts');
        });
    });

    app.get('/replies/:post_id', (req, res) => {
        const sql = `SELECT replies.*, users.username
                     FROM replies
                     JOIN users ON replies.user_id = users.id
                     WHERE replies.post_id = ?`;
        db.query(sql, [req.params.post_id], (err, results) => {
            if (err) throw err;
            res.render('replies.ejs', { ...forumData, replies: results });
        });
    });
};
