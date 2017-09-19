package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.common.AppElement;
import test.java.orderexecution.forms.FormContactDetails;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderAssetKA;
import test.java.orderexecution.forms.FormOrderDetails;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormOrderDetails extends OrderExecutionBaseTest {
	public TestFormOrderDetails() {
		// TODO Auto-generated constructor stub
	}

	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		} catch(Exception e){
			 if(ele==null){
				 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
						FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
						FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
						FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//						frmLoginKA =  new FormLogInKA();//							
						FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
						AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
						Assert.assertEquals(lblexpect.getText(),"My Orders");					
					}
			try{
			   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")){
			   FormOrderListKA formOrderListKA=new FormOrderListKA();
			   formOrderListKA.clickWorkorder(OrderState.state);
			 }
			}catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
			 FormOrderExecution frmOrderExecution = new FormOrderExecution();		
			 frmOrderExecution.navigateToOrderDetails();
			 }
		}	  
	}	
	//to check nevigation to ordercontact details
	@Test
	public void navigateToContactDetails() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderDetails orderDetailsForm=new FormOrderDetails();
		orderDetailsForm.navigateToContactDetails();
		FormContactDetails contactDetailsForm=new FormContactDetails();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmContactDetailsKA_lblHeaderKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmContactDetailsKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Contact Details");
		
		//to navigate back to order  details
		contactDetailsForm.clicknevigatebackOrderDetailsfromContact();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Details");	
		sa.assertAll();
	}
	
	@Test
	public void navigateToOrderAssetFromOrderDetails() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderDetails orderDetailsForm = new FormOrderDetails();
		orderDetailsForm.navigateToOrderAsset();
		FormOrderAssetKA OrderAssetForm=new FormOrderAssetKA();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Asset");
		
		//To Navigate Back From Order Asset
		OrderAssetForm.navigateBackToOrderDetails();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Details");
		sa.assertAll();
	}
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
	try{
		FormOrderDetails orderDetailsForm=new FormOrderDetails();
		orderDetailsForm.clicknevigatebackOrderExecution();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement lblValue2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue2.getText(),"Order Execution"); 
		FormOrderExecution frmOrderExecution=new FormOrderExecution();
		frmOrderExecution.clicknavigatebackOrderLists();		
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	    sa.assertEquals(lblValue1.getText(),"My Orders");
	    sa.assertAll();		
	 }catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
	 }
 }
	
}
