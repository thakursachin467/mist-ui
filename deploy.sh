#!/bin/bash

### 1. Github Pages

# Git config
git config --global user.email "mist@ethereum.org" &&
git config --global user.name "Mist-bot"

### 2. Github publishing

# - Bumps package.json
# - creates GH tag
# - generates changelog based on commit messages
yarn run standard-version --message='chore(release): %s [ci skip]'

# Pushes changes back to the repository
git push --follow-tags origin $BRANCH

# Deploys metadata
yarn run deploy
