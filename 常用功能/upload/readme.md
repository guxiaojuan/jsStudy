### 表单提交
#### 前言： form表单的action属性规定的页面会在新窗口打开，target属性规定了在何处打开action窗口

1. 利用iframe实现无刷新表单提交
    > 在页面中添加一个隐藏的iframe，将表单的target属性设置为iframe的name值。
    >> 小知识： (contentWindow和window.parent)   
    在父级页面获取iframe页面的内容：document.getElementById("parent").contentWindow.
    document.getElementById("son");   
    在子iframe中获取父级页面对象：window.parent.document.getElementById("parent");
    
2. 通过type=submit提交
3. js调用submit()提交表单
```
    let form = document.getElementById("myform");
    form.submit();
```
4. ajax异步提交表单
    