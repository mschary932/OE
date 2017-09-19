/**
 * This function is used for all transactions related to Insert query. It
 * includes various methods that facilitates to add columns,to remove columns,to
 * list columns and its values that are assigned.
 * 
 * @package com.kony.common.DataAccess.Query
 * @param Table
 *            baseTable Main Table object.
 * @throws DataAccessAppsException
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.InsertQuery = Class({
    constructor: function(baseTable) {
        if (baseTable instanceof kony.sdk.mvvm.Table) {
            var baseTable;
            var columns;
            var values;
            var retVal;
            this.baseTable = baseTable;
            this.columns = new Array();
            this.values = new Array();
            this.retVal = -1;
        } else {
            throw new kony.sdk.mvvm.DataAccessAppsException(
            kony.sdk.mvvm.DataAccessAppsExceptionCode.CD_ERROR_INVALID_DT_INSERT, kony.sdk.mvvm.DataAccessAppsExceptionCode.MSG_ERROR_INVALID_DT_INSERT + typeof(baseTable));
        }
    },
    toString: function() {
        var insertquery = "";
        if (this.baseTable !== null && this.baseTable !== undefined) {
            insertquery = "INSERT INTO ";
            insertquery = insertquery + this.baseTable.toString();
        }
        if (this.columns !== null && this.columns !== undefined && this.columns.length !== 0) {
            insertquery = insertquery + "( ";
            for (var index = 0; index < this.columns.length; index++) {
                insertquery = insertquery + this.columns[index].toStringByTablePrefix(false);
                if ((index + 1) < this.columns.length) {
                    insertquery = insertquery + ", ";
                } else {
                    insertquery = insertquery + " ) ";
                }
            }
        }
        if (this.values !== null && this.values !== undefined && this.values.length !== 0) {
            insertquery = insertquery + "values( ";
            for (var index = 0; index < this.values.length; index++) {
                insertquery = insertquery + "?";
                // insertquery = insertquery + this.values[index];
                if ((index + 1) < this.values.length) {
                    insertquery = insertquery + ", ";
                } else {
                    insertquery = insertquery + " ) ";
                }
            }
        }
        kony.sdk.mvvm.log.info("insert query is ---> " + insertquery);
        return insertquery;
        // return convertToJSON(this.listColumns(), this.listValues());
        //		
        // function convertToJSON(columns, values){
        // var json = {};
        // for( var index = 0; index < columns.length; index++ ){
        // json[columns[index].toStringByMode(3)] = values[index];
        // }
        // var str = JSON.stringify(json);
        // return str;
        // }
    },
    /**
     * This function is used to add column with column name and Table object
     * 
     * @param Table
     *            table
     * @param String
     *            columnName
     * @param String
     *            value
     */
    addColumn: function() {
        var currentInsertQueryObj = this;
        if (arguments.length === 2) {
            if (arguments[0] instanceof kony.sdk.mvvm.Column) {
                currentInsertQueryObj.columns.push(arguments[0]);
            } else {
                throw new kony.sdk.mvvm.DataAccessAppsException(
                kony.sdk.mvvm.DataAccessAppsExceptionCode.CD_ERROR_INVALID_DT_INSERT_ADD_COL, kony.sdk.mvvm.DataAccessAppsExceptionCode.MSG_ERROR_INVALID_DT_INSERT_ADD_COL + typeof(arguments[0]));
            }
            currentInsertQueryObj.values.push(arguments[1]);
        } else if (arguments.length === 3) {
            addColumnToTable(arguments[0], arguments[1], arguments[2]);
        } else {
            throw new kony.sdk.mvvm.DataAccessAppsException(
            kony.sdk.mvvm.DataAccessAppsExceptionCode.CD_ERROR_INVALID_ARGS_INSERT_ADD_COL, kony.sdk.mvvm.DataAccessAppsExceptionCode.MSG_ERROR_INVALID_ARGS_INSERT_ADD_COL);
        }

        function addColumnToTable(table, columnName, value) {
            if (table instanceof kony.sdk.mvvm.Table) {
                if (typeof(columnName) === "string") {
                    var column = table.getColumn(columnName);
                    if (column instanceof kony.sdk.mvvm.Column) {
                        currentInsertQueryObj.columns.push(column);
                    }
                } else {
                    throw new kony.sdk.mvvm.DataAccessAppsException(
                    kony.sdk.mvvm.DataAccessAppsExceptionCode.CD_ERROR_INVALID_DT_INSERT_ADDTO_TAB, kony.sdk.mvvm.DataAccessAppsExceptionCode.MSG_ERROR_INVALID_DT_INSERT_ADDTO_TAB + kony.type(columnName));
                }
            } else {
                throw new kony.sdk.mvvm.DataAccessAppsException(
                kony.sdk.mvvm.DataAccessAppsExceptionCode.CD_ERROR_INVALID_DT_INSERT_ADDTO_TAB1, kony.sdk.mvvm.DataAccessAppsExceptionCode.MSG_ERROR_INVALID_DT_INSERT_ADDTO_TAB1 + kony.type(table));
            }
            currentInsertQueryObj.values.push(value);
        }
    },
    /**
     * This function is used to get base table object.
     * 
     * @return Table baseTable
     */
    getBaseTable: function() {
        return this.baseTable;
    },
    /**
     * This function is used to get list of columns.
     * 
     * @return List columns
     */
    listColumns: function() {
        return this.columns;
    },
    /**
     * This function is used to get list of values that are associated with
     * columns.
     * 
     * @return List values
     */
    listValues: function() {
        return this.values;
    },
    /**
     * This function is used to remove the column that is inserted.
     * 
     * @param Column
     *            column
     */
    removeColumn: function(column) {
        if (column instanceof kony.sdk.mvvm.Column) {
            var index = kony.sdk.mvvm.Utils.indexOf(this.columns, column);
            kony.sdk.mvvm.Utils.remove(this.columns, column);
            if (index !== -1) {
                this.values.splice(index, 1);
            }
        } else {
            throw new kony.sdk.mvvm.DataAccessAppsException(
            kony.sdk.mvvm.DataAccessAppsExceptionCode.CD_ERROR_INVALID_DT_INSERT_REM_COL, kony.sdk.mvvm.DataAccessAppsExceptionCode.MSG_ERROR_INVALID_DT_INSERT_REM_COL + kony.type(column));
        }
    },
    getRetVal: function() {
        return this.retVal;
    },
    setRetVal: function(retVal) {
        this.retVal = retVal;
    }
});