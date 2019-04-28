/**
 * Created by DDT on 2016/5/13.
 */
'use strict';

module.exports = function(content) {
    if (this.cacheable) { this.cacheable(); }

    var regex = new RegExp('([ |:])([\\+|-]){0,1}(\\d+\\.){0,1}(\\d+px){1}', 'g');
    content = content.replace(regex, '$1px2rem($2$3$4)');

    if(!/(function px2rem|profile.scss)/.test(content)){
        content = '@import "~common/style/profile.scss";' + content;
    }

    return content;
};