const { profile } = require('../../models')

exports.getProfile = async (req, res) => {
    try {
        let id = req.user.id;
        let data = await profile.findOne({
            where: {
                userId : id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        data = JSON.parse(JSON.stringify(data));  
        data = {...data,
                photo : process.env.FILE_PATH + data.photo
            }
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

exports.addProfile = async (req,res) => {
    try {
        const photo = req.file.filename;
        const userId = req.user.id;
        const data = req.body;
        await profile.create({...data,photo,userId})
        res.send({
            status: 'success',
            message: 'Profile Edited',
            data :{
            profile :{
              ...data,
            photo 
            },
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
exports.updateProfile = async (req, res) => {
    try {
        const id = req.user.id
        const photo = req.file.filename;
        const data = req.body;
        const updatedData = {...data,photo}
        await profile.update({...data,photo}, {
            where : {userId : id}
        })
        res.send({
            status: 'success',
            message: 'Profile data Updated',
            data :{
            profile :{
              data
            },
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
