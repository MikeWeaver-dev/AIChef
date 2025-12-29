**Background**

AI Chef is my first project working with Expo/React Native and my first time publishing to the Apple app store and Android app store. I worked really hard on this project to make the UI excellent for both the web and mobile, and I hope it shows from the user perspective.

I wanted to make and app that integrates with AI, both because it would be good practice for my API work and also because AI is everywhere now and I felt some coding experience with it would make me more marketable. This app uses the OpenAI API and runs GPT-4o mini.

The app itself is written with React and React Native and uses Nativewind and TailWind CSS to make that stunning UI. I love TailWind and I don't think I'll be using raw CSS for any of my personal projects anymore.

The app is desinged to help people cook! They can input their ingredients in the "pantry" tab and use the AI to generate recipes. Kind of simple but cool. I think the project was more focused on AI integration and incredible design, as opposed to groundbreaking functionality.

Check the app out yourself at Mikeweaver.dev/AIChef 

Most of my code is in src for web, app for mobile, and sever for backend. Co ahead and take a look!

**Key Features**
- Built for web and mobile & available on Apple and Android app store
- User authentication & login
- Persistent data
- AI Integration
- Independently running backend hosted by a third-party server
- Stunning UI/UX via TailWind CSS and Nativewind

**Tech Stack**
- React
- Firebase
- Expo
- TailWind CSS
- Nativewind
- Javascript
- JSX

**Installation**
- Install node.js, Vite, React, TailWind CSS, Nativewind, expo
- For Web App:
  - On PC, run "npm create vite@latest"
  - Select Javascript & React
  - Leave node_module untouched. Update the other folders with my code from "Web App"
- for Mobile:
  - on PC run "npx create-expo-app@latest"
  - leave .expo .vscode and node_modules untouched. Update everything else with my code from "Mobile"
- for Backend:
  - Best to manually make a folder called "backend" and populate it with the folders in from "backend"

-Note: You will need to add your own API key to .env in backend
-Note: The code here on GitHub does not have access to my Firebase server. It will still run with dummy props and have the same functionality
