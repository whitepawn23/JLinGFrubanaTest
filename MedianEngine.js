var medianEngine = (function (){
	var medianValues = [];
  function _add(value){
  	medianValues.push(value);
    if(medianValues.length==1) {
      return value;
    }
    return _compute();
  }
  
  function _compute(){
  	medianValues = medianValues.sort(function(a, b){return a-b});
    var middle = Math.floor((medianValues.length - 1) / 2);
    if (medianValues.length % 2) {
    		calc = medianValues[middle];
        return calc;
    } else {
        calc = (medianValues[middle] + medianValues[middle + 1]) / 2.0;
        return calc;
    }
  }
  
  function _rem(value){
  	if($.inArray( value, medianValues ) == -1) {	
    	return "Wrong!";
    }
    //remove value from array
    medianValues.splice($.inArray(value, medianValues),1);
    if(medianValues.length == 0)
    	return "Wrong!";
    return _compute();
  }
  
  function _perform(operation, value) {
  	switch (operation) {
    	case "a":
			return console.log(_add(value));
		case "r":
			return console.log(_rem(value));
    }    	      
  }
  
	return {
  		render: function(data) {
      	//Initial validations
        if(data.length == 0){
        	console.error("Exception: MedianValues can not be empty");
          return;
        }
        //getting lenght of operations
        if (!$.isNumeric(data[0])) {
        	console.error("Exception: The first value of MedianValues must be numeric");
          return;
        }
		medianValues = [];
        //loop for count of operations
        $.each(data.slice(1, data[0]+1),function(i,e){
          if(e.length < 2){
          	console.error("Exception: Operation and value, must have at least 2 characters!"); 
          	return;
          }
        	//get the operation
          var operation = e.substring(0,1);
          if($.inArray( operation, [ "a", "r" ] ) == -1) {	
          	console.error("Exception: Operation [" + operation + "] not implemented." );
          	return;
          }
          var value = e.substring(1);
          if (!$.isNumeric(value)) {
        		console.error("Exception: The value to operate must be numeric");
          	return;
        	}
          _perform(operation,parseInt(value));
        });
  		}
	}
})();


///Samples
	//Sample input
  var sampleInput = [7,"r1","a1","a2","a1","r1","r2","r1"];
  medianEngine.render(sampleInput);
	//Even sample
	var evenSample = [4,"a5","a2","a10","a4"];
  medianEngine.render(evenSample);
	//Odd sample
	var oddSample =[5,"a9","a2","a8","a4","a1"];
  medianEngine.render(oddSample);
///Internal test
	//Max values
  var maxValues = [3, "a" + Math.pow(10,5), "r" + Math.pow(10,4), "a" + Math.pow(10,5) ];
 	medianEngine.render(maxValues);
	//Large data
	var largeData = [30,'a55981','r70723','a79578','a6883','a43959','r7873','a31673','a92282','a56116','r64779','a65523','r62096','a59845','r28364','a83636','a79805','r30323','a35148','a41080','a59732','a15592','r79364','a36200','a78972','a16770','r2141','a86774','a92153','a83568','r53913']
 	medianEngine.render(largeData);


