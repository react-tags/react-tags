#!/usr/bin/env bash
mkdir -p .git/hooks
touch .git/hooks/pre-commit
cp .hooks/pre-commit .git/hooks/pre-commit
chmod a+x .git/hooks/pre-commit

printf "\033[42mPrecommit hook created successfully\033[0m"
