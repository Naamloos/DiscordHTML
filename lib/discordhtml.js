Log("Looking for token...");
var token = document.getElementsByTagName("token")[0].innerHTML;
Log("Found token.");

const discordclient = new Discord.Client();

discordclient.on('message', msg => {
    var OnMessageHandlers = document.getElementsByTagName("onmessage");
    for(var i = 0; i < OnMessageHandlers.length; i++){
        if(msg.author.id != discordclient.user.id)
        HandleOnMessage(OnMessageHandlers[i].children, msg);
    }
    Log("Received message from "+msg.author.username+": " + msg.content);
});

discordclient.login(token);

function Log(msg){
    console.log(msg);
    document.title = "DiscordHTML: " + msg;
    
    var logtags = document.getElementsByTagName("log");
    for(var i = 0; i < logtags.length; i++){
        logtags[i].innerHTML += msg + "<br>";
    }
}

function HandleOnMessage(children, msg){
    for(var i = 0; i < children.length; i++){
        var node = children[i];

        switch(node.tagName){
            case "REPLY":
                msg.reply(node.innerHTML);
            break;
            case "MESSAGE":
                msg.channel.send(node.innerHTML);
        }
    }
}