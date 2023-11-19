
    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        return false;
    }   
    
    $(function () {
        if (detectIE()) {
                        
            $('#IE-warning').html("Our converter may not work with Internet Explorer.<br>Please use Chrome or Firefox if you can.");
        }
        $("#imgInp").change(function () {
        
            if (this.files && this.files[0]) {                              
                processFile(this.files[0], this.files[0].name);
            }
        });
        var options = {}
        var zone = new FileDrop('file-drop-zone', options);
        zone.event('send', function (files) {
            if (files.length > 3 )
            {
                alert('You may only upload up to 3 files at once.');
                return;
            }

          files.each(function (file) {
                                      
            file.readData(
              function (uri, name) {
                var blob = new Blob([uri]);
                processFile(blob, file.name);
              },
              function (error) {
              }
            )             
              
          })
        })      
        $("#file-drop-zone .btn").click(function () {
            $("#file-drop-zone input").trigger('click');
        });
    });
    var currPage;
    var thePDF = null;
    function handlePages(page, fileName) {
        var scale = 1.5;
        var viewport = page.getViewport(scale);

        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        page.render(renderContext).promise.then(function () {
            $("#output-files").parents("div.form-group").removeClass("hide");

            var dl = document.createElement('a');
            var canvas = document.getElementById("the-canvas");

            var fileObject = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)

            // output file
            dl.setAttribute('href', fileObject);

            var outputFile = fileName.toLowerCase().replace('.pdf', '') + (thePDF.numPages > 1 ? (' page ' + (currPage)) : '') + '.png';
            dl.setAttribute('download', outputFile);
            $(dl).text(outputFile);
            $('#output-files').append($(dl));
            fireEvent(dl, 'click');
            currPage++;
            if (thePDF !== null && currPage <= thePDF.numPages) {

                thePDF.getPage(currPage).then(function (page) {
                    handlePages(page, fileName);
                });
            }
        });

    }
    function fireEvent(obj, evt) {
        var fireOnThis = obj;
        if (document.createEvent) {
            var evObj = document.createEvent('MouseEvents');
            evObj.initEvent(evt, true, false);
            fireOnThis.dispatchEvent(evObj);
        } else if (document.createEventObject) {
            var evObj = document.createEventObject();
            fireOnThis.fireEvent('on' + evt, evObj);
        }
    }
    function processFile(blob, fileName) {
        var reader = new FileReader();
        reader.onload = function (e) {
            PDFJS.workerSrc = 'https://https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.1.13/pdf.worker.min.js';
            var pdfAsDataUri = e.target.result;
            var pdfAsArray = convertDataURIToBinary(pdfAsDataUri);
            PDFJS.getDocument(pdfAsArray).then(function (pdf) {
                thePDF = pdf;
                pdf.getPage(1).then(function (page) {
                    currPage = 1;
                    handlePages(page, fileName);
                });
            });
        }
        reader.readAsDataURL(blob);
        var BASE64_MARKER = ';base64,';
        function convertDataURIToBinary(dataURI) {
            var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            var base64 = dataURI.substring(base64Index);
            var raw = window.atob(base64);
            var rawLength = raw.length;
            var array = new Uint8Array(new ArrayBuffer(rawLength));
            for (i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            return array;
        }
    }