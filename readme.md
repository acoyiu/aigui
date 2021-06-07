## AiGUI
### A project designed for help designer to produce mission without help of programmer


## 1: Clone project
```bash
git clone this project
```

## 2: Update IP and port using in redirect.html
```html
<input type="text" style="width: 100%;" id="theText" value="http://192.168.0.63:7070/svg/sample1" />
```
```javascript
location.href = `http://192.168.0.63:7070/?path=${document.getElementById('theText').value}`;
```

## 3: Start Server (this will also host the svg template data)
```bash
http-server -c-1 --cors -p 7070
```