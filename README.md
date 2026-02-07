# Pode project
- A mobile application developed with React Native and Node.js using TypeScript.
- Deployed as a web-application at https://pode-app.onrender.com/
- It is strongly recommended to run the web-application in device-mode on your browser (F12 + ctrl-shift-m), or from a smartphone's browser to simulate the mobile application.
- User instructions can be found [here](https://github.com/project-pode/Pode/blob/master/Pode_userGuide.pdf)

## Screenshots
The user is greeted with a Login/Register page where the user can either login or register themselves.

<img width="200" height="420" alt="Skärmbild 2026-02-07 155744" src="https://github.com/user-attachments/assets/4d7b28b6-6a1e-4042-acf6-002849b6df76" />

The user can then choose where to start. Each cloud is one lesson.

<img width="200" height="420" alt="Skärmbild 2026-02-07 161939" src="https://github.com/user-attachments/assets/5e697161-0ed6-4621-ad0a-65eb480bb821" />

After choosing a lesson, Pode gives a short explination about the content of the lesson.

<img width="200" height="420" alt="Skärmbild 2026-02-07 162012" src="https://github.com/user-attachments/assets/7821c863-db45-4bbb-b2bc-2c6efd470781" />

Each lesson contains multiple different types of questions and exercises. From fill in the blank to dropdown tables.

<img width="200" height="420" alt="Skärmbild 2026-02-07 162037" src="https://github.com/user-attachments/assets/4db86956-d30f-40aa-b2d1-485428b6a5e7" />
<img width="200" height="420" alt="Skärmbild 2026-02-07 162118" src="https://github.com/user-attachments/assets/380eaff2-e746-4560-88b2-757439f2dcbf" />
<img width="200" height="420" alt="Skärmbild 2026-02-07 162312" src="https://github.com/user-attachments/assets/b33ea069-062f-4e80-9287-28d4c0d1f5dc" />

After the user finished a lesson, they are praised and may now move onto the next lesson.

<img width="200" height="420" alt="Skärmbild 2026-02-07 162351" src="https://github.com/user-attachments/assets/ad9be167-4bd8-4492-9f97-613931d8c9b0" />

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
