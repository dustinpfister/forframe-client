forFrame({

    name: 'mrbox',

    maxFrame: 100,

    // the init method is called once to set things up
    init: function () {

        this.addDisp({
            id: 'mrbox-leg-right',
            type: 'graphics',
            forFrame: function () {
                var gfx = this.disp;

                gfx.clear();
                gfx.lineStyle(3, '#000000');

                gfx.beginFill(0xffffff);
                gfx.drawRect(0, 0, 16, 96);
                gfx.endFill();
            }
        });

        this.addDisp({
            id: 'mrbox-leg-left',
            type: 'graphics',
            forFrame: function () {
                var gfx = this.disp;

                gfx.clear();
                gfx.lineStyle(3, '#000000');

                gfx.beginFill(0xffffff);
                gfx.drawRect(0, 0, 16, 96);
                gfx.endFill();
            }
        });

        this.addDisp({
            id: 'mrbox-face',
            type: 'graphics',
            forFrame: function () {
                var gfx = this.disp;

                gfx.clear();
                gfx.lineStyle(3, '#000000');

                gfx.beginFill(0xffffff);
                gfx.drawRect(0, 0, 64, 96);
                gfx.endFill();
            }
        });

        this.addDisp({
            id: 'mrbox-eyes',
            type: 'graphics',
            forFrame: function () {
                var gfx = this.disp;

                gfx.clear();
                gfx.lineStyle(3, '#000000');

                gfx.beginFill(0xffffff);
                gfx.drawRect(0, 0, 16, 16);

                gfx.beginFill(0xffffff);
                gfx.drawRect(32, 0, 16, 16);

                gfx.beginFill(0x000000);
                gfx.drawRect(8, 8 - 8 * this.bias, 8, 8);

                this.segment(.2, function () {

                    var r = Math.PI * 2 * this.seg.per;
                    var x = 35 - Math.cos(r) * 4,
                    y = 4 + Math.sin(r) * 4;

                    gfx.beginFill(0x000000);
                    gfx.drawRect(x, y, 8, 8);

                });

                gfx.endFill();
            }
        });

        this.addDisp({
            id: 'mrbox-mouth',
            type: 'graphics',
            forFrame: function () {
                var gfx = this.disp;

                gfx.clear();
                gfx.lineStyle(3, '#000000');
                gfx.beginFill(0xffffff);
                gfx.drawRect(4 * this.bias, 0, 24- 8 * this.bias, 8+4 * this.bias);
                gfx.endFill();

            }

        });

        this.addDisp({
            id: 'mrbox-nose',
            type: 'graphics',
            forFrame: function () {
                var gfx = this.disp;

                gfx.clear();
                gfx.lineStyle(3, '#000000');

                gfx.beginFill(0xffffff);
                gfx.drawRect(0, 0, 64, 8);

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

        gfx = this.get('mrbox-eyes').disp;
        gfx.x = mrbox_face.x + mrbox_face.width - 40;
        gfx.y = mrbox_face.y + mrbox_face.height / 3;

        gfx = this.get('mrbox-nose').disp;

        gfx.x = mrbox_face.x + mrbox_face.width - 16;
        gfx.y = mrbox_face.y + mrbox_face.height / 3 + 25;
        gfx.pivot.x = 0;
        gfx.pivot.y = gfx.height / 2;
        gfx.angle = 20 * this.bias;

        gfx = this.get('mrbox-mouth').disp;
        gfx.x = mrbox_face.x + mrbox_face.width / 2;
        gfx.y = mrbox_face.y + mrbox_face.height / 1.5;

        tx.text = this.frame + '/' + this.maxFrame;

        this.segment(.25, function () {

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
