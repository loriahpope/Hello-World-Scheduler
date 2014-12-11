var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var Category = mongoose.model('Category');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {title: "Schedule Your World!"});
});

router.post('/', function(req, res){
	var user = req.body.username;
	console.log(req.body.password);
	User.findOne({username: user}, function(err, user, count){
		console.log("HELLO" + user);
		if(user == null){
			console.log("User does not exist!");
			res.redirect('/');
		} else if(req.body.password == user.password){
			res.redirect("/user/"+user.username);
		} else{
			res.redirect('/');
			console.log("Incorrect Password!");
		}
		
	});
});

router.get('/account', function(req, res) {
  res.render('account', {title: "Create Your HW Account"});
});

router.post('/account', function(req, res){
	new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		items: [],
		categories: [],
		slug: req.body.slug
	}).save(function(err, user, count){
		console.log('new account', user, count, err);
		res.redirect('/user/'+user.slug);
	});;
});

router.get('/user/:slug', function(req, res){
var current = req.params.slug;
	console.log("user current: " + current);

	User.findOne({username: current}, function(err, user, count){
		var cats = [];
		var data = [];
		var undone = [];

		for(var i = 0; i < user.items.length; i++){
			if(user.items[i].checked == false){
				cats.push(user.items[i].category);
				undone.push(user.items[i]);
			}
		}

		var itemDescriptions = [];

		for(var i = 0; i < undone.length; i++){
			var itemInfo = {description: undone[i].description, added: undone[i].dateAdded, due: undone[i].dueDate, category: undone[i].category, name: undone[i].name};
			itemDescriptions.push(itemInfo);
		}



		for(var i = 0; i < cats.length; i++){
			var count = 0;
			var current = cats[i];
			for(var j = 0; j < cats.length; j++){
				if(cats[j] == current){
					count++;
				}
			}
			for(var z = 0; z < user.categories.length; z++){
				if(current == user.categories[z].name){
					console.log("color: " + user.categories[z].color);
					var dataPoint = {value: count, color: user.categories[z].color, label: current};
					data.push(dataPoint);
				}
			}
		}

		var test = [];
		for(var i = 0; i < data.length; i++){
			console.log(data[i].label);
		}

		for(var i = 0; i < data.length; i++){
			var currentLabel = data[i].label;
			var count = 0;
			for(var j = 0; j < data.length; j++){
				if(currentLabel == data[j].label){
					count++;
					console.log(count);
				}
			}
			if(count > 1){
				data.splice(i, 1);
			}
		}

		res.render('user', {
			title: user.firstName + "'s List",
			firstName: user.firstName,
			items: user.items,
			slug: user.slug,
			username: user.username,
			data: data,
			itemDescription: itemDescriptions
		});
	});
});

router.post('/user/:slug', function(req, res) {

	var user = req.params.slug;
	console.log(user);
	var slug = req.body.slug[0];

	if(slug.length == 1){
		slug = req.body.slug;
	}

	var checkedArray = ("" + req.body.itemCheckbox).split(",");

	console.log("checked: " + checkedArray.length);

	if(checkedArray.length == 0){
		console.log("no items checked!");
	}

	User.findOne({username: user}, function(err, user, count){
		console.log(user.items);
		for(var i = 0; i < user.items.length; i++){
			for(var j = 0; j < checkedArray.length; j++){
				if(user.items[i].name == checkedArray[j]){
					user.items[i].checked = true;
					user.save(function(saveErr, saveItems, saveCount){
						console.log(saveItems);
					});
				}
			}
		}

		console.log("/user/"+user);
		res.redirect('/user/'+req.params.slug);
	});
});

router.get('/add/:slug', function(req, res) {
	var current = req.params.slug;

	User.findOne({username: current}, function(err, user, count){

		res.render('add', {
			title: "Add to " + user.firstName + "'s List",
			slug: user.slug,
			username: user.username,
			categories: user.categories
		});
	});
});

router.post('/add/:slug', function(req, res){
	var current = req.params.slug;
	var newItem = new Item({
		name: req.body.itemName,
		category: req.body.category,
		dueDate: req.body.dueDate,
		dateAdded: Date.now(),
		checked: false,
		description: req.body.description,
		slug: req.body.itemName.toLowerCase().replace(/\s+/g, '')
	});

	console.log("current: " + current);

	User.findOneAndUpdate({username: current}, {$push:{items:newItem}}, function(err, user, count){
		console.log("items: " + user.items);
		res.redirect('/user/'+current);
	});
});

router.get('/manage/:slug', function(req, res){
	var current = req.params.slug;
	console.log("user current: " + current);
	User.findOne({username: current}, function(err, user, count){
		res.render('manage', {
			title: user.firstName + "'s Categories",
			categories: user.categories,
			username: user.username
		});
	});
});

router.post('/manage/:slug', function(req, res){
	var current = req.params.slug;
	var newCategory = new Category({
		name: req.body.newCategory,
		color: req.body.colors
	});

	User.findOneAndUpdate({username: current}, {$push:{categories:newCategory}}, function(err, user, count){
		console.log('categories: ' + user.categories);
		res.redirect('/manage/'+current);
	});
});

module.exports = router;
