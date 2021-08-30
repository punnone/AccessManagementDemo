# Contexts
The contexts folder is a bare minimum folder only containing the state which has to be shared across these components. Each page can have several nested contexts, with each context only passing the data forward in a downward direction. But to avoid complexity, it is best to only have a single context file. This structure will look like this:

contexts
|---page1Context
        |---index.js (Exports consumers, providers, ...)
        |---Context1.js (Contains part of the state)
        |---Context2.js (Contains part of the state)
|---page2Context
        |---index.js (Simple enough to also have state)