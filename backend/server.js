const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuração básica
app.use(bodyParser.json());
app.use(express.static('../frontend')); // Serve arquivos estáticos

// Rota para receber dados do advogado
app.post('/api/cadastro', (req, res) => {
    const { nome, whatsapp, afiliadoId } = req.body;
    
    console.log(`Novo cadastro: ${nome} (${whatsapp}) - Afiliado: ${afiliadoId}`);
    
    // Aqui você vai adicionar:
    // 1. Validação dos dados
    // 2. Gerenciamento de tokens
    // 3. Chamada à API da Vercel
    
    res.json({ success: true, message: 'Cadastro recebido!' });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
