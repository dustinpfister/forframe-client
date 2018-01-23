forFrame({

    name: 'text-demo',

    maxFrame: 100,

    // the init method is called once to set things up
    init: function () {

        this.addDisp({
            id: 'text-hello',
            type: 'text',
            text: 'hello',
            forFrame: function (ff) {
                var gfx = this.disp;
            }
        });

        this.addDisp({
            id: 'text-world',
            type: 'text',
            text: 'world',
            style: {

                fill: 'blue'

            },
            forFrame: function (ff) {
                var gfx = this.disp;
            }
        });

    },

    forFrame: function () {

        var game = this.game,

        tx = this.get('text-hello').disp;

        tx.x = (game.width - tx.width) * this.bias;
        tx.y = game.height / 2 - tx.height;

        tx = this.get('text-world').disp;
        tx.x = (game.width - tx.width) - (game.width - tx.width) * this.bias;
        tx.y = game.height / 2 - tx.height;

    }

});
