
let fs = require('fs-extra'),
klaw = require('klaw'),
path = require('path'),
min = require('uglify-js');

klaw('./src').on('data', function (item) {

    if (item.stats.isFile()) {

        fs.ensureDir('./dist').then(function () {

            return fs.readFile(item.path, 'utf-8')

        }).then(function (data) {

            let ext = path.extname(item.path),
            fn = path.basename(item.path, ext),
            fn_target = fn + '.min' + ext,
            dir = path.join('./dist', fn_target);

            fs.writeFile(path.join('./public', fn_target), min.minify(data).code, 'utf-8');

            return fs.writeFile(dir, min.minify(data).code, 'utf-8');

        }).then(function () {

            console.log('built: ' + item.path);

        }).catch (function (e) {

            console.log(e);

        });

    }

});
