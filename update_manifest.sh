#!/bin/sh

git checkout master
git pull --all
git merge -m "new works" origin/painter2

node generate.js
git add manifest.json
git commit -m "New manifest"
