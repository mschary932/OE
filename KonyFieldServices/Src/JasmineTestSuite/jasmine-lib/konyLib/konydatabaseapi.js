$KI.db = {

	changeversion: function(db, oldver, newver, transcb, ecb, vcb){
		if (window.openDatabase) {
			if (db) {
				db.changeVersion(oldver, newver, transcb, ecb, vcb);
			}
		}else {
			kony.print("Web Databases not supported");
		}
	},
	
	executesql: function(transid, sqlstmt, args, scb, ecb){
	
		if (window.openDatabase) {
			if (transid) {
				if (args && args[0] === null) {
					args = args.slice(1);
				}
				transid.executeSql(sqlstmt, args, scb, ecb);
			}
		}else {
			kony.print("Web Databases not supported");
		}
	},
	
	opendatabase: function(name, version, dname, size, cb){
	
		var db = this.db || null;
		cb = cb || kony_dummyForDBCallback;
		try {
			if (window.openDatabase) {
				if (!db) {
						db = openDatabase(name, version, dname, size, cb);
						this.db = db;
				}
			}
			else {
				kony.print("Web Databases not supported");
			}
		} 
		catch (e) {
			if (e == 2) {
				// Version number mismatch.
				kony.print("opendatabase:Invalid database version.");
			}
			else {
				kony.print("opendatabase:Unknown error " + e + ".");
			}
			return null;
		}
		return db;
	},
	
	readtransaction: function(db, transcb, ecb, vcb){
		if (window.openDatabase) {
			if (db) {
				db.readTransaction(transcb, ecb, vcb);
			}
		}else {
			kony.print("Web Databases not supported");
		}
	},
	
	sqlresultsetrowitem: function(transid, sqlresultset, index){
		if (window.openDatabase) {
			//index = index - IndexJL; // Commented to fix Auto848
			if (index < sqlresultset.rows.length) {
				return sqlresultset.rows.item(index);
			}
			else {
				return null;
			}
		}else {
			kony.print("Web Databases not supported");
		}
	},
	
	transaction: function(db, transcb, ecb, vcb){
		if (window.openDatabase) {
			if (db) {
				db.transaction(transcb, ecb, vcb);
			}
		}else {
			kony.print("Web Databases not supported");
		}
	}
}

function kony_dummyForDBCallback(){
}