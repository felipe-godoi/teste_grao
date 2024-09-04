#!/bin/sh  

npm rebuild bcrypt --build-from-source
npm run build
npm run migration:run
npm run seed
npm run start:dev