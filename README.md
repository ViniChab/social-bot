What is the Social Bot?
===================================
The Social Bot is a "Linkedin Account Manager" software built with Node.js and Cypress.

What is its purpose?
===================================
The Social Bot's objective is to take full control of a fake linkedin account and use it as if it was human - it will browse the feed, like posts randomly, send connection requests, post some famous quotes and generate reports based on profile views, post views, number of connections and search appearances over time.

The bot's main enemy will be linkedin’s bot detection - but everything was built in a way that a human could perform the same actions as the software (a human with a lot of free time, that is).

The program will keep running for about 10 hours a day, and an article about the profile's progress will be written after at least two months of daily work. 
This software will answer the following question: can a bot manage a linkedin profile in a way that the profile grows organically, while still under the radar from linkedin's bot detection?

The article
===================================
Currently, the bot is working daily and gathering data, so you could say that article is still a WIP - I'll be updating this README as soon as that's ready;

Running the bot
===================================
Simply clone this repository, and run `npm install`, the node_modules folder will be created and the app will be good to go! You can run it using `npm run start`.
Do keep in mind that an .env file must me created as well, it should have the following environment variables:

```
  LINKEDIN_URL= The linkedin login page URL, for now it's "https://www.linkedin.com/login"
  LINKEDIN_USERNAME= Your account’s email or username
  LINKEDIN_PASSWORD= Your account’s password
```

About the future
===================================
Over time, linkedin will update, and this software will no longer work - that's why I created a file containing all button and input "paths", named "element-id.const.js". If something changes, updating this file should be enough.
This is not foolproof though, if drastic changes are made to linkedin, drastic changes must be made to this software. But as someone who has been regularly using linkedin for years now, I'm pretty sure changes like that are pretty unusual.

That's all, folks!
===================================
Please, take a moment to connect with me on Linkedin: https://linkedin.com/in/vinicius-chab/, and have a great day!

License
===================================
MIT - Vinícius Chab
