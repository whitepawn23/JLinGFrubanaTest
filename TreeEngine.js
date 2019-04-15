var treeEngine = (function (){
  var colors = [];
  var nodes =  [];
  var nodesLength;
  var visited = [];
  var output = [];
  var initialSource;
  var RX_RESULT=[];
  
  function _getPath(source,target,visited,paths){
  	visited[source]=true;
   	if (source==target) 
		{ 
      this.output = paths.slice(0);
			visited[source]= false; 
			return ; 
		} 
    $.each(nodes[source],function(i,e){
    	if(!visited[e]){
      	paths.push(e);
        _getPath(e,target,visited,paths);
        $.each(paths,function(ix,ex){
        	if(ex==e){
          	paths.splice(ix,1);
          }
        });
      }
    });
    visited[source]= false; 
  }
  function _getTree(source,target){
   	visited = new Array(nodesLength);  
    $.each(new Array(nodesLength),function(i){
    	visited[i]=false;
    });
    var paths = [];
    this.output = []
    paths.push(source);
    this.output =[];
  	_getPath(source,target,visited,paths);    
    return this.output;
  }
  function _getColor(val){
    var color;
    colors.find(function(e,ix){
      if(ix==val){
        color = e;
        return;
      }
    });	  
    return color;
  }
  function _mapColor(result){
  	var resultColors = [];
    $.each(result,function(ix,ex){
      resultColors[ix]=[];
      $.each(ex,function(iz,ez){
        resultColors[ix].push(_getColor(ez-1));
      });
    });
    return resultColors;
  }
  function _print(arrToSum){
  	var sum=0;
  	$.each(arrToSum,function(i,e){
      var uniqueColors = e.filter(function(itm, ix, a) {
    		return ix == a.indexOf(itm);
			});
      sum= sum+uniqueColors.length;
    });
    console.log(sum);
    return sum;
  }  
  return {
  	setDimension : function(val){
    	nodesLength = val+1;            
      return this;
    },
    setColors : function(arr){
      colors = arr.split(" ");
      return this;
    },
    addEdge: function(edge){    
    	var source=edge.split(" ")[0];
      var target=edge.split(" ")[1];
    	if(nodesLength==undefined){
      	console.error("Length its not defined!!!");
      }
      if(nodes.length==0){      	
        $.each(new Array(nodesLength),function(i){
        	nodes[i]=[];
        });        
        nodes[0].push(source);
        nodes[source].push(0); 
      }
      nodes[source].push(target);
      nodes[target].push(source);
      return this;
    },
    render: function(){    
			$.each(nodes,function(i,e){
      	if(nodes[i+1]==undefined)
        	return;
      	var result=[];
      	$.each(nodes,function(ix,ex){
        	if(nodes[ix+1]==undefined)
						return;
          result.push(_getTree((i+1),(ix+1)));
      	});
        RX_RESULT = $.merge($.merge([], RX_RESULT), result);  
        var resultColors = _mapColor(result);
        _print(resultColors);        
      });
      return this;
    },
    getPath: function(i){
      var result = [];
      jQuery.grep(RX_RESULT, function( n, ix ) {
      	if (n[0]== i){
        	result.push(n);
        }
      });
      return result;
    },
    getColors: function(m){
    	return _mapColor(m);
    },
    getSum: function(m){
    	return _print(m);   
    }
  }
})();

  test1();
  //test2();
  //test3();
  //test4();
  
function test1(){
/*
        1
       / \  
      2   5
     / \ 
    3   4 
*/	 
	var t = treeEngine	
	.setDimension(5)
	.setColors("1 2 3 2 3")
	.addEdge("1 2")
	.addEdge("2 3")
	.addEdge("2 4")
	.addEdge("1 5")
	.render();
  
	//printTest(t,1);
}	

function test2(){
/*
        1
       / \  
      2   3
     / \   \
    4   5   6 - 11
   / \     / \
  7   8   9  10		
*/
	var t = treeEngine	
	.setDimension(11) 
	.setColors("1 2 3 2 3 4 5 3 1 1 2")
	.addEdge("1 2")
	.addEdge("2 4")
	.addEdge("2 5")
	.addEdge("4 7")
	.addEdge("4 8")
	.addEdge("1 3")
	.addEdge("3 6")
	.addEdge("6 11")
	.addEdge("6 9")
	.addEdge("6 10")
	.render();
	
	//printTest(t,1);
}

function test3(){
/*
       4   3 
        \ /
     5 - 1 - 2
        / \
       6   7 - 8
      / \
     9  10
*/	
	var t = treeEngine	
	.setDimension(10)
	.setColors("1 2 3 2 3 4 5 3 1 1")
	.addEdge("1 2")
	.addEdge("1 3")
	.addEdge("1 4")
	.addEdge("1 5")
	.addEdge("1 6")
	.addEdge("1 7")
	.addEdge("7 8")
	.addEdge("6 9")
	.addEdge("6 10")
	.render();
  
	//printTest(t,1);
}

function test4(){
/*
          1
         / \  
        2 - 3
       / \ / \
      4 - 5 - 6
     / \ / \ / \
    7 - 8 - 9 - 10
*/	
	var t = treeEngine	
	.setDimension(10)
	.setColors("1 2 3 2 3 4 5 3 1 1")
	.addEdge("1 2")
	.addEdge("1 3")
	.addEdge("2 4")
	.addEdge("2 5")
	.addEdge("3 5")
	.addEdge("3 6")
	.addEdge("4 7")
	.addEdge("4 8")
	.addEdge("5 8")
	.addEdge("5 9")
	.addEdge("6 9")
	.addEdge("6 10")
	.addEdge("2 3")
	.addEdge("4 5")
	.addEdge("5 6")
	.addEdge("7 8")
	.addEdge("8 9")
	.addEdge("9 10")
	.render();
  
	//printTest(t,1);
}

function printTest(engine,root){
	var path=  engine.getPath(root);
	var colors = engine.getColors(path);
  var sum = engine.getSum(colors);
  console.log("Path " + root + ": " + JSON.stringify(path) + " Colors: " + JSON.stringify(colors) + " Result: " + JSON.stringify(sum));
  }
