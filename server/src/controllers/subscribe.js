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
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        data = JSON.parse(JSON.stringify(data));    
        data = data.map(item=>{return {
        ...item,
        transferProof : process.env.FILE_PATH + item.transferProof, 
        }
    });
        res.send({
            status: 'success',
            data: {
                data
            }
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
        const { id } = req.params
        let data = await transaction.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        data = JSON.parse(JSON.stringify(data));  
        data = {...data,
                transferProof : process.env.FILE_PATH + data.transferProof
            }
        res.send({
            status: 'success',
            data: {
                data
            }
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
        const { id } = req.params
        await transaction.update(req.body, {
            where: {
             id
            }
        })
        const data = req.body;
        const user = req.user.id;
        res.send({
            status: 'success',
            message: `Subscribe data Updated`,
            data: {id,user,data}
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
