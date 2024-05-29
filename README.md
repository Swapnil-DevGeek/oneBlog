# OneBlog Application

This is a full-featured blog application built with Next.js and Prisma. The application allows users to create, update, and delete posts, as well as like posts and copy the URL of a post to the clipboard. 

## Features

- User Authentication
- Create, Read, Update, and Delete (CRUD) operations for blog posts
- Like functionality for blog posts
- Search functionality
- Copy URL to clipboard
- Responsive design with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication

## API Endpoints

- `POST /api/write` - Create a new post
- `PUT /api/updatePost` - Update an existing post
- `POST /api/likePost` - Like a post

## Usage

### User Authentication

Users can log in using their credentials. Ensure that your `JWT_SECRET` is set up in your environment variables.

### Creating a Post

Navigate to `/addPost` and fill in the form to create a new post.

### Updating a Post

Navigate to the post you want to edit and click the "Edit" button.

### Liking a Post

Click the "Like" button on any post to like it.

### Copy URL to Clipboard

Click the "Copy URL" button on any post to copy its URL to the clipboard.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
