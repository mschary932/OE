package test.java.orderexecution.tests;
import java.lang.reflect.Method;

import test.common.Alerts;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.java.orderexecution.forms.*;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;



public class TestFormFSLoginKA extends OrderExecutionBaseTest{
	
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception{
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"));
		} catch (Exception e) {
			if (ele == null)
				System.out.println("TestFormFSLoginKA.setupBeforeTest(): Not on the FS Login Form");
			else
				System.out.println("TestFormFSLoginKA.setupBeforeTest(): Something went worng form");
	
		}
	}

	private FormFSLogInKA frmFSLoginKA;
	private FormTenantKA frmTenantKA;
	private FormLogInKA frmLoginKA;
	private FormOrderListKA frmOrderListKA;

    
	@Test
	public void test_app_config_incorrect() throws Exception{
		frmFSLoginKA = new FormFSLogInKA();  
		frmTenantKA = frmFSLoginKA.doManualSetup();	
		frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey")+"xyz", sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
		//frmLoginKA =  new FormLogInKA();
		frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
		Alerts.validateAlertMsg("Please enter a valid Username and/or Password");
		Alerts.validateAlertButton("OK");		
		Alerts.btnClickLable("OK");
		Assert.assertEquals(Alerts.validateAlertButton("OK"),"true");
	}
	
	@Test
	public void test_app_login() throws Exception{		
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"));
		frmFSLoginKA = new FormFSLogInKA(); 
        frmTenantKA = frmFSLoginKA.doManualSetup();	
     	frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//		frmLoginKA =  new FormLogInKA();
		frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
		AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		Assert.assertEquals(lblexpect.getText(),"My Orders");	
	}
	
}
