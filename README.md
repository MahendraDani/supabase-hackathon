# Rhymes and Fables

> This project is developed for Supabase Launch Week X Hackathon by Mahendra Dani

Have a crazy story in your mind but can't showcase it to the world?
We have just the right solution for you: Rhymes and Fables
Rhymes and Fables is a platform where you can convert your crazy ideas into amazing stories and poems. Share your thoughts and opinions as quotes.

[Go to website](https://rhymes-and-fables.vercel.app/)
[Demo Video](https://drive.google.com/file/d/1WjDVINE3DSfQlCke7_jA_0Iuo_MR4faN/view?usp=drive_link)
[Contact Me](https://twitter.com/MahendraDani09)

## Screenshots

![Landing page ](/public/screenshots//landing-dark.png)
![Feeds page](/public//screenshots//feeds-dark.png)

![Landing page light](/public//screenshots//landing-light.png)
![Feed Page light](/public//screenshots//feeds-light.png)

## Features

1. Fully functional two factor authentication with Email, Google OAuth and Github OAuth.
2. Personalized Feeds : Users are recommend content based on their read history
3. In built editor : Users can draft their own stories, poems and quotes and then publish them to showcase the world
4. Like and Comments : Users can like and comment on other posts and upvote the best stories.
5. Light and Dark mode support

## The Impact

1. Writers and Poets will get a centralized platform to showcase their work
2. Mom's won't have to find stories for their kids here and there.
3. Promotes written (text) content over photos and videos (shorts).

## Where and How I have used Supabase?

I am afraid but I must say Supabase just provided me the magic powers to build scalabe and amazing products. I have used Supabase Auth and Supabase Database extensively in my project.

### Supabase Auth

Supabase Auth helped me implement authentication and authorization with Email, and other providers like Google and Github.
Authentication and Authorization has always been something that I am afraid of, becuase it is most important segment in any application. But supabase really took that load of me. All I had to was read through the docs, watch some videos on their official Youtube channel created by Jon Meyers and integrate it my app.

### Supabase Database

When I was exploring Supabase I found out that they provide a Postgres database and I was stoned. For a minute I thought I won't be able to participate in this hackathon becuase I had no prior knowledge of working with relational databases. But I took the challenge put my self into it, developed an ER diagram.
Row-level Security is a superpower I must say. It was a little difficult to understand in the begining but once I understood it is just amazing. You don't have to worry about security breach or data leak! Just write good policies.

## Challenges

1. The biggest challenge I faced was working with Nextjs and Typescript. Although I had some expirience with using Typescript, Nextjs was completely new to me. Server components and Client components still confuse me!

2. Authentication and Authorization : When I read the docs, I found that there are three libraries provided by supabase `@supabase/supabase-js`, `@supabase/auth-helpers-nextjs` and `@supabase/ssr` and I was confused which one should be used. After a lot of reading and researching I used `@supabase/auth-helpers-nextjs` throughout my projects.

3. TypeErrors : At multiple instances I had to join two tables, but generating and writing types for joins was something that I just couldn't achieve. I used the supabase cli to generate types for my project, but I found writing types for joins very difficult. And their are very few resources I could find on supabase docs related to this.
   You might find in some files that I have used @ts-ignore to get rid of type-errors xd

## Future Scope

1. Follower-Following feature : Users should be able to other writers and feed should be customized based on the following and followers
2. Enchancing the editor : I plan to move to a WYSIWYG editor for writing stories and poems. Due to the time constraint of the hackathon I could not develop the editor in this version.
3. Performance : The performance of the application can be improved, code can be be refactored in more optimized way.
4. My Activity section : My activity section will be the place where the users will be shown their latest activity on the app
5. Bookmarks : It might happend that some users would want to bookmark posts to read later. So adding a bookmarking feature makes much sense.

## Tech Stack

1. [Nextjs](https://nextjs.org/) : Frontend and backend
2. [Supabase Auth](https://supabase.com/) : Authentication and Authorization
3. [Supabase Database](https://supabase.com/) : For storing, managing and organizing data
4. [shadcn](https://ui.shadcn.com/) : Component library
5. [Tailwind css](https://tailwindcss.com/) : CSS Framework
6. [Zod](https://zod.dev/) : Input validation
7. [Vecel](https://vercel.com/) - Deployment

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
3. [Twitter](https://twitter.com/MahendraDani09)
