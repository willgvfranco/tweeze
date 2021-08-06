module.exports = {
  apps: [
    {
      name: "React frontend",
      script: "npm",
      args: "start",
      watch: true,
      instances: 2,
      wait_ready: true,
      exec_mode: "cluster",
    },
  ],
};
