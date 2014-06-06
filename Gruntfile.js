module.exports = function (grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        // Task configuration
        less        : {
            development: {
                options: {
                    compress: false  //minifying the result
                },
                files  : {
                    //compiling frontend.less into frontend.css
                    "./public/css/styles.css": "./src/assets/less/bootstrap.less"
                }
            },
            production : {
                options: {
                    compress: true  //minifying the result
                },
                files  : {
                    //compiling frontend.less into frontend.css
                    "./public/css/styles.css": "./src/assets/less/bootstrap.less"
                }
            }
        },
        autoprefixer: {
            options    : {
                browsers: ['last 2 version', 'ie 9']
            },
            // prefix the specified file
            single_file: {
                options: {
                    // Target-specific options go here.
                },
                src    : './public/css/styles.css',
                dest   : './public/css/styles.css'
            }
        },
        concat      : {
            options   : {
                separator: ';'
            },
            javascript: {
                src : [
                    './src/assets/js/app.js'
                ],
                dest: './public/js/scripts.js'
            }
        },
        uglify      : {
            build: {
                src : './public/js/scripts.js',
                dest: './public/js/scripts.min.js'
            }
        },
        watch       : {
            js   : {
                files  : ['./src/assets/js/app.js'],   //watched files
                tasks  : ['concat:javascript'],//tasks to run
                options: {
                    livereload: true//reloads the browser
                }
            },
            less : {
                files  : ['./src/assets/less/**/*.less'],  //watched files
                tasks  : ['less:development'],                          //tasks to run
                options: {
                    livereload: true                        //reloads the browser
                }
            },
            views: {
                files  : ['./app/views/**/*.blade.php'],
                options: {
                    livereload: true
                }
            },
            css  : {
                files: ['.public/css/style.css'],
                tasks: ['autoprefixer']
            }
        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Task definition
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('production', ['less:production', 'autoprefixer', 'concat', 'uglify']);
};
