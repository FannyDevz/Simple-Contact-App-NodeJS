const fs = require('fs');
const readline = require('readline');
const validator = require('validator');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirPath = './data/';

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync(dataPath, 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (name, number, email) => {
    const contact = {name, number, email};
    //load contact
    const contacts = loadContact();
    //check duplicate
    const duplicate = contacts.find((contact) => {
        return contact.name === name;
    });
    
    if(duplicate){
        console.log(chalk.red.inverse.bold('contact sudah ada'));
        process.exit(1)
    }

    //check email
    if(!validator.isEmail(email)){
        console.log(chalk.red.inverse.bold('email tidak valid'));
        process.exit(1)
    }
    //check number
    if(!validator.isMobilePhone(number)){
        console.log(chalk.red.inverse.bold('nomor hp tidak valid'));
        process.exit(1)
    }

    contacts.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold("terimakasih")); 
    process.exit(1)
}
const  listContact = () => {
    const contacts = loadContact();
    console.log(chalk.inverse.bold('Daftar Kontak'));

    contacts.forEach((contact, index) => {
        console.log(`${index+1}. ${contact.name} - ${contact.number} - ${contact.email}`);
    })
    
    process.exit(1)

}

const detailContact = (name) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => {
        return contact.name.toLowerCase() === name.toLowerCase();
    });
    if(!contact){
        console.log(chalk.red.inverse.bold(`${name} contact tidak ditemukan`));
        process.exit(1)
    }
    console.log(contact);
    process.exit(1)
}

const deleteContact = (name) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase() !== name.toLowerCase();
    });
    if (contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${name} contact tidak ditemukan`));
        process.exit(1)
    }
    fs.writeFileSync(dataPath, JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`anda telah menghapus ${name}`));
    process.exit(1)
}

module.exports = {
    simpanContact,
    listContact,
    detailContact,
    deleteContact
    // customContact
}