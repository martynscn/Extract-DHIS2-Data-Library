function tt() {
  var arr_slice = [0,1,2,3,4,5,6,7,8,9];
  var arr_splice = [0,1,2,3,4,5,6,7,8,9];
  var res_slice = arr_slice.slice(0, 4);
  Logger.log(arr_slice);  //[0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]
  Logger.log(res_slice);  //[0.0, 1.0, 2.0, 3.0]
  var res_splice = arr_splice.splice(4, 99999);
  Logger.log(arr_splice); //[4.0, 5.0, 6.0, 7.0, 8.0, 9.0]
  Logger.log(res_splice); //[0.0, 1.0, 2.0, 3.0]
}