import mongoose from 'mongoose';
import mongoosPaginate from 'mongoose-paginate-v2' 

const collection = "Products"

const schema = new mongoose.Schema({

	title:{
        type:String,
        required:true
    },
    description:String,
	price: {
        type: Number,
        required: true,
        min: 0
    },
    code: {
        type:String,
        require:true,
        unique:true
    },
    status: {
        type:Boolean, 
        default:true
    },
	stock: {type: Number,
    required: true,
    min: 0
    },
	category:String,
    slug: {
        type: String,
        unique: true
    },
	thumbnails:{
		type:Array
	}
});

schema.plugin(mongoosPaginate)

const productModel = mongoose.model(collection,schema);

export default productModel