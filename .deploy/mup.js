module.exports = {
  servers: {
    one: {
      host: '47.92.29.165',
      username: 'root',
      // password:
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'MakerLab',
    path: '../',

    volumes: {
      '/makerlab':'/makerlab'
    },

    servers: {
      one: {},
    },

    buildOptions: {

    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      PORT: 5657,
      ROOT_URL: 'http://47.92.29.165:5657',
      // MONGO_URL: "mongodb://mongodb:27017",
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      // image: 'abernix/meteord:base',

      image: 'daocloud.io/wwlweihai/meteord:latest',
      //imagePort: 3000, // (default: 80, some images EXPOSE different ports)
      // bind: '127.0.0.1',
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 320,
    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },
  mongo: { // (optional)
    port: 27017,
    version: '3.4.1', // (optional), default is 3.4.1
    servers: {
      one: {},
    },
  },
};
