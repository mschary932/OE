try{
	if (typeof(localStorage) === "object" || kony.appinit.isIE7) { //localStorage is not supported in ie7. Hence these api's work with ie7 polyfill js
		$KI.ds = {
	
			save: function(tbl, dbname, metainfo) {
			       
				if(localStorage) {
				   try {
						//kony.print(JSON.stringify(localStorage).length);
						localStorage.setItem(dbname, JSON.stringify(tbl) );			
					} catch (e) {
						if (e.name == "QUOTA_EXCEEDED_ERR") {
							var errcode = 0, errmsg = "";
							if(localStorage.length === 0 ){
								errcode = 707;
								errmsg = "Private Browsing is switched ON";
							}else{
								errcode = 708;
								errmsg = "Data storage limit has exceeded";
							}
							return { "errcode": errcode, "errmsg": errmsg };
						}
					}
				} 
				else { 
				    kony.print("localStorage not supported");
				}									
			},
			
			read: function(dbname) {				
			    
			    if(localStorage) {
				//	var dataarray = [];
					var dataobj = JSON.parse(localStorage.getItem(dbname) || "null");
					
				/*	if(dataobj == null) return null;
					
					for(var i in dataobj) {
						dataarray[i] = dataobj[i];
					}
					return dataarray;*/
					return dataobj;
			    } else {
					kony.print("localStorage readitem failed");
					return null;
			      }	
				  
			},
			
			Delete : function(dbname) {
			
			    if(localStorage)  {
					//kony.print(JSON.stringify(localStorage).length);
					localStorage.removeItem(dbname);
					//kony.print(JSON.stringify(localStorage).length);
					return true;
			    } else {
					kony.print("localStorage delete failed");
					return false;
			      }	
			}
		}
	
		$KI.localstorage = {
		
			key: function(index){				
				return(localStorage.key(index - IndexJL));     //as per lua indexing rules.	
			},
			
			getitem: function(keyname){
				var dataobj = JSON.parse(localStorage.getItem(keyname) || "null");
				return dataobj;
			
			},
			
			setitem: function(keyname, value){
	          
		  		var key=keyname, val=value;
	           
	            if (typeof keyname == 'object') {
	                for (x in keyname)
	                    key=x;val=keyname[x];               
	            }      
				try {
					localStorage.setItem(key, JSON.stringify(val)); 
				} catch (e) {
					 if (e.name == "QUOTA_EXCEEDED_ERR") {
						if(localStorage.length === 0 ){
							console.warn("Private Browsing is switched ON");
						} else {
							console.warn("Data storage limit has exceeded");
						}
					}
				}
			},
			
			removeitem: function(keyname){
				localStorage.removeItem(keyname);
			},
			
			clear: function(){
				localStorage.clear();	
			},
			
			length: function() {
				return localStorage.length;
			}
	 	}
	} else {
		kony.print("localStorage not supported");
	}
}
catch(e){
	$KI.ds = {
	save :function(){},
	read: function(dbname) {	},
	Delete : function(dbname) {}	
	}
}
