Obsidian Generator UI
=====================
[![Build Status](https://travis-ci.org/obsidian-toaster/generator-frontend.svg?branch=master)](https://travis-ci.org/obsidian-toaster/generator-frontend)

If this is the first time you are starting the UI you need to run

```bash
$ npm install
```

If you trying to refresh your install you can run:

```bash
$ npm run reinstall
```

Start the app by executing the following.

```bash
$ npm start
```

## Production Build

To generate production build, set the API URL (the host and port of where
[generator backend](https://github.com/obsidian-toaster/generator-backend) is deployed) in the [settings.json]( https://github.com/obsidian-toaster/generator-frontend/blob/master/src/assets/settings.json)
and run the `npm` command as given below:

```bash
npm run build:prod
```

The build output will be under `dist` directory. 