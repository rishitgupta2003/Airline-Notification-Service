const { TicketRepository } = require("../repositories");
const { mailUser } = require("../config");

const ticketRepository = new TicketRepository();

async function sendMail(recieverEmail, subject, message){
    try{
        const response = mailUser.sendMail(recieverEmail, subject, message);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function createTicket(data){
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPendingMails(){
    try {
        const response = await ticketRepository.getPendingTickets();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    sendMail,
    createTicket,
    getPendingMails
}