const { profile } = require('../../models')

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