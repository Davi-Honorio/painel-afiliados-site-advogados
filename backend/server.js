const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

app.use(bodyParser.json());
app.use(express.static('../frontend'));

const uri = 'mongodb+srv://ashercontigencia:ashercontingencia@advcluster.kbk8nfu.mongodb.net/painelAdvogados?retryWrites=true&w=majority&appName=ADVCluster';
const client = new MongoClient(uri);

async function start() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB Atlas!');

    const database = client.db('painelAdvogados');
    const colecao = database.collection('cadastros');

    app.post('/api/cadastro', async (req, res) => {
      const { nome, whatsapp, afiliadoId } = req.body;
      
      if (!nome || !whatsapp || !afiliadoId) {
        return res.status(400).json({ success: false, message: 'Dados incompletos' });
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
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Erro na conexão com MongoDB:', error);
  }
}

start();
