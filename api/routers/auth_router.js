const express = require("express")
const router = express.Router();
const User = require('../model/User.js')
const bcrypt = require("bcrypt");
const e = require("express");


/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *   schemas:
 *     auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: pass
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     security:
 *         - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/auth'
 *     responses:
 *       200:
 *         description: user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/auth'
 *       500:
 *         description: Some server error
 */

router.post('/register',  async (req, res) => {
    try {

        // console.log(res.ClientRequest)
        const a = req.headers.authorization
        console.log(a)
        // const newUser = new User({
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password,
        // })
        // const user =  await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;