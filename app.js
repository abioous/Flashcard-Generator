

function BasicCard(front,back) {
	this.front = front;
	this.back = back;
	return this;
}



function ClozeCard(text, cloze) {
	this.fullText = text;
	this.cloze = cloze;

	//build partial by substracting cloze from text
	var position = text.indexOf(cloze);
        if(position == -1) {
		throw "Invalid cloze " + cloze + " in sentence " + text
	}
	var partial = ''; 
	if(position == 0) {
		partial = " ..." + text.substr(cloze.length, text.length);
	} else {
		
	}

	this.partial = partial;
	return this;
}



//test constructor

var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States."
console.log(firstPresidentCloze.partial); 

// "George Washington was the first president of the United States."
console.log(firstPresidentCloze.fullText);


