const { transaction } = require('../../models')
const { user } = require('../../models')

exports.addSubscribe = async (req, res) => {
    try {
        const transferProof = req.file.filename;
        const userId = req.user.id;
        let input = {userId,transferProof}
        input = {...input}
        let data = await transaction.create(input)
        res.send({
            status: 'success',
            message: 'Subscribe data has been added, waiting for approval',
            data :{
                transaction : {
                    id : data.id,
                    user : userId,transferProof
                },
            }
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getSubscribes = async (req, res) => {
    try {

        let data = await transaction.findAll({
             include: 
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt","password"]
          },
        },
        attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
    });
    data = JSON.parse(JSON.stringify(data));
    data = data.map((item) => {
      return { name : item.user.name ,
            transferProof: process.env.FILE_PATH + item.transferProof,
            remainingActive : item.remainingActive,
            userStatus :  item.userStatus,
            paymentStatus : item.paymentStatus,
            id : item.id,
            userId : item.user.id
            };
    });
        res.send({
            status: 'success',
                data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
exports.getSubscribe = async (req, res) => {
    try {
        const userId = req.user.id;
        let data = await transaction.findOne({
            where: {
                userId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        data = JSON.parse(JSON.stringify(data));  
        // data = {...data,
        //         transferProof : process.env.FILE_PATH + data.transferProof
        //     }
        userStatus = data.userStatus;
        res.send({
            status: 'success',
            userStatus
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateSubscribe = async (req, res) => {

    try {
        const data = req.body;
        const id = data.id;
        await transaction.update({...data}, {
        where : {id}
        })
        res.send({
            status: 'success',
            message: `Subscribe data Updated`,
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
