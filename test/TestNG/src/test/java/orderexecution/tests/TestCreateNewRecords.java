package test.java.orderexecution.tests;

import java.lang.reflect.Method;




import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormCreateKA;
import test.java.orderexecution.forms.FormCreateTaskDescriptionKA;
import test.java.orderexecution.forms.FormCreateMeasurementDescriptionKA;
import test.java.orderexecution.forms.FormCreateMeasurementKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormMeasurementExecutionKA;
import test.java.orderexecution.forms.FormMeasurementReadings;
import test.java.orderexecution.forms.FormMeasurementsKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormReadingExecution;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.OrderExecutionBaseTest;

public class TestCreateNewRecords extends OrderExecutionBaseTest {
	
	@BeforeMethod
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
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				System.out.println("TestMyOrdersList.setupBeforeTest(): Not on the Order Execution Form");
				FormOrderListKA orderListForm = new FormOrderListKA();		
				FormOrderExecution frmOrderExecution = orderListForm.clickWorkorder(OrderState.state);
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }
			}
				else
				System.out.println("TestMyOrdersList.setupBeforeTest(): Something went worng form");
			}
	}
	
	@Test
	public void add_new_Measurement_Task() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormCreateKA frmCreateKA = frmOrderExecution.clickAddMeasurementButton();
		AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateKA_lblTitleKA"));
		sa.assertEquals(lblHeader.getText(),"Create");		
		FormCreateMeasurementDescriptionKA frmCreateMeasurementDescriptionKA = frmCreateKA.clickMeasurement();
		AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementKA_lblCreateMeasurementKA"));
		sa.assertEquals(lblHeader1.getText(),"Create Measurement");		
		frmCreateMeasurementDescriptionKA.enterDescription();
		FormCreateMeasurementKA frmCreateMeasurementKA = frmCreateMeasurementDescriptionKA.clickDone();
		AppElement lblHeader2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementKA_lblCreateMeasurementKA"));
		sa.assertEquals(lblHeader2.getText(),"Create Measurement");
		frmCreateMeasurementKA.clickAsset();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement lblHeader3=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblHeader3.getText(),"Order Execution");
		sa.assertAll();
		}
		
	@Test
	public void add_new_Task() throws Exception {
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormCreateKA frmCreateKA = frmOrderExecution.clickAddTaskButton();
		AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateKA_lblTitleKA"));
		sa.assertEquals(lblHeader.getText(),"Create");		
		FormCreateTaskDescriptionKA frmCreateTaskDescriptionKA = frmCreateKA.clickTask();
		frmCreateTaskDescriptionKA.enterTaskDescription();
		frmCreateTaskDescriptionKA.clickDone();
		AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblHeader1.getText(),"Order Execution");
		AppElement.scrollUntilVisible("New Task description.");
		Segment segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_segDetailsKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderExecutionKA_lbltaskDesc"));
		int result = segDetailsKA.getSegRowIndexWithLabel("New Task description.");
		sa.assertTrue(result >= 0);
		sa.assertAll();
	}
	
	@Test 
	public  void addTaskCRM() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution formOrderExecution=new FormOrderExecution();
	    formOrderExecution.addTaskAtCRM();
	    FormCreateTaskDescriptionKA createTaskDescriptionKA=new FormCreateTaskDescriptionKA();
	    createTaskDescriptionKA.enterTaskDescription();
	    createTaskDescriptionKA.clickDone();
	    AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblHeader1.getText(),"Order Execution");
	    AppElement.scrollUntilVisible("New Task description.");
		Segment segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_segDetailsKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderExecutionKA_lbltaskDesc"));
		int result = segDetailsKA.getSegRowIndexWithLabel("New Task description.");
		sa.assertTrue(result >= 0);
		sa.assertAll();
	}
	@Test
	public void add_new_Measurement_Reading() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormMeasurementExecutionKA frmMeasurementExecutionKA = frmOrderExecution.navigateToMeasurementExecution();
		frmMeasurementExecutionKA.clickStart();
		AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader1.getText(),"Measurement Execution");		
		FormMeasurementsKA frmMeasurementsKA = frmMeasurementExecutionKA.navigateToMeasurements();
		AppElement lblHeader2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader2.getText(),"Measurements");		
		FormMeasurementReadings frmMeasurementReadings = frmMeasurementsKA.navigateToMeasurementReading();
		AppElement lblHeader3=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
		sa.assertEquals(lblHeader3.getText(),"Measurement Reading");		
		FormReadingExecution frmReadingExecution = frmMeasurementReadings.addNewReading();
		AppElement lblHeader4=new AppElement(OrderExecutionWidgetId.getWidgetId("frmReadingExecution_lbHeaderKA"));
		sa.assertEquals(lblHeader4.getText(),"Reading Execution");		
		frmReadingExecution.typeValue();
		frmReadingExecution.typeNotes();
		frmMeasurementReadings = frmReadingExecution.clickDone();
		AppElement lblHeader5=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
		sa.assertEquals(lblHeader5.getText(),"Measurement Reading");		
		frmMeasurementReadings.navigateBackToMeasurements();
		AppElement lblHeader6=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader6.getText(),"Measurements");		
		frmMeasurementsKA.navigateBackToMeasurementExecution();
		AppElement lblHeader7=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader7.getText(),"Measurement Execution");		
		frmMeasurementExecutionKA.navigateBackToOrderExecution();
		AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));		
		sa.assertEquals(label.getText(), "Order Execution");
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
