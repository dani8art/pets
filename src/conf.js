module.exports = () => {
  return {
    initialData: new Boolean(process.env.PETS_INITIAL_DATA).valueOf() || true,
    server: {
      host: process.env.SERVER_HOST,
      port: parseInt(process.env.SERVER_PORT) || 4001
    },
    mongo: {
      url: process.env.MONGO_URL || 'mongodb://localhost:27017/pets'
    }
  };
};
