const { Client, CommandInteraction } = require("discord.js");
const config = require('../../config');//pasador code
const qdb = require('quick.db');
const ydb = new qdb.table("yetkili");
//pasador code

module.exports = {
    name: "kayıtlarım",
    description: "Kayıtlarınızı gösterir",
    options: [
        {
            type: "USER",
            name: "user",
            description: "Kullanıcı Belirtin",
            required: true
            
        }//pasador code
    ],
    

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     *///pasador code
        async execute (client, interaction, args)  {
            //pasador code
        // definition of user
        let user = args[0];
        let member = interaction.guild.members.cache.get(user);
//pasador code
        // perm & some useful things
        if(!config.RegisterHammer.some(role => interaction.member.roles.cache.get(role)) && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: "Bu komudu kullanmak için <@&" + config.RegisterHammer.map(role => role).join(", ") + "> rol(ler)ine veya \`ADMINISTRATOR\` yetkisine sahip olmalısın." }) 
//pasador code
        let e = ydb.fetch(`yetkili.${member.id}.erkek`)
        let k = ydb.fetch(`yetkili.${member.id}.kadın`)
        let t = ydb.fetch(`yetkili.${member.id}.toplam`)
        if(e  === undefined || e  === null) e = "0"
        if(t  === undefined || t  === null) t = "0"
        if(k  === undefined || k  === null) k = "0"
//pasador code
        interaction.followUp({ content: `
\`•\` Toplam **__${t}__** net kaydı bulunmakta.
\`•\` Toplam **__${e}__** erkek kaydı bulunmakta.
\`•\` Toplam **__${k}__** kadın kaydı bulunmakta.` })

    },
};
//pasador code
//pasador code
//pasador code

