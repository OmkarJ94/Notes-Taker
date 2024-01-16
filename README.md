## Overview

This NestJS Blogging Platform API provides a robust backend for a blogging application. It includes endpoints to add and list blogs, like blogs and comments, and manage comments efficiently. Built with NestJS, it leverages TypeScript's strong typing and NestJS's scalable framework.

## Features

1. Add Blog: Create new blog posts.
2. List All Blogs: Retrieve a list of all blog posts.
3. Like a Blog: Allow users to like a blog post.
4. Comment on a Blog: Enable users to add comments to a blog.
5. List All Comments: Fetch all comments for a specific blog post.
6. Like a Comment: Allow users to like a comment.
7. Get a blog like count : Retrieve a count of like on blog 
8. Get a comment like count : Retrieve a count of like on comment blog 

##Requirements

1.Nodejs
2.Nestjs CLI
3.Mongodb Database
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints
### Blogs
POST - Add a new blog
```bash 
http://localhost:3000/blog/addblog
```
Body: { title: string,
        content: string; }

GET - List all blogs
```bash
http://localhost:3000/blog/getallblogs/:id 
```

Param: id (ID of the user to get blogs)

### Like
POST - Like a blog 
```bash
http://localhost:3000/blog/like/:id 
```
Param: id (ID of the user to get blogs)

GET - Get a like count
```bash
http://localhost:3000/blog/getlikecount/:id 
```
Param: id (ID of the blog to get like count)

### Comments
POST - Add a comment
```bash
http://localhost:3000/blog/addcomment/:id 
```
Param: id (ID of the blog to add a comment)

POST - Like a comment
```bash
http://localhost:3000/blog/likecomment/?blogId=_____&commentId_____
```
Query Param: blogId(ID of the blog whose comment is user going to like)

commentId(ID of the comment which user going to like)

GET - Get comment like count
```bash
http://localhost:3000/blog/getcommentlikecount?blogId=_____&commentId_____
```
Query Param: blogId(ID of the blog whose comment's like count is user want to retrieved)

commentId(ID of the comment of which like count user want to retrieved)

GET - Get all comments
```Bash
http://localhost:3000/blog/getallcomments/:id
```
Param: id (ID of the blog to get comment)
