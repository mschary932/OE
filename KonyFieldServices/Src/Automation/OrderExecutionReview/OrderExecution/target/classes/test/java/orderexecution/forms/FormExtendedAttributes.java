package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormExtendedAttributes {
	
	public FormExtendedAttributes() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExtendedAttributesKA_lblHeaderKA"));
	}

	//To navigate back to order execution
		public FormOrderExecution navigateToOrderExecutionfromExtendedAttribute() throws Exception{
			AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmExtendedAttributesKA_btnBackKA"));
			AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmExtendedAttributesKA_btnBackKA"));
			btnBackKA.click();
			AppElement lblHeaderKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
			boolean isVisible = lblHeaderKA.isElementVisible();
			if(isVisible){return new FormOrderExecution();}
			return null;
		}
}
