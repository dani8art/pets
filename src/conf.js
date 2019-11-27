module.exports = () => {
  return {
    initialData: new Boolean(process.env.PETS_INITIAL_DATA).valueOf() || true,
    server: {
      address: process.env.SERVER_ADDRESS || 'localhost',
      hostname: process.env.SERVER_HOSTNAME,
      port: parseInt(process.env.SERVER_PORT) || 4001
    },
    mongo: {
      url: process.env.MONGO_URL || 'mongodb://localhost:27017/pets'
    }
  };
};
