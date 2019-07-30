const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getDateStr = AddDayCount => {
  let obj = [], Days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], curreDate = new Date();
  for (let i = 0; i < AddDayCount; i++) {
    let dd = curreDate;
    dd.setDate(dd.getDate() + i);//获取AddDayCount天后的日期 
    obj.push({ d: dd.getDate(), day: Days[dd.getDay()] })
  }
  return obj
} 

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const json2Form = json => {
  let str = [];
  for(let p in json){
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
}
/**
 * 身份证验证
 */
const identityCodeValid = identityCard => {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    var moreInfo = {};
    var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    if (!identityCard || !reg.test(identityCard)) {
        tip = "身份证号格式错误";
        pass = false;
    } else if(!city[identityCard.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    } else{
        //18位身份证需要验证最后一位校验位
        if(identityCard.length == 18){
            identityCard = identityCard.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = identityCard[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != identityCard[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    if (pass) {
        console.log(identityCard)
        var len = identityCard.length;
        var code = identityCard.join('');
        var strBirthday = "";

        //年龄
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
            strBirthday = code.substr(6, 4) + "/" + code.substr(10, 2) + "/" + code.substr(12, 2);
        }else if (len == 15) {
            strBirthday = "19" + code.substr(6, 2) + "/" + code.substr(8, 2) + "/" + code.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        var birthDate = new Date(strBirthday);
        var nowDateTime = new Date();
        moreInfo.age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        //if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        //    moreInfo.age--;
        //}

        //性别
        if (parseInt(code.substr(16, 1)) % 2 == 1) {
            moreInfo.sex = "男";
        } else {
            moreInfo.sex = "女";
        }
    }

    //if(!pass) alert(tip);
    return {
        'pass':pass,
        'tip':tip,
        'more':moreInfo
    };
}

module.exports = {
  json2Form: json2Form,
  formatTime: formatTime,
  identityCodeValid: identityCodeValid,
  getDateStr: getDateStr
}
