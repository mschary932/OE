package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;


public class FormTenantKA {
	AppElement tbxAppKeyKA;
	AppElement tbxAppSecretKA;
	AppElement tbxServiceURLKA;
	AppElement tbxVersion;
	AppElement btnConnectKA;
	AppElement btnQRCodeKA;
	
	public FormTenantKA() throws Exception{
			tbxAppKeyKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTenantKA_tbxAppKeyKA"));
			tbxAppSecretKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTenantKA_tbxAppSecretKA"));
			tbxServiceURLKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTenantKA_tbxServiceURLKA"));
			tbxVersion = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTenantKA_tbxVersion"));
			btnConnectKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTenantKA_btnConnectKA"));
			btnQRCodeKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTenantKA_btnQRCodeKA"));
	}
	
	public void typeAppKey(String key){
		tbxAppKeyKA.type(key);		
	}
	
	public void typeAppSecret(String key){
		tbxAppSecretKA.type(key);
	}
	
	public void typeServiceURLKA(String key){
		tbxServiceURLKA.type(key);
	}
	public void typeVersion(String key){
		tbxVersion.type(key);
	}
	
	public void clickConnect(){
		btnConnectKA.click();
	}
	
	public FormLogInKA connectToTenant(String appKey, String appSecret, String url, String version) throws Exception{
		typeAppKey(appKey);
		typeAppSecret(appSecret);
		typeServiceURLKA(url);
		typeVersion(version);
		Thread.sleep(2000);
		clickConnect();
	
		return new FormLogInKA();
	}
	
}
