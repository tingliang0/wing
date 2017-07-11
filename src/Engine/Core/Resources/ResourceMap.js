"use strict";

var gEngine = gEngine || {};

gEngine.ResourceMap = (function() {
    var MapEntry = function(rName) {
        this.mAsset = rName;
    };

    var mResourceMap = {};
    var mNumOutstandingLoads = 0;
    var mLoadCompleteCallback = null;

    var _checkForAllLoadCompleted = function() {
        if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null)) {
            var funcToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funcToCall();
        }
    };

    var setLoadCompleteCallback = function(func) {
        mLoadCompleteCallback = func;
        _checkForAllLoadCompleted();
    };

    var isAssetLoaded = function(rName) {
        return rName in mResourceMap;
    };

    var asyncLoadRequested = function(rName) {
        mResourceMap[rName] = new MapEntry(rName);
        ++mNumOutstandingLoads;
    };

    var asyncLoadCompleted = function(rName, loadedAsset) {
        if (!isAssetLoaded(rName)) {
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");
        }
        mResourceMap[rName].mAsset = loadedAsset;
        --mNumOutstandingLoads;
        _checkForAllLoadCompleted();
    };

    var retrieveAsset = function(rName) {
        var r = null;
        if (rName in mResourceMap) {
            r = mResourceMap[rName].mAsset;
        }
        return r;
    };

    var unloadAsset = function(rName) {
        if (rName in mResourceMap) {
            delete mResourceMap[rName];
        }
    };

    var mPublic = {
        asyncLoadCompleted: asyncLoadCompleted,
        asyncLoadRequested: asyncLoadRequested,
        setLoadCompleteCallback: setLoadCompleteCallback,

        // resource storage
        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded
    };

    return mPublic;
}());