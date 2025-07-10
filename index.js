const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Routes will go here

app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: { title, content }
  });
  res.json(post);
});

app.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content }
  });
  res.json(post);
});

app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: { id: parseInt(id) }
  });
  res.json({ message: 'Post deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
