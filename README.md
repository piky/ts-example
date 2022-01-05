# Sample typescript and CI/CD workflow
We're created mini API for prove of concept CI and CD workflow. It's develop base on Typescript.

## How to use
- Install Dev dependencies.
```bash
$ npm ci # or use npm install
```
- To compile typescript to commonJS in `build` folder.
```bash
$ npx tsc
```
- Run dev serve application.
```bash
$ npm run start
```

## Fast Demo with docker
You can run nodejs in docker for fasttrack to demo this service.  
```bash
$ docker run -it --rm -v $(pwd):/app node:15-alpine /bin/ash
$ cd /app
$ npm ci
$ npm run start # this line should start nodeJS process.
```
