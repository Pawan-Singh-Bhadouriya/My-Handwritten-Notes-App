# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


<!-- steps for adding react to your project
run the following command:-
1.npm create vite@latest 
2.given name to your peoject and package and then select a frameweork as react and variant as js
3.then run these three commands
3.1 cd your project name
3.2 npm install
3.3 npm run dev
4. and then it will give you a local host link to run-->

<!-- AFTER RUNNING TILL THE STEP 3.2 RUN  THIS COMMAND TO USE THE REACT HOOK FORM 
npm install @reduxjs/toolkit
npm i react-redux
THEN RUN 3.3 -->


<!-- https://redux-toolkit.js.org/tutorials/quick-start
follow this documenation if any query arises  -->

<!-- 
Steps to do for using redux
1.create a store 
2.wrap the APP component into the provider
3.create a slice
4.register reducer in store -->


<!-- 
to install the tailwind use these command
1.npm install -D tailwindcss postcss autoprefixer
2.npm install -D tailwindcss@3.4.17
3.npx tailwindcss init -p

after the go to tailwind.config.js and change the content with this:-
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

then go to your css file and these 
@tailwind base;
@tailwind utilities;
@tailwind components;
 -->

 <!--if you want to use react router then run the following command
 npm i react-router-dom
   -->