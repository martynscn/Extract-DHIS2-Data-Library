function collateErrors2(ss) {
  var ss = ss || sss;
  var errors = ss.getSheetByName('Validation_analysis').getDataRange().getValues();
  var errors_header = errors.shift();
  errors = errors.filter(row => row[5] == "Facility");
  var Error_logs_sheet = ss.getSheetByName('Error_logs');
  var existing_errors = Error_logs_sheet.getRange(1, 1, Error_logs_sheet.getLastRow(), 8).getValues();
  var existing_errors_cols_to_compare = existing_errors.map(row => [row[1],row[2],row[3],row[4],row[5]]);
  var existing_errors_joined = existing_errors_cols_to_compare.map(row => row.join());
  var error_log = [];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var new_date = new Date();
  var new_year = new_date.getFullYear();
  var new_month = months[new_date.getMonth()];
  var new_day = new_date.getDate();
  var my_new_date = new_day + ' ' + new_month + ' ' + new_year;
  var errors_last_column_index = errors[0].length - 2;
  
  for (var col_index = 14; col_index <= errors_last_column_index; col_index++) {
    errors.forEach(function(row, index) {
      if(row[col_index] == "Error") {
        var new_error = [my_new_date, row[2],row[3],row[4],months[row[0].getMonth()] + ' ' + row[0].getFullYear(),errors_header[col_index],my_new_date,""];
        var new_error_cols_to_compare = [new_error[1],new_error[2],new_error[3],new_error[4],new_error[5]];
        var new_error_index_in_existing = existing_errors_joined.indexOf(new_error_cols_to_compare.join());
        if(new_error_index_in_existing == -1) {
          error_log.push(new_error);
        } else {
            existing_errors[new_error_index_in_existing][6] = existing_errors[new_error_index_in_existing][6] + ', ' + my_new_date;
        }
      }
    });
  }
  var complete_error_log = existing_errors.concat(error_log);
  ss.getSheetByName('Error_logs').getRange('a1:h').clearContent();
  ss.getSheetByName('Error_logs').getRange(1, 1, complete_error_log.length, complete_error_log[0].length).setValues(complete_error_log);
}



function matchValidationDataElementsValue2(ss,startRow,endRow) {
  var ss = ss || sss;
  var Validation_rules_dictionary = ss.getSheetByName('Validation_rules_dictionary').getDataRange().getValues();
  var error_logs_sheet = ss.getSheetByName('Error_logs');
  var Error_logs_complete = error_logs_sheet.getDataRange().getValues();
  var auto_extracted_data = ss.getSheetByName('auto_extracted_data').getDataRange().getValues();
  var auto_extracted_data_header = auto_extracted_data.shift();
  var Validation_analysis = ss.getSheetByName('Validation_analysis').getDataRange().getValues();
  var Validation_analysis_header = Validation_analysis.shift();
  var Error_logs_header = Error_logs_complete.shift();
  var Error_logs = Error_logs_complete.splice(startRow - 1,endRow - startRow + 1);
  
  var Lhs_Operator_Rhs_Array = [];
  var Lhs_Operator_Rhs_Array_Temp;
  Error_logs.forEach(function (row, index) {
    var lga = row[1];
    var ward = row[2];
    var facility = row[3];
    var period = (new Date(row[4])).toString();
    var rule = row[5];
    var rule_row = Validation_rules_dictionary.filter(new_row => new_row[0] == rule)[0];
    var lhs_and_rhs_row_index = auto_extracted_data.findIndex(function(row, index, array) {
      return row[0] == period && row[2] == lga && row[3] == ward && row[4] == facility;
    });
    if (lhs_and_rhs_row_index !== -1) {
      var lhs_data_element = rule_row[1];
      var lhs_data_element_index = auto_extracted_data_header.indexOf(lhs_data_element);
      if(lhs_data_element_index != -1) {
        var lhs_data_value = auto_extracted_data[lhs_and_rhs_row_index][lhs_data_element_index];
      } else {
        lhs_data_element_index = Validation_analysis_header.indexOf(lhs_data_element);
        if(lhs_data_element_index == -1) {
          var lhs_data_value = lhs_data_element;
        } else {
          var lhs_data_value = Validation_analysis[lhs_and_rhs_row_index][lhs_data_element_index];
        }
      }
      
      var operator = "'" + rule_row[2];
      var rhs_data_element = rule_row[3];
      
      var rhs_data_element_index = auto_extracted_data_header.indexOf(rhs_data_element);
      
      if(rhs_data_element_index != -1) {
        var rhs_data_value = auto_extracted_data[lhs_and_rhs_row_index][rhs_data_element_index];
      } else {
        rhs_data_element_index = Validation_analysis_header.indexOf(rhs_data_element);   // Later improve this to do it for lhs and rhs especially the result from filtering
        if(rhs_data_element_index == -1) {
          var rhs_data_value = rhs_data_element;
        } else {
          var rhs_data_value = Validation_analysis[lhs_and_rhs_row_index][rhs_data_element_index];
        }
      }
      Lhs_Operator_Rhs_Array_Temp = [lhs_data_element + ' = ' + lhs_data_value ,operator, rhs_data_element + ' = ' + rhs_data_value];
    } else {
      Lhs_Operator_Rhs_Array_Temp = [row[8],row[9],row[10]];
    }
    Lhs_Operator_Rhs_Array.push(Lhs_Operator_Rhs_Array_Temp);
  });
  error_logs_sheet.getRange(startRow + 1, 9, Lhs_Operator_Rhs_Array.length, Lhs_Operator_Rhs_Array[0].length).setValues(Lhs_Operator_Rhs_Array);
}