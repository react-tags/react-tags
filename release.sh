#!/bin/bash
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
