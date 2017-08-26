'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        
        // SCSS to CSS
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        
        // are the any scss changes, if so, run to css
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        
        // refresh browser after changes
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    
    grunt.registerTask('default', ['browserSync', 'watch']);

};