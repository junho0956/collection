/**
name: "ci-cd pipeline"

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
steps:
  - uses: actions/checkout@v2
- name: Use Node.js 18.x
uses: actions/setup-node@v2
with:
node-version: 18.x
cache: 'npm'
cache-dependency-path: package-lock.json
- name: Install dependencies
run: npm install
- name: Build file
run: npm run build


// deploy the application to netlify
- name: Deploy production to Netlify
uses: South-Paw/action-netlify-deploy@v1.2.0
with:
github-token: ${{ secrets.GIT_TOKEN }}
netlify-auth-token: ${{ secrets.NETLIFY_AUTH_TOKEN }}
netlify-site-id: ${{ secrets.NETLIFY_SITE_ID }}
build-dir: './build'
comment-on-commit: true
 **/

export const valueeeeee = 1;