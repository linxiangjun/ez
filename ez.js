/*
  Ez.js library
  Released under the MIT license

  author: LXJ
  date: 2017.4.19
*/

(function(window, undefined) {

  "use strict";

  var v = Object.create(null);

  var mobileReg = new RegExp('^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$');
  var idCardReg = new RegExp('^([0-9]{17})[X|x|0-9]{1}$');
  var emailReg = new RegExp('^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$');

  function isNumber(num) {
    if(!isNaN(num) && num.__proto__ === Number.prototype) {
      return num;
    } else {
      return false;
    }
  }

  function isArray(arr) {
    if(arr instanceof Array && arr.constructor === Array) {
      if(arr.length !== 0) {
        return arr;
      } else {
        return null;
      }
    } else {
      return false;
    }
  }

  function isObject(obj) {
    if(obj instanceof Object && obj.constructor === Object) {
      if(JSON.stringify(obj) !== '{}') {
        return obj;
      } else {
        return null;
      }
    } else {
      return false;
    }
  }

  //Create a object array
  var createNewArray = function(obj, item, val) {
    obj[val] = [];
    obj[val].unshift(item);
  };

  //Array Grouping by whatever
  v.groupBy = function(arr, name) {
    var obj = {};

    if(isArray(arr)) {
      arr.map(function(item) {
        var val = item[name];

        obj[val] === undefined
          ? createNewArray(obj, item, val)
          : obj[val].push(item);
      })
    } else {
      return arr;
    }
    return obj;
  };

  //Quick sort arithmetic
  function quickSort(arr) {
    if(arr.length <= 1) {return arr}

    var pivotIndex = Math.floor(arr.length / 2);

    var pivot = arr.splice(pivotIndex, 1)[0];

    var left = [],
        right = [];

    for(var i = 0; i < arr.length; i++) {
      if(arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    i = null;

    return quickSort(left).concat([pivot], quickSort(right));
  }

  //Determine whatever the array is sort
  v.isSort = function(arr) {
    if(isArray(arr)) {
      if(arr[0] < arr[1]) {
        for(var i = 2; i < arr.length; i++) {
          if(arr[i - 1] > arr[i]) {
            return false;
          } else if (i === arr.length - 1) {
            return 'asc';
          }
        }
      } else {
        for(var i = 2; i < arr.length; i++) {
          if(arr[i - 1] < arr[i]) {
            return false;
          } else if (i === arr.length - 1) {
            return 'desc';
          }
        }
      }
    } else {
      return arr;
    }
  };

  //Ascending array or Descending array
  v.orderBy = function(arr, act) {
    if(isArray(arr) && act) {
      if (!!act.match(/(asc)|(ASC)/)) {
        return quickSort(arr);
      } else if(!!act.match(/(desc)|(DESC)/)) {
        return quickSort(arr).reverse();
      }
      console.warn("Please input asc or desc");
    } else {
      return arr;
    }
  };

  //Transfer amount to price format
  v.toPriceFormat = function(num) {
    if(!isNaN(num)) {
      return Number(num).toFixed(2);
    } else {
      return num;
    }
  };

  //Solve thousands of values
  v.status = function(ret) {
    var arr = ['status', 'code'];  //input a response stauts
    var reg = new RegExp("(^[+]?[0-1]|success|true)", "gi");  //input a RegExp response status's value

    for(var i = 0; i < arr.length; i++) {
      if(ret.hasOwnProperty(arr[i])) {
        ret[arr[i]] = ret[arr[i]] + '';
        return !!ret[arr[i]].match(reg);
      } else if(i === arr.length - 1) {
        console.warn("Please write a new status");
      }
    }
    i = null;
  };

  v.isMobile = function(phone) {
    return !!phone.toString().match(mobileReg);
  };

  v.isIdCard = function(id) {
    return !!id.toString().match(idCardReg);
  };

  v.isEmail = function(name) {
    
  }

  //Set cookie
  v.setCookie = function(name, value, days) {
    var days = days || 30;
    var date = new Date();
    date.setTime(date.getTime() + days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + date.toGMTString();
  };

  //Get cookie
  v.getCookie = function(name) {
    var arr, reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  };

  //Delete cookie
  v.delCookie = function(name) {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var cval = v.getCookie(name);
    if(cval !== null) {
      document.cookie= name + "=" + cval + ";expires=" + date.toGMTString();
    }
  };

  //set localStorage
  v.setLocalStorage = function(name, value) {
    var val = JSON.stringify(value);
    window.localStorage.setItem(name, val);
  };

  v.getLocalStorage = function(name) {
    return JSON.parse(window.localStorage.getItem(name));
  };

  v.removeLocalStorage = function(name) {
    window.localStorage.removeItem(name);
  };

  v.clearLocalStorage = function() {
    window.localStorage.clear();
  };

  //Get URL delivery param
  v.getURLParam = function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r !== null) {
      return  unescape(r[2]);
      return null;
    }
  };

  //Get phone OS
  v.getPhoneOS = function() {
    var type = navigator.userAgent;
    var isAndroid = type.indexOf('Android') > -1 || type.indexOf('Adr') > -1;
    var isIOS = !!type.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    return !isAndroid
      ? isIOS
        ? alert('ios')
        : alert(undefined)
    : alert('android');
  }

  //Get browser type
  v.getBrowserType = function() {
    var commonBrowserArr = ['chrome', 'firefox', 'opera', 'safari', 'ie'];  //Common browser

    var userAgent = navigator.userAgent;
    for(var i = 0; i < commonBrowserArr.length; i++) {
      if(i <= commonBrowserArr.length && navigator.userAgent.toLowerCase().indexOf(commonBrowserArr[i]) > -1) {
        return commonBrowserArr[i];
      }

      if(i === commonBrowserArr.length) {
        return userAgent;
      } else {
        continue;
      }
    }
    i = null;
  }

  //Display all border elements in the page
  v.showAllBorders = function() {
    [].forEach.call($$("*"), function(a) {
      a.style.outline = "1px solid #" + (~~(Math.random()*(1<<24))).toString(16);
    })
  };

  //Convert to JSON String and print 
  v.printJ = function(value) {
    console.log(JSON.stringify(value));
  }

  //Get browser window height
  v.getWindowHeight = function(value) {
    value = value || 300;
    let width = document.body.scrollWidth;
    let height = document.body.scrollHeight;
    
    return (width < 768)
      ? value + 'px'
      : (height - 60) + 'px';
  }

  //TODO 更多的方法正在陆续的加入中

  window.ez = v;

})(window);