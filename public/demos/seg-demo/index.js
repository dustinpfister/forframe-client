forFrame({

    name: 'basic-box-demo',

    maxFrame: 1000,

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

        this.addDisp({
            id: 'seg-box',
            type: 'graphics',
            forFrame: function (ff) {
                var gfx = this.disp;
                gfx.clear();
                gfx.beginFill(0x00ff00);
                gfx.drawRect(0, 0, 32, 32);
                gfx.endFill();
            }
        });

    },

    forFrame: function () {

        game = this.game;

        // every 10% of frames
        this.seg(.10, function () {

            var bx = this.get('box').disp;

            // inside here I can still get the normal frame values
            // as always
            bx.x = (game.width - 32) * this.bias;
            bx.y = 0;

            // but there is also now a seg set of values as well
            // that has values that are relative to 10% of the
            // total animation frames
            bx = this.get('seg-box').disp;

            // so I can set display values relative to every
            // 10% of frames
            bx.x = (game.width - 32) * this.seg.bias;

            // and still relative to the total animation length
            bx.y = 32 + 100 * this.bias;

        });

    }

});
