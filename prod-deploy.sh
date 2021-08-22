echo "Loading production deploy install"
echo "==================="
# echo "Installing dependencies of Node Server"
cd ~/projects/tweeze
cd ~/dev/tweeze
# cd api && npm install
# echo "==================="
# echo "Node dependencies installed with success"
# echo "==================="
# echo "Installing dependencies of React"
# cd ../frontend && npm install
# echo " dependencies installed with success"
# echo "==================="
# echo "ALL node dependencies installed with success."
echo "______________________"
echo "Restarting pm2 process"
# cd .. && pm2 reload ecosystem.config.js
pm2 reload ecosystem.config.js