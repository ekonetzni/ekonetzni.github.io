#!/bin/sh

node generate.js
git commit add manifest.json
git commit -m "New manifest"
