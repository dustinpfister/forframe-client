forFrame({

    name: 'range-demo',

    maxFrame: 100,

    // the init method is called once to set things up
    init: function () {

        this.addDisp({
            id: 'box',
            type: 'graphics',
            forFrame: function (ff) {
                var gfx = this.disp;
                gfx.clear();
                gfx.beginFill(0x0000ff);
                gfx.drawRect(0, 0, 32, 32);
                gfx.endFill();
            }
        });

    },

    forFrame: function () {

        game = this.game;

        var bx = this.get('box').disp;

        // this is what will happen by default
        bx.x = 0;
        bx.y = 100 * this.per;

        // this is what will happen for 25% to 75% of the frames
        this.range({

            start: .25,
            end: .75,

            forFrame: function () {

                bx.x = 100-100 * this.seg.bias;

            }

        });

    }

});
