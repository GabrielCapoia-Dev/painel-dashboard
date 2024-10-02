const express = require('express');
const multer = require('multer');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const upload = multer({ dest: 'galeria/imagens/' });

// Configuração do json-server
const router = jsonServer.router('jsonserver/db.json'); // Altere o caminho conforme necessário
const middlewares = jsonServer.defaults();

// Use os middlewares do json-server
app.use(middlewares);

// Rota para upload de imagens
app.post('/upload', upload.single('imagem'), (req, res) => {
    // Verifica se a imagem foi recebida
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
    }

    // Cria o caminho da imagem
    const imageUrl = `/imagens/${req.file.filename}`;

    // Você pode armazenar a URL da imagem no seu banco de dados JSON aqui
    // Por exemplo, você poderia enviar uma requisição para o json-server
    const galleryItem = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagemUrl: imageUrl
    };

    // Enviar os dados para o json-server
    const db = require('./jsonserver/db.json'); // Certifique-se de que o caminho está correto
    db.galeria.push(galleryItem);

    // Salvar as alterações no arquivo db.json
    const fs = require('fs');
    fs.writeFileSync('jsonserver/db.json', JSON.stringify(db, null, 2));

    res.status(200).json({ message: 'Upload successful', file: req.file, galleryItem });
});

// Use o router do json-server
app.use(router);

// Inicie o servidor
app.listen(3001, () => {
    console.log('JSON Server is running on http://localhost:3001');
});
