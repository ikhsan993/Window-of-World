const { user,profile,transaction } = require('../../models')

exports.addUsers = async (req, res) => {
    try {

        await user.create(req.body)
        res.send({
            status: 'success',
            message: 'Add user finished'
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUsers = async (req, res) => {
    try {

        const users = await user.findAll({
            attributes: {
                exclude: ['password','createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                users
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

exports.getUser = async (req, res) => {
    try {
        let id = req.user.id;
        let dataUser = await user.findOne({
        attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
        }, 
                where: {
                id
            },   
             include: [
        {
          model: profile,
          as: "profile",
          attributes: {
            exclude: ["createdAt", "updatedAt","password"]
          }
        },
        {  
          model: transaction,
          as: "transaction",
          attributes: {
            exclude: ["createdAt", "updatedAt","password"]
        }
        }
        ]

        });
        let photo="";
        let address="";
        let gender="";
        let phone="";
         if (dataUser.profile==null) {
             photo = null;
             address = null;
             gender = null;
             phone = null;
         } else {
             photo = process.env.FILE_PATH + dataUser.profile.photo;
             address = dataUser.profile.address;
             gender = dataUser.profile.gender;
             phone = dataUser.profile.phone;
         }

        let userStatus="";
        if (dataUser.transaction ==""){userStatus = "Inactive"}
        else {userStatus = dataUser.transaction[0].userStatus}
        res.send({
            status: 'success',
            data : {
                 name : dataUser.name,
                 email : dataUser.email,
                 role : dataUser.role,
                 photo,
                 gender,
                 address,
                 phone,
                 userStatus,
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

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.update(req.body, {
            where: {
                id
            }
        })
        res.send({
            status: 'success',
            message: `Update user id: ${id} finished`,
            data: req.body
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Delete user id: ${id} finished`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}