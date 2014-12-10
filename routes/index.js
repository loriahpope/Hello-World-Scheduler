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

		for(var i = 0; i < user.items.length; i++){
			if(user.items[i].checked == false){
				cats.push(user.items[i].category);
			}
		}

		for(var i = 0; i < cats.length; i++){
			//console.log("length: " + cats.length);
			//console.log("cats: " + cats);
			var current = cats[i];
			var count = 0;
			var test = 0;
			//console.log("test: " + test);
			for(var j = 0; j < cats.length; j++){
				if(current == cats[j]){
					count++;
					if(cats.length >= 2){
						cats.splice(j,1);
					}
					//console.log("length: " + cats.length);
					//console.log("cats: " + cats);
				}
				test++;
			}
			//console.log("test: " + test);

			for(var z = 0; z < user.categories.length; z++){
				if(current == user.categories[i].name){
					var dataPoint = {value: count, color: user.categories[i].color, label: current};
				}
			}
			data.push(dataPoint);
			
		}
		console.log(data);

		res.render('user', {
			title: user.firstName + "'s List",
			firstName: user.firstName,
			items: user.items,
			slug: user.slug,
			username: user.username,
			data: data
		});
	});
});

router.post('/user/', function(req, res) {
	var checked = req.body.itemCheckbox;

	if(checked != undefined){
		if(checked.length == 1){
			checked = req.body.name;
		}
		var checkedArray = ("" + req.body.itemCheckbox).split(",");
		var slug = req.body.slug[0];

		User.findOne({slug: slug}, function(err, list, count){
		console.log("list: " + list);
		for(var i = 0; i < list.items.length; i++){
			for(var j = 0; j < checkedArray.length; j++){
				if(list.items[i].name == checkedArray[j]){
					list.items[i].checked = true;
					list.save(function(saveErr, saveList, saveCount){
						console.log(saveList);
					});
				}
			}
		}
		res.redirect('/user/'+slug);
	});
	}
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
