package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormCashPaymentKA;
import test.java.orderexecution.forms.FormCompleteOrderKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormInvoicePdfKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormSelectPaymentMethodKA;
import test.java.orderexecution.forms.FormSummaryKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormCashPaymentKA extends OrderExecutionBaseTest{
	
	FormCashPaymentKA frmCashPaymentKA;
	
	@BeforeMethod(alwaysRun=true)	
	
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception{
		super.beforeMethod(inputParamsOfTestMethod, method);
		AppElement ele=null;
		try {
			 ele=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCashPaymentKA_lblPaymentSummaryKA"));

		} catch(Exception e){
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
			   FormOrderExecution orderexecution = new FormOrderExecution();
			   orderexecution.clickOnRoute();
			   orderexecution.clickStart();
			   FormCompleteOrderKA frmCompleteOrderKA = new FormCompleteOrderKA();
			   FormSummaryKA frmSummaryKA=frmCompleteOrderKA.OnClickPayment();
			   frmSummaryKA.clickGenerateInvoice();
			   FormInvoicePdfKA frmInvoice = new FormInvoicePdfKA();
			   frmInvoice.clickMakePayment();
			   FormSelectPaymentMethodKA frmSelectPayment = new FormSelectPaymentMethodKA();
			   frmSelectPayment.clickCash();
			 }
			}catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
		FormOrderExecution orderexecution = new FormOrderExecution();
		orderexecution.clickOnRoute();
		orderexecution.clickStart();
		orderexecution.clickComplete();
		FormCompleteOrderKA frmCompleteOrderKA = new FormCompleteOrderKA();
		FormSummaryKA frmSummaryKA=frmCompleteOrderKA.OnClickPayment();
		frmSummaryKA.clickGenerateInvoice();
		FormInvoicePdfKA frmInvoice = new FormInvoicePdfKA();
		frmInvoice.clickMakePayment();
		FormSelectPaymentMethodKA frmSelectPayment = new FormSelectPaymentMethodKA();
		frmSelectPayment.clickCash();
			 }
		}
	}	
	@Test
	public void testNavigateBack() throws Exception{
		Thread.sleep(10000);
		frmCashPaymentKA = new FormCashPaymentKA();
		frmCashPaymentKA.clickBack();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_lblPaymentSummaryKA")).getText();
		Assert.assertEquals(lblValue,"Select Payment Method");
		FormSelectPaymentMethodKA frmSelectPayment = new FormSelectPaymentMethodKA();
		frmSelectPayment.clickCash();
		
	}
	@Test
	public void testSave() throws Exception{
		Thread.sleep(10000);
		frmCashPaymentKA = new FormCashPaymentKA();
		frmCashPaymentKA.OnSave();
		AppElement done = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnConfirm"));
		done.click();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		Assert.assertEquals(lblValue,"Complete Order");
		
	}
	@Test
	public void testAmount() throws Exception{
		Thread.sleep(10000);
		frmCashPaymentKA = new FormCashPaymentKA();
		String lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCashPaymentKA_lblTotalValueKA")).getText();
		String lblValue2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCashPaymentKA_tbxAmountKA")).getText();
		Assert.assertEquals(lblValue1,lblValue2);
		
	}
	

}
