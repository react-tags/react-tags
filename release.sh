#!/bin/bash

if [ $# -ne 3]
then
  echo "Usage: ./release.sh 3 2 1 for releasing v3.2.1"
  exit 1
fi
echo "Version $1.$2.$3 in progress"
git checkout master
git pull -r origin master
npm build
git tag v$1.$2.$3
git push origin --tags
git commit -am "upgrading to version $1.$2.$3"
git push origin master
npm publish
echo "Version published successfully"
