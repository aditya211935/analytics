# Analytics

This project contains an analytics table that supports the specs outlined in the assignment document. I've also implemented a cache for caching recent request, and you can find my comments about it's implementation inside `src/common/utils/request/index.js`

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

