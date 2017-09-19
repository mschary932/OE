package test.java.orderexecution.forms;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.commons.lang.StringUtils;

import java.util.List;

import test.common.Alerts;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormSummaryKA {

 AppElement btnBackKA;

 public FormSummaryKA() throws Exception {

  AppElement lbl = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblSummaryKA"));
 }
 public void navigatetoCompleteOrderFromOrderPayment() throws Exception {
  btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_btnCancelKA"));

  btnBackKA.click();
  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
 }

 public void navigatetoOrderExecutionFromCompleteOrder() throws Exception {
  btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnCloseKA"));

  btnBackKA.click();
  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));

 }
 
 public void clickOnGenerateInvoice() throws Exception {
	AppElement.clickByName("Generate Invoice");
	 
 }
 public FormInvoicePdfKA clickGenerateInvoice()throws Exception{
	 AppElement btnDoneKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_btnGenInvoiceKA"));
	 try{
		 btnDoneKA.click();		
		 AppSpecificFunctions.handleSync();
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_lblHeaderKA"),240);
	 }
	 catch(Exception e) {
		e.printStackTrace(); 
	 }
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_lblHeaderKA"),3);
	 return new FormInvoicePdfKA();
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
		 try 
      { 
			 System.out.println("Executing the cmd : "+Command);
			 Process p=Runtime.getRuntime().exec("cmd /c "+Command);
          p.waitFor(); 
          BufferedReader reader=new BufferedReader(
              new InputStreamReader(p.getInputStream())
          ); 
          String line;
          while((line = reader.readLine()) != null) 
         	 Totalline=Totalline+"\n"+line;
      }


      catch(IOException e1) {} 
      catch(InterruptedException e2) {} 
      return Totalline;
 }
 public int gettotalItems() throws Exception{
	List<AppElement> ele= AppElement.getAppElements("flxTimeAndExpenseDetailsKA");
 	return ele.size();
 }
 
 public String getTotal(String total,String unit) throws Exception{
	 String split[] = StringUtils.split(total,unit);
	 String subTotal  = split[0];
	 return subTotal;
		
 }
public void selectPercent() throws Exception {
	 AppElement  flxPercentSelectionKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_flxPercentSelectionKA"));
	 flxPercentSelectionKA.click();
	 }
	  
 public void selectAmount() throws Exception {
	 AppElement  flxAmountSelectionKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_flxAmountSelectionKA"));
	 flxAmountSelectionKA.click();
	 }
	  
 public void setValue(String Value) throws Exception {
	 AppElement  tbxAmountKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_tbxAmountKA"));
	 tbxAmountKA.type(Value);
	 }
 

}