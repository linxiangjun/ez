#Ez.js

为了提高开发的效率，同时增强各种容错率，开发出了Ez.js函数库。解决了一些开发环境中常见的业务需求，节省了开发的时间。ez.js不依赖任何框架或插件，只需要在script中引用外部文件就可以使用。

##使用方法

**在body中引用**

    <script src="ez.js"></srcipt>

**或在head中引用**

    <script src="ez.js" async></srcipt>

##文档

**1、将数组按属性分类**

这一功能经常会在分类商品、或者分类属性中使用，返回值为分组后的对象

    ez.groupBy(array, attributes)
	
	var arr = [{id: 1, price: 12}, {id: 2, price: 10}, {id: 3, price: 12}];

	ez.grounpBy(arr, 'price');  //按价格分类
	
	return {[{id: 2, price: 10}], [{id: 1, price: 12}, {id: 3, price: 12}]}  //返回一个对象


**2、升序/降序数组**

这个功能很常见吧，不过现在只针对简单的数组和值进行排序

    ez.orderBy(array, action)

	var simplyArr = [6, 9 ,3];

	ez.orderBy(simplyArr, 'asc');  //升序
	
	ez.orderBy(SIMPLYaRR, 'desc');  //降序

**3、转换成金额**

传递一个数字，自动转换为带两位数的金额

    ez.toPriceFormat(number)

	ez.toPriceFormat(12);
    
    12.00  //返回内容

**4、处理状态值**

一千个程序员，有一千个返回值，不过现在一个函数就可以免去这些烦恼

    ez.status(ret)

	true  //返回true则表示回调成功
	false  //返回false则表示回调失败
	

**5、验证手机号码/身份证号码**

一个函数解决的事情，绝不多写

    ez.isMobile(phone);

	ez.isIdCard(id);
	

**6、存储、获取、删除Cookie**

存储		

    ez.setCookie(name, value, date)

	ez.setCookie('id', '1', 10);  //存储id，值为1，保存10天（默认30天）

获取

    ez.getCookie(name)

删除

	ez.delCookie(name)


**7、存储、获取、删除localStorage**

存储

    ez.setLocalStorage(name, value)
	
	ez.setLocalStorage('id', 1)  //存储id，值为1，保存本地缓存

获取

	ez.getLocalStorage(name)

删除

	ez.removeLocalStorage(name)

清除

	ez.clearLocalStorage()