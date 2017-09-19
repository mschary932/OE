$KI.table = {

	concat: function() {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var result = null;
	    
	    if (!arguments[0] instanceof Object) 
	        isArgsError = true;
	    if (!isArgsError) {
	        var len = arguments[0].length - 1;
	        var begin = 1, end = len, sep = "";
	        var numArgs = arguments.length > 4 ? 4 : (arguments.length - 1);
	        switch (arguments.length) {
	            case 4:
	                arguments[3] -= 0;
	                if (isNaN(arguments[3])) {
	                    isArgsError = true;
	                }
	                end = arguments[3];
	            case 3:
	                arguments[2] -= 0;
	                if (isNaN(arguments[2]) || arguments[2] <= 0) {
	                    isArgsError = true;
	                }
	                begin = arguments[2];
	            case 2:
	                sep = arguments[1];
	            default:
	                break;
	        }
	        
	        if (len == 0) 
	            return $KI.table.returnResult("", isArgsError, isInternalError);
	        
	        if (isArgsError) 
	            return $KI.table.returnResult(result, isArgsError, isInternalError);
	        
	        if (begin > end) {
	            //isArgsError = true; // return empty string -- lua std
				return $KI.table.returnResult("", isArgsError, isInternalError);
	        }
	        else 
	            if (end > len) {
	                isArgsError = true;
	            }
	            else 
	                if (!isArgsError) {
	                    result = "";
	                    try {
	                        for (var i = begin; i < end; i++) {
								if(arguments[0][i] == null || arguments[0][i] instanceof Object) 
									return $KI.table.returnResult(null, true, isInternalError);   
	                            result += arguments[0][i].toString() + sep;
	                        }
	                        result += arguments[0][i].toString();
	                    } 
	                    catch (e) {
	                        isInternalError = true;
	                    }
	                }
	    }
	    return $KI.table.returnResult(result, isArgsError, isInternalError);
	},
	
	/*maxn: function(args) {
	    if (0 === arguments.length) {
	        throw new Error("table.maxn needs atleast one argument");
	    }
	    
	    if (args[0] instanceof LuaTable === false) {
	        throw new Error("Invalid argument to table.maxn");
	    }
	    
	    var maxIndex = args[0].arrayContainer.length - 1;
	    for (var obj in args[0].hashContainer) {
	        var key = args[0].hashContainer[obj].key;
	        if (args[0].hashContainer[obj].value !== null &&
	        typeof(key) === "number" &&
	        maxIndex < key) {
	            maxIndex = key;
	        }
	    }	    
	    return maxIndex;
	},*/
	
	insert: function() {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var result = null;	
	    
	    if (arguments.length < 2 || !(arguments[0] instanceof Object)) {
	        isArgsError = true;
	    }
	    
	    if (!isArgsError) {
	    
	        var pos, newItem;
	       // var arr = arguments[0];	
	        if (arguments.length > 2) {  
			    pos = arguments[1];      
	            if (typeof pos == "string" || isNaN(pos)) {                
	                return $KI.table.returnResult(true, isInternalError);            
				}            
	            newItem = arguments[2];
	        }
	        else {
	            pos = arguments[0].length;
	            newItem = arguments[1];
				/*if(args[1] == null) // don't insert nil at the end of table -- lua std 
					return $KI.table.returnResult(args[0], isArgsError, isInternalError);*/
	        }
	        
	        try {      
					if (typeof pos == "string" || pos >= arguments[0].length || pos <= 0) {
						if (pos == 0) {							
							arguments[0][pos + 1] = newItem;
						}
						else {
							arguments[0][pos] = newItem;
						}
	                }
	                else{
	                 /*   var pre = arguments[0].slice(0, pos);
	                    var post = arguments[0].slice(pos);
	                    pre.push(newItem);
	                    arguments[0] = pre.concat(post);*/
						arguments[0].splice(pos,0,newItem);
	                }		
					//arguments[0] = arr;		
	        } 
	        catch (e) {
	            isInternalError = true;
	        }
	    }
	    return $KI.table.returnResult(isArgsError, isInternalError);
	},
	
	remove: function() {
	
	    var isArgsError = false;
	    var result = null;
	    
	    if (0 === arguments.length || !(arguments[0] instanceof Array)) {
	        isArgsError = true;
	    }
	    
		if (!isArgsError) {
			var pos = arguments[0].length - 1 ;
			if (pos > 0) {
				if (arguments.length > 1 && arguments[1] != null) {
					arguments[1] -= 0;
					if (isNaN(arguments[1]) || arguments[1] > pos || arguments[1] < 0) {
						isArgsError = true;
						return $KI.table.returnResult(result, isArgsError, false);
					}
	
					if (arguments[1] < pos && arguments[1] > 0) {
						pos = arguments[1];
					}
				}
				result = arguments[0].splice(pos, 1);
				result = result[0] || null;
				/*for(var i=pos;i > 0;i--){
					result = args[0].arrayContainer.splice(i, 1);
					if(result[0] == null && i == args[0].length()+1)
						continue;
					else
						break;				
				}*/
			}
			else
	    		  return $KI.table.returnResult(null, isArgsError, false);
		}
	    return $KI.table.returnResult(result, isArgsError, false);
	},
	

	sort: function() {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var result = null;
	    var comparator = null;
		
	    
	   if (0 === arguments.length || !(arguments[0] instanceof Array)) {
	        isArgsError = true;
	    }
	    
	    if (typeof(arguments[1]) == "function") {
			comparator = arguments[1];
		}
		else 
			if (typeof(arguments[2]) == "function") {
				comparator = arguments[2];
			}
	    
	    if (!isArgsError) {
	    	var len = arguments[0].length;
			var pre = arguments[0];
			
	        try {        
	            for (var i = 1; i < len; i++) {
	                var elemType = typeof(arguments[0][1]);
	                if (arguments[0][i] == null || typeof(arguments[0][i]) != elemType) {
	                    return $KI.table.returnResult(true, isInternalError);
	                }                
	            }
	            
	           // pre = arguments[0].slice(1);
	            var zeroth = arguments[0].shift();
				
				//This is to splice the array to the length to which it has to be sorted
				if(arguments[1] !== null && !isNaN(arguments[1]))						
					pre.splice(arguments[1],pre.slice(arguments[1],pre.length).length);
					
	            if (comparator) {
	                pre.sort(function(a, b){
	                    var retVals = comparator(a, b);
	                    
	                    return (retVals ? -1 : 1);
	                });
	            }
	            else 
	                if (typeof arguments[1] == "string") {
	                    comparator = arguments[1];
	                    pre.sort(function(a, b){
	                        if (a[comparator] != null && typeof a[comparator] == typeof b[comparator] && typeof a[comparator] == "string") {
	                                var nameA = a[comparator].toLowerCase(), nameB = b[comparator].toLowerCase()
	                                if (nameA < nameB) //sort string ascending
	                                    return -1
	                                if (nameA > nameB) 
	                                    return 1
	                                return 0 //default return value (no sorting)				
	                            }
	                            else {
	                                return a[comparator] - b[comparator];
	                            }
	                    });
	                }
	                else {	
	                    pre.sort(function(a, b){
	                        if (typeof a == "string") {
	                            var A = a.toLowerCase();
	                            var B = b.toLowerCase();
	                            if (A < B) {
	                                return -1;
	                            }
	                            else 
	                                if (A > B) {
	                                    return 1;
	                                }
	                                else {
	                                    return 0;
	                                }
	                        }
	                        else 
	                            return a - b;
	                        
	                    });
	                    
	                }
	            pre.unshift(zeroth);
	           // pre = pre.concat(arguments[0]);
	        } 
	        catch (e) {
	            isInternalError = true;
				pre = null;
	        }
	    }
	    if (!isArgsError && !isInternalError)        
	   		 return $KI.table.returnResult(pre, isArgsError, isInternalError);
		else 
			return $KI.table.returnResult(true, isInternalError);
	},

	filter: function(srctable, mapfunc) {
	
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var tgttable;
	    
	    if (arguments.length < 2 || !(srctable instanceof Object)  || !(typeof(mapfunc)  == "function")) {
	        isArgsError = true;
	    }
		
	    if (!isArgsError) {
	        
	        var key, value, retVals;
	        
	        if ((srctable instanceof Array)  && mapfunc) {
				try {
					tgttable = [null];
					for (var i = 1; i < srctable.length; i++) {
						value = srctable[i];
						if (value instanceof Object) {
							/*var innerLen = value.length();
							 var innerValue;
							 var count = 0;
							 for (var k = 0; k < innerLen; k++) {
							 innerValue = value.arrayContainer[k + 1];
							 retVals = executeClosure(mapfunc, [k + 1, innerValue]);
							 if (retVals[0] == true)
							 count++;
							 }
							 if (count == innerLen)
							 tgttable.arrayContainer.push(value);*/
							return $KI.table.returnResult(null, true, isInternalError);
						}
						else {
						
							if (value != null) 
								retVals = mapfunc(i, value);
							if (retVals === true) 
								tgttable.push(value);
							retVals = false;
						}
						
					}
				} 
				catch (e) {
					isArgsError = true;
				}
			}
			else 
				if (srctable && mapfunc) {
					tgttable = new Object();
					
					try {
						for (var j in srctable) {
							key = j
							value = srctable[j];
							if (value != null) 
								retVals = mapfunc(j, value);
							if (retVals === true) {
								tgttable[key] = value;
							}
							retVals = false;
						}
					} 
					catch (e) {
						isArgsError = true;
					}
				}
	    }
	    
	    if (isArgsError || isInternalError) 
	        tgttable = null;
	    
	    return $KI.table.returnResult(tgttable, isArgsError, isInternalError);
	},
	
	map: function(srctable, mapfunc) {
	
	    var isArgsError = false;
	    var isInternalError = false;
		
	    if (arguments.length < 2 || (srctable instanceof Object === false) || !(typeof(mapfunc) == "function")) {
	        isArgsError = true;
	    }
	    
	    if (!isArgsError) {
	    	
			try {
					
				var key, value, retVals;
					
				if (srctable instanceof Array && mapfunc) {
					var len = srctable.length;
					
					for (var i = 1; i < len; i++) {
						if (srctable[i] instanceof Array || srctable[i] == null) {
							return $KI.table.returnResult(true, isInternalError);
						}
					}
					
					try {
						for (var i = 1; i < len; i++) {
							value = srctable[i];
							retVals = mapfunc(i, value);
							if (retVals !== false) {
								key = retVals[1];
								value = retVals[2];
								srctable[key] = value;
								retVals = false;
							}
							else 
								return $KI.table.returnResult(true, isInternalError);
						}
					} 
					catch (e) {
						isArgsError = true;
					}
				} else	
					if (srctable && mapfunc) {
						
						try {
							for (var j in srctable) {
								key = j;
								value = srctable[key];
								retVals = mapfunc(key, value);
								
								if (retVals !== false) {
									key = retVals[1];
									value = retVals[2];
									srctable[key] =  value;
									retVals = false;
								}
								else 
									return $KI.table.returnResult(true, isInternalError);
							}
						} 
						catch (e) {
							isArgsError = true;
						}
					}
			}
			catch(e){
				isInternalError = true;
			}
	    }
	    
	    return $KI.table.returnResult(srctable, isArgsError, isInternalError);
	},
		
	mapnew: function(srctable, mapfunc){
	
	    var isArgsError = false;
	    var isInternalError = false;
	    
	    if (arguments.length < 2 || (srctable instanceof Object === false) || !(typeof(mapfunc) == "function")) {
	        isArgsError = true;
	    }
		
		if(srctable == null)
			return $KI.table.returnResult(null, isArgsError, isInternalError);
	    
		try {
			
			var tgttable = null;   
			var key, value, retVals;
			
			if (!isArgsError) {
						
				if (srctable instanceof Array && mapfunc) {
					var len = srctable.length;
				
					for (var i = 1; i < len; i++) {
						if (srctable[i] instanceof Object || srctable[i] == null) {
							return $KI.table.returnResult(null, true, isInternalError);
						}
					}
					
					try {
						
						tgttable = [null]; 
						for (var i = 1; i < len; i++) {
							value = srctable[i];
							retVals = mapfunc(i, value);
							key = retVals[1];
							value = retVals[2];
							tgttable[key] = value;
						}
					} 
					catch (e) {
						isArgsError = true;
					}
					
				} else
					if (srctable && mapfunc) {
				
						try {
							tgttable = new Object();
							for (var j in srctable) {
								key = j;
								value = srctable[key];
								retVals = mapfunc(key, value);
								
								if (retVals !== false) {
									key = retVals[1];
									value = retVals[2];
									tgttable[key] =  value;
									retVals = false;
								}
								else 
									return $KI.table.returnResult(true, isInternalError);
							}
						} 
						catch (e) {
							isArgsError = true;
						}
					}
				}	
		}
	    catch (e) {
			isInternalError = true;
		}
					
	    if (isArgsError || isInternalError) 
	        tgttable = null;
	    return $KI.table.returnResult(tgttable, isArgsError, isInternalError);
	    
	},

	get: function(srctable, key) {
	
	    var isArgsError = false;
	    var isInternalError = false;
		var invalidKey = false;
	    var result = null;
	    
		//TODO:Error Check
	    if (arguments.length < 2 || srctable instanceof Object === false || key == null) {
	        isArgsError = true;
	        return $KI.table.returnResult(result, isArgsError, isInternalError);
	    }
	
	    try {
	        if (key in srctable) {
	            result = srctable[key];				
	        } else 
			  invalidKey = true;
	    } 
	    catch (e) {
	        isInternalError = true;
	    }
		
	    return $KI.table.returnResult(result, isArgsError, isInternalError, invalidKey);
	},

	contains: function(srctable, key) {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var result = false;
	    
	    if (arguments.length < 2 || srctable instanceof Object === false || key == null) {        
	        return $KI.table.returnResult(result, true, isInternalError);
	    }
	    
	    try {
			 if (key in srctable) 
            	result = true;				        
	    } 
	    catch (e) {
	        isInternalError = true;
	    }
	    return $KI.table.returnResult(result, isArgsError, isInternalError);
	},

	append: function(tgttable, srctable) {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    
	    if (arguments.length != 2 || !(tgttable instanceof Object) || !(srctable instanceof Object)) {
	        isArgsError = true;
	        return $KI.table.returnResult(null, isArgsError, isInternalError);
	    }
	      
	    try {
	        if (tgttable.length && srctable.length) { //4906
	            var srcarray = srctable.slice(1);
				for (var i = 0; i < srcarray.length; i++) {
						tgttable.push(srcarray[i]);
				}
		    } else {
	            for (var j in srctable) {
	                tgttable[j] = srctable[j];
	            }
	        }
	    }
	    catch (e) {
	        isInternalError = true;
	    }
	
	    return $KI.table.returnResult(tgttable, isArgsError, isInternalError);
	},
	
	removeall: function(srctable) {
	
	    if (arguments.length < 1) {
	        throw new Error("table.removeall needs atleast 1 argument");
	    }
	    
		//TODO:Proper error function to distinguish between table (object) & other types
	    if (typeof(srctable) != "object") {
	        throw new Error("Invalid  arguments to table.removeall");
	    }
	    
		if(srctable.length)
	    	srctable.length = 0;
		else {
			for (var key in srctable) {
				delete srctable[key];
			}
		}
	    
	    return;
	},
	
	
	unpack: function (t1) {
       
	    if (0 === arguments.length) {
                throw new Error("unpack needs atleast one argument");
        }

        if (t1 instanceof Object === false) {
                throw new Error("Invalid first argument to unpack");
        }

        var numArgs = arguments.length > 3 ? 3 : arguments.length;
        var maxIndex = arguments[0].length;
        var beginIndex = 1, endIndex = maxIndex;
        switch (numArgs) {
                case 3:
                        arguments[2] -= 0;
                        if (isNaN(arguments[2])) {
                                throw new Error("Invalid argument to unpack");
                        }
                        endIndex = arguments[2];
                case 2:
                        arguments[1] -= 0;
                        if (isNaN(arguments[1])) {
                                throw new Error("Invalid argument to unpack");
                        }
                        beginIndex = arguments[1];
                default:
                        break;
        }

        if (beginIndex > endIndex) {
                return [""];
        } else {
                var retVals = [null];		//4907		
                for (var i = beginIndex; i < (endIndex); i++) {
                        retVals.push(arguments[0][i]);
                }

                return retVals;
        }
	},

	// local myjson = '{ "name": "Shasank", "id": "417" }'
	// table.parsejson(myjson)
	/*parsejson: function(args){
	
	    if (arguments.length < 1) {
	        throw new Error("table.parsejson needs atleast 1 argument");
	    }
	    
	    var jsObj = args[0].evalJSON();
	    
	    try {
	        var tgttable = $KU.json2LuaTable(jsObj);
	    } 
	    catch (e) {
	        throw new Error("table.parsejson - SyntaxError: Badly formed JSON string");
	    }
	    
	    return tgttable;
	},*/

	/*keys: function(args){
	
	    if (arguments.length < 1) {
	        throw new Error("table.keys needs atleast 1 argument");
	    }
	    
	    if (args[0] instanceof LuaTable === false) {
	        throw new Error("Invalid  arguments to table.keys");
	    }
	    
	    var srctable = args[0];
	    
	    if (srctable.hashKeys.length) {
	    
	        var innerlen = srctable.hashKeys.length;
	        var key;
	        var keysarray = [];
	        for (var j = 0; j < innerlen; j++) {
	            key = srctable.hashKeys[j];
	            keysarray.push(key);
	        }
	        
	        return keysarray;
	    }
	},*/

	returnResult: function() {
	
	    var errorNo = null;
	    var errorMsg = null;
		var isArgsError = false;
		var isInternalError = false;
		
		if (arguments.length >= 3) {
			
			var retArray = arguments[0];
			isArgsError = arguments[1];
			isInternalError = arguments[2];
			var invalidKey = arguments[3];		
		}
		else{
			isArgsError = arguments[0];
			isInternalError = arguments[1];
		}
	    if(isArgsError) {
	        errorNo = 100;
	        errorMsg = "INVALID ARGUMENTS";
	    }
	    else if(isInternalError){
	            errorNo = 101;
	            errorMsg = "INTERNAL ERROR";
	    }
	    else if(invalidKey){
	                errorNo = 0;
	                errorMsg = "INVALID KEY";
		}	
		if (arguments.length >= 3) 			
	    	//return ([retArray, errorNo, errorMsg]);
			return retArray;
		else if(arguments.length == 2 && (isArgsError || isInternalError))
			return ([errorNo, errorMsg]);
		else	
			return;	
	}
}

