package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.common.Alerts;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormCompleteOrderKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormSummaryKA;
import test.java.orderexecution.forms.FormInvoicePdfKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormSummaryKA extends OrderExecutionBaseTest {

 FormCompleteOrderKA frmCompleteOrderKA;
 FormSummaryKA frmSummaryKA;
 FormInvoicePdfKA frmInvoicePdfKA;

 @BeforeMethod(alwaysRun=true)
 public void setupBeforeTest(Object[] inputParamsOfTestMethod, Method method) throws Exception {
  super.beforeMethod(inputParamsOfTestMethod, method);
  AppElement ele = null;
  try {
   ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblSummaryKA"));

  } catch (Exception e) {
   if (ele == null) {
	   if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
			FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
			FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
			FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//			frmLoginKA =  new FormLogInKA();//							
			FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
			AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
			Assert.assertEquals(lblexpect.getText(),"My Orders");					
	}
    try {
     if ((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")) {
      FormOrderListKA formOrderListKA = new FormOrderListKA();
      formOrderListKA.clickWorkorder(OrderState.state);
      FormOrderExecution orderexecution = new FormOrderExecution();
      orderexecution.clickOnRoute();
      orderexecution.clickStart();
     }
    } catch (Exception ex) {
     System.out.println("*****Its not relaunch*****");
    }
    FormOrderExecution orderexecution = new FormOrderExecution();
    orderexecution.clickOnRoute();
    orderexecution.clickStart();
    orderexecution.clickComplete();
    frmCompleteOrderKA = new FormCompleteOrderKA();
    frmSummaryKA=frmCompleteOrderKA.OnClickPayment();
   }
  }
 }

 @Test
 //To check for order_id in FormOrderCompletePaymentKA
 public void test_paymentOrderId() throws Exception {
	  FormSummaryKA frmSummaryKA = new FormSummaryKA();
	  String paymentorderID = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblOrderNumberKA")).getText();
	  frmSummaryKA.navigatetoCompleteOrderFromOrderPayment();
	  String orderID = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCodeKA")).getText();
	  frmCompleteOrderKA = new FormCompleteOrderKA();
	  frmCompleteOrderKA.OnClickPayment();  
	  Assert.assertEquals(orderID, paymentorderID);
 }
 
 @Test
 public void test_generateInvoiceOffline() throws Exception {
	 FormSummaryKA frmSummaryKA = new FormSummaryKA();
	 frmSummaryKA.enable_disable_Wifi("Off");
	 Thread.sleep(200);
	 frmSummaryKA.clickOnGenerateInvoice();
	 Assert.assertTrue(Alerts.validateAlertMsg("Please connect to the internet to generate invoice."));
	 Alerts.btnClickLable("OK");
	 frmSummaryKA.enable_disable_Wifi("On");
 }

 @Test
 public void test_generateInvoice() throws Exception {
	 FormSummaryKA frmSummaryKA = new FormSummaryKA();
	 frmSummaryKA.clickOnGenerateInvoice();
	 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_lblHeaderKA"),100)) {
		 AppElement lblValue = new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_lblHeaderKA"));
		 if(frmInvoicePdfKA instanceof FormInvoicePdfKA) {
			 Assert.assertEquals(lblValue.getText(),"Invoice Pdf");
		 }
	 }
	 else {
		 Assert.assertTrue(Alerts.validateAlertMsg("Invoice Generation Failed. Please try again."));
		 Alerts.btnClickLable("OK");
		 test_generateInvoice();
	 }
 }
  @Test
 //To check the total number of items in segment are equal to the total billable items  
 public void test_totalBillableItems() throws Exception {
	 FormSummaryKA frmSummaryKA = new FormSummaryKA();
	 String headerItems = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblItemNumbersKA")).getText();
	 String totalItems = frmSummaryKA.getTotal(headerItems,"Items - ");
	 String total = Integer.toString(frmSummaryKA.gettotalItems());
	 Assert.assertEquals(totalItems, total);
}
 @Test
 public void test_PaymentTotal() throws Exception {
	 //To check the subtotal in payment summary form
	 FormSummaryKA frmSummaryKA = new FormSummaryKA();
	 String headertotal = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblSubtotalKA")).getText();
	 String totalItems = frmSummaryKA.getTotal(headertotal,"Subtotal - ");
	 AppElement.scrollUntilVisible("Estimated Total");
	 String estimatedtTotal = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblEstimatedTotalValKA")).getText();
	 String estimatedValueKA = frmSummaryKA.getTotal(estimatedtTotal,"$");
	 Assert.assertEquals(totalItems, estimatedValueKA);	
 }
 
    @Test
    public void test_discountPercent() throws Exception {
	 //To check the discount percent in frmSummaryKA
	 FormSummaryKA frmSummaryKA = new FormSummaryKA();
	 AppElement.scrollUntilVisible("Estimated Total");
	 Thread.sleep(1000);
	 frmSummaryKA.setValue("25");
	 frmSummaryKA.selectPercent();
	 String SubTotalVal = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblSubTotalValKA")).getText();
	 Float subTotal = Float.valueOf(frmSummaryKA.getTotal(SubTotalVal,"$"));
	 Float originalDiscount = (25 * subTotal)/100;
	 String DiscountVal = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblDiscountValKA")).getText();
	 Float discount = Float.valueOf(frmSummaryKA.getTotal(DiscountVal,"$"));
	 Assert.assertTrue(originalDiscount.equals(discount));
	  }
	  
	@Test
	 public void test_discountAmount() throws Exception {
	 //To check the discount amount in frmSummaryKA
	 FormSummaryKA frmSummaryKA = new FormSummaryKA();
	 AppElement.scrollUntilVisible("Estimated Total");
	 Thread.sleep(1000);
	 frmSummaryKA.selectAmount();
	 Float originalDiscount = (float) 25;
	 String DiscountVal = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblDiscountValKA")).getText();
	 Float discount = Float.valueOf(frmSummaryKA.getTotal(DiscountVal,"$"));
	 System.out.println("From Form:"+discount+" Calculated: "+originalDiscount);
	 Assert.assertTrue(originalDiscount.equals(discount));
	  }

 @AfterClass(alwaysRun=true)
 public void setupAfterClass() throws Exception {
  try {
//   frmSummaryKA.navigatetoCompleteOrderFromOrderPayment();
//   frmSummaryKA.navigatetoOrderExecutionFromCompleteOrder();
  }catch (Exception e) {
		relaunchApp();
		if(doLogin()){
			System.out.println("Login is successful***");
		}
  }
 }

}