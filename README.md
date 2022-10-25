# paper-clip-app
React Native app for paper-clip-server. Uses npm as a dependency manager, to run:

1. Install npm
2. Run 'npm install'
3. Run 'npm start'

Connecting to server
1. Run flask server using paper-clip-server, connect to ngrok endpoint
2. Update connection url in server-conn.js (include '/' at end of url)
3. REFRESH_RATE can be changed in /util/refresh.js, currently set to 5000 (5 seconds)