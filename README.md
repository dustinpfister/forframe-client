# forframe-client

This is a client system that is used to play back my animations client side. It makes use of phaser as a way to handle making, and working with display objects.

I use this system in my hexo plugin hexo-forframe as my animation framework for animations that I intend to host on my github pages site.


## Use example

Create an html file and link to forframe-client, and it's dependency phaser. Then in a new script tag call forFrame and pass an animation object to it.

```html
<!doctype html>
<html>
    <head>
        <title>forFrame Demo</title>
        <meta charset="UTF-8">
    </head>
    <body>

        <script src="/lib/lodash.js"></script>
        <script src="/lib/phaser.min.js"></script>
        <script src="/forframe-client.js"></script>
        <script>

            forFrame({

                name: 'basic-box-demo',

                // the init method is called once to set things up
                init: function () {

                    this.addDisp({
                        id:'box',
                        type:'graphics', 
                        forFrame:function (ff) {
                            this.clear();
                            this.beginFill(0x0000ff);
                            this.drawRect(0, 0, 32, 32);
                            this.endFill();
                        }
                    });

                },

                forFrame: function () {

                    var bx = this.get('box').disp,
                    game = this.game;

                    bx.x = (game.width - 32) * this.bias;

                }

            });

        </script>
    </body>
</html>
```