package test.java.orderexecution.tests;

import java.lang.reflect.Method;





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
import test.java.orderexecution.forms.FormDirectionsKA;
import test.java.orderexecution.forms.FormDirectionsStepsKA;
import test.java.orderexecution.forms.FormExtendedAttributes;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderAssetKA;
import test.java.orderexecution.forms.FormOrderAttachments;
import test.java.orderexecution.forms.FormOrderDetails;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderHistoryKA;
import test.java.orderexecution.forms.FormOrderImagesKA;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormOrderResourceListKA;
import test.java.orderexecution.forms.FormTaskExecutionKA;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.forms.FormTimeAndExpenses;
import test.java.orderexecution.forms.SurveyClass;
import test.java.orderexecution.forms.FormOrderImagePreviewKA;

public class TestFormOrderExecution extends OrderExecutionBaseTest{

	public TestFormOrderExecution(){		
	}
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
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
				System.out.println("TestMyOrdersList.setupBeforeTest(): Not on the Order Execution Form");
				FormOrderListKA orderListForm = new FormOrderListKA();		
				orderListForm.clickWorkorder(OrderState.state);				
			}
				else
				System.out.println("TestMyOrdersList.setupBeforeTest(): Something went worng form");
			}

	}
	
	//To check navigation to orderDetails
	@Test
	public void navigateToOrderDetails() throws Exception{
		SoftAssert sa = new SoftAssert();		
		FormOrderExecution frmOrderExecution = new FormOrderExecution();	
		FormOrderDetails orderDetailsForm =  frmOrderExecution.navigateToOrderDetails();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Details");
		
		orderDetailsForm=new FormOrderDetails();
		frmOrderExecution=orderDetailsForm.clicknevigatebackOrderExecution();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Execution");	
		sa.assertAll();
	}
	
	//To check navigation to orderAttachment
	@Test
	public void navigatetoorderAttachment() throws Exception{
		SoftAssert sa = new SoftAssert();		
		FormOrderExecution frmOrderExecution = new FormOrderExecution();	
		FormOrderAttachments frmOrderAttachments =  frmOrderExecution.navigateToOrderAttachment();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
		sa.assertEquals(lblValue.getText(),"Order Attachments");
		
		//To check navigation back to orderexecution
		frmOrderAttachments=new FormOrderAttachments();
		boolean flag = frmOrderAttachments.clickAttachment();
	    if(flag == true){
	    Thread.sleep(10000);
	    AppElement.setAppToForeground();
	    }
		frmOrderExecution=frmOrderAttachments.clicknevigatebackOrderExecution();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
	    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Execution");	
		sa.assertAll();
	}
	//To check navigation to order history
	@Test
	public void navigateToOrderHistory() throws Exception{
		SoftAssert sa = new SoftAssert();		
		FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
		FormOrderHistoryKA frmorderHistoryForm = frmorderExecutionForm.navigateToOrderHistory();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderHistoryKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order History");
		
		//To navigate back to order execution
		frmorderHistoryForm=new FormOrderHistoryKA();
		frmorderExecutionForm=frmorderHistoryForm.clicknevigatebackOrderExecutionfromHistory();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
	    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Execution");	
		sa.assertAll();
	}
	
	//To navigate to order resource
	@Test
	public void navigateToOrderResource() throws Exception{
		SoftAssert sa = new SoftAssert();		
		FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
		FormOrderResourceListKA frmOrderResourceListKA = frmorderExecutionForm.navigateToOrderResource();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Resources");
		
		//To navigate back to order execution
		frmOrderResourceListKA=new FormOrderResourceListKA();
		frmorderExecutionForm=frmOrderResourceListKA.clickBack();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
	    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Execution");
		sa.assertAll();
	}
	
//To navigate to order images
	@Test
	public void navigateToOrderImages() throws Exception{
		SoftAssert sa = new SoftAssert();		
		FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
		FormOrderImagesKA frmOrderImagesKA = frmorderExecutionForm.navigateToOrderImages();	
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Images");
		sa.assertAll();
		try {
			AppElement imageView = AppElement.getElementlistByClassName(SurveyClass.Image()).get(0);
			System.out.println("\n**** Image is present ****\n");
			imageView.click();
			Thread.sleep(180000); 
			try {
//				String text = AppElement.getElementlistByClassName(SurveyClass.Textview()).get(1).getText();   
				System.out.println("\n**** Image downloading has failed ****\n");
				frmOrderImagesKA = new FormOrderImagesKA();
				frmorderExecutionForm = frmOrderImagesKA.navigateToOrderExecutionfromOrderImages();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
				AppElement lblValue1 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
				sa.assertEquals(lblValue1.getText(),"Order Execution");	
				sa.assertAll();
			}
			catch (Exception e) {
				System.out.println("\n**** Image has been downloaded ****\n");	
				imageView = AppElement.getElementlistByClassName(SurveyClass.Image()).get(0);
				imageView.click();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_lblHeaderKA"));
				Thread.sleep(120000);
				
				//Back navigation from Preview page
				FormOrderImagePreviewKA formOrderImagePreviewKA = new FormOrderImagePreviewKA();
				formOrderImagePreviewKA.navigateBack();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_lblHeaderKA"));
				
				//Back Navigation from Images page 
				frmOrderImagesKA=new FormOrderImagesKA();
				frmorderExecutionForm=frmOrderImagesKA.navigateToOrderExecutionfromOrderImages();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
				AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
				sa.assertEquals(lblValue1.getText(),"Order Execution");
				sa.assertAll();
			}
		} 
		catch (Exception e) {
			System.out.println("\n**** Image is not present ****\n");
			frmOrderImagesKA=new FormOrderImagesKA();
			frmorderExecutionForm=frmOrderImagesKA.navigateToOrderExecutionfromOrderImages();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue1.getText(),"Order Execution");
			sa.assertAll();		
		}
		//To navigate back to order execution
	}

	//To navigate to order extended attribute
		@Test
		public void navigateToOrderExtendedAttributes() throws Exception{
			SoftAssert sa = new SoftAssert();			
			FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
			FormExtendedAttributes frmExtendedAttributes = frmorderExecutionForm.navigateToOrderExtendedAttributes();	
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExtendedAttributesKA_lblHeaderKA"));
			sa.assertEquals(lblValue.getText(),"Extended Attributes");
			
			//To navigate back to order execution
			frmExtendedAttributes=new FormExtendedAttributes();
			frmorderExecutionForm=frmExtendedAttributes.navigateToOrderExecutionfromExtendedAttribute();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue1.getText(),"Order Execution");	
			sa.assertAll();
		}
	//To navigate to task execution
		@Test
		public void navigateTotaskExecution() throws Exception{
			SoftAssert sa = new SoftAssert();			
			FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
			FormTaskExecutionKA frmTaskExecutionKA = frmorderExecutionForm.navigateOnlyToTaskExecution();	
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
			sa.assertEquals(lblValue.getText(),"Task Execution");
			
			//To navigate back to order execution
			frmTaskExecutionKA=new FormTaskExecutionKA();
			frmorderExecutionForm=frmTaskExecutionKA.clickBack();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue1.getText(),"Order Execution");	
			sa.assertAll();
		}
		//To navigate to time and expense
		@Test
		public void navigateToTimeExpense() throws Exception{
			SoftAssert sa = new SoftAssert();			
			FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
			FormTimeAndExpenses frmTimeAndExpense = frmorderExecutionForm.navigateToTimeExpense();	
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
			sa.assertEquals(lblValue.getText(),"Time & Expense");
			
			//To navigate back to order execution
			frmTimeAndExpense=new FormTimeAndExpenses();
			frmorderExecutionForm=frmTimeAndExpense.navigateToOrderExecutionfromTimeAndExpenses();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue1.getText(),"Order Execution");	
			sa.assertAll();
		}
		
		@Test
		public void navigateToOrderAsset() throws Exception{
			SoftAssert sa = new SoftAssert();			
			FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
			FormOrderAssetKA frmOrderAssetKA = frmorderExecutionForm.navigateToOrderAsset();
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
			sa.assertEquals(lblValue.getText(),"Order Asset");
			
			//To navigate Back to Order Execution
			frmOrderAssetKA=new FormOrderAssetKA();
			frmOrderAssetKA.navigateBackToOrderExecution();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue1.getText(),"Order Execution");
			sa.assertAll();
		}
			
    //To check on route and reject on scheduled
	@Test
	public void verifystatusAsScheduled() throws Exception{
		SoftAssert sa = new SoftAssert();
		AppElement lblStatusKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblStatusKA"));;
    	sa.assertEquals(lblStatusKA.getText(),"SCHEDULED");
		sa.assertAll();
		}

	//To click on route
	@Test
	public void clickOnRoute() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
		frmorderExecutionForm.clickOnRoute();
		AppElement lblStatusKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblStatusKA"));;
    	sa.assertEquals(lblStatusKA.getText(),"ON ROUTE");
    	sa.assertAll();
	}
	
	//To check started button on route click
	@Test
    public void verifystatusAsOnRoute()	throws Exception{
		SoftAssert sa = new SoftAssert();
		AppElement lblStatusKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblStatusKA"));;
    	sa.assertEquals(lblStatusKA.getText(),"ON ROUTE");
    	sa.assertAll();
    }
	
	//To check click start
	@Test
    public void CheckStart() throws Exception{
		SoftAssert sa = new SoftAssert();
    	FormOrderExecution frmorderExecutionForm = new FormOrderExecution();
    	try{
    			frmorderExecutionForm.clickOnRoute();
    			AppElement lblStatusKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblStatusKA"));;
    	    	sa.assertEquals(lblStatusKA.getText(),"ON ROUTE");
    		}catch (Exception e) {
    			frmorderExecutionForm.clickStart();	
    			Thread.sleep(10000);
    			AppElement lblStatusKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblStatusKA"));;
    	    	sa.assertEquals(lblStatusKA.getText(),"STARTED");
    			sa.assertAll();
    		}
    	}
	
	
	@Test
	public void testNavigationToDirections() throws Exception {
		SoftAssert sa = new SoftAssert();		
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormDirectionsKA frmDirectionsKA = frmOrderExecution.navigateToDirections();
		FormDirectionsStepsKA frmDirectionStepsKA = frmDirectionsKA.navigateToDirectionSteps();
		frmDirectionStepsKA.navigateBack();		
		frmDirectionsKA.navigateBack();
		AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		String actual = label.getText();
		sa.assertEquals(actual, "Order Execution");
		sa.assertAll();
	}	
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{		
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
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

