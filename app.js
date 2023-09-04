const yargs = require("yargs");
const contact = require("./contact");

yargs.command({
    command : 'add',
    describe : 'to add contact',
    builder : {
        nama:{
            describe : 'nama lengkap',
            demandOption : true,
            type: 'string'
        },
        email:{
            describe : 'email',
            demandOption : true,
            type: 'string'
        },
        nohp:{
            describe : 'nomor hp',
            demandOption : true,
            type: 'string'
        },
    },
    handler : (argv)=>{
        const contacts = {
            nama : argv.nama,
            email : argv.email,
            nohp : argv.nohp
        }
        contact.simpanContact(argv.nama, argv.nohp, argv.email);
    },

}).demandCommand()

yargs.command({
    command : 'list',
    describe : 'to list contact',
    handler : ()=>{
        contact.listContact();
    }
})

yargs.command({
    command : 'detail',
    describe : 'to detail contact',
    builder : {
        nama:{
            describe : 'nama lengkap',
            demandOption : true,
            type: 'string'
        },
    },
    handler : (argv)=>{
        contact.detailContact(argv.nama);
    },
})
yargs.command({
    command : 'delete',
    describe : 'to delete contact',
    builder : {
        nama:{
            describe : 'nama lengkap',
            demandOption : true,
            type: 'string'
        },
    },
    handler : (argv)=>{
        contact.deleteContact(argv.nama);
    },
})

yargs.parse();
























////////////Versi 1

// const contact = require('./contact');
// const validator  = require('validator');

// const main = async () => {
//     const name = await contact.customQuestion('What is your name? ');
//     const number = await contact.customQuestion('What is your number? ');
//     const email = await contact.customQuestion('What is your email? ');
    
//     contact.simpanContact(name, number, email);
// }
// main();
