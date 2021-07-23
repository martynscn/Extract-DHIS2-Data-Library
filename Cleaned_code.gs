function getResponse(baseUrl,plain_uname, plain_pwd, ou, dx, pe) {
  return getResponseFull(baseUrl,null , null,null,plain_uname, plain_pwd, ou, dx, pe,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null,null,null,null,null,null,null);

}

function getResponseFull(baseUrl, uname, pwd,slackPostUrl,plain_uname, plain_pwd, ou, dx, pe, filter, aggregationType, measureCriteria, preAggregationMeasureCriteria, skipMeta, skipData, skipRounding, hierarchyMeta, ignoreLimit, hideEmptyRows, showHierarchy, includeNumDen, inputIdScheme, approvalLevel, relativePeriodDate, userOrgUnit, displayProperty, outputIdScheme, tableLayout, columns, rows,startDate,endDate,hideEmptyColumns,includeMetadataDetails,order,timeField,orgUnitField) {
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
//  Logger.log("url");
//  Logger.log(url);
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


function removeArrays(original_array,header, arrays_to_remove) {
  var original_array = original_array || [["a","b","c","d","e","f"],[1,2,3,4,5,6]];
  var arrays_to_remove = arrays_to_remove || ["a","e","c"];
  var header = header || original_array[0];
  var arrays_to_remove_index = arrays_to_remove.map(el => header.indexOf(el));
  arrays_to_remove_index.sort((a,b) => b - a);
  original_array.forEach(function(row,index) {
    arrays_to_remove_index.forEach(function (element,ind) {
      if(element != -1) {
        row.splice(element,1);
      }
    });
  });
  return original_array;
}

function getDHIS2LastNMonths(no_of_months) {
  var no_of_months = no_of_months || 5;
  var today = new Date();
  var my_date = new Date();
  var date_array = [];
  for (var x = 1; x <= no_of_months; x++) {
    my_date.setDate((my_date).getDate() - (30));
    date_array.push(my_date.getFullYear() + ('' + (my_date.getMonth()+1)).padStart(2,"0"));
  }
  var result = date_array.join(";");
  return result;
}