const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require('../../config');
//pasador code
module.exports = {
    name: "kayıtsız",
    description: "Kullanıcıları kayıtsıza atarsınız",
    options: [//pasador code
        {
            type: "USER",
            name: "user",
            description: "Kullanıcı Belirtin",
            required: true
            
        }//pasador code
    ],
    
//pasador code
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
        async execute (client, interaction, args)  {
            //pasador code
        // definition of user
        let user = args[0];
        let member = interaction.guild.members.cache.get(user);
//pasador code
        // perm & some useful things
        if(!config.RegisterHammer.some(role => interaction.member.roles.cache.get(role)) && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: "Bu komudu kullanmak için <@&" + config.RegisterHammer.map(role => role).join(", ") + "> rol(ler)ine veya \`ADMINISTRATOR\` yetkisine sahip olmalısın." }) 
//pasador code
        // role add & check
        if(member.roles.cache.has(config.unregRole)) return;
          await member.roles.cache.has(config.boosterRole) ? member.roles.set([config.unregRole, config.unregRole]) :  member.roles.set([config.unregRole])
          await member.setNickname(`${config.serverTag} İsim | Yaş`);
        interaction.followUp({ content: "Kullanıcıya başarıyla <@&" + config.unregRole + "> rolü verildi" })
      
//pasador code
    

    },
};
//pasador code
//pasador code
//pasador code
//pasador code

