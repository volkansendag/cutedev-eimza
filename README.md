# HTML5 E-İmza Uygulaması

Bu repository, Chrome uzantısı olarak hazırlanmış olan [CuteDev E-imza](https://chrome.google.com/webstore/detail/cutedev-e-imza/ehjffgchplohbcbeakpncbgconplfjpg) uygulamasının örnek web arayüzünü içerir. 

## Chrome Extension

Elektronik imzalama işlemlerini chrome üzerinde yapabilmek için applet uygulamalar kullanılmaktaydı. Ancak Chrome 2015 yılında applet uygulamalara destek vermeyeceğini duyurdu ve bunu uyguladı. Bu durumda elektronik imzalama işlemini HTML5 ile gerçekleştirmek dışında bir seçenek kalmadı.

[CuteDev E-imza](https://chrome.google.com/webstore/detail/cutedev-e-imza/ehjffgchplohbcbeakpncbgconplfjpg) eklentisi sayesinde Chrome üzerinde HTML5/JS teknolojisini kullanarak elektronik imza atmak mümkün hale gelmektedir.

## Örnek Uygulama

<iframe style="width: 300px; height: 300px" src="https://jsfiddle.net/naklov67/wh5omkja/"></iframe>

[http://jsfiddle.net/naklov67/wh5omkja/](//jsfiddle.net/naklov67/wh5omkja/) üzerinden denemeler yapabilirsiniz.



## Kullanımı

Uygulamanın örnek kullanımı aşağıdaki şekildedir.

    window.addEventListener("message", function (e) {
            if (e.data && e.data.type && e.data.type == "FROM_APP") {
                var response = e.data.response;
                if (response.Error) {
                    // todo
                } else if (response.Value) {
                    console.log(response.Value);
                    saveAs(url);
                }
            }
        }, false);

    window.postMessage({
                        type: "FROM_PAGE",
                        methodName: "imzala",
                        callbackId: "78465416549879",
                        Data: {
                            base64File: base64,
                            pin: $pin.val(),
                        }
                    }, "*");
                    
##License

[MIT License](http://opensource.org/licenses/MIT) © volkansendag
