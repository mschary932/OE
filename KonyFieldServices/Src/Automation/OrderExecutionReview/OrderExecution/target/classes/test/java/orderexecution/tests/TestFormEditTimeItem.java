package test.java.orderexecution.tests;

import java.util.List;




import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormAddTimeAndExpenses;
import test.java.orderexecution.forms.FormAddTimeItem;
import test.java.orderexecution.forms.FormEditTimeItem;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.forms.FormTimeAndExpenses;
import test.java.orderexecution.forms.FormTimeDetailsKA;


public class TestFormEditTimeItem extends OrderExecutionBaseTest {
	
	@BeforeMethod(alwaysRun=true)
	 public void setupBeforeTest() throws Exception {
		AppElement ele=null;
		 try{
			 ele=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_lblTaskDetailsKA"));
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
			}catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
			FormOrderExecution frmOrderExecution = new FormOrderExecution();
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }				              
               try{
            	    frmOrderExecution.navigateToTimeExpense(); 	   
	                FormTimeAndExpenses frmTimeAndExpenses=new  FormTimeAndExpenses();
	                frmTimeAndExpenses.navigateToTimeDetails();
	                Thread.sleep(5000);
               	}
               	catch(Exception ex){
               		ex.printStackTrace();
               	 frmOrderExecution.navigateToTimeExpense(); 	   
               	 FormTimeAndExpenses frmTimeAndExpenses=new  FormTimeAndExpenses();
               	 frmTimeAndExpenses.navigatetoAddTimeAndExpense();
               	 FormAddTimeAndExpenses frmAddTimeAndExpenses = new FormAddTimeAndExpenses();
               	 frmAddTimeAndExpenses.navigateToAddTime();
               	 FormAddTimeItem formAddTimeItem =new FormAddTimeItem();
               	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
	            	 formAddTimeItem.SelectLabour(); 
	            	 formAddTimeItem.selectDate();
	            	 formAddTimeItem.setDuration();
	            	 formAddTimeItem.ClickDone();
	            	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));	 	            		            	 
	    			 Segment segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_SegTimeExpenseKA"),OrderExecutionWidgetId.getWidgetId("tmpTimeAndExpenseKA_lblvalue1KA"));
	    			 List<AppElement> seg = segDetailsKA.getIdentifierElement();
	    			 seg.get(0).click();
	    			 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeDetailsKA_lblTaskDetailsKA"));
                }               
		 }
	   }
	 }
	 @Test 
	 public void TestEditTimeItem() throws Exception{
		SoftAssert sa = new SoftAssert();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeDetailsKA_lblTaskDetailsKA"));
		FormTimeDetailsKA frmTimeDetailsKA = new FormTimeDetailsKA(); 
		frmTimeDetailsKA.clickOnEdit();		 
	    FormEditTimeItem frmEditTimeItem=new  FormEditTimeItem();
		frmEditTimeItem.SelectLabour(); 
		frmEditTimeItem.selectDate();
		frmEditTimeItem.setDuration();
		frmEditTimeItem.ClickDoneinEdit();			
		String lblValue1 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_lblTaskDetailsKA")).getText();
		sa.assertEquals(lblValue1,"Time Details");
		sa.assertAll();
	   }
	 
	 @Test 
	 public void TestRemoveTimeItem() throws Exception{
		 SoftAssert sa = new SoftAssert();
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeDetailsKA_lblTaskDetailsKA"));
		 FormTimeDetailsKA frmTimeDetails=new FormTimeDetailsKA();
		 frmTimeDetails.clickOnRemove();
		 String lblValue1 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA")).getText();
		 sa.assertEquals(lblValue1,"Time & Expense");
		 sa.assertAll();
	 }
	 
	@AfterClass(alwaysRun=true)
		public void setupAfterClass() throws Exception{
			SoftAssert sa = new SoftAssert();
			 try{				 
				 FormTimeAndExpenses  formTimeAndExpenses=new FormTimeAndExpenses();
				 formTimeAndExpenses.navigateBack();	
				 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
				 FormOrderExecution frmOrderExecution=new FormOrderExecution();
				 frmOrderExecution.clicknavigatebackOrderLists();
				 AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
				 sa.assertEquals(lblValue1.getText(),"My Orders");
				 sa.assertAll();
			     }
				 catch(Exception e){
						relaunchApp();
						if(doLogin()){
							System.out.println("Login is successful***");
						}
			   }
}
}
