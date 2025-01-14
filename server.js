const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
    .connect('mongodb+srv://raddy:N7cJGzWpEtLxFfXT@cluster0.be7ts.mongodb.net/blog')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    body: {
        type: String,
        required: true
      },
    createdAt: {
        type: Date,
        default: Date.now
      },
    updatedAt: {
        type: Date,
        default: Date.now
      }    
});
    
const Post = mongoose.model('Post', ItemSchema);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for EJS files (default is 'views')
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Seed some sample data (optional, for testing)
app.get('/seed', async (req, res) => {
    await Item.create([
        { title: 'Item 1', body: 'Description for Item 1' },
        { title: 'Item 2', body: 'Description for Item 2' },
    ]);
    res.send('Sample data created!');
});
// Routes
app.get('/', async (req, res) => {
    try {
    // Render the 'index.ejs' file and pass variables
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const items2 = await Post.find(); // Fetch all items from the database
    res.render('index', { userName: 'Zandan Batzorig', age: 40, title: 'Welcome Page', termilog: 'fjnbkfgjbk', items, items2 });
    }catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/about', (req, res) => {
    // Render the 'about.ejs' file
    res.render('about', { description: 'This is the about page.', title: 'About Us' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});