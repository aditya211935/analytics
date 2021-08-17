# Analytics

This project implements an analytics table that supports the specs outlined in the assignment document. I've also implemented a caching layer to cache recent requests, and you can find my comments about its implementation inside `src/common/utils/request/index.js` file.

Link for online demo: https://analytics-murex.vercel.app/

To start using it, create a .env file with the following variables:

```
REACT_APP_API_VERSION=v3
REACT_APP_API_BASE_URL=http://go-dev.greedygame.com
```

Then execute the following.
```
yarn install
yarn start
```

