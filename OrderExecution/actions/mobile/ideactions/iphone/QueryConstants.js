kony = kony || {};
kony.servicesapp = kony.servicesapp || {};
kony.servicesapp.INORDER = "INORDER";
kony.servicesapp.INTASK = "INTASK"
kony.servicesapp.LOCAL = "LOCAL"
kony.servicesapp.AVAILABLE = "AVAILABLE"
kony.servicesapp.ORDERRESOURCES_RESOURCEEXECUTION = "ORDERRESOURCES_RESOURCEEXECUTION"
kony.servicesapp.ORDERRESOURCES_RESOURCEDETAILS = "ORDERRESOURCES_RESOURCEDETAILS"
kony.servicesapp.RESOURCEEXECINVENTORY = "RESOURCEEXEC_INVENTORY"
kony.servicesapp.RESOURCEDETAILS_INVENTORY = "RESOURCEEXEC_DETAILS"
kony.servicesapp.ResourcesQuery = {
    INTASK: "select inv.id as InvID,inv.Quantity as InventoryQuantity,taskEnt.Status_id as taskStatus,wom.ItemNumber,wom.id as womID,wom.isConsumable,MIN(wom.isConsumed) as isConsumed,mat.id as Code,mat.Description as Description,unt.Description as ReqUnitDesc,(select ut.Description from Unit ut left where ut.id = mat.Unit_id) as baseUnit,(inv.quantity - SUM(ifnull(wom.RequestedQuantity,0)*ifnull(uom.Factor,1))) as AvailableQuantity, matType.name as MaterialType,SUM(wom.RequestedQuantity*ifnull(uom.Factor,1)) as RequestedQuantity from Material mat left outer join WorkOrderMaterial wom on wom.Material_id = mat.id and (wom.WorkOrder_id = {x}) left outer join Unit unt on unt.id = mat.Unit_id left join Inventory inv on inv.material_id =  wom.material_id left join MaterialType matType on matType.id=mat.Type_id left join Task taskEnt on taskEnt.id = wom.TaskComp_id left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id where(wom.TaskComp_id = {x}) and ((wom.isConsumable='Y' and cast(wom.RequestedQuantity as int)>0) or (wom.isConsumable='N' and cast(wom.RequestedQuantity as int)>0)) GROUP by mat.id, wom.isConsumable ORDER BY wom.isConsumable DESC, mat.Description ASC",
    INORDER: "select inv.id as InvID,inv.Quantity as InventoryQuantity,taskEnt.Status_id as taskStatus,wom.ItemNumber,wom.id as womID,wom.isConsumable,MIN(wom.isConsumed) as isConsumed,mat.id as Code,mat.Description as Description,unt.Description as ReqUnitDesc,(select ut.Description from Unit ut where ut.id = mat.Unit_id) as baseUnit,(inv.quantity - SUM(ifnull(wom.RequestedQuantity,0)*ifnull(uom.Factor,1))) as AvailableQuantity, matType.name as MaterialType,SUM(wom.RequestedQuantity*ifnull(uom.Factor,1)) as RequestedQuantity from Material mat left outer join WorkOrderMaterial wom on wom.Material_id = mat.id and (wom.WorkOrder_id = {x}) left outer join Unit unt on unt.id = mat.Unit_id left join Inventory inv on inv.material_id =  wom.material_id left join MaterialType matType on matType.id=mat.Type_id left join Task taskEnt on taskEnt.id = wom.TaskComp_id left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id where(wom.WorkOrder_id = {x}) and ((wom.isConsumable='Y' and cast(wom.RequestedQuantity as int)>0) or (wom.isConsumable='N' and cast(wom.RequestedQuantity as int)>0)) GROUP by mat.id, wom.isConsumable ORDER BY wom.isConsumable DESC, mat.Description ASC",
    LOCAL: "select inv.id as InvID,inv.Quantity as InventoryQuantity,taskEnt.Status_id as taskStatus,wom.ItemNumber,wom.id as womID,wom.isConsumable,ut.Description as baseUnit, MIN(wom.isConsumed) as isConsumed,mat.id as Code,mat.Description as Description,unt.Description as ReqUnitDesc,inv.quantity as InventoryQuantity, matType.name as MaterialType,(inv.quantity - SUM(ifnull(wom.RequestedQuantity,0)*ifnull(uom.Factor,1))) as AvailableQuantity, wom.RequestedQuantity as RequestedQuantity,wom.WorkOrder_id as WorkOrder_ID, wom.TaskComp_id as Task_ID from Material mat left outer join WorkOrderMaterial wom on wom.Material_id = mat.id and (wom.WorkOrder_id = {x} or wom.TaskComp_id = {y}) left join Inventory inv on inv.material_id =  mat.id left outer join Unit unt on unt.id = wom.RequestedUnit_Id left join MaterialType matType on matType.id=mat.Type_id left join Task taskEnt on taskEnt.id = wom.TaskComp_id left join Unit ut on mat.Unit_id = ut.id left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id GROUP by mat.id ORDER BY wom.WorkOrder_id ASC, wom.TaskComp_id ASC ,Description ASC",
    AVAILABLE: "select inv.id as InvID,inv.Quantity as InventoryQuantity,taskEnt.Status_id as taskStatus,wom.ItemNumber,wom.id as womID,wom.isConsumable,MIN(wom.isConsumed) as isConsumed,mat.id as Code,mat.Description as Description,unt.Description as ReqUnitDesc,inv.quantity as InventoryQuantity, matType.name as MaterialType,(select ut.Description from Unit ut where mat.Unit_id =ut.id and mat.id={y}) as baseUnit,(inv.quantity - SUM(ifnull(wom.RequestedQuantity,0)*ifnull(uom.Factor,1))) as AvailableQuantity from Material mat left join Inventory inv on inv.material_id =  mat.id left outer join WorkOrderMaterial wom on wom.Material_id = mat.id left outer join Unit unt on unt.id = wom.RequestedUnit_Id left join MaterialType matType on matType.id=mat.Type_id left join Task taskEnt on taskEnt.id = wom.TaskComp_id left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id where cast(inv.quantity as int) > 0 GROUP by mat.id ORDER BY Description ASC",
    ORDERRESOURCES_RESOURCEEXECUTION: "select mat.unit_id as baseunitId,wom.RequestedUnit_id as ReqId,inv.Quantity as invQuantity,inv.id as InvID ,wom.isConsumable,wom.isConsumed,wom.id as key,mat.Description,mat.PartNumber,mat.id,mat.ModelNumber,matType.Name as mat_type,uom.Factor as uomF, SUM(wom.RequestedQuantity*ifnull(uom.Factor,1)) as Quantity,mat.Barcode,un.Description as ReqUnitDesc,(select ut.Description from Unit ut where mat.Unit_id =ut.id and mat.id ={y} ) as baseUnitDesc ,un.id as uomId from Material mat left join MaterialType matType on matType.id=mat.Type_id left join Inventory inv on inv.Material_id = mat.id left join WorkOrderMaterial wom on mat.id=wom.Material_id left join Unit un on un.id=wom.RequestedUnit_Id left join UnitConversion uom on wom.RequestedUnit_Id=uom.UnitFrom_id and mat.Unit_id=uom.UnitTo_id and uom.Material_id = mat.id where mat.id={y} and (wom.WorkOrder_id= {x})",
    RESOURCEEXEC_INVENTORY: "select mat.unit_id as baseunitId,inv.Quantity as invQuantity,inv.id as InvID ,mat.Description,mat.PartNumber,mat.id,mat.ModelNumber,matType.Name as mat_type,mat.Barcode,un.Description as baseUnitDesc from Material mat inner join Inventory inv on inv.Material_id = mat.id left join MaterialType matType on matType.id=mat.Type_id left join Unit un on un.id=mat.Unit_id where mat.id={x}",
    ORDERRESOURCES_RESOURCEDETAILS: "select mat.Description,inv.Quantity,SUM(wom.RequestedQuantity*ifnull(uom.Factor,1)) as RequestedQuantity,mat.id as Code from Material mat left join WorkOrderMaterial wom on wom.Material_id = mat.id left join Inventory inv on inv.Material_id = mat.id left join UnitConversion uom on uom.UnitFrom_id=wom.RequestedUnit_Id and uom.UnitTo_id = mat.Unit_id and uom.material_id = mat.id where mat.id= {x} and ( wom.WorkOrder_id={y} ) ",
    RESOURCEEXEC_DETAILS: "select mat.Description,inv.Quantity,(ifnull(wom.RequestedQuantity,0)) as RequestedQuantity,mat.id as Code from Material mat left join WorkOrderMaterial wom on wom.Material_id = mat.id left join Inventory inv on inv.Material_id = mat.id where mat.id= {x} "
}
kony.servicesapp.QueryConstants = Class({
    $statics: {
        scopeObj: null,
        getQueryConstantsObj: function() {
            if (kony.servicesapp.QueryConstants.scopeObj) {
                return kony.servicesapp.QueryConstants.scopeObj;
            } else {
                kony.servicesapp.QueryConstants.scopeObj = new kony.servicesapp.QueryConstants();
                return kony.servicesapp.QueryConstants.scopeObj;
            }
        }
    },
    /**
     * constructor method.
     */
    constructor: function() {
        try {
            this.getQuery = function(queryKey) {
                if (kony.servicesapp.ResourcesQuery[queryKey]) {
                    return kony.servicesapp.ResourcesQuery[queryKey];
                }
            };
        } catch (err) {
            kony.print("==error in fetching query from constants==>");
            kony.print(err.toString());
        }
    }
});