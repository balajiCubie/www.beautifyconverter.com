function CSVToArray(r,e){e=e||",";for(var n=new RegExp("(\\"+e+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+e+"\\r\\n]*))","gi"),a=[[]],g=null;g=n.exec(r);){var l=g[1];if(l.length&&l!=e&&a.push([]),g[2])var t=g[2].replace(new RegExp('""',"g"),'"');else var t=g[3];a[a.length-1].push(t)}return a}function CSV2JSON(r){for(var e=CSVToArray(r),n=[],a=1;a<e.length;a++){n[a-1]={};for(var g=0;g<e[0].length&&g<e[a].length;g++){var l=e[0][g];n[a-1][l]=e[a][g]}}var t=JSON.stringify(n),v=t.replace(/},/g,"},\r\n");return v}