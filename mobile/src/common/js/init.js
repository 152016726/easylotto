/**
 * Created by DDT on 2019/4/9.
 */
// 先设置当前使用终端
import pageSetting from '#/pageSetting';
pageSetting.setFromSrc('M');

import "#/common/init";
import '../style/common.scss';

// px转rem需要注入html头样式
var font_size = document.documentElement.clientWidth / 10;
document.getElementsByTagName("html")[0].style.fontSize = `${font_size}px`;

