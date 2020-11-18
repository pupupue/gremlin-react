const express = require('express');
const gremlin = require('gremlin');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

console.log('Node.js starting up')
setTimeout(() => {
  const client = new gremlin.driver.Client('ws://gremlin-server:8182/gremlin', { traversalSource: 'g' });
  async function ingestGraph() {
    await client.submit('graph = TinkerGraph.open()');
    await client.submit('graph.io(IoCore.graphml()).readGraph("conf/graph.graphml")');
    return true;
  };
  ingestGraph().then(result => {
    console.log("ingesting graph");
    console.log('Node.js is online!')
  });
}, 30000);

app.use('/api/gremlin', require('./routes/api/gremlin'));

const PORT = 5002;

app.listen(PORT);