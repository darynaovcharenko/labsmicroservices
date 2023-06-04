const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
var cors=require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
// PostgreSQL connection configuration


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
            // `insert into authors (name) values  ('aaa3')`
         //  'UPDATE authors SET numberofarticles = numberofarticles + 1 WHERE id = 1 RETURNING *'
            `
         SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';
SELECT * from authors;
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
let breaked=0;

app.get('/authors/break', (req, res) => {
    breaked = 1
    res.send("breakpod")
})

app.get('/authors/revive', (req, res) => {
    breaked = 0
    res.json({"breaked": breaked})
})


// Get all authors
app.get('/authors', async (req, res) => {
    if (breaked==1){
        setTimeout(function() {
            res.sendStatus(500)

        }, 3000)}
    else {
        try {
            const {rows} = await pool.query('SELECT * FROM authors');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching authors:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
});

// Get a specific author by ID
app.get('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const { rows } = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);

        if (rows.length === 1) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Author not found' });
        }
    } catch (error) {
        console.error('Error fetching author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new author
app.post('/authors', async (req, res) => {
    const { name } = req.body;

    try {
        const { rows } = await pool.query('INSERT INTO authors (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an author by ID
app.put('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    try {
        const { rows } = await pool.query('UPDATE authors SET name = $1 WHERE id = $2 RETURNING *', [name, id]);

        if (rows.length === 1) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Author not found' });
        }
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/authors/newarticle/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    try {
        const { rows } = await pool.query('UPDATE authors SET numberofarticles = numberofarticles + 1 WHERE id = $1 RETURNING *', [id]);

        if (rows.length === 1) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Author not found' });
        }
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Delete an author by ID
app.delete('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const { rows } = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);

        if (rows.length === 1) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Author not found' });
        }
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(8080, () => {
    console.log('CRUD Authors service listening on port 8080');
});
