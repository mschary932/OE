package test.java.orderexecution.forms;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;


public class FormSettingsKA {
	 
	
	 public FormSettingsKA() throws Exception{
		 AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		 }

	public FormHamburgerMenuWOKA clickAppMenu() throws Exception {
		AppElement btnAppMenuKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_btnBackKA"));
		btnAppMenuKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"));
		if(Label.isElementVisible()){return new FormHamburgerMenuWOKA();}
		return null;
	}

	public void swipeTouchID() throws Exception {
		AppElement SwitchTouchIDKA =  new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_SwitchTouchIDKA"));
		SwitchTouchIDKA.swipeLeft(90);
	}

	public void clickStart() throws Exception {
		AppElement btnStartKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_btnStartKA"));
		btnStartKA.click();
	}

	public void swipeNotification() throws Exception {
		AppElement switchNotificationKA =  new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_switchNotificationKA"));
//		switchNotificationKA.swipeLeft(90);
		switchNotificationKA.click();
	}
	
	public void clickPerformance() throws Exception{
		AppElement performanceButton=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_btnHouseKeepingKA"));
		performanceButton.click();
	}
	
	public void enable_disable_Wifi(String input) throws Exception {	
		System.out.println("Disabling device wifi off");
		String cmd = "adb shell am start -n io.appium.settings/.Settings -e wifi " +input;
		ExecuteCMDCommand(cmd);
		Thread.sleep(3000);
		if(AppElement.waitForEnable("android:id/button3")){
			AppElement btn = new AppElement("android:id/button3");
			btn.click();
		}	
	}
 
	 public String ExecuteCMDCommand(String Command) {
		String Totalline="";
		try { 
			 System.out.println("Executing the cmd : "+Command);
			 Process p=Runtime.getRuntime().exec("cmd /c "+Command);
			 p.waitFor(); 
			 BufferedReader reader=new BufferedReader(new InputStreamReader(p.getInputStream())); 
			 String line;
			 while((line = reader.readLine()) != null) 
				 Totalline=Totalline+"\n"+line;
	     }
		  catch(IOException e1) {} 
	      catch(InterruptedException e2) {} 
	      return Totalline;
	   }
	}
