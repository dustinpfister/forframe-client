# forframe-client

This is a client system that is used to play back my animations client side. It makes use of phaser as a way to handle making, and working with display objects.

I use this system in my hexo plugin hexo-forframe as my animation framework for animations that I intend to host on my github pages site.


## Use example

Create an html file and link to forframe-client, and it's dependency phaser. Then in a new script tag call forFrame and pass an animation object to it.

### html

In window context I will want to have lodash, and phaser loaded before I load forframe-client. Once that is all loaded I can then do what I want when making my animation. ForFrame will make an instance of Phaser.Game, and use a div with an id of 'ff' if present, else it will append to body.

```html
<!doctype html>
<html>
    <head>
        <title>forFrame Demo</title>
        <meta charset="UTF-8">
    </head>
    <body>

        <!-- The container to use -->
        <div id="ff"></div>

        <!-- forframe client, and dependencies -->
        <script src="/lib/lodash.js"></script>
        <script src="/lib/phaser.min.js"></script>
        <script src="/forframe-client.js"></script>

        <!-- The demo -->
        <script src="/demos/basic-box-demo/index.js"></script>
    </body>
</html>
```

### js

Once forframe-client, and it's dependencies are loaded I can then use forframe.js by calling the main method, and giving it an object that contains the logic of my animation.

```js
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
```

## The Animation Object

ForFrame-client is used by passing an object to it that I am calling just the animation object or aniObj. In this object I set values and methods that define my animation.

### aniObj.name

* type: String
* default: 'untitled'

Reserved for the name of the animation to be used by other projects both current and future to know the display name of the animation. I make this also the name of the project folder.

### aniObj.width, and aniObj.height

* type: String || Number
* default: 320 && 240

These are the same values that will be passed to the Phaser.Game constructor to set the native display with and height of the animation.

### aniObj.maxFrame

* type: String || Number
* default: 50

The total number of frames that will be used in the animation. The kind of animations that I make with forframe should always work regardless of maxFrame value. In other words I will always have the same animation regardless of the maxFrame value, but setting a higher value will make a smoother, but slower animation compared to a lower value, assuming frame rate is the same.

Regardless I can use this to declare a certain ideal, or intended, maxFrame value.

### aniObj.init

* type: Function
* default: noop

This method is called once to set up display objects.

### aniObj.forFrame

* type: Function
* default: noop

This is the main method where I am defining the logic for the animation.

## Legal

### forFrame-client Copyright 2018 by Dustin Pfister.

I declare all code written by me under the terms of GPL-3.0
All borrowed code is subject to there own license terms.