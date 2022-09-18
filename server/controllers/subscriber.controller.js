const db = require('../models');
const { validationResult } = require('express-validator');
const { Subscriber, Waitlist, Partner } = db;
const emailSend = require('../utils/emailSend.js');
const path = require('path');
const { unlink } = require('fs/promises');




const addSubscriber = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ error: errors.array()[0].msg });
    }
    const { email } = req.body;

    const emailExist = await Subscriber.findOne({ where: { email } });
    if (emailExist) {
        res.status(208).json({ msg: "already registered", emailExist });
    } else {
        const subscriber = await Subscriber.create({
            email
        });


        emailSend([process.env.ADMIN_EMAIL, email, 'mdsamsuzzoha5222@gmail.com'], "Kinoverse subscriber ", "New Subscriber", `<div><h2>Subscriber email address: ${email}</h2></div>`);
        res.status(200).json({ msg: "Created new Subscriber", subscriber });
    }
}

// /home/ubuntu/kinoverse/client


const getAllSubscribers = async (req, res) => {

    try {
        const subscriberList = await Subscriber.findAll({});
        res.status(200).json({ msg: "Get all Subscribers", subscriberList });
    } catch (error) {
        throw error;
    }

}

const getAllWaitlist = async (req, res) => {

    try {
        const waitlist = await Waitlist.findAll({});
        res.status(200).json({ msg: "Get all Subscribers", waitlist });
    } catch (error) {
        throw error;
    }

}

const getAllPartner = async (req, res) => {

    try {
        const partner = await Partner.findAll({});
        res.status(200).json({ msg: "Get all partner", partner });
    } catch (error) {
        throw error;
    }

}


// ➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️ 📧📧📨📨
const addToWaitlist = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ msg: "invalid email or name", errors: errors.array() });
    }

    if (!req.file) {
        return res.status(406).json({ msg: "No file attached" });
    }

    // res.json({ uploadFile: req.file.filename });


    // FIND AND UPDATE FROM SUBSCRIBER 
    const { email, name } = req.body;
    const screen = String(req.body.screen).toLocaleLowerCase() === "true";
    const animation = String(req.body.animation).toLocaleLowerCase() === "true";

    // console.log({screen, animation});


    const waitlistExist = await Waitlist.findOne({ where: { email } });
    if (waitlistExist === null) {
        // CREATE NEW SUBSCRIBER 
        const newWaitedlist = await Waitlist.create({
            name,
            email,
            resume: req.file.filename,
            screen,
            animation
        });
        emailSend([process.env.ADMIN_EMAIL, email, 'mdsamsuzzoha5222@gmail.com'], "Kinoverse Waitlist ", "Add to kinoverse waitlist", `<div><h2>Email address: ${email}</h2></div>`);
        res.status(201).json({ msg: "added to waitlist - create", waitlist: newWaitedlist });
    } else {
        // console.log({ waitlistExist: waitlistExist.dataValues, id: waitlistExist.dataValues.id, resume: waitlistExist.dataValues.resume });
        try {
            const deleteImageFromServer = await unlink(path.resolve(__dirname, "../uploads", waitlistExist.dataValues.resume));
            const result = await Waitlist.update(
                { resume: req.file.filename },
                { where: { id: waitlistExist.dataValues.id } }
            );
            res.status(208).json({ msg: "You are already in waitlist" });
        } catch (error) {
            console.log(error);
        }

    }
}








const addPartner = async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ error: errors.array() });
    }
    const { businessEmail } = req.body;
    // console.log(req.body);

    const emailExist = await Partner.findOne({ where: { businessEmail } });
    if (emailExist) {
        res.status(208).json({ msg: "already registered", emailExist });
    } else {
        const partner = await Partner.create(req.body);
        res.status(201).json({ msg: "Created new Partner", partner });
    }
}




module.exports = {
    addSubscriber,
    getAllSubscribers,
    addToWaitlist,
    getAllWaitlist,
    getAllPartner,
    addPartner
}