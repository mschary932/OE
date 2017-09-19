package test.java.orderexecution.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormMeasurementExecutionKA;
import test.java.orderexecution.forms.FormMeasurementImagesKA;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.OrderExecutionBaseTest;

public class TestFormMeasurementImagesKA extends OrderExecutionBaseTest {


	@BeforeMethod
	public void setupBeforeTest() throws Exception{
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentKA_lblHeaderKA"));
		} catch (Exception e) {
			if (ele == null){
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//					frmLoginKA =  new FormLogInKA();//							
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				System.out.println("TestFormMeasurementImagesKA.setupBeforeTest(): Not on the Order Execution Form");
				FormOrderListKA formOrderListKA = new FormOrderListKA();
				formOrderListKA.clickWorkorder(OrderState.state);
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			}
			else
				System.out.println("TestMyOrdersList.setupBeforeTest(): Something went worng form");
	
		}
	}
		
	
	@Test
	public FormMeasurementExecutionKA navigateBackToMeasurementExecution() throws Exception{Thread.sleep(5000);
    FormMeasurementImagesKA mesurementExecutionForm = new FormMeasurementImagesKA();	
    mesurementExecutionForm.navigateBackToMeasurementExecution();	
    AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblHeaderKA"));
    AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblHeaderKA"));
	 if(Label.isElementVisible()) {return new FormMeasurementExecutionKA();}	
	return null;
	
}
	
		
	
}
	

