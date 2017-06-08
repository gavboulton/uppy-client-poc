# Upply Client PoC

A spike to investigate [Uppy](https://uppy.io) as a file uploader and its plugin system.

Clone the repo

```
yarn install
yarn dev -- -p 3452
open http://localhost:3452/upload
```

You'll need a server that support the tus protocol for resumable uploads. See https://github.com/gavboulton/tus-node. This supports writing uploads to the file system and sending them to Google Cloud Storage.
