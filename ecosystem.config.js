module.exports = {
  apps: [
    {
      name: 'server',
      script: './server/server.js',
      watch: false,
      env: {
        'PORT': 3001,
        'NODE_ENV': 'production'
      }
    },
    {
      name: 'client',
      script: 'serve',
      env: {
        'PM2_SERVE_PATH': './client/build',
        'PM2_SERVE_PORT': 3000,
        'PM2_SERVE_SPA': 'true',
        'PM2_SERVE_HOMEPAGE': '/index.html'
      }
    }
  ]
};

