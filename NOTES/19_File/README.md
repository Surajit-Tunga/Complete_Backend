# File Handling 

## Adding File Picker
- In add-home form
```html
  <input 
    type="file" 
    name="photo" 
    accept = "image/*"
    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
  />
```
---

## Multipart Form
1. Downlod multer package
```bash
npm i multer
```
2.  Update the form
```html
<form action="/host/<%= editing ? 'edit-home/': 'add-home' %>" method="POST" enctype="multipart/form-data" class="space-y-4">
```
3. Use multer in app.js
```js
9.45
