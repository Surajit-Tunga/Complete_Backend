const fs = require('fs');

fs.writeFile('otuput.txt', 'wrriting file', (err)=> {
    if (err) console.log('Error ');
    else console.log('File written succesfully');
})