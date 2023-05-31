const express = require('express');
const bodyParser = require('body-parser');
const {Pool} = require('pg');

const app = express();
app.use(bodyParser.json());

// In-memory storage for news
let news = [
    {id: '1', title: 'News Article 1', content: 'This is the content of News Article 1.'},
    {id: '2', title: 'News Article 2', content: 'This is the content of News Article 2.'},
    {id: '3', title: 'News Article 3', content: 'This is the content of News Article 3.'}
];
const pool = new Pool({
    user: "demo",
    host: "localhost",
    database: "demo",
    password: "demo",
    port: 5432
})

pool.connect()
    .then(() => {
        return pool.query(
            `
           SELECT * FROM news
           
`
        );
    })
    .then((res) => {
        console.log(res)
        console.log('Successfully connected to database and ensured table exists');
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });
app.use(express.json());

// Get all news
app.get('/news', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM news');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Get a specific news article by ID
app.get('/news/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const {rows} = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({error: 'News article not found'});
        }
    } catch (error) {
        console.error('Error fetching news article:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Create a new news article
app.post('/news', async (req, res) => {
    const {title, content, author} = req.body;
    try {
        const {rows} = await pool.query('INSERT INTO news (title, content, author) VALUES ($1, $2, $3) RETURNING *', [title, content, author]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Update a news article by ID
app.put('/news/:id', async (req, res) => {
    const id = req.params.id;
    const {title, content, author} = req.body;
    try {
        const {rows} = await pool.query('UPDATE news SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *', [title, content, author, id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({error: 'News article not found'});
        }
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Delete a news article by ID
app.delete('/news/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const {rows} = await pool.query('DELETE FROM news WHERE id = $1 RETURNING *', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({error: 'News article not found'});
        }
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Start the server
app.listen(8080, () => {
    console.log('CRUD News service listening on port 8080');
});