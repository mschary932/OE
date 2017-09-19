package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.kony.Sign;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_CaptureSignatureAndroid extends JSLibrary {

 
 
	public static final String getSignatureData = "getSignatureData";
 
	String[] methods = { getSignatureData };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[0];
 return libs;
 }



	public N_CaptureSignatureAndroid(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 try {
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.Object paramFunction0 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 paramFunction0 = (java.lang.Object)params[0];
 }
 ret = this.getSignatureData( paramFunction0 );
 
 			break;
 		default:
			break;
		}
 }catch (Exception e){
			ret = new Object[]{e.getMessage(), new Double(101), e.getMessage()};
		}
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "CaptureSignatureAndroid";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] getSignatureData( java.lang.Object inputKey0 ){
 
		Object[] ret = null;
 com.kony.Sign.getSign( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
};
