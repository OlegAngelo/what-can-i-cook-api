# what-can-i-cook-api
API for What Can I Cook app - for hacktoberfest

Link for [What Can I Cook?](https://github.com/OlegAngelo/what-can-i-cook.git).

## How to run locally
1. clone repo to your machine
```bash
git clone https://github.com/OlegAngelo/what-can-i-cook-api.git
```
2. make sure to remove `node_modules` and `package-lock.json`
3. then run the following command
```bash
npm install
```
4. to run, please use the following command

```bash
node ./src/index.js 
```
5. make sure to have the [frontend](https://github.com/OlegAngelo/what-can-i-cook) running
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to contribute
1. follow steps from "How to run locally"
2. create a new branch from `development` branch with the following template : <name of developer>-<what-are-you-applying>
example: dylan-converting-cookies-into-localstorage
```bash
git fetch
git checkout development
git pull
git checkout -b "<please-use-the-template-above>
```
3. upon changes has been applied please `add` changes
```bash
git add <file-path>
```
4. then `commit` your changes locally
```bash
git commit -m "<short description of changes>"
```
5. then `push` to origin <branch-name>
```
git push origin <current-branch-name>
```
6. create a [pull request](https://github.com/OlegAngelo/what-can-i-cook-api/pulls) here in github


