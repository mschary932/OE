kony.type = function(arg) {
  
    var result  = $KI.type(arg);

    if (result == "table" || result == "object") {
		  result = arg.name == undefined ? result : arg.name;
    }
    return result;
};
