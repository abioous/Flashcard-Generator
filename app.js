var fs = require('fs');

function BasicCard(front,back) {
	//safe constructor
 	if(!(this instanceof BasicCard)) {
    	return new BasicCard(front, back);
  	}
	this.front = front;
	this.back = back;
	return this;
}


BasicCard.prototype.print = function() {
	console.log('BasicCard');
	console.log(' front: ' + this.front);
	console.log(' back: ' + this.back);
}

function ClozeCard(text, cloze) {
	//safe constructor
 	if(!(this instanceof ClozeCard)) {
    	return new ClozeCard(text, cloze);
  	}
	this.fullText = text;
	this.cloze = cloze;
	this.partial = this.buildPartial();
	return this;
}

ClozeCard.prototype.getPartial = function() {
	return this.partial;
}

ClozeCard.prototype.getCloze = function() {
	return this.cloze;
}

ClozeCard.prototype.getFullText = function() {
	return this.fullText;
}

ClozeCard.prototype.buildPartial = function() {
	var text = this.fullText;
	var cloze = this.cloze;
//build partial by substracting cloze from text
	var position = text.indexOf(cloze);
        if(position == -1) {
		throw "Invalid cloze " + cloze + " in sentence " + text
	}
	var partial = ''; 
	if(position == 0) {
		partial = " ..." + text.substr(cloze.length, text.length);
	} else {
		partial =text.substr(0, position) + " ..." + text.substr(position + cloze.length, text.length);
	}
	return partial;
}

ClozeCard.prototype.print = function() {
	console.log('ClozeCard');
	console.log(' partial: ' + this.partial);
	console.log(' cloze: ' + this.cloze);
	console.log(' fullText: ' + this.fullText);
}


function loadCards(filename) {
	var cards = [];
	var data = fs.readFileSync(filename, 'utf8');
	var lines = data.split("\n");
	for(var i = 1;i<lines.length;i++) {
		var fields = lines[i].split(",");
		if(fields[0] == 'Basic') {
			cards.push(new BasicCard(fields[1], fields[2]))
		} else {
			cards.push(new ClozeCard(fields[1], fields[2]))
		}
	}
	return cards;
} 

//loads cards and print card properties
var cards = loadCards('cards.csv')
for(var i = 0;i< cards.length;i++) {
	cards[i].print();
}

//test error case
try {
	// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
	var brokenCloze = new ClozeCard("This doesn't work", "oops"); 
} catch(e) {
	console.log("Caught error: " +e)
}