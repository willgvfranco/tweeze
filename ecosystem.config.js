module.exports = {
  apps: [
    {
      name: "React",
      cwd: "./react",
      script: "react/node_modules/.bin/react-scripts",
      args: "start",
    },
    {
      name: "Node",
      cwd: "./server",
      script: "server/node_modules/.bin/babel-node",
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
