const sequelize = require("../connection");
const { someFeildAreMissing, duplicateEmailOrPhone } = require("../fuctions/helper");
const User = require("../models/user.model");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();
refreshTokenList = [];

const createUser = async (req, res, next) => {
    try {
        const { email, gender, name, phone, role, password, birthDate } = req.body;
        if (
            email == null ||
            gender == null ||
            name == null ||
            role == null ||
            password == null
        ) {
            someFeildAreMissing(res);
            return;
        }

        const isExist = await User.findOne({ where: { email: email } });
        if (isExist) {
            duplicateEmailOrPhone(res);
            return;
        }
        const acc = User.create({
            email: email,
            gender: gender,
            name: name,
            phone: phone,
            role: role,
            password: password,
            birthDate: birthDate ?? "",
        })
            .then((data) => {
                data = data.dataValues;
                res.send({
                    message: "Successfully logged in",
                    data:{...data,password: undefined},
                });
            })
            .catch((err) => {
                res.send(err);
            });
    } catch (err) {
        res.send(err);
    }
};


const getSystemUsers = async (req, res, next) => {
    try {
        const syUsers = await User.findAll();
        res.send({
            message: "All System Users",
            data: syUsers,
        });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const params = req.params;
        const body = req.body;
        const data = await User.findOne({
            where: {
                id: params.id,
            },
        });
        if (!data) noIdFound(res);
        data.update({ ...body, id: params.id, password: undefined });
        await data.save();
        const response = data.dataValues;
        res.send({
            message: "successfully updated",
            data: { ...response, password: undefined, },
        });
    } catch (er) {
        console.log("er : ", er);
        res.sendStatus(500).send(er);
    }
};

const detailUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByPk(id, { raw: true });
    res.send({
        message: "User found",
        data: { ...user, password: undefined },
    });
};

const getAllUsers = async (req, res, next) => {
    const users = await User.findAll({ raw: true });
    if (users) {
        users.map(ele => {
            ele.password = undefined;
        })
    }
    res.send({
        message: "All Users",
        data: users,
    });
};

const deleteUser = async (req,res, next) => {
    try{
        try {
            const params = req.params;
            const body = req.body;
            const data = await User.findOne({
                where: {
                    id: params.id,
                },
            });
            if (!data) noIdFound(res);
            // data.update({ ...body, id: params.id, password: undefined });
            const response = data.dataValues;
            await data.destroy();
            res.send({
                message: "successfully deleted",
                data: { ...response, password: undefined, },
            });
        } catch (er) {
            console.log("er : ", er);
            res.sendStatus(500).send(er);
        }        
    }catch(err){}
}

function generateAccessToken(user) {
    return jwt.sign(
        JSON.parse(JSON.stringify(user)),
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "6h" }
    );
}

const login = async (req, res, next) => {
    try {
        const body = req.body;
        if (body.email == undefined || body.password == undefined) {
            res.send({
                error: {},
                message: "Email and password are required"
            });
            return;
        }
        User.findOne({
            // raw:true,
            where: {
                email: body.email, // user email
            },
            // include: "accounts"
        }).then(async (response) => {
            if (!response) {
                res.send({
                    message: "Incorrect email or password",
                });
            } else {
                const resp = await response.validPassword(
                    body.password,
                    response.dataValues.password
                );
                if (!resp) {
                    res.send({
                        message: "Incorrect email or password",
                    });
                } else {
                    const newUser = response.dataValues;
                    const accessToken = generateAccessToken(newUser);
                    const refreshToken = jwt.sign(
                        newUser,
                        process.env.REFRESH_TOKEN_SECRET
                    );
                    refreshTokenList.push(refreshToken);
                    newUser.password = undefined;
                    res.json({
                        user: newUser,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                }
            }
        });
    } catch (er) {
        console.log("er : ", er);
        res.send(er);
    }
};

const logout = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader && authHeader.split(" ")[1];
  
      const index = refreshTokenList.indexOf(token);
      if (index > -1) {
        refreshTokenList.splice(index, 1);
      }
  
      jwt.sign(
        authHeader,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1s" },
        (logout, err) => {
          if (logout) {
            res.send({ msg: "You have been Logged Out" });
            return;
          } else {
            res.send({ msg: "Error" });
            return;
          }
        }
      );
      // res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  };


module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    getSystemUsers,
    detailUser,
    login,
    deleteUser,
    logout
};
