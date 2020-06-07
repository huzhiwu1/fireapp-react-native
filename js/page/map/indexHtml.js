let Html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />

    <title>地图</title>
    <style>
      html {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
      }
      body {
      
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
      }
      #mapPage {
      
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <iframe
      id="mapPage"
      width="100%"
      height="100%"
      frameborder="0"
      src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=GZBBZ-TYWWJ-YJSFR-KEEJ4-X2363-MZFAE&referer=myapp"
    >
    </iframe>

    <script>
      window.addEventListener(
        'message',
        function(event) {
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module == 'locationPicker') {
            //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            window.ReactNativeWebView.postMessage(JSON.stringify(loc))
   
            return loc;
          }
        },
        false
      );
    </script>
  </body>
</html>
`;
export default Html;
