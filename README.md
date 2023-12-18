# Rhymes and Fables

> This project is developed for Supabase Launch Week X Hackathon by Mahendra Dani

Have a crazy story in your mind but can't showcase it to the world?
We have just the right solution for you: Rhymes and Fables
Rhymes and Fables is a platform where you can convert your crazy ideas into amazing stories and poems. Share your thoughts and opinions as quotes.

[Go to website](https://rhymes-and-fables.vercel.app/)
[Demo Video](https://drive.google.com/file/d/1WjDVINE3DSfQlCke7_jA_0Iuo_MR4faN/view?usp=drive_link)
[Contact Me](https://twitter.com/MahendraDani09)

## Features

1. Fully functional two factor authentication with Email, Google OAuth and Github OAuth.
2. Personalized Feeds : Users are recommend content based on their read history
3. In built editor : Users can draft their own stories, poems and quotes and then publish them to showcase the world
4. Like and Comments : Users can like and comment on other posts and upvote the best stories.
5. Light and Dark mode support

## Tech Stack

1. Nextjs : Frontend and backend
2. Supabase Auth : Authentication and Authorization
3. Supabase Database : For storing, managing and organizing data
4. Shadcn & Tailwindcss - css framework for styling and theming
5. Vercel : Deployment

## Setting up locally

To setup the project locally follow the given steps

1. Fork this repo
2. Go to the terminal and clone the project in your machine

```
https://github.com/<your-github-username>/supabase-hackathon.git
```

3. Change directory to the project directory

```
cd supabase-hackathon
```

4. Install the dependencies

```
npm install
```

5. Set up environment variables

```
cp .env.example .env.local
```

Create a supabase project, go tp project settings and add your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env.exmample` 6. Optional : Set up Google and and Github OAuth Providers 7. Run the project

```
npm run dev
```

Go to localhost:3000 where the project will be running!

## Connect with me

1. [Github](https://github.com/MahendraDani)
2. [Linkedin](https://linkedin.com/in/mahendra-dani)
3. [Twitter](https://twitter.com/@MahendraDani09)
