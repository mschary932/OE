package test.java.orderexecution.forms;


import java.util.List;





import org.testng.Assert;




import test.common.Alerts;
import test.common.AppElement;
import test.common.Segment;
import test.common.SgConfiguration;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderExecution {
	
    public FormOrderExecution() throws Exception {
    	AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
	}

	AppElement lblMyOrdersKA;
    AppElement btnHeaderKA;
    FormOrderListKA frmOrderListKA;
    FormOrderDetails frmOrderDetails;
    
    //To navigate to orderdetails
    public FormOrderDetails navigateToOrderDetails() throws Exception{
    	AppElement btnOrderDetailsKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnOrderDetailsKA"));
    	btnOrderDetailsKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		if(Label.isElementVisible()) 
		return new FormOrderDetails();	
		return null;
	}
    
    //To navigate back to orderList
    public FormOrderListKA clicknavigatebackOrderLists() throws Exception{
		btnHeaderKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnHeaderKA"));
		btnHeaderKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		AppElement label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		if(label.isElementVisible()) 
		return new FormOrderListKA();
		return null;
	 }
	
    //To navigate to orderAttachment
    public FormOrderAttachments navigateToOrderAttachment() throws Exception{
    	AppElement flxScrollTypesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_flxScrollTypesKA"));	
    	flxScrollTypesKA.swipeLeft(90);
    	AppElement btnOrderAttachmentKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnAttachmentKA"));
    	btnOrderAttachmentKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
		AppElement Label1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
		if(Label1.isElementVisible()){return new FormOrderAttachments();}
		return null;
		}
    
    //To navigate to order history
    public FormOrderHistoryKA navigateToOrderHistory() throws Exception{
    	AppElement btnOrderAttachmentKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnHistoryKA"));
    	btnOrderAttachmentKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderHistoryKA_lblHeaderKA"));
		AppElement Label1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderHistoryKA_lblHeaderKA"));
		if(Label1.isElementVisible()){return new FormOrderHistoryKA();}
		return null;
		}
    
    //To navigate to orderNotes
    public FormNotesListKA navigateToOrderNotes() throws Exception {
		AppElement flxScrollTypesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_flxScrollTypesKA"));	
    	flxScrollTypesKA.swipeLeft(90);
		AppElement btnOrderNotesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnOrderNotesKA"));
    	btnOrderNotesKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		AppElement Label1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		if(Label1.isElementVisible()){return new FormNotesListKA();}
		return null;
	}
    //To check on route and reject on scheduled
    public void verifystatusScheduled() throws Exception{    	
    	AppElement btnOnRoute=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnCompleteKA"));;
    	Assert.assertEquals(btnOnRoute.getText(),"On Route");   
    	AppElement btnCancelKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnCancelKA"));;
    	Assert.assertEquals(btnCancelKA.getText(),"Reject");   
    }
    
   //To click on route
    public void clickOnRoute() throws Exception{
		AppElement btnOnRoute=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnCompleteKA"));;
		btnOnRoute.click();		
		AppSpecificFunctions.handleSync();
		if(SgConfiguration.getInstance().isIOS()){
			if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("OK_Button"))){
				AppElement okBtn=new AppElement(OrderExecutionWidgetId.getWidgetId("OK_Button"));
				okBtn.click();
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnCompleteKA"))){
					btnOnRoute.click();
					AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
				}
			}		
		}
	} 
    
    //To check started button on route click
    public void verifystatusOnRoute()throws Exception{
    	AppElement lblStatusKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblStatusKA"));;
    	Assert.assertEquals(lblStatusKA.getText(),"ON ROUTE");
    	AppElement btnHoldKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnHoldKA"));;
    	Assert.assertEquals(btnHoldKA.getText(),"Start");   
    	
    }
   //To check start order
	public FormOrderExecution clickStart() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnHoldKA"));
		AppElement btnStart=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnHoldKA"));
		btnStart.click();
		AppSpecificFunctions.handleSync();
		if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_lblHeaderKA"),300)){
			try{
				AppElement btnclose=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnCloseKA"));
				btnclose.click();
				Thread.sleep(5000);				
			}catch(Exception e){
				System.out.println("btnclose is not working");
			}
			try{				
			AppElement btnclosealert=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_btnYes"));
			btnclosealert.click();
			Thread.sleep(5000);
			}
			catch(Exception e){
				System.out.println("btnclosealert is not working");
			}
		}
		else{
				System.out.println("frmSurveyKA form is not appeared");
			}	
		return new FormOrderExecution();
	}
	
public void  verifystatusStarted() throws Exception{
    	AppElement lblStatusKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblStatusKA"));;
    	Assert.assertEquals(lblStatusKA.getText(),"STARTED");
    }
public String  getStatus() throws Exception{
	AppElement lblStatusKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblStatusKA"));;
	return lblStatusKA.getText();
}
	public void clickComplete() throws Exception{
		AppElement btnComplete =new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnCancelKA"));
		btnComplete.click();
		AppSpecificFunctions.handleSync();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
	} 
	public void clickReject() throws Exception{
		AppElement btnReject =new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnCancelKA"));
		btnReject.click();
		AppSpecificFunctions.handleSync();
	}
	
	//To navigate to order Resource
    public FormOrderResourceListKA navigateToOrderResource() throws Exception{
    	AppElement btnOrderResKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnOrderResKA"));
    	btnOrderResKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
        if(Label.isElementVisible()) 
		return new FormOrderResourceListKA();	
		return null;
	}
    
  //To navigate to order images
    public FormOrderImagesKA navigateToOrderImages() throws Exception{
    	AppElement flxScrollTypesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_flxScrollTypesKA"));	
        flxScrollTypesKA.swipeLeft(90);
    	AppElement btnImagesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnImagesKA"));
        btnImagesKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteImagesKA_lblHeaderKA"));
        if(Label.isElementVisible()){ return new FormOrderImagesKA();}
		return null;
	} 
    
   //To navigate to order extended attribute
   
    public FormExtendedAttributes navigateToOrderExtendedAttributes() throws Exception{
        AppElement flxScrollTypesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_flxScrollTypesKA"));	
    	flxScrollTypesKA.swipeLeft(90);
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnExtendedObjectsKA"));
    	AppElement btnExtendedObjectsKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnExtendedObjectsKA"));
    	btnExtendedObjectsKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmExtendedAttributesKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExtendedAttributesKA_lblHeaderKA"));
        if(Label.isElementVisible()){ return new FormExtendedAttributes();}
		return null;
	} 

    //To navigate to task Execution
    public FormTaskExecutionKA navigateToTaskExecution() throws Exception{
    	Segment segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_segDetailsKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderExecutionKA_lblProgress"));    	
		List<AppElement> seg = segDetailsKA.getIdentifierElement();
    	for(int i = 0;i < seg.size(); i++) {
    		seg.get(i).click();
    		if(AppElement.waitForName("MEASUREMENT") || AppElement.waitForName("0 Resources")){
    			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnBackKA"));
    			AppElement btnBack = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnBackKA"));
    			btnBack.click();
    			segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_segDetailsKA"), "lbltaskDesc");
    			seg = segDetailsKA.getIdentifierElement();
    		}else{
    			break;
    		}
    	}  
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
        if(Label.isElementVisible()){ return new FormTaskExecutionKA();}
		return null;
    	/*List<AppElement> ele= AppElement.getAppElements("flxMeasurementKA");
    	for(int i = 0; i < ele.size(); i++) {
    		String lblProgess = ele.get(i).getText();
    		System.out.println(lblProgess);
    		if(!(ele.get(i).hasChildElementsById("imgMeasurementKA"))) {
    			ele.get(i).click();
    			break;
    		}
    	}
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
        if(Label.isElementVisible()){ return new FormTaskExecutionKA();}
    	return null;*/
	} 
    
    public FormTaskExecutionKA navigateOnlyToTaskExecution() throws Exception {    	
    	Segment segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_segDetailsKA"), "lbltaskDesc");
    	List<AppElement> seg = segDetailsKA.getIdentifierElement();
    	for(int i = 0;i < seg.size(); i++) {
    		seg.get(i).click();
    		if(AppElement.waitForName("MEASUREMENT",5) || AppElement.waitForName("0 Resources",5)){
    			AppElement btnBack = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnBackKA"));
    			btnBack.click();
    			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
    			segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_segDetailsKA"), "lbltaskDesc");
    			seg = segDetailsKA.getIdentifierElement();    			
    		}else{    			
    			break;
    		}
    	}    	
	    AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
        if(Label.isElementVisible()){ return new FormTaskExecutionKA();}
		return null;
	} 
	
	public FormMeasurementExecutionKA navigateToMeasurementExecution() throws Exception {
		Segment segDetailsKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_segDetailsKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderExecutionKA_lblMeasurementKA"));
    	segDetailsKA.clickSegRowElementbyLabel("Measurement");
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));    	
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
        if(Label.isElementVisible()){ return new FormMeasurementExecutionKA();}
		return null;
	}
	
	public FormCreateKA clickAddMeasurementButton() throws Exception
	{
		AppElement btnAddTaskKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnAddTaskKA"));;
		btnAddTaskKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCreateKA_lblTitleKA"));    	
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateKA_lblTitleKA"));
        if(Label.isElementVisible()){ return new FormCreateKA();}
		return null;
	}
	
	public FormCreateKA clickAddTaskButton() throws Exception{
		AppElement btnAddTaskKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnAddTaskKA"));;
		btnAddTaskKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCreateKA_lblTitleKA"));    	
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateKA_lblTitleKA"));
        if(Label.isElementVisible()){ 
        	return new FormCreateKA();
        }
		return null;
	}

 // To navigate to time and expense
    public FormTimeAndExpenses navigateToTimeExpense() throws Exception{    	
    	AppElement flxScrollTypesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_flxScrollTypesKA"));
    	flxScrollTypesKA.swipeLeft(90);
     	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_frmOrderExecutionKA_btnTimeAndExpense"));
     	AppElement btnTimeAndExpenseKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnTimeAndExpense"));
    	btnTimeAndExpenseKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
		AppElement Label1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
		if(Label1.isElementVisible()){return new FormTimeAndExpenses();}
		return null;
    }
    
    //To navigate to order Asset
    public FormOrderAssetKA navigateToOrderAsset() throws Exception{
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnBOMKA"));
    	AppElement btnBOMKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnBOMKA"));
    	btnBOMKA.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
        if(Label.isElementVisible()){ return new FormOrderAssetKA();}
		return null; 
    }
    
    public FormDirectionsKA navigateToDirections() throws Exception {
    	AppElement imageDirection = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_ImgMapIconKA"));
    	imageDirection.click();    	
    	try{
    		AppElement.waitForName("OK");
			Alerts.btnClickLable("OK");
		}catch(Exception e){
			System.out.println("###No popup appeared ,so moving ahead with execution###");
		}
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmDirectionsKA_lblHeaderKA"));
    	AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDirectionsKA_lblHeaderKA"));
    	if (label.isElementVisible()) 
    		return new FormDirectionsKA();
    	return null;
    }
    public FormCreateTaskDescriptionKA addTaskAtCRM() throws Exception{
    	AppElement btnTaskCRM=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_btnAddTaskKA"));
    	btnTaskCRM.click();
    	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmNewTaskKA"));
    	AppElement label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNewTaskKA"));
    	if(label.isElementVisible())
    	return new FormCreateTaskDescriptionKA();
    	return null;
    }
}