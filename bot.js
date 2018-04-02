// _  _  ____  ___  ____  ____    __      ___  ____   __    ___  ____ 
//( \/ )( ___)/ __)(_  _)(  _ \  /__\    / __)(  _ \ /__\  / __)( ___)
// \  /  )__)( (__   )(   )   / /(__)\   \__ \ )___//(__)\( (__  )__) 
//  \/  (____)\___) (__) (_)\_)(__)(__)  (___/(__) (__)(__)\___)(____)
// ____  ____  ____  _  _  __   ____  ____ 
//(  _ \(  _ \(_  _)( \/ )/__\ (_  _)( ___)
// )___/ )   / _)(_  \  //(__)\  )(   )__)  
//(__)  (_)\_)(____)  \/(__)(__)(__) (____) 


// Import the discord.js module
const Discord = require("discord.js");

// Create an instance of a Discord client
const client = new Discord.Client();

// Load SQLLite for Tickets
const sql = require("sqlite");
sql.open("./scores.sqlite");

// Set prefix 
const prefix = "/";

// Startup console message
client.on("ready", () => {
    client.user.setActivity("Vectra.space | /help");
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

// Listener - Bot joins new servers
client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setGame(`on ${client.guilds.size} servers`);
});

// Listener - Bot leaves server
client.on("guildDelete", guild => {
    // This event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setGame(`on ${client.guilds.size} servers`);
});

// Event listener for new members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});


// Quick reply messages
const responseObject = {
    "Quick Response 1": "Reply 1",
    "Quick Response 2": "Reply 2",
    "Quick Response 3": "Reply 3",
    "Quick Response 4": "Reply 4",
    "Quick Response 5": "Reply 5",
    "Quick Response 6": "Reply 6",
    "Quick Response 7": "Reply 7",
    "Quick Response 8": "Reply 8",
    "Quick Response 9": "Reply 9",
    "Quick Response 10": "Reply 10"
};

// Just saying what to do with the objects above
client.on("message", (message) => {
    if (responseObject[message.content]) {
        message.channel.send(responseObject[message.content]);
    }
});

// Help Command
client.on("message", (message) => {
    // Exit and stop if the prefix is not there or if user is a bot
    if (!isCommand(message) || message.author.bot) return;
    if (isCommand(message, "help")) {
        message.author.send("**Vectra Space Commands** \n \n**/new** - `Creates a channel for support.` \n **/close** - `Closes any currently open tickets!` \n **/ping** - `Get your current ping to the bot and the Discord API.`");
        message.reply("Check your DMs.")
    }
});

// Administration commands (Disabled untill permission checking is added)
/*
client.on("message", (message) => {
    if (isCommand(message, "kick")) {
        // Easy way to get member object though mentions.
        var member = message.mentions.members.first();

        // Check if a member was actually tagged
        if (!member) {
            message.channel.send("Please tag a user!");
            return;
        }

        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send(":confounded: " + member.displayName + " has been successfully kicked.");
        }).catch(() => {
            // Failmessage
            message.channel.send("Access Denied");
        });
    }
});
*/

// Support Tickets
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

// Message when bot joins server
var token = " ";
client.on("guildCreate", (guild) => {
    client.user.setGame(`vhelp / vnew | ${client.guilds.size} servers`);
    guild.owner.user.send(`Hello! I'm Vectra Space\nThanks for adding me to your guild!\n\nView all of my commands with \`/help\`.\nLearn more about me with \`/about\`.`);
});

client.on("message", (message) => {
    if (!isCommand(message) || message.author.bot) return;
    // Ping Command
    if (isCommand(message, "ping")) {
        message.channel.send(`Fetching!`).then(m => {
            m.edit(`**Bot** - ` + (m.createdTimestamp - message.createdTimestamp) + `ms.` + ` \n**Discord API** - ` + Math.round(client.ping) + `ms.`);
        });
    }
    // New ticket command
    if (isCommand(message, "new")) {
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "Support Staff")) return message.channel.send(`This server doesn't have a \`Support Staff\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Staff");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error); // Send errors to console
    }

    // Close ticket command
    if (isCommand(message, "close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
        // Confirm delete - with timeout (Not command)
        message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`/confirm\`. This will time out in 10 seconds and be cancelled.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '/confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }

});

function isCommand(message) {
    return message.content.toLowerCase().startsWith(prefix);
}

function isCommand(message, cmd) {
    return message.content.toLowerCase().startsWith(prefix + cmd);
}

// Bot token 
client.login("PUT DISCORD TOKEN HERE");

// And dats the end :O
// Not too hard is it...
