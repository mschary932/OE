//Cryptography API's


//Supported Algo's : AES & 3DES
//Hashing Algo's supported : MD5, SHA1, SHA256, SHA512
//Modes Supported: CBC(default), CFB, CTR, OFC, ECB
//Padding Supported: Pkcs7, Iso97971, Iso10126, ZeroPadding, NoPadding

$KI.crypto = {
	stringify: function (cipherParams) {
            // create json object with ciphertext
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };
            // optionally add iv and salt
            if (cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }
            // stringify json object
            return JSON.stringify(jsonObj);
        },
	parse: function (jsonStr) {
            // parse json string
            var jsonObj = JSON.parse(jsonStr);
            // extract ciphertext from json object, and create cipher params object
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });
            // optionally extract iv and salt
            if (jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            }
            if (jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
            }
            return cipherParams;
        },
 /**
  * Create hash algorithm.
  * @param {string} algotype Type of algorithm.
  * @param {string} inputmessage Hasing message.
  * @return {Object} If hash convert successful retutn "string" else return 
  *     "object" which contain error code and error messgage.
  */
  createhash: function(algotype, inputmessage) {
      var msg;
      var statuscode;
      if(typeof(inputmessage) != "string") {
        return {
            errcode: 100,
            errmessage: "invalid input parameters"
        };
      }
      try{
        switch (algotype.toLowerCase()) {
           case "md5":
              msg = CryptoJS.MD5(inputmessage);
              break;
           case "sha256":
              msg = CryptoJS.SHA256(inputmessage);
              break;
           case "sha1":
              msg = CryptoJS.SHA1(inputmessage);
              break;
           case "sha512":
              msg = CryptoJS.SHA512(inputmessage);
           break;
           default:
              msg = {
                errcode: 101,
                errmessage: "unsupported algorithm"
              }
           break;
        }
        return msg;
      } catch (ex) {
          return {
            errcode: 102,
            errmessage: "unknown  error"
          }
      }
  },

  encrypt: function(algo, generatedkey, inputstring, propertiesTable) {
    if(typeof(algo) != "string" && inputstring && generatedkey) {
        return {
            errcode: 100,
            errmessage: "invalid input parameters"
        };
     }
    var mode = CryptoJS.mode.CBC;
	var padding = CryptoJS.pad.Pkcs7;
	try {
	  	if (propertiesTable) {
		  if (propertiesTable.mode) {
			switch(propertiesTable.mode.toLowerCase()) {
			  case 'cfb':
				mode = CryptoJS.mode.CFB;
				break;
			  case 'ctr':
				mode = CryptoJS.mode.CTR;
				break;
			  case 'ofb':
				mode = CryptoJS.mode.OFB;
				break;
			  case 'ecb':
				mode = CryptoJS.mode.ECB;
				break;
			}
		 }
		 if(propertiesTable.padding) {
		   switch(propertiesTable.padding.toLowerCase()) {
			  case 'iso97971':
				padding = CryptoJS.pad.Iso97971;
				break;
			  case 'iso10126':
				padding = CryptoJS.pad.Iso10126;
				break;
			  case 'zeropadding':
				padding = CryptoJS.pad.ZeroPadding;
				break;
			  case 'nopadding':
				padding = CryptoJS.pad.NoPadding;
				break;
			}
		  }
		}
		if(algo.toLowerCase() == "aes") {
		  var encryptedObj = CryptoJS.AES.encrypt(inputstring, generatedkey, { mode: mode, padding: padding});
		  return $KI.crypto.stringify(encryptedObj);
		} else if(algo.toLowerCase() == "tripledes") {
		  var encryptedObj = CryptoJS.TripleDES.encrypt(inputstring, generatedkey, { mode: mode, padding: padding, format: $KI.crypto.JsonFormatter });
		  return $KI.crypto.stringify(encryptedObj);
		} else {
		    return {
              errcode: 101,
              errmessage: "unsupported algorithm"
            };
		}
	} catch(ex) {
	    return {
          errcode: 102,
          errmessage: "unknown  error"
        };
	}
  },
  decrypt: function(algo, generatedkey, inputstring, propertiesTable) {
    if(typeof(algo) != "string" && inputstring && generatedkey) {
        return {
            errcode: 100,
            errmessage: "invalid input parameters"
        };
    }
    var mode = CryptoJS.mode.CBC;
	var padding = CryptoJS.pad.Pkcs7;
	try {
	  	if (propertiesTable) {
		  if (propertiesTable.mode) {
			switch(propertiesTable.mode.toLowerCase()) {
			  case 'cfb':
				mode = CryptoJS.mode.CFB;
				break;
			  case 'ctr':
				mode = CryptoJS.mode.CTR;
				break;
			  case 'ofb':
				mode = CryptoJS.mode.OFB;
				break;
			  case 'ecb':
				mode = CryptoJS.mode.ECB;
				break;
			}
		 }
		 if(propertiesTable.padding) {
		   switch(propertiesTable.padding.toLowerCase()) {
			  case 'iso97971':
				padding = CryptoJS.pad.Iso97971;
				break;
			  case 'iso10126':
				padding = CryptoJS.pad.Iso10126;
				break;
			  case 'zeropadding':
				padding = CryptoJS.pad.ZeroPadding;
				break;
			  case 'nopadding':
				padding = CryptoJS.pad.NoPadding;
				break;
			}
		  }
		}
		inputstring = $KI.crypto.parse(inputstring);
		if(algo.toLowerCase() == "aes") {
		  var message = CryptoJS.AES.decrypt(inputstring, generatedkey, { mode: mode, padding: padding });
		  return message.toString(CryptoJS.enc.Utf8)
		} else if(algo.toLowerCase() == "tripledes") {
		  var message =  CryptoJS.TripleDES.decrypt(inputstring, generatedkey, { mode: mode, padding: padding });
		  return message.toString(CryptoJS.enc.Utf8)
		} else {
		    return {
              errcode: 101,
              errmessage: "unsupported algorithm"
            }
		}
	} catch(ex) {
	    return {
          errcode: 102,
          errmessage: "unknown  error"
        }
	}
  },

  retrievepublickey: function() {
    return;
  },

  newkey: function(passphrase, optionalBits, algoObject) {
     try {
		if(passphrase != "passphrase") {
		  return {
            errcode: 100,
            errmessage: "invalid input parameters"
          };
	    } else if (!algoObject.subalgo) {
	      return {
            errcode: 105,
            errmessage: "subalgo parameter is missing"
          };
	    }
       if (algoObject.subalgo.toLowerCase() == "aes" || algoObject.subalgo.toLowerCase() == "tripledes") {
	     return algoObject.passphrasetext[IndexJL];
	   }else {
	      return {
            errcode: 101,
            errmessage: "unsupported algorithm"
          };
	   }
	} catch(ex) {
	   return {
         errcode: 102,
         errmessage: "unknown error"
       };
	}
  },

  savekey: function(name, key, metainfo) {

  	if(name == undefined || key == undefined) {
		return { "errcode": 100, "errmsg": "Invalid input parameters" };	
	}

    try{
		if(localStorage) {
			try {
				localStorage.setItem(name, JSON.stringify(key));
				return name;				
			} catch (e) {
				if (e.name == "QUOTA_EXCEEDED_ERR") {
					var errcode = 0, errmsg = "";
					if(localStorage.length === 0 ) {
						errcode = 102;
						errmsg = "Private Browsing is switched ON";
					} else {
						errcode = 101;
						errmsg = "unable to save the key with the specified name";
					}
					return { "errcode": errcode, "errmsg": errmsg };
				}
			}
		}else { 
			return { "errcode": 102, "errmsg": "unknown error, storage not supported" };
		}	
    }catch(err){}
     
  },   

  readkey: function(uniqid) {

  	if(uniqid == undefined) {
		return { "errcode": 100, "errmsg": "Invalid input parameters" };	
	}

    try{
	  	if(localStorage) {
			var dataobj = JSON.parse(localStorage.getItem(uniqid) || "null");
			if(dataobj == null) {
				return { "errcode": 101, "errmsg": "unable to find the key with the specified unique ID" };
			}
			else
				return dataobj;
		}else {
			kony.print("crypto readkey failed");
			return { "errcode": 102, "errmsg": "unknown error, storage not supported" };
		}
    }catch(err){}
  },

  deletekey: function(uniqid){
    try{
	    if(localStorage)  			
			localStorage.removeItem(uniqid);
		else 
			kony.print("crypto delete failed");
    }catch(err){}
  }
};