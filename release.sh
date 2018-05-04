#!/bin/bash

# releases a new version
release () {
  echo "Version $1 in progress"
  git checkout master &&
  git pull -r origin master &&
  git tag v$1 &&
  git push origin --tags &&
  npm run build &&
  git commit -am "upgrading to version $1" &&
  git push origin master &&
  npm publish
  echo "Version published successfully"
}

if [ $# -ne 3 ]
  then
  echo "Usage: ./release.sh 3 2 1 for releasing v3.2.1"
  exit 1
fi
echo "This will release new Version v$1.$2.$3...."

# ask for user's confirmation
read -p "Are you sure you want to continue? (y/n) " choice
case "$choice" in
  y|Y) release "$1.$2.$3" ;;
  *) echo "Aborting..."
esac
