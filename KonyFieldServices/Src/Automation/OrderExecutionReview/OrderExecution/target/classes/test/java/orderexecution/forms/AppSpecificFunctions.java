package test.java.orderexecution.forms;

import test.common.AppElement;

public class AppSpecificFunctions {
	
	
	
	public static void handleSync() throws Exception{
		int retry = 4;
		try{
			while(retry>0 &&AppElement.waitForName("Syncing...",2)){
			Thread.sleep(5000);
			retry--;
			}
		}
		catch (Exception e) {
            e.printStackTrace(); 
            }
	}

}
