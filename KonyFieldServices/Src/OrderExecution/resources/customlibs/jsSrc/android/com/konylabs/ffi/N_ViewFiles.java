package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.isr.ViewBase64DataFile.ViewDataFile;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_ViewFiles extends JSLibrary {

 
 
	public static final String viewfile = "viewfile";
 
	String[] methods = { viewfile };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[0];
 return libs;
 }



	public N_ViewFiles(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 try {
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen != 4){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String basae64content0 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 basae64content0 = (java.lang.String)params[0];
 }
 java.lang.String mimetype0 = null;
 if(params[1] != null && params[1] != LuaNil.nil) {
 mimetype0 = (java.lang.String)params[1];
 }
 java.lang.String filename0 = null;
 if(params[2] != null && params[2] != LuaNil.nil) {
 filename0 = (java.lang.String)params[2];
 }
 com.konylabs.vm.Function callback0 = null;
 if(params[3] != null && params[3] != LuaNil.nil) {
 callback0 = (com.konylabs.vm.Function)params[3];
 }
 ret = this.viewfile( basae64content0, mimetype0, filename0, callback0 );
 
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
		return "ViewFiles";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] viewfile( java.lang.String inputKey0, java.lang.String inputKey1, java.lang.String inputKey2, com.konylabs.vm.Function inputKey3 ){
 
		Object[] ret = null;
 com.isr.ViewBase64DataFile.ViewDataFile.viewFile( inputKey0
 , inputKey1
 , inputKey2
 , (com.konylabs.vm.Function)inputKey3
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
};
