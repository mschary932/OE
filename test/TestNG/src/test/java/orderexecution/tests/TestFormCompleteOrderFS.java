package test.java.orderexecution.tests;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;





import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.Alerts;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.*;

public class TestFormCompleteOrderFS extends OrderExecutionBaseTest{
	FormCompleteOrderKA frmCompleteOrderKA;
	FormCompleteOrderSummaryKA frmCompleteOrderSummaryKA;
	FormWorkConfirmationKA frmWorkConfirmationKA;
	FormCustomerSignOffKA frmCustomerSignOffKA;
	FormOrderAttachments frmOrderAttachments;
	FormSummaryKA frmSummaryKA;
	FormInvoicePdfKA frmInvoice;
	FormSelectPaymentMethodKA frmSelectPayment;
	FormCashPaymentKA frmCashPaymentKA;
	FormSurveyKA frmSurveyKA;
	
	@BeforeMethod(alwaysRun=true)	
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception{
		SoftAssert sa = new SoftAssert();
		AppElement ele = null;
		try {
			 ele=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
		} catch(Exception e) {
			 if(ele==null) {
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
			  } catch(Exception ex) {
				  System.out.println("*****Its not relaunch*****");
			  }
				 FormOrderExecution frmOrderExecution = new FormOrderExecution();
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
					AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));		
					sa.assertEquals(label.getText(), "Order Execution");
				 }
				 frmOrderExecution.clickComplete();
				 AppElement label1 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));		
				 sa.assertEquals(label1.getText(), "Complete Order");
				 sa.assertAll();
			 }
		}
	}	
	@Test
	public void test_completeOrderSummary() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmCompleteOrderSummaryKA = frmCompleteOrderKA.onClickSummary();
		AppElement label1 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_lblHeaderKA"));		
		 sa.assertEquals(label1.getText(), "Complete Order Summary");
		frmCompleteOrderSummaryKA.navigatetoCompleteOrderFromSummary();
		AppElement label2 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));		
		sa.assertEquals(label2.getText(), "Complete Order");
		sa.assertAll();
  }
	@Test
	//To navigate to FormOrderCompleteCheckListKA
	public void test_WorkConfirmation() throws Exception {		
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmWorkConfirmationKA=frmCompleteOrderKA.OnClickWorkConfirmation();
		AppElement label2 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_lblCompleteOrderCLKA"));		
		sa.assertEquals(label2.getText(), "Work Confirmation");		
		frmWorkConfirmationKA.ValidateSwitchesWorkConfirm();		
		frmWorkConfirmationKA.navigatetoCompleteOrderFromWorkConfirm();
		AppElement label3 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));		
		sa.assertEquals(label3.getText(), "Complete Order");
		sa.assertAll();
	}
	@Test
	//To navigate to FormCompleteOrderAcceptanceKA
	public void test_CustomerSignOff() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmCustomerSignOffKA=frmCompleteOrderKA.OnClickCustomerSignOff();
		AppElement label3 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_lblCustomerSignOffKA"));		
		sa.assertEquals(label3.getText(), "Customer Sign Off");		
		frmCustomerSignOffKA.ValidateswitchProblemSolved1KA();
		frmCustomerSignOffKA.type();
		frmCustomerSignOffKA.navigatetoCompleteOrderFromCustomerSign();
		AppElement label4 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));		
		sa.assertEquals(label4.getText(), "Complete Order");
		sa.assertAll();
	}
	
	@Test
	public void test_PaymentDone() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmSummaryKA= frmCompleteOrderKA.OnClickPayment();
		AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblSummaryKA"));		
		sa.assertEquals(label.getText(), "Summary");		
		frmInvoice = frmSummaryKA.clickGenerateInvoice();
		AppElement label1 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_lblHeaderKA"));		
		sa.assertEquals(label1.getText(), "Invoice Pdf");		
		frmSelectPayment = frmInvoice.clickMakePayment();
		AppElement label2 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_lblPaymentSummaryKA"));		
		sa.assertEquals(label2.getText(), "Select Payment Method");		
		frmCashPaymentKA = frmSelectPayment.clickCash();	
		AppElement label3 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCashPaymentKA_lblPaymentSummaryKA"));		
		sa.assertEquals(label3.getText(), "Cash Payment");		
		frmCashPaymentKA.OnSave();
		AppElement label4 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));		
		sa.assertEquals(label4.getText(), "Complete Order");
		sa.assertAll();	
	}
	
	@Test
	public void test_SurveyFullyFilled() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
//		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmSurveyKA = frmCompleteOrderKA.onClickChecklist();
		sa.assertTrue(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection"),300));
		HashMap<String,String> QA = new HashMap<>();
		QA.put("Job area kept clear of material and debris?", "Yes");
		QA.put("Trash, boxes, scraps and other materials picked up and disposed of?", "No");
		QA.put("Describe any unexpected event", "Everything is fine");
		FormSurveyKA frmSurveyKA = new FormSurveyKA();	
		frmSurveyKA.fillSurvey(QA);
		frmSurveyKA.clickDoneForSaveSurvey();		
		AppElement label4 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));		
		sa.assertEquals(label4.getText(), "Complete Order");
		sa.assertAll();			
	}
	
	@Test
	public void test_SurveyHalfFilled() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"),10);		
		frmSurveyKA = frmCompleteOrderKA.onClickChecklist();
		sa.assertTrue(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection"),300));
		FormSurveyKA frmSurveyKA = new FormSurveyKA();	
		List<SurveySection> sections = frmSurveyKA.getSections();
		List<SurveyQuestion> questions = sections.get(0).getQuestions();
		for(int i=0;i<questions.size();i++){
			if(questions.get(i).getQuestionDesc().equalsIgnoreCase("Job area kept clear of material and debris?")||
				questions.get(i).getQuestionDesc().equalsIgnoreCase("Trash,boxes,scraps and other materials picked up and disposed of?")){
				questions.get(i).ansQuestion();
			}
		}
		frmSurveyKA.clickDone();
		Alerts.validateAlertMsg("Please fill all the mandatory fields");
		Alerts.btnClickLable("OK");
		frmSurveyKA.clickCloseButton();
		sa.assertTrue(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")));
		sa.assertAll();
	}
	
	@Test
	public void test_SurveyWriteableTest() throws Exception{
		SoftAssert sa = new SoftAssert();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"),10);
		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmSurveyKA = frmCompleteOrderKA.onClickChecklist();
		sa.assertTrue(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection"),300));
		HashMap<String,String> QA = new HashMap<>();
		QA.put("Job area kept clear of material and debris?", "Yes");
		QA.put("Trash, boxes, scraps and other materials picked up and disposed of?", "Yes");
		FormSurveyKA frmSurveyKA = new FormSurveyKA();	
		frmSurveyKA.fillSurvey(QA);
		frmSurveyKA.clickDoneForSaveSurvey();
		
		AppElement label4 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));		
		sa.assertEquals(label4.getText(), "Complete Order");
		sa.assertAll();	
		
	}
	
	@Test
	 public void test_OrderDone() throws Exception{
		SoftAssert sa = new SoftAssert();
		try	{
			frmCompleteOrderKA.OrderDone();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));		
			AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		    sa.assertEquals(lblValue1.getText(),"My Orders");
		}
		catch(Exception e){
		frmCompleteOrderKA =new FormCompleteOrderKA();
		frmWorkConfirmationKA=frmCompleteOrderKA.OnClickWorkConfirmation();
		frmWorkConfirmationKA.ValidateSwitchesWorkConfirm();
		frmWorkConfirmationKA.navigatetoCompleteOrderFromWorkConfirm();
		frmCustomerSignOffKA=frmCompleteOrderKA.OnClickCustomerSignOff();
		frmCustomerSignOffKA.ValidateswitchProblemSolved1KA();
		frmCustomerSignOffKA.type();
		frmCustomerSignOffKA.navigatetoCompleteOrderFromCustomerSign();
		frmSummaryKA= frmCompleteOrderKA.OnClickPayment();
		frmInvoice = frmSummaryKA.clickGenerateInvoice();
		frmSelectPayment = frmInvoice.clickMakePayment();
		frmCashPaymentKA = frmSelectPayment.clickCash();
		frmCashPaymentKA.OnSave();
		frmCompleteOrderKA.OrderDone();
		 }
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));		
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	    sa.assertEquals(lblValue1.getText(),"My Orders");
	    sa.assertAll();	
	}
	
	@Test
	public void test_navigateToAttachments() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA.onClickOrderAttachment();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
	    sa.assertEquals(lblValue1.getText(),"Order Attachments");
		FormOrderAttachments frmorderattachments=new FormOrderAttachments();
		frmorderattachments.navigateBack();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		sa.assertEquals(lblValue,"Complete Order");
		sa.assertAll();
	}
	
	@Test
	public void test_navigateToOrderHistory() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA.onClickOrderHistory();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderHistoryKA_lblHeaderKA"));
	    sa.assertEquals(lblValue1.getText(),"Order History");
		FormOrderHistoryKA frmorderhistory=new FormOrderHistoryKA();
		frmorderhistory.navigateToCompleteOrder();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		sa.assertEquals(lblValue,"Complete Order");
		sa.assertAll();		
	}
	
	@Test
	public void test_navigateToOrderResources() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA.clickOrderResources();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
	    sa.assertEquals(lblValue1.getText(),"Order Resources");
		FormOrderResourceListKA frmorderresources=new FormOrderResourceListKA();
		frmorderresources.clickOnBack();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		sa.assertEquals(lblValue,"Complete Order");
		sa.assertAll();
	}
	
	@Test
	public void test_navigateToOrderImages()throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		AppElement flxScrollTypesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_flxScrollTypesKA"));	
    	flxScrollTypesKA.swipeLeft(90);
    	Thread.sleep(3000);    	
		frmCompleteOrderKA.clickOrderImages();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_lblHeaderKA"));
	    sa.assertEquals(lblValue1.getText(),"Order Images");
		FormOrderImagesKA frmorderimages=new FormOrderImagesKA();
		frmorderimages.navigateBack();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		sa.assertEquals(lblValue,"Complete Order");
		sa.assertAll();
	}
	
	@Test
	//To navigate to FormOrderCompletePaymentKA	
	public void test_orderPaymentSummary() throws Exception {
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmSummaryKA=frmCompleteOrderKA.OnClickPayment();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblSummaryKA")).getText();
		sa.assertEquals(lblValue,"Summary");		
		frmSummaryKA.navigatetoCompleteOrderFromOrderPayment();
		String lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		sa.assertEquals(lblValue1,"Complete Order");
		sa.assertAll();
	}
	
	@Test
	public void navigateToTimeAndExpense()throws Exception{
		SoftAssert sa = new SoftAssert();		
	    frmCompleteOrderKA = new FormCompleteOrderKA();
	    AppElement flxScrollTypesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_flxScrollTypesKA"));	
    	flxScrollTypesKA.swipeLeft(90);
    	Thread.sleep(3000);
		frmCompleteOrderKA.clickTimeAndExpense();
		String lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA")).getText();
		sa.assertEquals(lblValue1,"Time & Expense");		
		FormTimeAndExpenses frmtimeandexpenses=new FormTimeAndExpenses();
		frmtimeandexpenses.navigateBack();
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		sa.assertEquals(lblValue,"Complete Order");
		sa.assertAll();	
	}
	
	@Test
	//To Refill the Work Confirmation again
	public void test_refillWorkConfirmation() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmWorkConfirmationKA=frmCompleteOrderKA.OnClickWorkConfirmation();
		frmWorkConfirmationKA.ChangeSwitchBackTOYes();
		frmWorkConfirmationKA.ClickBack();
		Thread.sleep(3000);
		try {
			Alerts.validateAlertMsg("Do you want to save the information entered so far?");
		  	}catch (Exception e) {
		  		System.out.println("***Alert not displayed*****");
		  	}
		Alerts.acceptAlert();
		Thread.sleep(5000);
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		sa.assertEquals(lblValue,"Complete Order");
		sa.assertAll();
	}
	
	@Test
	public void test_refillCustomerSignOff() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmCompleteOrderKA = new FormCompleteOrderKA();
		frmCustomerSignOffKA=frmCompleteOrderKA.OnClickCustomerSignOff();
		frmCustomerSignOffKA.ValidateswitchProblemSolved1KA();
		frmCustomerSignOffKA.clickBack();
		Thread.sleep(3000);
		try {
			Alerts.validateAlertMsg("Do you want to save the information entered so far?");
		  	}catch (Exception e) {
		  		System.out.println("***Alert not displayed*****");
		  	}		
		Alerts.acceptAlert();	
		Thread.sleep(5000);
		String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		sa.assertEquals(lblValue,"Complete Order");	
		sa.assertAll();
	}
	
	@AfterClass(alwaysRun=true)
	public void setUpAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
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
