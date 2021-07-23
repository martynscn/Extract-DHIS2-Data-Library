var sss = SpreadsheetApp.openById('19Lpd_ixXSXbpGTtxdHy9IinKi4QcK2W0GJJQarVUXRg');
function collateErrors(ss) {
  var ss = ss || sss;  //Use spreadsheet passed in function parameter
  var errors = ss.getSheetByName('Validation_analysis').getDataRange().getValues();  //Get validation_analysis data values
  var errors_header = errors.shift();  //Remove header
  errors = errors.filter(row => row[6] == "Facility");  //Filter for Facilities
  var Error_logs_sheet = ss.getSheetByName('Error_logs');  //Get Error logs worksheet
  var existing_errors = Error_logs_sheet.getRange(1, 1, Error_logs_sheet.getLastRow(), 8).getValues(); //Get values of existing errors
  var existing_errors_cols_to_compare = existing_errors.map(row => [row[1],row[2],row[3],row[4],row[5]]);  //Select columns to compare
  var existing_errors_joined = existing_errors_cols_to_compare.map(row => row.join());  //Join columns values
  var error_log = [];  //Initialize the error log array
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  //Array containing Months of the year
  var new_date = new Date();  //Instantiate a date object
  var new_year = new_date.getFullYear();  //Get the year's full year
  var new_month = months[new_date.getMonth()];  //Get the month of the date
  var new_day = new_date.getDate();  //Get the day number
  var my_new_date = new_day + ' ' + new_month + ' ' + new_year;  //Concatenate date as appropriate
  var errors_last_column_index = errors[0].length - 2;  // Get errors last column index
  
  for (var col_index = 15; col_index <= errors_last_column_index; col_index++) {
    errors.forEach(function(row, index) {
      if(row[col_index] == "Error") {
        var new_error = [my_new_date, row[3],row[4],row[5],months[row[0].getMonth()] + ' ' + row[0].getFullYear(),errors_header[col_index],my_new_date,""];  //return array containing data for the new error observed
        var new_error_cols_to_compare = [new_error[1],new_error[2],new_error[3],new_error[4],new_error[5]];  //Extract columns to compare
        var new_error_index_in_existing = existing_errors_joined.indexOf(new_error_cols_to_compare.join());  //Join column values
        if(new_error_index_in_existing == -1) {
          error_log.push(new_error);  //Push new error to the error_logs_array
        } else {
            existing_errors[new_error_index_in_existing][6] = existing_errors[new_error_index_in_existing][6] + ', ' + my_new_date;  //Update existing errors
        }
      }
    });
  }
  var complete_error_log = existing_errors.concat(error_log);  //Merge new and existing errors
  ss.getSheetByName('Error_logs').getRange('a1:h').clearContent();  //Clear contents of error_logs
  ss.getSheetByName('Error_logs').getRange(1, 1, complete_error_log.length, complete_error_log[0].length).setValues(complete_error_log);  //Set update error logs in error_logs sheet 
}


//startRow = 1
//endRow = 1000
function matchValidationDataElementsValue(ss,startRow,endRow) {
  var ss = ss || sss;
  var Validation_rules_dictionary = ss.getSheetByName('Validation_rules_dictionary').getDataRange().getValues();
  var error_logs_sheet = ss.getSheetByName('Error_logs');
  var Error_logs_complete = error_logs_sheet.getDataRange().getValues();
  
  var auto_extracted_data = ss.getSheetByName('auto_extracted_data').getDataRange().getValues();
//  Logger.log(auto_extracted_data);
  var auto_extracted_data_header = auto_extracted_data.shift().map(item => item.trim());
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
      return row[0] == period && row[3] == lga && row[4] == ward && row[5] == facility;
    });
    
    if (lhs_and_rhs_row_index !== -1) {
      var lhs_data_element = rule_row[1];
      var lhs_data_element_index = auto_extracted_data_header.indexOf(lhs_data_element);
      
      //    if(lhs_data_element_index == -1) {
      //      lhs_data_element_index = Validation_analysis_header.indexOf(lhs_data_element);
      //      if(lhs_data_element_index == -1) {
      //        var lhs_data_value = lhs_data_element;
      //      } else {
      //        var lhs_data_value = Validation_analysis[lhs_and_rhs_row_index][lhs_data_element_index];
      //      }
      //    } else {
      //        var lhs_data_value = auto_extracted_data[lhs_and_rhs_row_index][lhs_data_element_index];
      //    }
      
      if(lhs_data_element_index != -1) {
        var lhs_data_value = auto_extracted_data[lhs_and_rhs_row_index][lhs_data_element_index];
//        var lhs_data_value = 'auto_extracted_data Row = ' + lhs_and_rhs_row_index + ' Data element = ' + lhs_data_element_index;
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

function sendErrorEmails(ss) {
  ss = ss || sss;
  var email_table = ss.getSheetByName('Error_mail_report').getRange('a1').getDataRegion().getValues();
  var Error_logs = ss.getSheetByName('Error_logs').getDataRange().getValues();
  var Error_logs_header = Error_logs.shift();
  
  email_table.shift();
  email_table.forEach(function(row, index) {
    var email_address = row[1];
    var Org_unit_level = row[2];
    var LGA = row[3];
    var Facility = row[4];
    var Error_logs_for_current_email = Error_logs.filter(function(row, index) {
      return (row[1] == LGA) && (Facility == "" ? true : row[3] == Facility) && (row[12] == false);
    });
    var Error_logs_for_current_email_with_required_cols = Error_logs_for_current_email.map(function(row,index) {
      return row.slice(0,7).concat(row.slice(8,12));
    });
    var Error_logs_header_with_required_cols = Error_logs_header.slice(0,7).concat(Error_logs_header.slice(8,12));
    sendEmail(Error_logs_for_current_email_with_required_cols,row,Error_logs_header_with_required_cols);
  });
}

function formatDataAsTable(arr) {
  // Later do the formatting for Slack. You can use replacing certain characters using regular expressions. Looks like there is a script I saw that did this.
  var result = '';
  for (i = 0; i < arr.length; i++) {
    result = result + "<tr>" + "<td>" + (i+1) + "</td>";
    for (j = 0; j < arr[i].length; j++) {
      result = result + "<td>" + arr[i][j] + "</td>";
    }
    result = result + "</tr>";
  }
  return result;
}

function sendSlackPost(subject, body) {
  var postUrl = "https://hooks.slack.com/services/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";
  var subject = subject || "No subject";
  var body = body || "No body";
  var message = subject + '\n\n' + body;
  var jsonData =
  {
     "text" : message
  };
  var payload = JSON.stringify(jsonData);
  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(postUrl, options);
}


function sendEmail(data_array,email_row,Error_logs_header) {
  var bcc = bcc || PropertiesService.getScriptProperties().getProperty('bcc');
  var cc = "martynschukwunwike.nwaokocha@student.univaq.it";
  var recipients = email_row[1];
  var Org_unit_level = email_row[2];
  var lga = email_row[3];
  var facility = email_row[4];
  var org_unit = (Org_unit_level == "Facility" ? facility : lga) + ' ' + Org_unit_level;
  var msgLength = 204000;
  var dasboard_link = "https://app.powerbi.com/view?r=eyJrIjoiMmYwZDIwYmYtNjhlNy00ZjIxLWE3NjQtMzI1MjUxYzk3NmY0IiwidCI6IjJlZjQ4Zjc4LTQyNWUtNGMwZS04ZTU1LWExNzk1Mzk2OTVjYiIsImMiOjF9";
  var Datalink = "https://docs.google.com/spreadsheets/d/19Lpd_ixXSXbpGTtxdHy9IinKi4QcK2W0GJJQarVUXRg/edit?pli=1#gid=491640159";
  var closure = "<br><br>Thank you for your time. The dashboard is accessible <a href = '" + dasboard_link + "'>here.</a><br><br>The data is accessible <a href = '" + Datalink + "'>here.</a><br><br>From HSDF Monitoring Team<img src='cid:hsdfLogo'> <br>Ciao! <br>";
  var attachments = [];
  var hsdfLogoBlob = UrlFetchApp.fetch("https://www.hsdf.org.ng/wp-content/uploads/2015/08/logo.png")
                                .getBlob().setName("hsdfLogoBlob");
  
  if(data_array.length > 1) {
    var subject = (data_array.length > 1 ? data_array.length : 'No') + ' errors in ' + org_unit + ' for last 6 months.';
    var htmlTable = formatDataAsTable(data_array);
    var htmlBody = 'Good day ' + email_row[0] + ', <br>Please find below the details of the error in the <b>' + Org_unit_level + '</b> namely: <b>' + (Org_unit_level == "Facility" ? facility : lga) + 
      "</b><br><br>" + "<table  border='1'><tr><td><b><i>S/N</i></b></td><td><b><i>"+Error_logs_header[0]+"</i></b></td>" + "<td><b><i>"+Error_logs_header[1]+"</i></b></td>" + "<td><b><i>"+Error_logs_header[2]+"</i></b></td>" + "<td><b><i>"+Error_logs_header[3]+"</i></b></td>" + "<td><b><i>"+Error_logs_header[4]+"</i></b></td>" + "<td><b><i>"+Error_logs_header[5]+"</i></b></td>" + "<td><b><i>"+Error_logs_header[6]+"</i></b></td>" + "<td><b><i>"+Error_logs_header[7]+"</i></b></td>" + "<td><b><i>"+Error_logs_header[8]+"</i></b></td>" +"<td><b><i>"+Error_logs_header[9]+"</i></b></td>" +"<td><b><i>"+Error_logs_header[10]+"</i></b></td></tr>" + htmlTable + "</table>";
  } 

  if(htmlBody.length > msgLength) {
    var subject = 'Too much errors (' + data_array.length + ' errors) in ' + org_unit + ' for last 6 months.';
    data_array.unshift(Error_logs_header);
    var saveAsCSV_result = saveAsCSV(data_array,org_unit,"1WEF2H7yBKUmK4hBtyiyA1E9l1MFGUMMS",[recipients,cc,bcc]);
    var attachments = saveAsCSV_result[0];
    var downloadUrl = saveAsCSV_result[1];
    var htmlBody = "The number of errors is too much to be sent in a mail. Please see the attachment below or in this <a href = '" + downloadUrl + "'>link.</a>";
  }
  var fullHtmlBody = htmlBody + closure;
  sendSlackPost(subject, fullHtmlBody);
  MailApp.sendEmail({
     to: recipients,
     subject: subject,
     htmlBody: fullHtmlBody
     ,name: "HSDF Monitoring team"
     ,inlineImages: {hsdfLogo: hsdfLogoBlob}
//     ,cc: cc
//     ,bcc: bcc
     ,attachments: attachments
   });
}

function sendSlackMessage(subject, body, postUrl) {
  var postUrl = postUrl || "https://hooks.slack.com/services/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";
  var subject = subject || "No subject";
  var body = body || "No body";
  var message = subject + '\n\n' + body;
  var jsonData =
  {
     "text" : message
  };
  var payload = JSON.stringify(jsonData);
  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };
  UrlFetchApp.fetch(postUrl, options);
}

function saveAsCSV(data_array,org_unit,base_folder_id,recipients_array) {
  var base_folder_id = base_folder_id || "1WEF2H7yBKUmK4hBtyiyA1E9l1MFGUMMS";
  var base_folder = DriveApp.getFolderById(base_folder_id);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var new_date = new Date();
  var new_year = new_date.getFullYear();
  var new_month = months[new_date.getMonth()];
  var new_day = new_date.getDate();
  var my_new_date = new_day + '_' + new_month + '_' + new_year;
  var allowed_org_unit_folder_name = org_unit.toLowerCase().replace(/ /g,'_') + '_csvs'
  var allowed_org_unit_file_name = allowed_org_unit_folder_name + "_" + my_new_date + ".csv";
  
  if(!base_folder.getFoldersByName(allowed_org_unit_folder_name).hasNext()) {
     base_folder.createFolder(allowed_org_unit_folder_name);
  }
  var csv_folder = base_folder.getFoldersByName(allowed_org_unit_folder_name).next();
  var csv_folder_viewers_and_editors = csv_folder.getViewers().map(user => user.getEmail());
  
  var csvFile_content = convertArrayToCsvFile_(data_array);

  var csvFile_created = csv_folder.createFile(allowed_org_unit_file_name, csvFile_content, MimeType.CSV);
  var csvFile_created_viewers_and_editors = csvFile_created.getViewers().map(user => user.getEmail());

  Logger.log('recipients_array is :' + recipients_array);
  
  recipients_array.forEach(function(email_address, index) {
    if(csv_folder_viewers_and_editors.indexOf(email_address) == -1) {
      csv_folder.addViewer(email_address);
    }
    if(csvFile_created_viewers_and_editors.indexOf(email_address) == -1) {
      csvFile_created.addViewer(email_address);
    }
  });
  
  var downloadUrl = csvFile_created.getDownloadUrl().slice(0,-8);
  return [csvFile_created,downloadUrl];
}

function convertArrayToCsvFile_(data) {
  try {
    var csvFile = undefined;
    if(data.length > 1) {
      var csv = "";
      for (var row = 0; row < data.length; row++) {
        for(var col = 0; col < data[row].length; col++) {
          if(data[row][col].toString().indexOf(",") != -1) {   //That is treating the case when there is comma in the cell value, surround it with double quotes
            data[row][col] = "\"" + data[row][col] + "\"";
          }
        }
        if(row < data.length - 1) {
          csv += data[row].join(",") + "\r\n";
        } else {
          csv += data[row];
        }
      }
      csvFile = csv;
    }
    return csvFile;
  } catch(err) {
    sendSlackMessage("Error in converting array to csv file", "The error is: " + err, "https://hooks.slack.com/services/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");
  }
}