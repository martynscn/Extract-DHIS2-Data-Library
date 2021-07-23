var ss = SpreadsheetApp.getActiveSpreadsheet();

function getResponseandCodeAPIVersion_Default(baseUrl, uname, pwd,slackPostUrl,plain_uname, plain_pwd, ou, dx, pe, filter, aggregationType, measureCriteria, preAggregationMeasureCriteria, skipMeta, skipData, skipRounding, hierarchyMeta, ignoreLimit, hideEmptyRows, showHierarchy, includeNumDen, inputIdScheme, approvalLevel, relativePeriodDate, userOrgUnit, displayProperty, outputIdScheme, tableLayout, columns, rows,startDate,endDate,hideEmptyColumns,includeMetadataDetails,order,timeField,orgUnitField) {
  var baseUrl = baseUrl || "https://dhis2nigeria.org.ng/dhis/api/33/analytics.json?";
  var dx = dx || "Jc1WjNKrObY;KWJ3cSuyzs4;OZH9GfZqZ7q;PV88LZCbiSF;VSVJb5lWp70;bGcL2xrAMSe;pUZ0BKgsAXp;w6nOgEFHWMG;tczLbbhYsiS;goHBOQFkvUE;oq781H4viwX;CVWbR2lSW7H;dCQZ2WnhEwE;zPa9mLmcjmW;g3EHcLqhauw;K6V8hnB7JNm;FOY6SUrgmPi;k2Ncm24FnEA;c7T9iG1BVbo;mvBO08ctlWw;krVqq8Vk5Kw;j30HEsxYK65;Te2VX5hAHnc;bKSVofVt1vy;BFeSKtHhPKi;WLY3o7VjBJj;j6mCLL1X4yG;RcvtixFNivG;pU0Bi0LHHxm;BfcCmnKw8Ck;Pzcrm4XSHrF;DVmbTDEClun;m5gTF1jKQjl;r6WOvUlcQm6;k2Cpuz9BQtD;GEd2F6skCpT;G7iWnz9RMy9;ouzURM9c1FI;e2qpfO0sTti;TccZXCCJymC;SkFvu1mYMe1;gGoaFeTsmoY;GfihIxfGXMJ;zZIBKf9n6n6";
  var ou = ou || "LEVEL-2;LEVEL-3;LEVEL-5;H2ZhSMudlMI";  //LEVEL-2;LEVEL-3;LEVEL-5;H2ZhSMudlMI
  var pe = pe || "MONTHS_THIS_YEAR";  //LAST_MONTH,MONTHS_THIS_YEAR, LAST_12_MONTHS,202006
  var ft = filter || "";
  var agg = aggregationType || "";
  var mc = measureCriteria || "";
  var pamc = preAggregationMeasureCriteria || "";
  var sD = startDate || "";
  var eD = endDate || "";
  var sm = skipMeta || "";
  var sd = skipData || "";
  var sr = skipRounding || "";
  var hm = hierarchyMeta || "true";
  var il = ignoreLimit || "true";
  var tl = tableLayout || "true";
  var her = hideEmptyRows || "true";
  var hec = hideEmptyColumns || "";
  var sh = showHierarchy || "true";
  var ind = includeNumDen || "";
  var imd = includeMetadataDetails || "";
  var dp = displayProperty || "NAME";
  var oIS = outputIdScheme || "NAME"; //"CODE","UID"
  var iis = inputIdScheme || "";
  var al = approvalLevel || "";
  var rpd = relativePeriodDate || "";
  var uou = userOrgUnit || ""; 
  var cols = columns || "dx";
  var rows = rows || "pe;ou";
  var ord = order || "";
  var tf = timeField || "";
  var ouf = orgUnitField || "";
  var unameProp = uname || 'hsdf_username';
  var username = plain_uname || ScriptProperties.getProperty(unameProp);
  var pwdProp = pwd || 'hsdf_password';
  var password = plain_pwd || ScriptProperties.getProperty(pwdProp);
  var target = '' + (dx == '' ? '' : '&dimension=dx:' + dx) + (pe == '' ? '' : '&dimension=pe:' + pe) + (ou == '' ? '' : '&dimension=ou:' + ou) + (ft == '' ? '' : '&filter=' + ft) + (agg == '' ? '' : '&aggregationType=' + agg) + (mc == '' ? '' : '&measureCriteria=' + mc) + (pamc == '' ? '' : '&preAggregationMeasureCriteria=' + pamc) + (sm == '' ? '' : '&skipMeta=' + sm) + (sd == '' ? '' : '&skipData=' + sd) + (sr == '' ? '' : '&skipRounding=' + sr) + (hm == '' ? '' : '&hierarchyMeta=' + hm) + (il == '' ? '' : '&ignoreLimit=' + il) + (her == '' ? '' : '&hideEmptyRows=' + her) + (sh == '' ? '' : '&showHierarchy=' + sh) + (ind == '' ? '' : '&includeNumDen=' + ind) + (iis == '' ? '' : '&inputIdScheme=' + iis) + (al == '' ? '' : '&approvalLevel=' + al) + (rpd == '' ? '' : '&relativePeriodDate=' + rpd) + (uou == '' ? '' : '&userOrgUnit=' + uou) + (dp == '' ? '' : '&displayProperty=' + dp) + (oIS == '' ? '' : '&outputIdScheme=' + oIS) + (tl == '' ? '' : '&tableLayout=' + tl) + (cols == '' ? '' : '&columns=' + cols) + (rows == '' ? '' : '&rows=' + rows) + (sD == '' ? '' : '&startDate=' + startDate) + (eD == '' ? '' : '&endDate=' + endDate) + (hec == '' ? '' : '&hideEmptyColumns=' + hideEmptyColumns) + (imd == '' ? '' : '&includeMetadataDetails=' + includeMetadataDetails) + (ord == '' ? '' : '&order=' + order) + (tf == '' ? '' : '&timeField=' + timeField) + (ouf == '' ? '' : '&orgUnitField=' + orgUnitField);
  var url = baseUrl + target ;
  var slackPostUrl = 'https://hooks.slack.com/services/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';
  var headers = {
        "Authorization": "Basic " + Utilities.base64Encode(username + ':' + password)
  };
  var options =
        {
          "method"  : "GET",
          'headers': headers,
          "muteHttpExceptions": true
        };
  try {
    var response = UrlFetchApp.fetch(url,options);
    sendSlackMessage('Successful Request: ' + baseUrl , 'Accessing url: ' + url + '\nwith username: ' + username + ' was successful',slackPostUrl);
  }
  catch(error) {
    sendSlackMessage('Failed Request: ' + baseUrl , 'Trying to access url: ' + url + '\nwith username: ' + username + ' failed.\nError was ' + error,slackPostUrl);
  }
  return response;
}


//===========


function InitiateExtraction_Default(baseUrl, uname, pwd,slackPostUrl,plain_uname, plain_pwd, ou, dx, pe, filter, aggregationType, measureCriteria, preAggregationMeasureCriteria, skipMeta, skipData, skipRounding, hierarchyMeta, ignoreLimit, hideEmptyRows, showHierarchy, includeNumDen, inputIdScheme, approvalLevel, relativePeriodDate, userOrgUnit, displayProperty, outputIdScheme, tableLayout, columns, rows,startDate,endDate,hideEmptyColumns,includeMetadataDetails,order,timeField,orgUnitField) {
  var baseUrl = baseUrl || "https://dhis2nigeria.org.ng/dhis/api/33/analytics.json?";
  var uname = uname || 'hsdf_username';
  var pwd = pwd || 'hsdf_password';
  var response = getResponseandCodeAPIVersion(baseUrl, uname, pwd,slackPostUrl,plain_uname, plain_pwd, ou, dx, pe, filter, aggregationType, measureCriteria, preAggregationMeasureCriteria, skipMeta, skipData, skipRounding, hierarchyMeta, ignoreLimit, hideEmptyRows, showHierarchy, includeNumDen, inputIdScheme, approvalLevel, relativePeriodDate, userOrgUnit, displayProperty, outputIdScheme, tableLayout, columns, rows,startDate,endDate,hideEmptyColumns,includeMetadataDetails,order,timeField,orgUnitField);
  var content = response.getContentText();
  var contentJson = JSON.parse(content);
  return contentJson;
}

function testing_myVlookup_Default() {
  var sourceArray = ["Thursday","Sunday"];
  var tableToLookup = [
    ["Day_of_week","Day_of_month","Temperature"],
    ["Monday",5,30],
    ["Tuesday",6,27],
    ["Wednesday",7,22],
    ["Thursday",8,20],
    ["Friday",9,25],
    ["Saturday",10,27],
    ["Sunday",11,29]
  ];
//  var columnToSearch = 1;
//  var columnToReturn = 3;
//  var result = myVlookup(sourceArray, tableToLookup,columnToSearch,columnToReturn);
  Logger.log("tableToLookup");
  Logger.log(tableToLookup);
  var transposed_tableToLookup = transpose(tableToLookup);
  Logger.log("transposed_tableToLookup");
  Logger.log(transposed_tableToLookup);
  
}

function myVlookup_Default(sourceArray, tableToLookup,columnToSearch,columnToReturn) {
  var o = [];
  var columnToSearch = Number(columnToSearch - 1);
  var columnToReturn = Number(columnToReturn - 1);
  for (var i = 0; i < sourceArray.length; i++) {
    for (var j = 0; j < tableToLookup.length; j++) {
      if(sourceArray[i] == tableToLookup[j][columnToSearch]) {
        o.push(tableToLookup[j][columnToReturn]);
        break;
      }
    }
  }
  return o;
}

function transpose_Default(a) {
  return Object.keys(a[0]).map(function (c) {
    return a.map(function (r) {
        return r[c];
    });
  });
}

function getNHMISDataset_Pre_Fn_Default(ecec_obj, uname, pwd,slackPostUrl,plain_uname, plain_pwd, ou, dx, pe, filter, aggregationType, measureCriteria, preAggregationMeasureCriteria, skipMeta, skipData, skipRounding, hierarchyMeta, ignoreLimit, hideEmptyRows, showHierarchy, includeNumDen, inputIdScheme, approvalLevel, relativePeriodDate, userOrgUnit, displayProperty, outputIdScheme, tableLayout, columns, rows,startDate,endDate,hideEmptyColumns,includeMetadataDetails,order,timeField,orgUnitField) {
  var baseUrl = "https://dhis2nigeria.org.ng/dhis/api/33/analytics.json?";
  var contentJson = InitiateExtraction(baseUrl, uname, pwd,slackPostUrl,plain_uname, plain_pwd, ou, dx, pe, filter, aggregationType, measureCriteria, preAggregationMeasureCriteria, skipMeta, skipData, skipRounding, hierarchyMeta, ignoreLimit, hideEmptyRows, showHierarchy, includeNumDen, inputIdScheme, approvalLevel, relativePeriodDate, userOrgUnit, displayProperty, outputIdScheme, tableLayout, columns, rows,startDate,endDate,hideEmptyColumns,includeMetadataDetails,order,timeField,orgUnitField);
//  var metadata = contentJson.metaData;
  var contentRows = contentJson.rows;
  var headerRow = contentJson.headers;
  var sheetname = "auto_extracted_data";
  var header = headerRow.map(function (obj,index) {
    return obj.name;
  });
  
  contentRows.forEach(function (row, index) {
    row.splice(0,1);  //Remove Period ID
    row.splice(1,2);  //Remove Period code, Period description
    row.splice(5,2);
    row.splice(6,2);
  });
  contentRows.forEach(function (row, index) {
    if (row[4] !== "") {
      row.splice(6,0,"Facility");
    } else {
      if (row[3] == "") {
        row.splice(6,0,"State");
      } else if (row[4] == "") {
        row.splice(6,0,"LGA");
      }
    }
  });

  header.splice(0,1);
  header.splice(1,2);
  header.splice(5,2);
  header.splice(6,2);
  header.splice(6,0,"Org_unit_level");
  
  var mergedContent = [header].concat(contentRows);
  if(!ss.getSheetByName(sheetname)) {
    ss.insertSheet(sheetname);
  }
  var ws = ss.getSheetByName(sheetname);
  ws.clear();
  SpreadsheetApp.flush();
  ws.getRange(1, 1, mergedContent.length, mergedContent[0].length).setValues(mergedContent);
  var lastRow = ws.getLastRow();
  var lastCol = ws.getLastColumn();
  var maxRow = ws.getMaxRows();
  var maxCol = ws.getMaxColumns();
  var trimGap = 1;
  try {
    ws.deleteRows(lastRow + trimGap, maxRow - (lastRow + trimGap));
    ws.deleteColumns(lastCol + trimGap, maxCol - (lastCol + trimGap));
  }
  catch (err) {
    sendSlackMessage('Error in trimming sheet', 'The rows or columns were out of bounds and this is the exact error ' + err,slackPostUrl);
  }
}

function testCsv_Default() {
  var data_array = [["a","b","c"],[1,2,3],["Mon","Tue","Wed"]];
  var org_unit = "my_org_unit2";
  
  var saveAsCSV_result = DHIS2.saveAsCSV(data_array,org_unit,"1WEF2H7yBKUmK4hBtyiyA1E9l1MFGUMMS");
  var csvFile_created = saveAsCSV_result[0];
  var downloadUrl = saveAsCSV_result[1];
  Logger.log("csvFile_created");
  Logger.log(csvFile_created);
  
  Logger.log("downloadUrl");
  Logger.log(downloadUrl);
}

function gDrive_Default() {
//  var editors = DriveApp.getFolderById('1WEF2H7yBKUmK4hBtyiyA1E9l1MFGUMMS').getOwner();
//  var name = DriveApp.getFolderById('1WEF2H7yBKUmK4hBtyiyA1E9l1MFGUMMS').getName();
  var folders = DriveApp.getFoldersByName('Error_report_CSVs');
  var folder = folders.next();
  
  var folderId = folder.getId();
  
  
//  Logger.log(editors);
  Logger.log(folder);
  Logger.log(folderId);
}