var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

//my schema goes here!
var Category = new mongoose.Schema({
	color: String,
	name: String
});

var Item = new mongoose.Schema({
	name: String,
	category: String,
	dueDate: Date,
	description: String,
	dateAdded: Date,
	checked: Boolean,
	slug: String
});

var User = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	items: [Item],
	categories: [Category],
	slug: String
});

User.plugin(URLSlugs('username'));

mongoose.model('User', User);
mongoose.model('Item', Item);
mongoose.model('Category', Category);

mongoose.connect('mongodb://localhost/hellodb');


