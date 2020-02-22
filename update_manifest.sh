#!/bin/sh

node generate.js
git add manifest.json
git commit -m "New manifest"
