// {
//     "apps": [
//         {
//             "name": "server",
//             "script": "npm",
//             "args" : "server",
//             watch: true,
//             instances: 2,
//             wait_ready: true,
//             exec_mode: "cluster"

//         }
//     ]
// }

module.exports = {
  apps: [
    {
      name: "Accounts Server",
      script: "npm",
      args: "servejr",
      watch: true,
      instances: 2,
      wait_ready: true,
      exec_mode: "cluster",
    },
  ],
};
