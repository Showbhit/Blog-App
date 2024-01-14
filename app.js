const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

// Home Page - Display all posts
app.get('/', (req, res) => {
    res.render('home', { posts });
});

// Form for creating a new post
app.get('/new', (req, res) => {
    res.render('edit', { post: null });
});

// Handle new post submission
app.post('/new', (req, res) => {
    const { title, content } = req.body;
    const newPost = { title, content };
    posts.push(newPost);
    res.redirect('/');
});

// Form for editing a post
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    res.render('edit', { post, id });
});

// Handle post editing submission
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    posts[id] = { title, content };
    res.redirect('/');
});

// Delete a post
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
