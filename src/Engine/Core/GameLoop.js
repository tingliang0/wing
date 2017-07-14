"use strict";

var gEngine = gEngine || {};

gEngine.GameLoop = (function() {
    var kFPS = 60; // Frames per second
    var kMPF = 1000 / kFPS; // Milleseconds per frame.
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    var mIsLoopRunning = false;
    var mMyGame = null;

    var _runLoop = function() {
        if (mIsLoopRunning) {
            // Step A: set up for next call to _runLoop and update input
            requestAnimationFrame(function() {
                _runLoop.call(mMyGame);
            });

            // Step B: compute elapsed time since last RunLoop was executed
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;

            // Step C: update the game the appropriate of times.
            //         Update only every Milliseconds per frame.
            //         If lag larger then update frames, update until caught up.
            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update(); // call MyGame.update()
                mLagTime -= kMPF;
            }

            // Step D: now let's draw
            this.draw(); // call MyGame.draw()
        } else {
            mMyGame.unloadScene();
        }
    };

    var _startLoop = function() {
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        mIsLoopRunning = true;
        requestAnimationFrame(function() {
            _runLoop.call(mMyGame);
        })
    };

    var start = function(myGame) {
        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(function() {
            mMyGame.initialize();
            _startLoop();
        });
    };

    var stop = function() {
        mIsLoopRunning = false;
    };

    var mPublic = {
        start: start,
        stop: stop
    };
    return mPublic;
}());