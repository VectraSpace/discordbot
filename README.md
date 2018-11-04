# Vectra Space - Discord Bot



> **(Please Read)**: This bot should **never** be used in production, it has a high likelyhood of breaking and isn't coded the best. If you want a ticket or administration bot for a production environment please go check out Tickety at https://tickety.xyz/ or Dyno at https://www.dynobot.net/ . This bot was simply made publicly avaliable due to the lack of self hosted ticket bots, this dosen't mean it should ever be used.





This bot belongs to a company called "Vectra Space", all code is open source and can be used freely as long as licencing conditions are met. Feel free to use this projects source code for your own projects but do not claim it as you own. 
No warranty or support is provided with the use of this code and Vectra Space or it's developers are not responsible for any damage caused by the bot. Aditionally, this version is not perfect and contains many bugs, these eventually will be fixed.

***


### Instructions: 

#### Requirements:
1) Go to the Discordapp.com Application Page
2) Create a New Application, and give it a name
3) Click Create a bot account.
4) Generate an OAuth2 URL with Administrative permissions and use this URL to invite the bot to your server.
5) Make sure to copy your bot's Secret Token and keep it for later.


#### Linux:
1) Install Python and C++ Build tools standalone using by using `npm i -g --production windows-build-tools`
2) Change to the directory you have downloaded the bot and unzip the files if needed.
3) When in the directory use `npm install discord.js` to download the discord.js library.
4) While we are at it we will install SQLite as it will be a requirement for future updates of this bot, this isn't needed in the current version but it is recommended to install it now anyways by doing `npm install SQLite`
5) After this you need to change the bot token to the one you saved earlier, you can change this on `line 182` in `bot.js`
6) Now you can go ahead and run the bot! Use the `node bot.js` command to do so. You can use `Ctrl + C` to force the program to stop at any time. As this bot also has bugs causing the program to crash we recommend setting up an auto restart. You can do this through the use of the npm forever package.
7) Only do this step if you want to install forever. Run `sudo npm install forever -g`. From now on whenever you want to run the bot please use `forever start bot.js` (You will also need to be in the bot's directory to start the bot).


#### Windows Setup:
1) Install node.js through the downloads page at https://nodejs.org/en/download/
2) Using Powershell or CMD as an Administrator, change to the directory you have downloaded the bot and unzip the files if needed.
You don't need to be in the directory for this command but it does no harm by doing so, now we will run `npm i -g --production windows-build-tools` to install Python and C++ Build Tools Standalone.
3) Now, in the same directory, use `npm install discord.js` to download the discord.js library.
4) While we are at it we will install SQLite as it will be a requirement for future updates of this bot, this isn't needed in the current version but it is recommended to install it now anyways by doing `npm install SQLite`
5) After this you need to change the bot token to the one you saved earlier, you can change this on `line 182` in `bot.js`
6) Now you can go ahead and run the bot! Use the `node bot.js` command to do so. You can use `Ctrl + C` to force the program to stop at any time. As this bot also has bugs causing the program to crash we recommend setting up an auto restart. You can do this through the use of the npm forever package.
7) Only do this step if you want to install forever. Run `npm install forever` -g. From now on whenever you want to run the bot please use `forever start bot.js` (You will also need to be in the bot's directory to start the bot).


#### Mac - Coming in the future.

***


If you run into any issues with this bot let us know, currently we are aware that the bot will crash is someone tries opening a ticket through DM's in discord, this can be easily fixed with some programming knowledge. This bug will be fixed in the coming days as currently, no one has had time to update this in the repository.
