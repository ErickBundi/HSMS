const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://bundinyaga:NJgD!yxqq)K2sxG@ac-3dttodz-shard-00-00.ezvhpnb.mongodb.net:27017,ac-3dttodz-shard-00-01.ezvhpnb.mongodb.net:27017,ac-3dttodz-shard-00-02.ezvhpnb.mongodb.net:27017/hsms?ssl=true&replicaSet=atlas-bw0z3w-shard-0&authSource=admin&appName=hsms-cluster';

async function diagnose() {
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000,
  });

  try {
    console.log('Attempting to connect...');
    console.log('Username: bundinyaga');
    console.log('Database: hsms');
    console.log('');

    await client.connect();
    console.log('✓ Connected successfully!');

    const adminDb = client.db('admin');
    const result = await adminDb.command({ ping: 1 });
    console.log('✓ Ping successful:', result);

    const hsmsDb = client.db('hsms');
    const collections = await hsmsDb.listCollections().toArray();
    console.log('✓ Collections in hsms:', collections.map(c => c.name));

  } catch (error) {
    console.error('✗ Connection failed');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', JSON.stringify(error, null, 2));
  } finally {
    await client.close();
    console.log('Disconnected');
  }
}

diagnose();