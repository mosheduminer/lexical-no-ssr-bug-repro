# Lexical no SSR bug repro

This repository contains a reproduction of [this issue](https://github.com/mosheduminer/lexical-solid/issues/20).

## Reproducing

Install and run the dev script - you will notice the editor automatically focusing, and any change will get added to a log underneath. Additionally, there's a button to manually trigger another log line. Now edit `app.config.ts` to disable SSR, and all of these effects will no longer occur.

## This project was created with the [Solid CLI](https://solid-cli.netlify.app)
