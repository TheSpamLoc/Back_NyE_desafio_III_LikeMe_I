/* eslint-env node */
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

// Ejecutamos dotenv antes de cualquier otra cosa
dotenv.config();

const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
});

app.get('/posts', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;

        if (!titulo || !url || !descripcion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const consulta = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)';
        const valores = [titulo, url, descripcion, 0];
        await pool.query(consulta, valores);
        res.send("Post agregado");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});