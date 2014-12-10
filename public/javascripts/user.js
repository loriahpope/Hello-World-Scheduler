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

	document.body.appendChild(overlay);
}

window.onload = function(){
	loadChart();
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

	console.log("w: " + w);

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

	var newChart = new Chart(ctx).Pie(data, {percentageInnerCutout:50});


}

















