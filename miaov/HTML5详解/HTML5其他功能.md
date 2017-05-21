# HTML5其他功能

内容编辑
```html
contenteditable="true“
```

语言输入
```html
<input type="text" x-webkit-speech />
```

桌面提醒

```js
window.webkitNotifications.requestPermission();
statue = window.webkitNotifications.checkPermission();
var notification =window.webkitNotifications.createNotification("[imgurl]","Title","Body");
notification.show();
```