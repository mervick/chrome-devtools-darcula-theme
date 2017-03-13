/* jshint node: true */
"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    sourcemap: 'file',
                    unixNewlines: true,
                    compass: true,
                    lineNumbers: false,
                    style: "compact"
                },
                files: {
                    'stable.css' : 'stable.scss'
                }
            },
        },
        "string-replace" : {
            dist: {
                files: {
                    'stable.css': 'stable.css',
                },
                options: {
                    replacements: [{
                        pattern: '/*# sourceMappingURL=stable.css.map */',
                        replacement: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,<%= new Buffer(grunt.file.read("stable.css.map")).toString("base64") %> */'
                    }]
                }
            }
        },
        watch: {
            apps: {
                files: [
                    '**/*.scss'
                ],
                tasks: ['sass:dist', 'string-replace:dist'],
            },
        },
        cssmin: {
            options: {
                sourceMap: false
            },
            target: {
                files: {
                    'stable.min.css': ['stable.css']
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'cssmin', 'watch']);
    grunt.registerTask('update', ['sass', 'cssmin']);
};