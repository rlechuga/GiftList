const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// code to generate merket root
//
// // create the merkle tree for the whole nice list
// const merkleTree = new MerkleTree(niceList);
// // get the root
// const root = merkleTree.getRoot();
// console.log('root', root)


// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '01be89563df4c14ffb48b2b5f2f858c3d0410a3a649e7f4c77d135e25b3c459e';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  const { name, proof } = body

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT)


  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
