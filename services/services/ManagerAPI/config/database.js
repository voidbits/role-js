module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;

  mongoose.connect(config.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise
  });

  database.on('error', error => console.log(`Connection to Manager database failed: ${error}`));
  database.on('connected', () => console.log('Connected to Manager database'));
  database.on('disconnected', () => console.log('Disconnected from Manager database'));

  process.on('SIGINT', () => {
    database.close(() => {
      console.log('Manager terminated, connection closed');
      process.exit(0);
    })
  });
};
