const express = require('express');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate')
const router = express.Router();
const note = require('../Schema/notes')
const otp = require('../Schema/Otp')
const nodemailer = require('nodemailer');
const user = require('../Schema/userSchema');

router.post("/register", async (req, res) => {

    try {
        const { name, email, password, cpassword } = req.body;

        if (!name || !email || !password || !cpassword) {
            return res.status(422).json({ error: "Enter All Data" })
        }
        else {
            const result = await user.findOne({ email: email })


            if (result === null) {
                if (password != cpassword) {
                    return res.status(422).json({ error: "Enter Valid Data" })
                }
                else {

                    const newUser = new user({ name, email, password, cpassword })


                    const finalResult = await newUser.save();
                    res.status(201).send({ message: `${name} your registration completed successfully` })
                }
            }
            else {
                return res.status(422).json({ error: "Email already exists" })
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }

})


router.post('/login', async (req, res) => {
    try {


        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "please filled the data" })
        }


        const result = await user.findOne({ email: email })



        if (result != null) {
            const isMatch = await bcrypt.compare(password, result.password)
            token = await result.generateAuthToken();
            res.cookie("jwt", token, {

                httpOnly: true,

            });


            if (isMatch) {
                res.status(200).json({ message: "Log in successfully" })
            }
            else {

                res.status(400).json({ message: "Invalid Creadentials" })
            }
        }
        else {

            res.status(400).json({ message: "Invalid Creadentials" })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

})


router.post("/addnote", authenticate, async (req, res) => {
    try {

        const { title, description, time } = req.body
        if (!title || !description) {
            return res.status(400).json({ message: "Enter All filed" })
        }
        else {
            const postmesage = await new note({ user: req.rootUser._id, title: title, description: description, time })
            postmesage.save()
            res.status(200).json({ message: "message added successfully" })
        }
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
})

router.get("/getnote", authenticate, async (req, res) => {
    try {
        const notes = await note.find({ user: req.rootUser._id })


        res.send(notes)
    } catch (error) {
        res.status(400).json({ error: "something went wrong" })

    }
})

router.put("/update/:id", authenticate, async (req, res) => {
    try {
        const { title, description, time } = req.body

        const _id = req.params.id

        const result = await note.findByIdAndUpdate(_id, { title: title, description: description, time }, { new: true })

    } catch (error) {
        res.status(400).json({ error: "something went wrong" })

    }
})

router.delete("/deletenote/:id", authenticate, async (req, res) => {
    try {
        const result = await note.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Note deleted successfully" })
    } catch (error) {
        res.status(400).json({ error: "something went wrong" })

    }

})

router.get("/logout", async (req, res) => {

    try {
        res.clearCookie("jwt", {
            path: "/"
        })
        res.status(200).json({ message: "logout successfully" })
    } catch (error) {
        res.status(400).json({ message: "Something went wrong" })

    }
})
router.post("/reset", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {

            return res.status(404).json({ error: "User Not Found" })
        }
        const result = await user.findOne({ email: email })

        if (result) {

            const code = Math.floor(Math.random() * 10000 + 1)
            let Code = new otp({
                email,
                Otp: code,
                expireIn: new Date().getTime() + 300 * 1000
            })
            const response = await Code.save()
            mailer(email, code)
            res.status(200).json({ error: "OTP Send Your Mail Id" })
        }
        else {

            res.status(404).json({ error: "User Not Found" })
        }
    } catch (error) {
        ("catch")

        res.status(404).json({ error: error.message })
    }

})


router.post("/changepassword", async (req, res) => {
    try {
        let { Otp, email, password } = req.body;

        if (!Otp || !email || !password) {
            res.status(404).json({ error: "Enter All Fields" })
        }
        let data = await otp.findOne({ email, Otp })

        if (data) {

            let currTime = new Date().getTime()
            let diff = data.expireIn - currTime

            if (diff < 0) {
                res.status(401).json({ error: "Your OTP Expired" })
            }
            else {
                const User = await user.findOne({ email })
                User.password = password;
                await User.save();
                res.status(200).json({ message: "Your Password has been updated successfully" })
            }
        }
        else {
            res.status(404).json({ error: "Enter a Valid OTP" })
        }


    } catch (error) {
        res.status(404).status("Something Went Wrong")
    }


})
const mailer = (mail, otp) => {
    try {

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,

            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailDetails = {
            from: process.env.EMAIL,
            to: mail,
            subject: 'Email For Forgot Password',
            html: `
            Your OTP for changing password is ${otp}`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {

            if (err) {


            } else {

            }
        })
    } catch (error) {
        (error)

    }
}
module.exports = router;