# Pode project
- A mobile application developed with React Native and Node.js using TypeScript.
- Deployed as a web-application at https://pode-app.onrender.com/ (server is quite slow due to the free plan on Render, but speeds up on use. If it doesnt respond, open https://pode-backend.onrender.com and it will start itself up). Use this to test the application
- It is strongly recommended to run the web-application in device-mode on your browser (F12 + ctrl-shift-m), or from a smartphone's browser to simulate the mobile application.
- User instructions can be found [here](https://github.com/project-pode/Pode/blob/master/Pode_userGuide.pdf)
- Hour log can be found [here](https://github.com/project-pode/Pode/blob/master/Hour%20log%20Benjamin%20fullstackopen%20project%20course.pdf) (Benjamin). It can be replaced and edited if other members want to publish hours.

## Software requirements: 
Be sure to have the newest Node.js version installed!

## Guide for developers (with access to prod-database)

Start by setting up env variables in .env file, both in frontend and backend. 
Use .env.template as template for variables. 

Database URI can be retrieved from admin

First, clone the repo.

1. Frontend

Open up a terminal.\
Navigate to frontend: ```cd frontend```\
Run ```npm install```\
Start app with ```npm start``` and choose platform

Sometimes changing the .env in frontend does not work and you may have to run command ```npx expo start --clear```

2. Backend

Open up an additional terminal.\
Navigate to backend: ```cd backend```\
Run ```npm install```\
Start app with ```npm run dev```

If everything worked fine terminal should print Server running on Port... and connected to MongoDB


## Tutorial for demo version using local json-data. This can be used locally if wanting to test just the frontend functionality

First, clone the repo.

Backend will not be needed. The demo application only uses the frontend.

Commands, in order:

Open up a terminal.\
Navigate to frontend: ```cd frontend```\
Run ```npm install```\
Run ```npm run demo```

This app will use the data in the demoData.json-file. You are automatically logged in with the testuser and are not able to login with any other accounts than the test account and you cannot create new accounts.

### Note!
Before switching back to developer frontend, be sure to logout. The async-storage will keep the user in the local storage and this user is not compatible with the dev-version.
Alternatively if you forgot to logout, you can remove the user from the local storage by opening the developer tools in your browser.
When switching back to the developer frontend from demo you will most likely have to use the command ```npx expo start --clear``` to reset the .env variable.
