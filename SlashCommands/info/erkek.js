const { Client, CommandInteraction } = require("discord.js");
const config = require('../../config');
const qdb = require('quick.db');
const ydb = new qdb.table("yetkili");
const idb = new qdb.table("isimler");//pasador code

//pasador code
module.exports = {
    name: "erkek",
    description: "Kullanıcıları Erkek Olarak Kaydetmenizi Sağlar",
    // use opctions :) 
    options: [
        {
            type: "USER", // type user bc we are use user there xd
            name: "user",
            description: "Kullanıcı Belirtin",
            required: true // u can turn false this doesn't matter (?)
            
        },//pasador code
        {
            type: "STRING", // simply type is type used like on mongoose model exp: userID: { type: String, default: "" or type boolean or number } and there is subcommand and subcommand group i can't explain to you yet xd
            name: "isim",
            description: "Kayıt Etmek İstediğiniz Adı Belirtin",
            required: false
        },
        {
            type: "NUMBER",
            name: "yaş",
            description: "Kayıt Etmek İstediğiniz Yaşı Belirtin",
            required: false
        }//pasador code
    ],
    

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
        if(member.id === interaction.member.id) return interaction.followUp({ content: "Kendinizi kayıt edemezsiniz." });
        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({ content: "Bu kullanıcıyı kayıt edemezsin." });
//pasador code
        // roles add & check
        if(config.manRoles.some(role => member.roles.cache.get(role))) return interaction.followUp({ content: "Bu kullanıcı zaten kayıtlı" })
        member.roles.cache.has(config.boosterRole) ? member.roles.set([config.manRoles[0], config.manRoles[1], config.unregRole]) : member.roles.set([config.manRoles[0], config.manRoles[1]]);
//pasador code
        // set & fix nickname
        const fix = member.user.username.includes(config.serverTag) ? config.serverTag : config.unTag;
        const fix_name = args[1].charAt(0).replace("i", "İ").toLocaleUpperCase() + args[1].slice(1).toLocaleLowerCase();
        const name = `${fix} ${fix_name} | ${args[2]}`
        member.setNickname(name)
    //pasador code
        // message
        interaction.followUp({ content: `${member} başarıyla <@&${config.manRoles[0]}> olarak kayıt edildi` })
        
        // lets use dbs
        
        ydb.add(`yetkili.${interaction.member.id}.toplam`, +1);
        ydb.add(`yetkili.${interaction.member.id}.erkek`, +1);

        idb.push(`kullanici.${member.id}.isimler`, {
            Name: name,
            Process: `<@&${config.manRoles[0]}>`
        });
        idb.set(`kullanici.${member.id}.sonisim`, {
            Name: name
        })
    
//pasador code
    },
};

