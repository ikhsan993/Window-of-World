const {user,profile} = require('../../models');
const Joi = require ('joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=> {

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
        message: error.details[0].message,
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email;
    const userExist = await user.findOne({
    		where : {
			email
		}
    });
    if (userExist){
    	res.status(500).send({
      status: "failed",
      message: "Email already exist",
    });
    }
    else {
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role : 'user',
    });
		const getUser = await user.findOne({
		where : {
			email: newUser.email,
		},
		attributes : {
			exclude:['createdAt','updatedAt'],
		}
		});
		await profile.create({
    	userId:getUser.id
    })
		const dataToken = {
		id : getUser.id
		}
		const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
      	user :{
      		email: newUser.email,
        token   
      	}
      },
    });
  }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req,res)=> {
	const data = req.body;
	const schema = Joi.object({
		email : Joi.string().email().min(6).required(),
		password : Joi.string().min(6).required(),
	});
	const {error} = schema.validate(data);

	if (error) {
		return res.status(400).send({
			status: 'error',
			message : error.details[0].message,
		});
	}
try {	
	const userExist = await user.findOne({
		where : {
			email: data.email,
		},
		attributes : {
			exclude:['createdAt','updatedAt'],
		}
	});
	if (!userExist) {
		return res.status(400).send({
			status: 'failed',
			message : 'email and password dont match!!!',
		});
	}
	
	const isValid = await bcrypt.compare(req.body.password, userExist.password);
	if (!isValid) {
		return res.status(400).send({
			status: 'failed',
			message : 'email and password dont match!!!',
		});
	}

	const dataToken = {
		id : userExist.id
	}

	const token = jwt.sign(dataToken, process.env.SECRET_KEY);

	res.status(200).send({
			status :'success',
			data : {
				email : userExist.email,
				role : userExist.role,
				name : userExist.name,
				id : userExist.id,
				token, 	
		},
	});
}
// let dataUser = await user.findOne({
//         attributes: {
//         exclude: ['password', 'createdAt', 'updatedAt']
//         },    
//              include: [
//         {
//           model: profile,
//           as: "profile",
//           attributes: {
//             exclude: ["createdAt", "updatedAt","password"]
//           }
//         },
//         {  
//           model: transaction,
//           as: "transaction",
//           attributes: {
//             exclude: ["createdAt", "updatedAt","password"]
//         }
//         }
//         ],
//         where: {
//                 id : userExist.id
//             }

//         });
//         let photo="";
//         let address="";
//         let gender="";
// 			if (dataUser.profile==null) {
// 				photo = null;
// 				address = null;
// 				gender = null;
// 			} else {
// 				photo = process.env.FILE_PATH + dataUser.profile.photo;
// 				address = dataUser.profile.gender;
// 				gender = dataUser.profile.address;

// 			}

//         let userStatus = dataUser.transaction[0].userStatus;
//         if (dataUser.transaction ==null){userStatus = null}
//         res.send({
//             status: 'success',
//             data : {
//                  name : dataUser.name,
//                  email : dataUser.email,
//                  role : dataUser.role,
//                  photo,
//                  gender,
//                  address,
//                  userStatus,
//                  token,
//             }
//         })
catch(error){
		console.log(error);
		res.status(500).send({
		status : 'failed',
		message : 'Server Error'
	});
}

};