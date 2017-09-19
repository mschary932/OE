package test.java.orderexecution.tests;

import java.lang.reflect.Method;





import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderImagesKA;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormOrderResourceDetails;
import test.java.orderexecution.forms.FormOrderResourceListKA;
import test.java.orderexecution.forms.FormResourceAttachment;
import test.java.orderexecution.forms.FormResourceExecution;
import test.java.orderexecution.forms.FormTaskExecutionKA;
import test.java.orderexecution.forms.FormTaskResourcesListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormResourceExecutionKA extends OrderExecutionBaseTest{

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
				FormOrderListKA orderListForm = new FormOrderListKA();		
				FormOrderExecution frmOrderExecution = orderListForm.clickWorkorder(OrderState.state);
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }
			}
		}
	}
	
	@Test
	public void test_navigate_to_resources_execution_from_orderResources() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();	
		FormOrderResourceListKA frmOrderResourceList = frmOrderExecution.navigateToOrderResource();
		FormResourceExecution frmResourceExecution = frmOrderResourceList.navigateToResourceExecution();
		frmOrderResourceList = frmResourceExecution.navigateToResourceList();
		frmOrderExecution = frmOrderResourceList.clickBack();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
		sa.assertAll();
	}
	
	@Test
	public void test_navigate_to_resources_execution_from_tasks() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormTaskExecutionKA frmTaskExecutionKA = frmOrderExecution.navigateOnlyToTaskExecution();
		FormResourceExecution frmResourceExecution = frmTaskExecutionKA.navigatetoResourceExecution();
		frmResourceExecution.clickBack();
		frmOrderExecution = frmTaskExecutionKA.clickBack();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
		sa.assertAll();
	}
	
	@Test
	public void test_navigate_to_resources_execution_from_taskResources() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormTaskExecutionKA frmTaskExecutionKA = frmOrderExecution.navigateOnlyToTaskExecution();
		FormTaskResourcesListKA frmTaskResourcesListKA = frmTaskExecutionKA.clickResourcesList();
		FormResourceExecution frmResourceExecution = frmTaskResourcesListKA.navigatetoResourceExecution();
		frmResourceExecution.clickBack();
		frmTaskExecutionKA = frmTaskResourcesListKA.clickBack();
		frmOrderExecution = frmTaskExecutionKA.clickBack();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
		sa.assertAll();
	}
	
	@Test
	public void test_navigate_to_resources_details() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();	
		FormOrderResourceListKA frmOrderResourceList = frmOrderExecution.navigateToOrderResource();
		FormResourceExecution frmResourceExecution = frmOrderResourceList.navigateToResourceExecution();
		FormOrderResourceDetails frmOrderResourceDetails = frmResourceExecution.navigateToResourceDetails();
		frmResourceExecution = frmOrderResourceDetails.clickBack();
		frmOrderResourceList = frmResourceExecution.navigateToResourceList();
		frmOrderExecution = frmOrderResourceList.clickBack();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
		sa.assertAll();
	}
	
	@Test
	public void edit_resource_quantity_from_resourceExecution() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution orderExecutionForm = new FormOrderExecution();
		FormTaskExecutionKA taskExecutionForm =  orderExecutionForm.navigateToTaskExecution();
//		taskExecutionForm.clickStart();
		try{
			   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA"))).getText().equalsIgnoreCase("Start")){
				   taskExecutionForm.clickStart();
				   Thread.sleep(5000);
			   }
			   else {
				   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA"))).getText().equalsIgnoreCase("Resume")){
					   taskExecutionForm.clickStart();
					   Thread.sleep(5000);
				   }
			   }
		   }catch(Exception e){
				   System.out.println("****Task Is Already Started****");
		   		}
		FormResourceExecution frmResourceExecution = taskExecutionForm.navigatetoResourceExecution();
		frmResourceExecution.clickEdit();
		frmResourceExecution.typeQuantity();
		frmResourceExecution.clickSave();
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
		orderExecutionForm = taskExecutionForm.clickBack();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
		sa.assertAll();		
	}
	//Tests for navigation to Resource images from Order Execution
		@Test
		public void testNavigateToResourceImagesFromOE() throws Exception {
			SoftAssert sa = new SoftAssert();
			FormOrderExecution frmOrderExecution = new FormOrderExecution();
			FormOrderResourceListKA frmOrderResourceList = frmOrderExecution.navigateToOrderResource();
			FormResourceExecution frmResourceExecution = frmOrderResourceList.navigateToResourceExecution();
			FormOrderImagesKA frmResourceImages = frmResourceExecution.navigateToResourceImages();			
			frmResourceExecution = frmResourceImages.navigateToResourceExecution();
			frmOrderResourceList = frmResourceExecution.navigateToResourceList();
			frmOrderExecution = frmOrderResourceList.clickBack();
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue.getText(),"Order Execution");
			sa.assertAll();
		} 
		
		//Test for navigation to Resource images from Task Execution 
		@Test
		public void testNavigateToResourceImagesFromTE() throws Exception {
			SoftAssert sa = new SoftAssert();
			FormOrderExecution frmOrderExecution = new FormOrderExecution();
			FormTaskExecutionKA frmTaskExecutionKA = frmOrderExecution.navigateOnlyToTaskExecution();
			FormTaskResourcesListKA frmTaskResourcesListKA = frmTaskExecutionKA.clickResourcesList();
			FormResourceExecution frmResourceExecution = frmTaskResourcesListKA.navigatetoResourceExecution();
			FormOrderImagesKA frmResourceImages = frmResourceExecution.navigateToResourceImages();
			frmResourceExecution = frmResourceImages.navigateToResourceExecution();
			frmTaskResourcesListKA = frmResourceExecution.navigateToTaskResourceList();
			frmTaskExecutionKA = frmTaskResourcesListKA.clickBack();
			frmTaskExecutionKA.clickBack();
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue.getText(),"Order Execution");
			sa.assertAll();
		} 
		
		@Test
		public void navigateToResourceAttachmentFromOrderExecution() throws Exception{
			SoftAssert sa = new SoftAssert();
			FormOrderExecution frmOrderExecution = new FormOrderExecution();	
			FormOrderResourceListKA frmOrderResourceList = frmOrderExecution.navigateToOrderResource();
			FormResourceExecution frmResourceExecution = frmOrderResourceList.navigateToResourceExecution();	
			FormResourceAttachment frmResourceAttachment =  frmResourceExecution.navigateToResourceAttachmentForm();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
			sa.assertEquals(lblValue.getText(),"Resource Attachments");
			
			//To check navigation back to orderexecution
			frmResourceAttachment.clicknevigatebackResourceExecution();
		    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue1.getText(),"Resource Execution");	
			frmResourceExecution.clickBack();
			AppElement lblValue2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
			sa.assertEquals(lblValue2.getText(),"Order Resources");			
			frmOrderResourceList.clickBack();
			AppElement lblValue3=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue3.getText(),"Order Execution");
			sa.assertAll();
		}
		
		@Test
		public void resourceAttachmentFromTaskExecutionForm() throws Exception{
			SoftAssert sa = new SoftAssert();
			FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
			FormTaskExecutionKA frmTaskExecutionKA = frmorderExecutionForm.navigateOnlyToTaskExecution();
			FormTaskResourcesListKA frmTaskResourcesListKA = frmTaskExecutionKA.clickResourcesList();
			FormResourceExecution frmResourceExecution = frmTaskResourcesListKA.navigatetoResourceExecution();
			FormResourceAttachment frmResourceAttachment =  frmResourceExecution.navigateToResourceAttachmentForm();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
			AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
			sa.assertEquals(lblValue.getText(),"Resource Attachments");
			
			//To check navigation back to orderexecution
			frmResourceExecution = frmResourceAttachment.clicknevigatebackResourceExecution();
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
		    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue1.getText(),"Resource Execution");
			frmResourceExecution.clickBack();
			frmTaskResourcesListKA.clickBack();
			frmTaskExecutionKA.clickBack();
			AppElement lblValue3=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			sa.assertEquals(lblValue3.getText(),"Order Execution");
			sa.assertAll();
		}
		
		@AfterClass(alwaysRun=true)
		public void  setupAfterClass() throws Exception{
			SoftAssert sa = new SoftAssert();
			try{			
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
