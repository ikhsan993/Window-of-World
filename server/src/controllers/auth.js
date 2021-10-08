const {user} = require('../../models');
const Joi = require ('joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=> {

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    role : Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role : req.body.role,
    });
		const getUser = await user.findOne({
		where : {
			email: newUser.email,
		},
		attributes : {
			exclude:['createdAt','updatedAt'],
		}
		});
		const dataToken = {
		id : getUser.id
		}
		const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success...",
      data: {
      	user :{
      		email: newUser.email,
        token   
      	}
        
      },
    });
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
			user : {
				email : userExist.email,
				role : userExist.role,
				token, 
			}
			
		},
	});
}
catch(error){
		console.log(error);
		res.status(500).send({
		status : 'failed',
		message : 'Server Error'
	});
}

};