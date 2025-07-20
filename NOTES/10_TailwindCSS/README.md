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