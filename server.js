const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for EJS files (default is 'views')
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    // Render the 'index.ejs' file and pass variables
    const items = ['Item 1', 'Item 2', 'Item 3'];
    res.render('index', { userName: 'Zandan Batzorig', age: 40, title: 'Welcome Page', termilog: 'fjnbkfgjbk', items });
});

app.get('/about', (req, res) => {
    // Render the 'about.ejs' file
    res.render('about', { description: 'This is the about page.', title: 'About Us' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});