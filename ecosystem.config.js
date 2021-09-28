module.exports = {
  apps: [
    // {
    //   name: "frontend",
    //   cwd: "./frontend",
    //   script: "frontend/node_modules/.bin/react-scripts",
    //   args: "start",
    // },
    {
      name: "frontend",
      cwd: "./frontend",
      script: "serve",
      args: "-s build",
    },
    {
      name: "api",
      cwd: "./api",
      script: "api/node_modules/.bin/babel-node",
      args: " ./server.js",
    },
  ],
  // deploy: {
  //   production: {
  //     user: "SSH_USERNAME",
  //     host: "SSH_HOSTMACHINE",
  //     ref: "origin/master",
  //     repo: "GIT_REPOSITORY",
  //     path: "DESTINATION_PATH",
  //     "pre-deploy-local": "",
  //     "post-deploy":
  //       "npm install && pm2 reload ecosystem.config.js --env production",
  //     "pre-setup": "",
  //   },
  // },
};
