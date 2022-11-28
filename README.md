# [Voya.js](http://voya-js-sl.vercel.app/)

Hi there. If by any chance you've come across this project before, you'll know that it has had many, many iterations.

Currently, it's a MOSTBIFS (Multiplayer Online Serverless Text-based Interactive Fiction Sandbox Game). the history, and roadmap are listed below, as well as some ~~thoughts~~ feelings about the goals of this thing overall.

## History

This is one of my longest running projects. I started almost 10 years ago as a way to learn javascript. I was in college, and had taken my first programming class or 2, and was curious to try my hand at the web. I used it to learn Streams with highland js (and later rxjs), I started a branch to rewrite the gui in Elm, there's a halfbaked version of it in actix-web floating around somewhere... you get the idea.

As I worked on it over and over, it also started to change form a bit. It originally started as basic interactive fiction, the story of a creepy carnival with some spooky locations, and sinister scenes. I'm not much of a story-writer, so the plot never develpped that much, and over the years I've enlisted various people to help out, but it's always during a huge refactor or something and their data never quite made it in.

The more I build, I became less interested in writing the content, and wanted to allow others to create the content. The first step in that direction was moving the content to a 'rom' json file that the engine was able to 'play'. Felt appropriate given the aesthetic...

As I grew artistically, and developed more skills, I started dreaming more and more about what it could be. I started asking questions like "what kinds of stories are enabled (in a good way) by the various storytelling formats available? What would it mean to make a game/experience/thing that progresses from a text based interface to a 2d, and then 3d environment, incorporating more and more immersive elements as it progresses. How could the story change? among other things.

Originally, that idea felt like a separate project from this one. But quickly I realized that it was all related to the same research. If building that multi-media-platform experience was my next research, then _this_ was was the perfect test bed for letting that playout.

This code had sat dormant for a while. I'd touch on it every once in a while, but with little major change. It underwent a few really good manglings as I (in a pandemic brain-fog) attempted a typescript port, and failed miserably several times. Until just recently in late 2022, I came back to it with a fresh mind, some (much) better typescript knowlegde (if I dare say so myself...), and started barreling forward towards the most recent, and arguably largest

## Identity Shift

There were a few major tentpole features that I wanted to include in the new incarnation of this thing, whatever it is we're making. For starteres, there wasn't a way to

### 1: Save Progress

until now, this was a short-lived transient browser experience. It definitely needed some sort of persistance across sessions. this comes hand in hand of course with some sort of

### 2. Multiplayer Mechanism

Hand in hand with ability to save your progress would come some kind of player id system. Sure we could do an old-school level-code type deal, but it would make it more personal as we investigated the much more complex topic of

### 3. Sandbox Mode

I wanted to solve the content-creation problem once and for all, by fully releasing the power of world-creation into the hands of the users. The people moving about this virtual space should be empowered to create objects and spaces, design interactions and encounters, and just generally sing the world into being as they moved through it. This is the least formed idea as it stands, but I'm pretty dedicated to figuring out how this is going to work. Finding ways to design and model user-generated interactions is going to be pretty challengin. But I think it will be really powerful if we figure it out. It's gonna get that much more complicated too as we get to

### 4. Graphics

This one is the most self-contradictory. I'm interested in bringing the multiple levels of visual engagement into it. It could start as changing the background image per picture, and evolve into a more complete 2d and 3d environment, perhaps even on an indevidual basis as players level up? I'm really not sure. I'd love some help figuring it out.

Please feel free to [discuss](https://github.com/trevorsargent/voya.js/discussions) ways this could come together. I'll keep pluggin away at this, but there's alwasys room for ideas :)

## Goals / ~~Thoughts~~ ~~Feelings~~ IDK

I mentioned my "research" a little bit in the other section, and I thought I would talk a bit about that in more detail here. One of my most dear mentors taught me about finding "your research" as an artist.

There are a few research questions that seem to circle this project.

- How can a storytelling medium enable and hinder certain stories?
- What does online interaction do for storytelling?
- How do we create authentic experiences across distances?

A lot of my working day is spent, as I like to say, "Metaverse Adjacent". There. I said it. I said the M word. and I'll admit that part of the thesis of this project is to remove the current conotations of that phrase. I feel like right now I hear it crop up as part of 2 discussions

1. "Some day we're not even gonna see eachother in real life, and it's all gonna be in the metaverse".

   I'll be the first to say that I'm not interested in this future. Sure there will be stuff to do there that's harder to do when, say, the rules of gravity are in play...

2. "The metaverse is never going to happen! It's never going to be compelling enough to really catch on - this is a fad."

   I also this this is a bit short sighted.

I think what both of these takes lack in a pretty significant way, is any consideration of the ways we are abstracted away from in person communication already. Even now, you are reading words on a digital display that were typed many miles away, disassmbled into binary data, stored somewhere, and retried and re-constituted for you to read on demand - and presumably, there's some level of personality being rendered for you in these words. I hope.

(I'm starting to think this doesn't really go in the readme.... but until there's another place for me to spew about this...)

One thing we do know, is that we for sure don't know everything that we'll be able to do with the technology of the next 100 years. And I hold this project as a way to investigate interaction at a basic level. I'm trying to build a microscope for online interaction. I want to watch this petrie dish evolve as people use, make, explore, interact, talk, discover, share, grieve, and wonder at the world that we're creating for eachother. I'm interested in the constraints of text, with the intricacies of a full 3d environment. What can we enable with these limitations? What then can be gained once those limitations can be broken?

I'm not sure if it will work. I hope it does. I hope we find out something cool. <3

## Technologies / Services

### Current Stack

In keeping with this being a research project, the technologies are picked kind of for their own sake, as well as for their aptitude for this kind of project.

#### [Typescript](https://www.typescriptlang.org/)

Duh

#### [Vercel](https://vercel.com/docs)

These guys have been doing really cool work for a while. They bought up svelte (a fav project of mine, and a real candidate for a gui for this...) not too long ago, and their cloud functions seem to do a good job.

#### [SurrealDB](https://surrealdb.com/)

this... is amazing. The work Tobie and Jaime are doing on this is incredible. I'm really excited to be building with it, and i'm looking forward to experimenting with query generation for `surealQL` and contributing to type safe (as much as we get in TS) queries with their database.

#### [Pusher](https://pusher.com/)

this one is mostly out of necessity... I'd be curious to perhaps write a lightweight version of this for this project's sole use at some point, but they are here for us now as we grow.

#### [Linode](https://linode.com)

I mean, do I really even have to say anything? Right now they're hosting our surreal db instnace, and I'm sure more things will come.

### Possible Additions

#### [TRPC](https://trpc.io/)

handles type safety in the api with the serverless functions.

#### [Svelte/Kit](https://svelte.dev/)

I mentioned it above, but it's worth considering.. especially as this thing grows.

## Contributing

please do, if you like! We got a `.prettierrc` and an `.nvmrc` file to help keep ya on track. You'll need to connect to vercel in order to run their cli, and if you do, I can authorise you to use the dev environment's variables which is kinda slick.

## House Keeping

a bit of house keeping... If you're playing and you notice a problem, please do [make an issue](https://github.com/trevorsargent/voya.js/issues/new/choose). There's a template - the more info you can provide the better. If you're comfortable sharing you're userId, that makes debugging even easier.

Let's keep discusssion of potential features and ideas for modification to the [Discussions](https://github.com/trevorsargent/voya.js/discussions) section until they become actionable code changes to help keep the backlog in check.
