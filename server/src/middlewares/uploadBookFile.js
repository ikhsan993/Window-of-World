const multer = require('multer');

exports.uploadBookFile = (epubFile) => {
	const storage = multer.diskStorage({
		destination : function (req,file,cb) {
			cb(null,"uploads")
		},
		filename : function (req,file,cb){
			cb(null, Date.now() + "_" + file.originalname.replace(/\s/g, ''));
		},
	});

	const fileFilter = function (req,file,cb){
		if (file.filename === epubFile) {
			if (!file.originalname.match(/\.(epub|EPUB|Epub)$/)) {
				req.fileValidationError = {
					message : 'Only Accept Epub Files! '
				}
				return cb(new Error('Only Accept Epub Files!'), false);
			}
		}
		cb(null,true);
	};
	const sizeInMB = 50;
	const maxSize = sizeInMB * 1000 *1000;
	const upload = multer ({
		storage,
		fileFilter,
		limits : {
			fileSize : maxSize, 
		},
	}).single(epubFile);
	return (req,res,next) =>{
		upload(req,res, function(err){
			if (req.fileValidationError) {
				return res.status(400).send(req.fileValidationError);
			}
			if (!req.file && !err) {
				return res.status(400).send({
					message : 'Please select file to upload',
				});
			}
			if (err) {
				if (err.code == "LIMIT_FILE_SIZE") {
					return res.status(400).send({
						message : "Max file size is 50MB",
					});
				}
				return res.status(400).send(err);
			}
			return next();
		});
	};
};

