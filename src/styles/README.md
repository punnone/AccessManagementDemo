# Styles
Finally, we come to styles. Although my go-to way is to just embed styles inside of the UI by using a CSS-in-JS solution like Styled-Components, it’s sometimes helpful to have a global set of styles in a CSS file.

A plain old CSS file is more shareable across projects, and can also affect the CSS of components which styled-components can’t reach (for example, third-party components).

So, you can store all of these CSS files inside of the styles folder, and import or link to them freely from wherever you wish.