# HTML5 E-İmza Uygulaması

Bu repository, Chrome uzantısı olarak hazırlanmış olan [CuteDev E-imza](https://chrome.google.com/webstore/detail/cutedev-e-imza/ehjffgchplohbcbeakpncbgconplfjpg) uygulamasının örnek web arayüzünü içerir. 

## Chrome Extension

Elektronik imzalama işlemlerini chrome üzerinde yapabilmek için applet uygulamalar kullanılmaktaydı. Ancak Chrome 2015 yılında applet uygulamalara destek vermeyeceğini duyurdu ve bunu uyguladı. Bu durumda elektronik imzalama işlemini HTML5 ile gerçekleştirmek dışında bir seçenek kalmadı.

[CuteDev E-imza](https://chrome.google.com/webstore/detail/cutedev-e-imza/ehjffgchplohbcbeakpncbgconplfjpg) eklentisi sayesinde Chrome üzerinde HTML5/JS teknolojisini kullanarak elektronik imza atmak mümkün hale gelmektedir.

## Örnek Uygulama

[http://jsfiddle.net/naklov67/wh5omkja/](//jsfiddle.net/naklov67/wh5omkja/) üzerinden denemeler yapabilirsiniz.



## Kullanımı

Uygulamanın örnek kullanımı aşağıdaki şekildedir.

	cute.eimza.imzala({
			base64File: base64,
			pin: $pin.val(),
			tip: 0, // 0:BES, 1:EST, 2:XLONG
			ayar: {
				ZDServerUrl: "http://zd.kamusm.gov.tr",
				ZDMusteriNo: "",
				ZDMusteriParola: "",
				UploadUrl: "",
			}
		},
		function (response) {
			if (response.Error)
				$("#response").html(response.Message);
			else {
				var val = response.Value;
				if (val.PostResult) {
					$("#response").html(val.PostResult)
				} else if (response.Value.signedBase64File) {
					var url = 'data:' + $input.data("type") + ';base64,' + response.Value.signedBase64File;
					cute.saveAs(url, $input.data("name") + ".p7s");
					$("#response").html("Dosya imzalandı.")
				} else {
					$("#response").html("Sonuç hatalı.")
				}
			}
			console.log("success", response);
		},
		function (e) {
			console.log("error", e);
			$("#response").html("İmzalama başarısız. Ex:" + e.message);
		});

                    
##License

[MIT License](http://opensource.org/licenses/MIT) © volkansendag
