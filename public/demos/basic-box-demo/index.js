forFrame({

    name: 'basic-box-demo',

    maxFrame: 40,

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

        var bx = this.get('box').disp,
        game = this.game;

        bx.x = (game.width - 32) * this.bias;

    }

});
