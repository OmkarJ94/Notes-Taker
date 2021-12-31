const express = require('express');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate')
const router = express.Router();
const note = require('../Schema/notes')
const user = require('../Schema/userSchema');
const { route } = require('express/lib/router');
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

        const { title, description } = req.body
        if (!title || !description) {
            return res.status(400).json({ message: "Enter All filed" })
        }
        else {
            const postmesage = await new note({ user: req.rootUser._id, title: title, description: description })
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
        const { title, description } = req.body

        const _id = req.params.id

        const result = await note.findByIdAndUpdate(_id, { title: title, description: description }, { new: true })

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
module.exports = router;