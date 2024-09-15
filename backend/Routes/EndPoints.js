const express = require('express')
const router = express.Router()
const User = require('../model/User')
const Order = require('../model/Order')
const app = express()

const { body, validationResult } = require('express-validator')



router.post("/createuser",
    body('email', "INVALID MAIL").isEmail(),
    body('password', "PASSWORD LENGTH LESS THAN 5").isLength({ min: 5 }), async (req, res) => {
        try {


            const error = validationResult(req);
            const email = req.body.email
            const data = await User.findOne({ email })
          
            if (data) {
                const error = [{ msg: "Mail already registered" }]

                return res.status(200).json({ error })
            }
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });

            } else {
 const options = {
            day: 'numeric',
            month: 'short', // for "Sep"
            year: 'numeric',
            hour: 'numeric', // to include hour
            minute: 'numeric', // to include minutes
            hour12: true, // for 12-hour format with AM/PM
            timeZone: 'Asia/Kolkata'
          };
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                   date: new Intl.DateTimeFormat('en-IN', options).format(new Date())


                })
                res.send({ success: true })
            }



        }
        catch (error) {
            console.log(error)
            res.send({ success: false })
        }
    })
router.post("/loginuser",

    async (req, res) => {
        const email = req.body.email

        try {
            let data = await User.findOne({ email })
            if (!data) {
                error = [{ msg: "USER NOT REGISTERED" }]
                res.status(200).json({ error })
            }
            if (data.password === req.body.password) {
                res.send({ success: true })
            }
            else {
                error = [{ msg: "WRONG PASSWORD" }]
                res.status(200).json({ error })
            }

        }
        catch {

        }
    })
router.post("/createorder",
    async (req, res) => {
       

        try {
     const options = {
            day: 'numeric',
            month: 'short', // for "Sep"
            year: 'numeric',
            hour: 'numeric', // to include hour
            minute: 'numeric', // to include minutes
            hour12: true, // for 12-hour format with AM/PM
            timeZone: 'Asia/Kolkata'
          };
            await Order.create({
                data: req.body.cart,
                mail: req.body.mail,
                date: new Intl.DateTimeFormat('en-IN', options).format(new Date())

            })
            res.send({ success: true })
        }
        catch {
            res.send({ success: false })
        }


    }
)
router.get("/myorders",
    async (req, res) => {
        const mail = req.query.mail
      

        const data = await Order.find({ mail })


        res.send(data)

    }
)
module.exports = router
