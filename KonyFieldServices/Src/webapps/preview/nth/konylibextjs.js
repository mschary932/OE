var konyjstins= kony.table.insert; 
kony.table.insert = function (inputtable, position, value){ 
	if(inputtable instanceof Object){ 
		if(value != undefined){
			konyjstins(inputtable, position, value); 
		}else{
			konyjstins(inputtable, position ); 
		} 
	}else{ 
		kony.luatable.insert(inputtable, position, value);
	}
};

var konyjstcon= kony.table.contains; 
kony.table.contains = function (inputtable, key){ 
	if(inputtable instanceof Object){ 
		return konyjstcon(inputtable, key); 
	}else{ 
		return kony.luatable.contains(inputtable, key);
	}
};