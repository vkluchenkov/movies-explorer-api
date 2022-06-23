const devConfig = {
  devDb: 'mongodb://localhost:27017/moviesdb',
  devSecret: 'dev-secret',
  devAllowedCors: [
    'http://localhost:3000',
    'http://localhost:3000/',
    'http://localhost:3001',
  ],
};

export default devConfig;
