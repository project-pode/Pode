# Pode project

## Guide for developers

### Be sure to have the newest Node.js version installed!

Start by setting up env variables in .env file, both in frontend and backend. 
Use .env.template as template for variables. 

Database URI can be retrieved from admin

1. Frontend

Open up a terminal.
Navigate to frontend: ```cd frontend```
Run ```npm install```
Start app with ```npm start``` and choose platform

Sometimes changing the .env in frontend does not work and you may have to run command ```npx expo start --clear```

2. Backend

Open up an additional terminal.
Navigate to backend: ```cd backend```
Run ```npm install```
Start app with ```npm run dev```

If everything worked fine terminal should print Server running on Port... and connected to MongoDB

## How to push your build

Create a branch.

Name you branch SCRUM-X where X is the number on your jira ticket. For example, SCRUM-98's branch would be called "SCRUM-98".

Push and Commit your build to the branch.

Go to Github, then go to Pode, and make a PULL REQUEST (should be visible on Pode homescreen in a big yellow box with a smaller green box inside it).
IF no box box appreas, head over to Pull Requests, which is located on the TopBar between Issues and Actions. In Pull Requests, you should see a green button labled "New Pull Request". Click it and choose what branch you wish to send to the review process.

Team members will review your changes/build before it is added to the Main-branch.

Once it has been reviewed and accepted, YOU need to merge it to Main-branch (AKA Master-branch) on Github's website.

## Tutorial for demo version using local json-data

Backend will not be needed. The demo application only uses the frontend.

Commands, in order:

Open up a terminal.
Navigate to frontend: ```cd frontend```
Run ```npm install```
Run ```npm run demo```

This app will use the data in the demoData.json-file. You are not able to login with any other accounts than the test account and you can not create new accounts.

### Note!
Before switching back to developer frontend, be sure to logout. The async-storage will keep the user in the local storage and this user is not compatible with the dev-version.
Alternatively if you forgot to logout, you can remove the user from the local storage by opening the developer tools in your browser.
When switching back to the developer frontend from demo you will most likely have to use the command ```npx expo start --clear``` to reset the .env variable.