var gEngine = gEngine || {};
var kFPS = 60;              // Frames per second
var kMPF = 1000 / kFPS;     // Milleseconds per frame.

gEngine.GameLoop = (function () {
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    var mIsLoopRunning = false;
    var mMyGame = null;

    var _runLoop = function () {
        if (mIsLoopRunning) {
            // Step A: set up for next call to _runLoop and update input
            requestAnimationFrame(function () {
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
            while((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update();      // call MyGame.update()
                mLagTime -= kMPF;
            }

            // Step D: now let's draw
            this.draw();           // call MyGame.draw()
        }
    };

    var start = function (myGame) {
        mMyGame = myGame;

        // Step A: reset frame time
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        
        // Step B: rember that loop is now running
        mIsLoopRunning = true;

        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(function () {
            _runLoop.call(mMyGame);
        });
    };

    var mPublic = {
        start: start
    };
    return mPublic;
}());