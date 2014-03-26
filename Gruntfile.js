'use strict';

module.exports = function(grunt) {

    // Grunt config object
    var taskConfig = {

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            public: ['public']
        },

        // handles LESS compilation and uglification
        less: {
            development: {
                files: {
                    'public/css/4th-happiness.css': 'src/client/less/main.less'
                }
            },
            production: {
                files: {
                    'public/css/4th-happiness.css': 'src/client/less/main.less'
                },
                options: {
                    cleancss: true
                }
            }
        },

        copy: {
            html: {
                files: [
                    {
                        src: ['*.html', 'views/**/*.html'],
                        dest: 'public',
                        expand: true,
                        cwd: 'src/client'
                    }
                ]
            },
            images: {
                files: [
                    {
                        src: ['images/*'],
                        dest: 'public',
                        expand: true,
                        cwd: 'src/client'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        src: ['fonts/*'],
                        dest: 'public',
                        expand: true,
                        cwd: 'src/client/lib/bootstrap'
                    }
                ]
            }
        },

        concat: {
            developmentLib: {
                src: [
                    'src/client/lib/jquery/dist/jquery.js',
                    'src/client/lib/bootstrap/dist/js/bootstrap.js'
                ],
                dest: 'public/js/4th-happiness-lib.js'
            }
        },

        nodemon: {
            development: {
                script: 'server.js',
                options: {
                    args: [],
                    watch: ['public/**', 'src/server/**'],
                    ignore: ['node_modules/**'],
                    ext: 'js',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        watch: {
            less: {
                files: ['main.less'],
                tasks: ['less:development'],
                options: {
                    cwd: 'src/client/less',
                    livereload: true
                }
            },
            html: {
                files: ['*.html', 'views/**/*.html'],
                tasks: ['newer:copy:html'],
                options: {
                    cwd: 'src/client',
                    livereload: true
                }
            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }

    };

    // Project Configuration
    grunt.initConfig(taskConfig);

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('development', [
        'clean',
        'copy',
        'less:development',
        'concat:developmentLib',
        'concurrent'
    ]);

    grunt.registerTask('default', ['development']);
};