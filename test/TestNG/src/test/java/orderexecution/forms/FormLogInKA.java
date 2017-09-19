package test.java.orderexecution.forms;

import org.springframework.util.Assert;
import test.common.Alerts;
import test.common.AppElement;
import test.common.SgConfiguration;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormLogInKA {
	AppElement tbxUserIDKA;
	AppElement tbxPasswordKA;
	AppElement btnLoginKA;
	
	public FormLogInKA() throws Exception{
		tbxUserIDKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmLoginKA_tbxUserIDKA"));
		tbxPasswordKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmLoginKA_tbxPasswordKA"));
		btnLoginKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmLoginKA_btnLoginKA"));	
	}
	
	public void typeUserName(String uName){
		tbxUserIDKA.type(uName);	
	}
	public void typePassword(String password){
		tbxPasswordKA.type(password);
	}
	
	public void clickReConfigure() throws Exception{
		AppElement lblReconfigure = new AppElement(OrderExecutionWidgetId.getWidgetId("frmLogInKA_lblReconnectKA"));
		lblReconfigure.click();
	}
	public void clickLogin(){
		Assert.isTrue(btnLoginKA.isEnabled());
		btnLoginKA.click();
	}
	

	public FormOrderListKA doLogin(String uName, String password, boolean firstLogin) throws Exception{
        typeUserName(uName);
        typePassword(password);                
        clickLogin();
        if(SgConfiguration.getInstance().isIOS()){
            if(firstLogin){
              try{
                   	if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("Allow_Button"),600)){
                	   Alerts.btnClickLable("Allow");}
                   
                    if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("Allow_Button"),30)){
                        Alerts.btnClickLable("Allow");
                  }
                  if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("OK_Button"),20)){
                    Alerts.btnClickLable("OK");
                  }                               
                   if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("OK_Button"),20)){
                     Alerts.btnClickLable("OK");
                    }
                      }catch(Exception e){
                          System.out.println("No popup appread..");
                                        }
                        }
           AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"),10);
        }               
        else if(SgConfiguration.getInstance().isAndroid()){	
        	if(Alerts.waitForAlert(10)){
        		Alerts.acceptAlert();      
          	   }
        	Thread.sleep(600000);
        	if(Alerts.waitForAlert(10)){
        		Alerts.acceptAlert();      
      	   	}
        AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"),10);        	
        }
        return new FormOrderListKA();                      
}
	 
}