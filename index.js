'use strict';

module.exports = function(ret){
    var namespace = feather.config.get('namespace');
    //为所有的rewrite文件里的url增加namespace
    var file = ret.src['/conf/rewrite.js'];

    if(file){
        var rewrite = require(file.realpath);
        var arr = [];

        feather.util.map(rewrite, function(key, path){
            if(typeof path == 'string'){
                path = '/' + path.replace(/^\//, '');

                var f = ret.src[path];

                if(f){
                    arr.push('module.exports[' + JSON.stringify(key) + '] = \'/' +  namespace + f.subpath

                     + '\';');
                }
            }
        });

        file.setContent(file.getContent() + ';\r\n' + arr.join(';\r\n'));
    }
};