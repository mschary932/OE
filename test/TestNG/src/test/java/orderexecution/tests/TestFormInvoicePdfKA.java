package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.Alerts;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;

import org.testng.annotations.AfterClass;

import test.java.orderexecution.forms.FormCompleteOrderKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormInvoicePdfKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormSelectPaymentMethodKA;
import test.java.orderexecution.forms.FormSummaryKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormInvoicePdfKA extends OrderExecutionBaseTest {
	
	
	@BeforeMethod(alwaysRun=true)	
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception{
		super.beforeMethod(inputParamsOfTestMethod, method);
		AppElement ele=null;
		try {
			ele=new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_lblHeaderKA"));
		} 
		catch(Exception e){
			if(ele==null){
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));						
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				try{
					if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")){
						FormOrderListKA formOrderListKA=new FormOrderListKA();
						formOrderListKA.clickWorkorder(OrderState.state);
					}
					FormOrderExecution orderexecution = new FormOrderExecution();
					orderexecution.clickOnRoute();
					orderexecution.clickStart();
					orderexecution.clickComplete();
					FormCompleteOrderKA frmCompleteOrderKA = new FormCompleteOrderKA();
					FormSummaryKA frmSummaryKA=frmCompleteOrderKA.OnClickPayment();
					frmSummaryKA.clickGenerateInvoice();
				} catch(Exception ex){
					System.out.println("*****Its not relaunch*****");
				}
			}
		}
	}
	
	@Test
	public void test_validateTotalAmount() throws Exception {
		
	}
	
	@Test
	public void test_validateItemsCount() throws Exception {
		
	}
	
	@Test
	public void test_email_vailidity() throws Exception {
		FormInvoicePdfKA frmInvoicePdfKA = new FormInvoicePdfKA();
		frmInvoicePdfKA.clickEmail();
		frmInvoicePdfKA.typeEmail();
		Assert.assertTrue(Alerts.validateAlertMsg("Enter valid email"));
		Alerts.btnClickLable("OK");
		frmInvoicePdfKA.cancelEmail();
	}
	
	@Test
	public void test_navigateToSelectPaymentMethod() throws Exception {
		FormInvoicePdfKA frmInvoicePdfKA = new FormInvoicePdfKA();
		frmInvoicePdfKA.clickMakePayment();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_lblPaymentSummaryKA"));
		AppElement lblValue = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_lblPaymentSummaryKA"));
		FormSelectPaymentMethodKA frmSelectPaymentMethodKA = new FormSelectPaymentMethodKA();
		if(frmSelectPaymentMethodKA instanceof FormSelectPaymentMethodKA)
			Assert.assertEquals(lblValue.getText(),"Select Payment Method");
		frmSelectPaymentMethodKA.clickBack();
	}
	@AfterClass(alwaysRun=true)
	 public void setupAfterClass() throws Exception {
	  try {
	  } catch (Exception e) {
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}
	  }
	 }
}
