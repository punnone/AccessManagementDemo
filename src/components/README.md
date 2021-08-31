# Components
Although in this section we should talk about contexts, I want to talk about components first. This is to understand why context is required (and needed) in complex applications.

Components are the life-blood of your application. They will hold the UI for your application, and can sometimes hold the Business Logic and also any State which has to be maintained.

In case a component becomes too complex to express Business Logic with your UI, it is good to be able to split it into a separate bl.tsx file, with your root index.tsx importing all of the functions and handlers from it.

components
|---page1Components
        |--Component1
        |--Component2
|---page2Component
        |--Component1
               |---index.js
               |---test.js