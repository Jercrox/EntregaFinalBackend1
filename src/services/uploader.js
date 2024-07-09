import multer from "multer";
import __dirname from "../utils.js";

const storage = multer.diskStorage({

	destination: function (req, file, cb) {
		
		let dinamicFolder;

		switch(req.baseUrl) {
			case '/api/products':
				dinamicFolder = 'products';
		}
		
		return cb(null, `${__dirname}/public/files/${dinamicFolder}`);
	},

	filename: function (req, file, cb) {
		return cb(null, `${Date.now()}-${file.originalname}`);
	}

});

const uploader = multer({ storage });

export default uploader