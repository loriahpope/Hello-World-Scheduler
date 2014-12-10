var deleteLinks = document.getElementById("myCategories").getElementsByTagName("a");

for(var i = 0; i < deleteLinks.length; i++){
	deleteLinks[i].addEventListener('click', deleteCat);
}

function deleteCat(event){
	event.preventDefault();
	event.target.parentNode.parentNode.style.display = "none";
}