define(function(require, exports, module) {
    var SequentialLayout    = require('famous/views/SequentialLayout');
    var Transitionable      = require('famous/transitions/Transitionable');
    var ContainerSurface    = require('famous/surfaces/ContainerSurface');
    var Transform           = require('famous/core/Transform');
    var OptionsManager      = require('famous/core/OptionsManager');
    var Utility             = require('famous/utilities/Utility');

    // NOTE: This class in its current state will only 
    // work with appMode disabled like so:
    //
    // Engine.setOptions({
    //     appMode: false
    // });

    /**
     * Manages and manipulates an underlying DOM element to provide native
     * scrolling.
     *
     * @class NativeScrollview
     * @uses UIStretchbox
     * @constructor
     *
     * @param {Object} [options] options to be applied to container surface.
     */
    function NativeScrollview(options) {
        ContainerSurface.apply(this, arguments);

        this.options = Object.create(NativeScrollview.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);

        if (options) this.setOptions(options);
        
        this.addClass('famous-scrollable');

        this._scrollableEl;
        this.on('deploy', function () {
            this._scrollableEl = this._container._currentTarget;
        }.bind(this));

        this._sequence = new SequentialLayout({
            direction: this.options.direction
        });

        this.add(this._sequence);
    }

    NativeScrollview.DEFAULT_OPTIONS = {
        direction: 'x',
        scrollbar: true
    }

    NativeScrollview.prototype = Object.create(ContainerSurface.prototype);
    NativeScrollview.prototype.constructor = NativeScrollview;

     /**
     * Sequencefrom
     *
     * @method sequenceFrom
     */
    NativeScrollview.prototype.sequenceFrom = function (nodeArray) {
        this._sequence.sequenceFrom(nodeArray);
    }

    /**
     * Overrides default options of the NativeScrollview if necessary.
     *
     * @method setOptions
     * @param {Object} [options] options to be set.
     */
    NativeScrollview.prototype.setOptions = function setOptions(options) {
        if (options.direction !== undefined) this.options.direction = options.direction;
        if (options.direction !== undefined) this.options.scrollbar = options.scrollbar;

        ContainerSurface.prototype.setOptions.call(this, options);
    };

    /**
     * Returns the current Y scroll progress of the UIScrollContaienr
     *
     * @method getVScrollPosition
     */
    NativeScrollview.prototype.getVScrollPosition =  function () {
        if(!this._scrollableEl) return null;

        return this._scrollableEl.scrollTop;
    }

    /**
     * Returns the current Y scroll progress of the NativeScrollview
     *
     * @method getVScrollPosition
     */
    NativeScrollview.prototype.getHScrollPosition = function () {
        if(!this._scrollableEl) return null;

        return this._scrollableEl.scrollLeft;
    }

    /**
     * Returns max vertical scroll distance of the NativeScrollview
     *
     * @method getMaxVScrollPosition
     */
    NativeScrollview.prototype.getMaxVScrollPosition = function () {
        if(!this._scrollableEl) return null;

        return this._scrollableEl.scrollTop - this._size[1];
    }

    /**
     * Returns max horizontal scroll distance of the NativeScrollview
     *
     * @method getMaxHScrollPosition
     */
    NativeScrollview.prototype.getMaxHScrollPosition = function () {
        if(!this._scrollableEl) return null;

        return this._scrollableEl.scrollLeft - this._size[0];
    }

    module.exports = NativeScrollview;
});
