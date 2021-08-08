module.exports = {
  apps: [
    {
      name: "React",
      cwd: "./frontend",
      script: "frontend/node_modules/.bin/react-scripts",
      args: "start",
      watch: true,
    },
    {
      name: "Node",
      cwd: "./api",
      script: "api/node_modules/.bin/babel-node",
      args: " ./server.js",
      watch: true,
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
