var forFrame = (function () {

    var container = document.getElementById('ff') || document.body;

    // the api for the init methods of a ff object
    var initAPI = {

        // add a display object
        //addDisp: function (type, id, draw) {

        addDisp: function (options) {

            var obj = {};

            options = options || {};
            options.type = options.type || 'graphics';
            options.id = options.id || 'disp' + this.obj.length;
            options.forFrame = options.forFrame || function () {};

            if (options.type === 'graphics') {

                obj.disp = this.game.add.graphics(0, 0);

            }

            if (options.type === 'text') {
                //game.add.text(0, 0, 'Hello World', {fill : 'white'});

                //obj.disp = this.game.add.graphics(0, 0);

                options.text = options.text || 'hello world';
                options.style = options.style || {
                    fill: 'red'
                };

                obj.disp = this.game.add.text(0, 0, options.text, options.style);

            }

            obj.id = options.id;
            obj.type = options.type;
            obj.forFrame = options.forFrame;

            this.obj.push(obj);

        }

    },

    // forFrame method api
    ffAPI = {

        // get display object
        get: function (id) {

            return _.find(this.obj, {
                id: id
            });

        },

        // segment method use to make a repeating segment animation
        segment: function (rules, forFrame) {

            rules = rules || 0.25;
            forFrame = forFrame || function () {};

            // set segment values
            let maxFrame = this.maxFrame * rules,
            frame = this.frame % maxFrame,
            per = frame / maxFrame;

            forFrame.call(_.merge({}, this, {
                    seg: {

                        frame: Math.floor(frame),
                        maxFrame: Math.floor(maxFrame),
                        per: per,
                        bias: 1 - Math.abs(.5 - per) / .5

                    }
                }));

        },

        // range is used to make an animation that runs between a start and end range
        range: function (argv) {

            argv = argv || {};
            argv.start = argv.start || 0;
            argv.end = argv.end || 1;
            argv.forFrame = argv.forFrame || function () {};

            // set segment values
            let maxFrame = this.maxFrame * (argv.end - argv.start),
            frame = this.frame % maxFrame,
            per = frame / maxFrame;

            if (this.per >= argv.start && this.per <= argv.end) {

                argv.forFrame.call(_.merge({}, this, {

                        seg: {

                            frame: Math.floor(frame),
                            maxFrame: Math.floor(maxFrame),
                            per: per,
                            bias: 1 - Math.abs(.5 - per) / .5

                        }

                    }));

            }

        }

    },

    // play / pause
    play = function (ff) {

        ff.play = !ff.play;

    },

    // tick the animation
    tick = function (ff) {

        // step fram index
        ff.frame += 1;
        if (ff.frame >= ff.maxFrame) {

            ff.frame = 0;

        }

    };

    // return the method that will be called when making the animation
    return function (ff) {

        // set starting values
        ff.frame = 0;
        ff.maxFrame = ff.maxFrame || 50;
        ff.per = 0;
        ff.bias = 0;

        ff.obj = [];
        ff.play = true;
        ff.width = ff.width || 320;
        ff.height = ff.height || 240;
        ff.name = ff.name || 'untitled';

        // these should be given, but default to noop anyway
        ff.init = ff.init || function () {};
        ff.forFrame = ff.forFrame || function () {};

        // using phaser
        ff.game = new Phaser.Game(ff.width, ff.height + 50, Phaser.AUTO, container, {

                // phaser create state method
                create: function () {

                    // call the animations ini method here
                    ff.init.call(_.merge(ff, initAPI));

                    // be sure to do this so phaser does not
                    // scroll to the top on mobile
                    ff.game.scale.compatibility.scrollTo = false;

                    // play button
                    var button_play = this.game.add.graphics(0, ff.height);
                    button_play.beginFill(0x00ff00);
                    button_play.drawRect(0, 0, 50, 50);
                    button_play.endFill();
                    button_play.inputEnabled = true;
                    button_play.events.onInputDown.add(function () {

                        play(ff);

                    });

                    // tick button
                    var button_tick = this.game.add.graphics(0, ff.height);
                    button_tick.beginFill(0x0000ff);
                    button_tick.drawRect(50, 0, 50, 50);
                    button_tick.endFill();
                    button_tick.inputEnabled = true;
                    button_tick.events.onInputDown.add(function () {

                        tick(ff);

                    });

                },

                // phaser update method
                update: function () {

                    // set per, and bias values for the current frame
                    ff.per = ff.frame / ff.maxFrame;
                    ff.bias = 1 - Math.abs(.5 - ff.per) / .5;

                    // call main for frame method
                    ff.forFrame.call(_.merge({}, ff, ffAPI));

                    // call for frame methods for all display objects
                    var i = 0,
                    len = ff.obj.length;
                    while (i < len) {

                        //ff.obj[i].forFrame.call(ff.obj[i].disp, ff);

                        ff.obj[i].forFrame.call(

                            _.merge({}, ff, ffAPI, {

                                obj: ff.obj[i],
                                disp: ff.obj[i].disp

                            }));

                        i += 1;

                    }

                    if (ff.play) {

                        tick(ff);

                    }

                }

            }, true);

    };

}
    ());
