# Styling With Tailwind CSS

## How to Serve Static Files?
- Create Public folder and write your static files (css....) there.

- in your app.js add a middleware:
```js
app.use(express.static(path.join(rootDir, 'public')))
```
- Now you can access your static files.
- eg.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>airbnb</title>
    <link rel="stylesheet" href="home.css">
</head>
<body>
     <p>Welcome to airbnb</p>
     <a href="/host/add-home">Add Home</a>
</body>
</html>
```
## Tailwind CSS
- Responsive
- Utility First
- Highly Customizable
- No external css file needed.
- Purge CSS: Remove unused css.
### Installation:
```bash

npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init

```
- in your tailwind.config.js
```js
content: ["./views/*.html"],
```
- to use tailwiind in html files under views folder.
- Then make a input.css folder under views:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- In your html
```html
<link rel="stylesheet" href="output.css">
```
- then in terminal:
```bash
npx tailwindcss -i ./views/input.css -o ./public/output.css --watch
```
- keep this in your terminal sideby your server.
- Now you can write tailwind and continue building.

- To Run Both Server and Tailwind

```json
"scripts": {
  "dev": "concurrently \"npm run server\" \"npm run tailwind\"",
  "server": "nodemon app.js",
  "tailwind": "tailwindcss -i ./views/input.css -o ./public/output.css --watch"
},
```
```bash
npm run dev
```