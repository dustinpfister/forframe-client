forFrame({

    name: 'mrbox',

    maxFrame: 100,

    // the init method is called once to set things up
    init: function () {

        this.addDisp({
            id: 'mrbox-face',
            type: 'graphics',
            forFrame: function (ff) {
                var gfx = this.disp;

                gfx.clear();
                gfx.beginFill(0xf1d100);
                gfx.drawRect(0, 0, 64, 96);
                gfx.endFill();
            }
        });

        this.addDisp({
            id: 'mrbox-leg-right',
            type: 'graphics',
            forFrame: function (ff) {
                var gfx = this.disp;

                gfx.clear();
                gfx.beginFill(0xf1d100);
                gfx.drawRect(0, 0, 16, 96);
                gfx.endFill();
            }
        });

        this.addDisp({
            id: 'mrbox-leg-left',
            type: 'graphics',
            forFrame: function (ff) {
                var gfx = this.disp;

                gfx.clear();
                gfx.beginFill(0xf1d100);
                gfx.drawRect(0, 0, 16, 96);
                gfx.endFill();
            }
        });

        this.addDisp({

            id: 'out',
            type: 'text',
            text: 'yeah',
            style: {

                fill: 'blue',
                fontSize: 10

            }

        });

    },

    forFrame: function () {

        var game = this.game,
        bounce = 25 * this.bias,
        gfx,

        tx = this.get('out').disp,

        mrbox_face = this.get('mrbox-face').disp;

        mrbox_face.x = game.width / 2 - mrbox_face.width / 2;
        mrbox_face.y = game.height / 2 - 96 - 25 + bounce;

        tx.text = this.frame + '/' + this.maxFrame;

        this.segment(.10, function () {

            gfx = this.get('mrbox-leg-right').disp;

            gfx.x = mrbox_face.x + mrbox_face.width / 2 + 16;
            gfx.y = mrbox_face.y + mrbox_face.height - 8;

            gfx.angle = -45 * this.seg.bias;
            gfx.pivot.x = 8;
            gfx.pivot.y = 0;

            gfx = this.get('mrbox-leg-left').disp;

            gfx.x = mrbox_face.x + mrbox_face.width / 2 - 16;
            gfx.y = mrbox_face.y + mrbox_face.height - 8;

            gfx.angle = 45 * this.seg.bias;
            gfx.pivot.x = 8;
            gfx.pivot.y = 0;

        });
    }

});
