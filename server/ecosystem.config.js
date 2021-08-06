module.exports = {
  apps: [
    {
      name: "Node accounts",
      script: "npm",
      args: "server",
      watch: true,
      instances: 2,
      wait_ready: true,
      exec_mode: "cluster",
    },
  ],
};
