# Pode project

## Guide for developers (Initial set-up)
Start by setting up env variables in .env file, both in frontend and backend. 
Use .env.template as template for variables

Database URI can be retrieved from admin

1. Frontend

Open up a terminal.
Navigate to frontend: ```cd frontend```
Run ```npm install```
Run ```npx expo install expo-splash-screen``` (this is needed for showing fonts)
Start app with ```npm start``` and choose platform

2. Backend

Open up an additional terminal.
Navigate to backend: ```cd backend```
Run ```npm install```
Start app with ```npm run dev```

If everything worked fine terminal should print Server running on Port... and connected to MongoDB

## How to start Pode after initial set-up

1. Frontend

Open up a terminal.
Navigate to frontend: ```cd frontend```
Start app with ```npm start``` and choose platform.

2. Backend

Open up an additional terminal.
Navigate to backend: ```cd backend```
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