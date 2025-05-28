const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

app.use(bodyParser.json());
app.use(express.static('../frontend'));

const uri = 'mongodb+srv://ashercontigencia:ashercontingencia@advcluster.kbk8nfu.mongodb.net/painelAdvogados?retryWrites=true&w=majority&appName=ADVCluster';
const client = new MongoClient(uri);

let colecao; // variável global

app.post('/api/cadastro', async (req, res) => {
  const { nome, whatsapp, afiliadoId } = req.body;

  if (!nome || !whatsapp || !afiliadoId) {
    return res.status(400).json({ success: false, message: 'Dados incompletos' });
  }

  if (!colecao) {
    return res.status(503).json({ success: false, message: 'Banco de dados não conectado ainda' });
  }

  try {
    const resultado = await colecao.insertOne({ nome, whatsapp, afiliadoId, criadoEm: new Date() });
    console.log(`Novo cadastro inserido: ${resultado.insertedId}`);
    res.json({ success: true, message: 'Cadastro recebido!' });
  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);

  try {
    await client.connect();
    console.log('Conectado ao MongoDB Atlas!');
    const database = client.db('painelAdvogados');
    colecao = database.collection('cadastros');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error.message);
  }
});
