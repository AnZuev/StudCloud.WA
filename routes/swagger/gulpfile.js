'use strict';
let fs = require('fs');
let gulp = require('gulp');
let concat = require('gulp-concat');
let map = require('map-stream');
let yaml = require('js-yaml');
let gutil = require('gulp-util');


gulp.task('yaml2json', function(){
	gulp.src(["./yamlDefinitions/*.yaml"])
		.on('data', function(file){
			console.log(file.path);
		})
		.pipe(map(function(file,cb){
			if (file.isNull()) return cb(null, file); // pass along
			if (file.isStream()) return cb(new Error("Streaming not supported"));
			let json;
			try {
				json = yaml.load(String(file.contents.toString('utf8')));
			} catch(e) {
				console.log(e);
				console.log(json);
			}

			file.path = gutil.replaceExtension(file.path, '.json');
			file.contents = new Buffer(JSON.stringify(json));

			cb(null,file);
		}))
		.pipe(gulp.dest('./jsonDefinitions'));
});
