var v = [];
var w = [];
var x = [];
var y = [];
var z = [];
var listItems = document.getElementsByTagName("li");

for(var i = 0; i < listItems.length; i++){
	listItems[i].childNodes[3].addEventListener('click', clickListItem);
}

function clickListItem(event){
	event.preventDefault();
	var overlay = document.createElement("div");
	overlay.className = "overlay";

	var cancel = document.createElement("div");
	cancel.className = "cancel";
	var cancelTxt = document.createTextNode("close");
	cancel.addEventListener('mouseenter', function(event){
		event.target.style.color = 'rgba(40, 40, 147, 0.13)';
	}, false);

	cancel.addEventListener('mouseleave', function(event){
		event.target.style.color = '#fff';
	}, false);
	cancel.addEventListener('click', function(event){
		overlay.style.display = 'none';
	});
	cancel.appendChild(cancelTxt);
	overlay.appendChild(cancel);

	var clicked = event.target.innerHTML;
	var details = document.getElementsByClassName(clicked);
	var item = document.createElement("div");
	item.className = "clickedItem";

	for(var i = 0; i < details.length; i++){
		var p = document.createElement("p");
		p.className = details[i].className;
		var pTxt = document.createTextNode(details[i].innerHTML);
		if(pTxt.innerHTML == ""){
			pTxt.innerHTML = "N/A";
		}
		p.appendChild(pTxt);
		item.appendChild(p);
		//overlay.appendChild(p);
	}
	overlay.appendChild(item);
	document.body.appendChild(overlay);
}

window.onload = function(){
	loadChart();
	getItems();
}

function loadChart(){
	var ctx = document.getElementById("myChart").getContext("2d");

	var values = document.getElementsByClassName("value");
	var colors = document.getElementsByClassName("chartColor");
	var labels = document.getElementsByClassName("label");

	var w = [];
	var x = [];
	var y = [];
	var z = [];
	var total = 0;



	for(var i = 0; i < values.length; i++){
		x.push(values[i].innerHTML);
	}

	for(var i = 0; i < x.length; i++){
		var h = parseInt(x[i]);
		total = total + h;
	}

	for(var i = 0; i < colors.length; i++){
		y.push(colors[i].innerHTML);
	}

	for(var i = 0; i < labels.length; i++){
		z.push(labels[i].innerHTML);
	}

			console.log("x: " + x.length)

	for(var i = 0; i < x.length; i++){
		var h = ((x[i]/total)*100).toFixed(0);
		w.push(h);
	}

	console.log("YO: " + w);

	console.log(x);
	console.log(y);
	console.log(z);

	console.log("total: " + total);

	var data = [];

	for(var i = 0; i < x.length; i++){
		var dataPoint = {value: x[i]/total, color: y[i], label: z[i]}
		data.push(dataPoint);
	}

	console.log(data);

	var newChart = new Chart(ctx).Pie(data, {percentageInnerCutout:30});
}







function getItems(){
	var name = document.getElementsByClassName("name");
	var category = document.getElementsByClassName("category");
	var added = document.getElementsByClassName("added");
	var due = document.getElementsByClassName("due");
	var description = document.getElementsByClassName("description");

	for(var i = 0; i < name.length; i++){
		v.push(name[i].innerHTML);
	}

	for(var i = 0; i < category.length; i++){
		w.push(category[i].innerHTML);
	}

	for(var i = 0; i < added.length; i++){
		x.push(added[i].innerHTML);
	}

	for(var i = 0; i < due.length; i++){
		y.push(due[i].innerHTML);
	}

	for(var i = 0; i < description.length; i++){
		z.push(description[i].innerHTML);
	}


	console.log("v: " + v);
	console.log("w: " + w);
	console.log("x: " + x);
	console.log("y: " + y);
	console.log("z: " + z);

}









