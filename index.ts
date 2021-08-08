import nodemon from 'nodemon';
import fs from 'fs';
import path from 'path';

nodemon({
    script: path.join(__dirname, 'app.ts'),
    watch: ['./src', 'app.ts', 'app.restart'],
    ext: 'ts'
});

nodemon
    .on('start', () =>
    {
        console.log('App started');
    })
    .on('quit', () =>
    {
        console.log('App quit');
    })
    .on('restart', (files: string[]) =>
    {
        console.log('App restarted: ', files);
    })
    .on('crash', () =>
    {
        console.log('App Crashed');

        //Change the file content to restart the server if it crashed
        fs.writeFileSync(path.join(__dirname, "app.restart"), Date().toString());
    });