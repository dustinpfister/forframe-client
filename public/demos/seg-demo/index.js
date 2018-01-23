forFrame({

    name: 'seg-demo',

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

                // segment methods can be used in
                // the forFrame methods of display objects

                // this will give me values relative to 1% of
                // total frames
                this.segment(.01, function () {

                    var gfx = this.disp;

                    // segment vales are in the seg object
                    var size = 16 + 16 * this.seg.bias;

                    gfx.clear();
                    gfx.beginFill(0x00ff00);
                    gfx.drawRect(-size / 2, -size / 2, size, size);
                    gfx.endFill();

                });
            }
        });

    },

    forFrame: function () {

        game = this.game;

        // segment methods can also be used in the main forFrame
        // method as well

        // every 10% of frames
        this.segment(.10, function () {

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
