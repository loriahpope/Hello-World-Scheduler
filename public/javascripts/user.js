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

var chart = document.getElementById("chart");

var paper = Raphael(chart);
var chartBase = paper.ellipse(115, 115, 105, 105);
chartBase.attr({"fill": "rgba(40, 40, 147, 0.13)", "stroke": "rgb(40, 40, 147)", "stroke-width": 4});

