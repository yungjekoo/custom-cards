(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactGridLayout"] = factory(require("react"));
	else
		root["ReactGridLayout"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(5);
	module.exports.Responsive = __webpack_require__(11);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign = __webpack_require__(4);
	
	var utils = module.exports = {
	
	  /**
	   * Return the bottom coordinate of the layout.
	   *
	   * @param  {Array} layout Layout array.
	   * @return {Number}       Bottom coordinate.
	   */
	  bottom: function bottom(layout) {
	    var max = 0,
	        bottomY;
	    for (var i = 0, len = layout.length; i < len; i++) {
	      bottomY = layout[i].y + layout[i].h;
	      if (bottomY > max) max = bottomY;
	    }
	    return max;
	  },
	
	  /**
	   * Clones a shallow object.
	   * @param  {Object} obj Object to clone.
	   * @return {Object}   Cloned object.
	   */
	  clone: function clone(obj) {
	    return assign({}, obj);
	  },
	
	  /**
	   * Given two layouts, check if they collide.
	   *
	   * @param  {Object} l1 Layout object.
	   * @param  {Object} l2 Layout object.
	   * @return {Boolean}   True if colliding.
	   */
	  collides: function collides(l1, l2) {
	    if (l1 === l2) return false; // same element
	    if (l1.x + l1.w <= l2.x) return false; // l1 is left of l2
	    if (l1.x >= l2.x + l2.w) return false; // l1 is right of l2
	    if (l1.y + l1.h <= l2.y) return false; // l1 is above l2
	    if (l1.y >= l2.y + l2.h) return false; // l1 is below l2
	    return true; // boxes overlap
	  },
	
	  /**
	   * Given a layout, compact it. This involves going down each y coordinate and removing gaps
	   * between items.
	   *
	   * @param  {Array} layout Layout.
	   * @param  {Boolean} verticalCompact Whether or not to compact the layout
	   *   vertically.
	   * @return {Array}       Compacted Layout.
	   */
	  compact: function compact(layout, verticalCompact) {
	    // Statics go in the compareWith array right away so items flow around them.
	    var compareWith = utils.getStatics(layout),
	        out = [];
	    // We go through the items by row and column.
	    var sorted = utils.sortLayoutItemsByRowCol(layout);
	
	    for (var i = 0, len = sorted.length; i < len; i++) {
	      var l = sorted[i];
	
	      // Don't move static elements
	      if (!l['static']) {
	        l = utils.compactItem(compareWith, l, verticalCompact);
	
	        // Add to comparison array. We only collide with items before this one.
	        // Statics are already in this array.
	        compareWith.push(l);
	      }
	
	      // Add to output array to make sure they still come out in the right order.
	      out[layout.indexOf(l)] = l;
	
	      // Clear moved flag, if it exists.
	      delete l.moved;
	    }
	
	    return out;
	  },
	
	  compactItem: function compactItem(compareWith, l, verticalCompact) {
	    if (verticalCompact) {
	      // Move the element up as far as it can go without colliding.
	      while (l.y > 0 && !utils.getFirstCollision(compareWith, l)) {
	        l.y--;
	      }
	    }
	
	    // Move it down, and keep moving it down if it's colliding.
	    var collides;
	    while (collides = utils.getFirstCollision(compareWith, l)) {
	      l.y = collides.y + collides.h;
	    }
	    return l;
	  },
	
	  /**
	   * Given a layout, make sure all elements fit within its bounds.
	   *
	   * @param  {Array} layout Layout array.
	   * @param  {Number} bounds Number of columns.
	   * @return {[type]}        [description]
	   */
	  correctBounds: function correctBounds(layout, bounds) {
	    var collidesWith = utils.getStatics(layout);
	    for (var i = 0, len = layout.length; i < len; i++) {
	      var l = layout[i];
	      // Overflows right
	      if (l.x + l.w > bounds.cols) l.x = bounds.cols - l.w;
	      // Overflows left
	      if (l.x < 0) {
	        l.x = 0;
	        l.w = bounds.cols;
	      }
	      if (!l['static']) collidesWith.push(l);else {
	        // If this is static and collides with other statics, we must move it down.
	        // We have to do something nicer than just letting them overlap.
	        while (utils.getFirstCollision(collidesWith, l)) {
	          l.y++;
	        }
	      }
	    }
	    return layout;
	  },
	
	  /**
	   * Get a layout item by ID. Used so we can override later on if necessary.
	   *
	   * @param  {Array}  layout Layout array.
	   * @param  {Number} id     ID
	   * @return {LayoutItem}    Item at ID.
	   */
	  getLayoutItem: function getLayoutItem(layout, id) {
	    id = "" + id;
	    for (var i = 0, len = layout.length; i < len; i++) {
	      if ("" + layout[i].i === id) return layout[i];
	    }
	  },
	
	  /**
	   * Returns the first item this layout collides with.
	   * It doesn't appear to matter which order we approach this from, although
	   * perhaps that is the wrong thing to do.
	   *
	   * @param  {Object} layoutItem Layout item.
	   * @return {Object|undefined}  A colliding layout item, or undefined.
	   */
	  getFirstCollision: function getFirstCollision(layout, layoutItem) {
	    for (var i = 0, len = layout.length; i < len; i++) {
	      if (utils.collides(layout[i], layoutItem)) return layout[i];
	    }
	  },
	
	  getAllCollisions: function getAllCollisions(layout, layoutItem) {
	    var out = [];
	    for (var i = 0, len = layout.length; i < len; i++) {
	      if (utils.collides(layout[i], layoutItem)) out.push(layout[i]);
	    }
	    return out;
	  },
	
	  /**
	   * Get all static elements.
	   * @param  {Array} layout Array of layout objects.
	   * @return {Array}        Array of static layout items..
	   */
	  getStatics: function getStatics(layout) {
	    var out = [];
	    for (var i = 0, len = layout.length; i < len; i++) {
	      if (layout[i]['static']) out.push(layout[i]);
	    }
	    return out;
	  },
	
	  /**
	   * Move an element. Responsible for doing cascading movements of other elements.
	   *
	   * @param  {Array}      layout Full layout to modify.
	   * @param  {LayoutItem} l      element to move.
	   * @param  {Number}     [x]    X position in grid units.
	   * @param  {Number}     [y]    Y position in grid units.
	   * @param  {Boolean}    [isUserAction] If true, designates that the item we're moving is
	   *                                     being dragged/resized by th euser.
	   */
	  moveElement: function moveElement(layout, l, x, y, isUserAction) {
	    if (l['static']) return layout;
	
	    // Short-circuit if nothing to do.
	    if (l.y === y && l.x === x) return layout;
	
	    var movingUp = l.y > y;
	    // This is quite a bit faster than extending the object
	    if (x !== undefined) l.x = x;
	    if (y !== undefined) l.y = y;
	    l.moved = true;
	
	    // If this collides with anything, move it.
	    // When doing this comparison, we have to sort the items we compare with
	    // to ensure, in the case of multiple collisions, that we're getting the
	    // nearest collision.
	    var sorted = utils.sortLayoutItemsByRowCol(layout);
	    if (movingUp) sorted = sorted.reverse();
	    var collisions = utils.getAllCollisions(sorted, l);
	
	    // Move each item that collides away from this element.
	    for (var i = 0, len = collisions.length; i < len; i++) {
	      var collision = collisions[i];
	      // console.log('resolving collision between', l.i, 'at', l.y, 'and', collision.i, 'at', collision.y);
	
	      // Short circuit so we can't infinite loop
	      if (collision.moved) continue;
	
	      // This makes it feel a bit more precise by waiting to swap for just a bit when moving up.
	      if (l.y > collision.y && l.y - collision.y > collision.h / 4) continue;
	
	      // Don't move static items - we have to move *this* element away
	      if (collision['static']) {
	        layout = utils.moveElementAwayFromCollision(layout, collision, l, isUserAction);
	      } else {
	        layout = utils.moveElementAwayFromCollision(layout, l, collision, isUserAction);
	      }
	    }
	
	    return layout;
	  },
	
	  /**
	   * This is where the magic needs to happen - given a collision, move an element away from the collision.
	   * We attempt to move it up if there's room, otherwise it goes below.
	   *
	   * @param  {Array} layout            Full layout to modify.
	   * @param  {LayoutItem} collidesWith Layout item we're colliding with.
	   * @param  {LayoutItem} itemToMove   Layout item we're moving.
	   * @param  {Boolean} [isUserAction]  If true, designates that the item we're moving is being dragged/resized
	   *                                   by the user.
	   */
	  moveElementAwayFromCollision: function moveElementAwayFromCollision(layout, collidesWith, itemToMove, isUserAction) {
	
	    // If there is enough space above the collision to put this element, move it there.
	    // We only do this on the main collision as this can get funky in cascades and cause
	    // unwanted swapping behavior.
	    if (isUserAction) {
	      // Make a mock item so we don't modify the item here, only modify in moveElement.
	      var fakeItem = {
	        x: itemToMove.x,
	        y: itemToMove.y,
	        w: itemToMove.w,
	        h: itemToMove.h
	      };
	      fakeItem.y = Math.max(collidesWith.y - itemToMove.h, 0);
	      if (!utils.getFirstCollision(layout, fakeItem)) {
	        return utils.moveElement(layout, itemToMove, undefined, fakeItem.y);
	      }
	    }
	
	    // Previously this was optimized to move below the collision directly, but this can cause problems
	    // with cascading moves, as an item may actually leapflog a collision and cause a reversal in order.
	    return utils.moveElement(layout, itemToMove, undefined, itemToMove.y + 1);
	  },
	
	  /**
	   * Helper to convert a number to a percentage string.
	   *
	   * @param  {Number} num Any number
	   * @return {String}     That number as a percentage.
	   */
	  perc: function perc(num) {
	    return num * 100 + '%';
	  },
	
	  setTransform: function setTransform(style, coords) {
	    // Replace unitless items with px
	    var x = ('' + coords[0]).replace(/(\d)$/, '$1px');
	    var y = ('' + coords[1]).replace(/(\d)$/, '$1px');
	    style.transform = "translate(" + x + "," + y + ")";
	    style.WebkitTransform = "translate(" + x + "," + y + ")";
	    style.MozTransform = "translate(" + x + "," + y + ")";
	    style.msTransform = "translate(" + x + "," + y + ")";
	    style.OTransform = "translate(" + x + "," + y + ")";
	    return style;
	  },
	
	  /**
	   * Get layout items sorted from top left to right and down.
	   *
	   * @return {Array} Array of layout objects.
	   * @return {Array}        Layout, sorted static items first.
	   */
	  sortLayoutItemsByRowCol: function sortLayoutItemsByRowCol(layout) {
	    return [].concat(layout).sort(function (a, b) {
	      if (a.y > b.y || a.y === b.y && a.x > b.x) {
	        return 1;
	      }
	      return -1;
	    });
	  },
	
	  /**
	   * Generate a layout using the initialLayout and children as a template.
	   * Missing entries will be added, extraneous ones will be truncated.
	   *
	   * @param  {Array}  initialLayout Layout passed in through props.
	   * @param  {String} breakpoint    Current responsive breakpoint.
	   * @param  {Boolean} verticalCompact Whether or not to compact the layout
	   *   vertically.
	   * @return {Array}                Working layout.
	   */
	  synchronizeLayoutWithChildren: function synchronizeLayoutWithChildren(initialLayout, children, cols, verticalCompact) {
	    // ensure 'children' is always an array
	    if (!Array.isArray(children)) {
	      children = [children];
	    }
	    initialLayout = initialLayout || [];
	
	    // Generate one layout item per child.
	    var layout = [];
	    for (var i = 0, len = children.length; i < len; i++) {
	      var child = children[i];
	      // Don't overwrite if it already exists.
	      var exists = utils.getLayoutItem(initialLayout, child.key);
	      if (exists) {
	        // Ensure 'i' is always a string
	        exists.i = '' + exists.i;
	        layout.push(exists);
	        continue;
	      }
	      // New item: attempt to use a layout item from the child, if it exists.
	      var g = child.props._grid;
	      if (g) {
	        utils.validateLayout([g], 'ReactGridLayout.child');
	        // Validated; add it to the layout. Bottom 'y' possible is the bottom of the layout.
	        // This allows you to do nice stuff like specify {y: Infinity}
	        if (verticalCompact) {
	          layout.push(assign({}, g, { y: Math.min(utils.bottom(layout), g.y), i: child.key }));
	        } else {
	          layout.push(assign({}, g, { y: g.y, i: child.key }));
	        }
	      } else {
	        // Nothing provided: ensure this is added to the bottom
	        layout.push({ w: 1, h: 1, x: 0, y: utils.bottom(layout), i: child.key });
	      }
	    }
	
	    // Correct the layout.
	    layout = utils.correctBounds(layout, { cols: cols });
	    layout = utils.compact(layout, verticalCompact);
	
	    return layout;
	  },
	
	  /**
	   * Validate a layout. Throws errors.
	   *
	   * @param  {Array}  layout        Array of layout items.
	   * @param  {String} [contextName] Context name for errors.
	   * @throw  {Error}                Validation error.
	   */
	  validateLayout: function validateLayout(layout, contextName) {
	    contextName = contextName || "Layout";
	    var subProps = ['x', 'y', 'w', 'h'];
	    if (!Array.isArray(layout)) throw new Error(contextName + " must be an array!");
	    for (var i = 0, len = layout.length; i < len; i++) {
	      for (var j = 0; j < subProps.length; j++) {
	        if (typeof layout[i][subProps[j]] !== 'number') {
	          throw new Error('ReactGridLayout: ' + contextName + '[' + i + '].' + subProps[j] + ' must be a Number!');
	        }
	      }
	      if (layout[i]['static'] !== undefined && typeof layout[i]['static'] !== 'boolean') {
	        throw new Error('ReactGridLayout: ' + contextName + '[' + i + '].static must be a Boolean!');
	      }
	    }
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var deepEqual = __webpack_require__(13);
	
	// Like PureRenderMixin, but with deep comparisons.
	var PureDeepRenderMixin = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
	  }
	};
	
	module.exports = PureDeepRenderMixin;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var React = __webpack_require__(1);
	var GridItem = __webpack_require__(10);
	var utils = __webpack_require__(2);
	var PureDeepRenderMixin = __webpack_require__(3);
	var WidthListeningMixin = __webpack_require__(6);
	
	/**
	 * A reactive, fluid grid layout with draggable, resizable components.
	 */
	var ReactGridLayout = React.createClass({
	  displayName: 'ReactGridLayout',
	
	  mixins: [PureDeepRenderMixin, WidthListeningMixin],
	
	  propTypes: {
	    //
	    // Basic props
	    //
	
	    // If true, the container height swells and contracts to fit contents
	    autoSize: React.PropTypes.bool,
	    // # of cols.
	    cols: React.PropTypes.number,
	
	    // A selector that will not be draggable.
	    draggableCancel: React.PropTypes.string,
	    // A selector for the draggable handler
	    draggableHandle: React.PropTypes.string,
	
	    // If true, the layout will compact vertically
	    verticalCompact: React.PropTypes.bool,
	
	    // layout is an array of object with the format:
	    // {x: Number, y: Number, w: Number, h: Number, i: Number}
	    layout: function layout(props, propName, componentName) {
	      var layout = props.layout;
	      // I hope you're setting the _grid property on the grid items
	      if (layout === undefined) return;
	      utils.validateLayout(layout, 'layout');
	    },
	
	    layouts: function layouts(props, propName, componentName) {
	      if (props.layouts) {
	        throw new Error("ReactGridLayout does not use `layouts`: Use ReactGridLayout.Responsive.");
	      }
	    },
	
	    // margin between items [x, y] in px
	    margin: React.PropTypes.array,
	    // Rows have a static height, but you can change this based on breakpoints if you like
	    rowHeight: React.PropTypes.number,
	
	    //
	    // Flags
	    //
	    isDraggable: React.PropTypes.bool,
	    isResizable: React.PropTypes.bool,
	    // Use CSS transforms instead of top/left
	    useCSSTransforms: React.PropTypes.bool,
	
	    //
	    // Callbacks
	    //
	
	    // Callback so you can save the layout.
	    // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
	    onLayoutChange: React.PropTypes.func,
	
	    // Calls when drag starts. Callback is of the signature (layout, oldItem, newItem, placeholder, e).
	    // All callbacks below have the same signature. 'start' and 'stop' callbacks omit the 'placeholder'.
	    onDragStart: React.PropTypes.func,
	    // Calls on each drag movement.
	    onDrag: React.PropTypes.func,
	    // Calls when drag is complete.
	    onDragStop: React.PropTypes.func,
	    //Calls when resize starts.
	    onResizeStart: React.PropTypes.func,
	    // Calls when resize movement happens.
	    onResize: React.PropTypes.func,
	    // Calls when resize is complete.
	    onResizeStop: React.PropTypes.func,
	
	    //
	    // Other validations
	    //
	
	    // Children must not have duplicate keys.
	    children: function children(props, propName, componentName) {
	      React.PropTypes.node.apply(this, arguments);
	      var children = props[propName];
	
	      // Check children keys for duplicates. Throw if found.
	      var keys = {};
	      React.Children.forEach(children, function (child, i, list) {
	        if (keys[child.key]) {
	          throw new Error("Duplicate child key found! This will cause problems in ReactGridLayout.");
	        }
	        keys[child.key] = true;
	      });
	    }
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      autoSize: true,
	      cols: 12,
	      rowHeight: 150,
	      layout: [],
	      margin: [10, 10],
	      isDraggable: true,
	      isResizable: true,
	      useCSSTransforms: true,
	      verticalCompact: true,
	      onLayoutChange: function onLayoutChange() {},
	      onDragStart: function onDragStart() {},
	      onDrag: function onDrag() {},
	      onDragStop: function onDragStop() {},
	      onResizeStart: function onResizeStart() {},
	      onResize: function onResize() {},
	      onResizeStop: function onResizeStop() {}
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      activeDrag: null,
	      isMounted: false,
	      layout: utils.synchronizeLayoutWithChildren(this.props.layout, this.props.children, this.props.cols, this.props.verticalCompact),
	      width: this.props.initialWidth,
	      oldDragItem: null,
	      oldResizeItem: null
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    // Call back with layout on mount. This should be done after correcting the layout width
	    // to ensure we don't rerender with the wrong width.
	    this.props.onLayoutChange(this.state.layout);
	    this.setState({ isMounted: true });
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // This allows you to set the width manually if you like.
	    // Use manual width changes in combination with `listenToWindowResize: false`
	    if (nextProps.width !== this.props.width) this.onWidthChange(nextProps.width);
	
	    // If children change, regenerate the layout.
	    if (nextProps.children.length !== this.props.children.length) {
	      this.setState({
	        layout: utils.synchronizeLayoutWithChildren(this.state.layout, nextProps.children, nextProps.cols, this.props.verticalCompact)
	      });
	    }
	
	    // Allow parent to set layout directly.
	    if (nextProps.layout && JSON.stringify(nextProps.layout) !== JSON.stringify(this.state.layout)) {
	      this.setState({
	        layout: utils.synchronizeLayoutWithChildren(nextProps.layout, nextProps.children, nextProps.cols, this.props.verticalCompact)
	      });
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // Call back so we can store the layout
	    // Do it only when a resize/drag is not active, otherwise there are way too many callbacks
	    if (this.state.layout !== prevState.layout && !this.state.activeDrag) {
	      this.props.onLayoutChange(this.state.layout, this.state.layouts);
	    }
	  },
	
	  /**
	   * Calculates a pixel value for the container.
	   * @return {String} Container height in pixels.
	   */
	  containerHeight: function containerHeight() {
	    if (!this.props.autoSize) return;
	    return utils.bottom(this.state.layout) * this.props.rowHeight + this.props.margin[1] + 'px';
	  },
	
	  /**
	   * When the width changes, save it to state. This helps with left/width calculations.
	   */
	  onWidthChange: function onWidthChange(width) {
	    this.setState({ width: width });
	  },
	
	  /**
	   * When dragging starts
	   * @param {Number} i Index of the child
	   * @param {Number} x X position of the move
	   * @param {Number} y Y position of the move
	   * @param {Event} e The mousedown event
	   * @param {Element} element The current dragging DOM element
	   * @param {Object} position Drag information
	   */
	  onDragStart: function onDragStart(i, x, y, _ref) {
	    var e = _ref.e;
	    var element = _ref.element;
	    var position = _ref.position;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	
	    this.setState({ oldDragItem: utils.clone(l) });
	
	    this.props.onDragStart(layout, l, l, null, e);
	  },
	  /**
	   * Each drag movement create a new dragelement and move the element to the dragged location
	   * @param {Number} i Index of the child
	   * @param {Number} x X position of the move
	   * @param {Number} y Y position of the move
	   * @param {Event} e The mousedown event
	   * @param {Element} element The current dragging DOM element
	   * @param {Object} position Drag information
	   */
	  onDrag: function onDrag(i, x, y, _ref2) {
	    var e = _ref2.e;
	    var element = _ref2.element;
	    var position = _ref2.position;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	    var oldL = this.state.oldDragItem;
	
	    // Create placeholder (display only)
	    var placeholder = {
	      w: l.w, h: l.h, x: l.x, y: l.y, placeholder: true, i: i
	    };
	
	    // Move the element to the dragged location.
	    layout = utils.moveElement(layout, l, x, y, true /* isUserAction */);
	
	    this.props.onDrag(layout, oldL, l, placeholder, e);
	
	    this.setState({
	      layout: utils.compact(layout, this.props.verticalCompact),
	      activeDrag: placeholder
	    });
	  },
	
	  /**
	   * When dragging stops, figure out which position the element is closest to and update its x and y.
	   * @param  {Number} i Index of the child.
	   * @param {Number} i Index of the child
	   * @param {Number} x X position of the move
	   * @param {Number} y Y position of the move
	   * @param {Event} e The mousedown event
	   * @param {Element} element The current dragging DOM element
	   * @param {Object} position Drag information
	   */
	  onDragStop: function onDragStop(i, x, y, _ref3) {
	    var e = _ref3.e;
	    var element = _ref3.element;
	    var position = _ref3.position;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	    var oldL = this.state.oldDragItem;
	
	    // Move the element here
	    layout = utils.moveElement(layout, l, x, y, true /* isUserAction */);
	
	    this.props.onDragStop(layout, oldL, l, null, e);
	
	    // Set state
	    this.setState({
	      layout: utils.compact(layout, this.props.verticalCompact),
	      activeDrag: null,
	      oldDragItem: null
	    });
	  },
	
	  onResizeStart: function onResizeStart(i, w, h, _ref4) {
	    var e = _ref4.e;
	    var element = _ref4.element;
	    var size = _ref4.size;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	
	    this.setState({ oldResizeItem: utils.clone(l) });
	
	    this.props.onResizeStart(layout, l, l, null, e);
	  },
	
	  onResize: function onResize(i, w, h, _ref5) {
	    var e = _ref5.e;
	    var element = _ref5.element;
	    var size = _ref5.size;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	    var oldL = this.state.oldResizeItem;
	
	    // Set new width and height.
	    l.w = w;
	    l.h = h;
	
	    // Create placeholder element (display only)
	    var placeholder = {
	      w: w, h: h, x: l.x, y: l.y, placeholder: true, i: i
	    };
	
	    this.props.onResize(layout, oldL, l, placeholder, e);
	
	    // Re-compact the layout and set the drag placeholder.
	    this.setState({ layout: utils.compact(layout, this.props.verticalCompact), activeDrag: placeholder });
	  },
	
	  onResizeStop: function onResizeStop(i, x, y, _ref6) {
	    var e = _ref6.e;
	    var element = _ref6.element;
	    var size = _ref6.size;
	
	    var layout = this.state.layout;
	    var l = utils.getLayoutItem(layout, i);
	    var oldL = this.state.oldResizeItem;
	
	    this.props.onResizeStop(layout, oldL, l, null, e);
	
	    this.setState({
	      layout: utils.compact(layout, this.props.verticalCompact),
	      activeDrag: null,
	      oldResizeItem: null
	    });
	  },
	
	  /**
	   * Create a placeholder object.
	   * @return {Element} Placeholder div.
	   */
	  placeholder: function placeholder() {
	    if (!this.state.activeDrag) return '';
	
	    // {...this.state.activeDrag} is pretty slow, actually
	    return React.createElement(
	      GridItem,
	      {
	        w: this.state.activeDrag.w,
	        h: this.state.activeDrag.h,
	        x: this.state.activeDrag.x,
	        y: this.state.activeDrag.y,
	        i: this.state.activeDrag.i,
	        isPlaceholder: true,
	        className: 'react-grid-placeholder',
	        containerWidth: this.state.width,
	        cols: this.props.cols,
	        margin: this.props.margin,
	        rowHeight: this.props.rowHeight,
	        isDraggable: false,
	        isResizable: false,
	        useCSSTransforms: this.props.useCSSTransforms
	      },
	      React.createElement('div', null)
	    );
	  },
	
	  /**
	   * Given a grid item, set its style attributes & surround in a <Draggable>.
	   * @param  {Element} child React element.
	   * @param  {Number}  i     Index of element.
	   * @return {Element}       Element wrapped in draggable and properly placed.
	   */
	  processGridItem: function processGridItem(child) {
	    var i = child.key;
	    var l = utils.getLayoutItem(this.state.layout, i);
	
	    // watchStart property tells Draggable to react to changes in the start param
	    // Must be turned off on the item we're dragging as the changes in `activeDrag` cause rerenders
	    var moveOnStartChange = !(this.state.activeDrag && this.state.activeDrag.i === i);
	
	    // Parse 'static'. Any properties defined directly on the grid item will take precedence.
	    var draggable, resizable;
	    if (l['static'] || this.props.isDraggable === false) draggable = false;
	    if (l['static'] || this.props.isResizable === false) resizable = false;
	
	    return React.createElement(
	      GridItem,
	      _extends({
	        containerWidth: this.state.width,
	        cols: this.props.cols,
	        margin: this.props.margin,
	        rowHeight: this.props.rowHeight,
	        moveOnStartChange: moveOnStartChange,
	        cancel: this.props.draggableCancel,
	        handle: this.props.draggableHandle,
	        onDragStop: this.onDragStop,
	        onDragStart: this.onDragStart,
	        onDrag: this.onDrag,
	        onResizeStart: this.onResizeStart,
	        onResize: this.onResize,
	        onResizeStop: this.onResizeStop,
	        isDraggable: draggable,
	        isResizable: resizable,
	        useCSSTransforms: this.props.useCSSTransforms && this.state.isMounted,
	        usePercentages: !this.state.isMounted
	      }, l),
	      child
	    );
	  },
	
	  render: function render() {
	    // Calculate classname
	    var _props = this.props;
	    var className = _props.className;
	
	    var props = _objectWithoutProperties(_props, ['className']);
	
	    className = 'react-grid-layout ' + (className || '');
	
	    return React.createElement(
	      'div',
	      _extends({}, props, { className: className, style: { height: this.containerHeight() } }),
	      React.Children.map(this.props.children, this.processGridItem),
	      this.placeholder()
	    );
	  }
	});
	
	module.exports = ReactGridLayout;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	
	/**
	 * A simple mixin that provides facility for listening to container resizes.
	 */
	var WidthListeningMixin = {
	
	  propTypes: {
	    // This allows setting this on the server side
	    initialWidth: React.PropTypes.number,
	
	    // If false, you should supply width yourself. Good if you want to debounce resize events
	    // or reuse a handler from somewhere else.
	    listenToWindowResize: React.PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      initialWidth: 1280,
	      listenToWindowResize: true
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.listenToWindowResize) {
	      window.addEventListener('resize', this.onWindowResize);
	      // This is intentional. Once to properly set the breakpoint and resize the elements,
	      // and again to compensate for any scrollbar that appeared because of the first step.
	      this.onWindowResize();
	      this.onWindowResize();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    window.removeEventListener('resize', this.onWindowResize);
	  },
	
	  /**
	   * On window resize, update width.
	   */
	  onWindowResize: function onWindowResize() {
	    this.onWidthChange(this.getDOMNode().offsetWidth);
	  }
	
	};
	
	module.exports = WidthListeningMixin;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(1);
	var Draggable = __webpack_require__(7);
	var PureRenderMixin = __webpack_require__(9);
	var assign = __webpack_require__(4);
	var cloneElement = __webpack_require__(21);
	
	var Resizable = module.exports = React.createClass({
	  displayName: 'Resizable',
	  mixins: [PureRenderMixin],
	
	  propTypes: {
	    // Require that one and only one child be present.
	    children: React.PropTypes.element.isRequired,
	    // Functions
	    onResizeStop: React.PropTypes.func,
	    onResizeStart: React.PropTypes.func,
	    onResize: React.PropTypes.func,
	
	    width: React.PropTypes.number.isRequired,
	    height: React.PropTypes.number.isRequired,
	    // If you change this, be sure to update your css
	    handleSize: React.PropTypes.array,
	    // These will be passed wholesale to react-draggable
	    draggableOpts: React.PropTypes.object
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      handleSize: [20, 20]
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      bounds: this.constraintsToBounds(),
	      initialWidth: this.props.width,
	      initialHeight: this.props.height
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    if (!this.state.resizing) {
	      this.setState({
	        initialWidth: props.width,
	        initialHeight: props.height,
	        bounds: this.constraintsToBounds()
	      });
	      this.refs.draggable.resetState();
	    }
	  },
	
	  constraintsToBounds: function constraintsToBounds() {
	    var p = this.props;
	    var mins = p.minConstraints || p.handleSize;
	    var maxes = p.maxConstraints || [Infinity, Infinity];
	    return {
	      left: mins[0] - p.width,
	      top: mins[1] - p.height,
	      right: maxes[0] - p.width,
	      bottom: maxes[1] - p.height
	    };
	  },
	
	  /**
	   * Wrapper around drag events to provide more useful data.
	   *
	   * @param  {String} handlerName Handler name to wrap.
	   * @return {Function}           Handler function.
	   */
	  resizeHandler: function resizeHandler(handlerName) {
	    var me = this;
	    return function (e, _ref) {
	      var node = _ref.node;
	      var position = _ref.position;
	
	      me.props[handlerName] && me.props[handlerName](e, { node: node, size: calcWH(me.state, position) });
	
	      if (handlerName === 'onResizeStart') {
	        me.setState({ resizing: true });
	      } else if (handlerName === 'onResizeStop') {
	        me.setState({ resizing: false });
	      }
	    };
	  },
	
	  render: function render() {
	    var p = this.props,
	        s = this.state;
	
	    // What we're doing here is getting the child of this element, and cloning it with this element's props.
	    // We are then defining its children as:
	    // Its original children (resizable's child's children), and
	    // A draggable handle.
	    return cloneElement(p.children, assign({}, p, {
	      children: [p.children.props.children, React.createElement(
	        Draggable,
	        _extends({}, p.draggableOpts, {
	          ref: 'draggable',
	          onStop: this.resizeHandler('onResizeStop'),
	          onStart: this.resizeHandler('onResizeStart'),
	          onDrag: this.resizeHandler('onResize'),
	          bounds: this.state.bounds
	        }),
	        React.createElement('span', { className: 'react-resizable-handle' })
	      )]
	    }));
	  }
	});
	
	/**
	 * Parse left and top coordinates.
	 * @param  {Number} options.left Left coordinate.
	 * @param  {Number} options.top  Top coordinate.
	 * @return {Object}              Coordinates
	 */
	function calcWH(_ref, _ref2) {
	  var initialWidth = _ref.initialWidth;
	  var initialHeight = _ref.initialHeight;
	  var left = _ref2.left;
	  var top = _ref2.top;
	
	  return { width: initialWidth + left, height: initialHeight + top };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/
	
	'use strict';
	
	var shallowEqual = __webpack_require__(24);
	
	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	           !shallowEqual(this.state, nextState);
	  }
	};
	
	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	var cloneWithProps = __webpack_require__(23);
	var utils = __webpack_require__(2);
	var Draggable = __webpack_require__(7);
	var Resizable = __webpack_require__(22).Resizable;
	var PureDeepRenderMixin = __webpack_require__(3);
	
	/**
	 * An individual item within a ReactGridLayout.
	 */
	var GridItem = React.createClass({
	  displayName: 'GridItem',
	
	  mixins: [PureDeepRenderMixin],
	
	  propTypes: {
	    // Children must be only a single element
	    children: React.PropTypes.element,
	
	    // General grid attributes
	    cols: React.PropTypes.number.isRequired,
	    containerWidth: React.PropTypes.number.isRequired,
	    rowHeight: React.PropTypes.number.isRequired,
	    margin: React.PropTypes.array.isRequired,
	
	    // These are all in grid units
	    x: React.PropTypes.number.isRequired,
	    y: React.PropTypes.number.isRequired,
	    w: React.PropTypes.number.isRequired,
	    h: React.PropTypes.number.isRequired,
	
	    // All optional
	    minW: function minW(props, propName, componentName) {
	      React.PropTypes.number.apply(this, arguments);
	      if (props.minW > props.w || props.minW > props.maxW) constraintError('minW', props);
	    },
	    maxW: function maxW(props, propName, componentName) {
	      React.PropTypes.number.apply(this, arguments);
	      if (props.maxW < props.w || props.maxW < props.minW) constraintError('maxW', props);
	    },
	    minH: function minH(props, propName, componentName) {
	      React.PropTypes.number.apply(this, arguments);
	      if (props.minH > props.h || props.minH > props.maxH) constraintError('minH', props);
	    },
	    maxH: function maxH(props, propName, componentName) {
	      React.PropTypes.number.apply(this, arguments);
	      if (props.maxH < props.h || props.maxH < props.minH) constraintError('maxH', props);
	    },
	
	    // ID is nice to have for callbacks
	    i: React.PropTypes.string.isRequired,
	
	    // If true, item will be repositioned when x/y/w/h change
	    moveOnStartChange: React.PropTypes.bool,
	
	    // Functions
	    onDragStop: React.PropTypes.func,
	    onDragStart: React.PropTypes.func,
	    onDrag: React.PropTypes.func,
	    onResizeStop: React.PropTypes.func,
	    onResizeStart: React.PropTypes.func,
	    onResize: React.PropTypes.func,
	
	    // Flags
	    isDraggable: React.PropTypes.bool,
	    isResizable: React.PropTypes.bool,
	    // Use CSS transforms instead of top/left
	    useCSSTransforms: React.PropTypes.bool,
	    isPlaceholder: React.PropTypes.bool,
	
	    // Others
	    className: React.PropTypes.string,
	    // Selector for draggable handle
	    handle: React.PropTypes.string,
	    // Selector for draggable cancel (see react-draggable)
	    cancel: React.PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      isDraggable: true,
	      isResizable: true,
	      useCSSTransforms: true,
	      className: '',
	      cancel: '',
	      minH: 1,
	      minW: 1,
	      maxH: Infinity,
	      maxW: Infinity
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      resizing: false,
	      className: ''
	    };
	  },
	
	  /**
	   * Return position on the page given an x, y, w, h.
	   * left, top, width, height are all in pixels.
	   * @param  {Number}  x             X coordinate in grid units.
	   * @param  {Number}  y             Y coordinate in grid units.
	   * @param  {Number}  w             W coordinate in grid units.
	   * @param  {Number}  h             H coordinate in grid units.
	   * @return {Object}                Object containing coords.
	   */
	  calcPosition: function calcPosition(x, y, w, h) {
	    var p = this.props;
	    var width = p.containerWidth - p.margin[0];
	    var out = {
	      left: width * (x / p.cols) + p.margin[0],
	      top: p.rowHeight * y + p.margin[1],
	      width: width * (w / p.cols) - p.margin[0],
	      height: h * p.rowHeight - p.margin[1]
	    };
	    return out;
	  },
	
	  /**
	   * Translate x and y coordinates from pixels to grid units.
	   * @param  {Number} options.left  Left offset in pixels.
	   * @param  {Number} options.top   Top offset in pixels.
	   * @return {Object}               x and y in grid units.
	   */
	  calcXY: function calcXY(_ref) {
	    var left = _ref.left;
	    var top = _ref.top;
	
	    left = left - this.props.margin[0];
	    top = top - this.props.margin[1];
	    // This is intentional; because so much of the logic on moving boxes up/down relies
	    // on an exact y position, we only round the x, not the y.
	    var x = Math.round(left / this.props.containerWidth * this.props.cols);
	    var y = Math.floor(top / this.props.rowHeight);
	    x = Math.max(Math.min(x, this.props.cols), 0);
	    y = Math.max(y, 0);
	    return { x: x, y: y };
	  },
	
	  /**
	   * Given a height and width in pixel values, calculate grid units.
	   * @param  {Number} options.height Height in pixels.
	   * @param  {Number} options.width  Width in pixels.
	   * @return {Object}                w, h as grid units.
	   */
	  calcWH: function calcWH(_ref2) {
	    var height = _ref2.height;
	    var width = _ref2.width;
	
	    width = width + this.props.margin[0];
	    height = height + this.props.margin[1];
	    var w = Math.round(width / this.props.containerWidth * this.props.cols);
	    var h = Math.round(height / this.props.rowHeight);
	    w = Math.max(Math.min(w, this.props.cols - this.props.x), 0);
	    h = Math.max(h, 0);
	    return { w: w, h: h };
	  },
	
	  /**
	   * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
	   * well when server rendering, and the only way to do that properly is to use percentage width/left because
	   * we don't know exactly what the browser viewport is.
	   * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
	   * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
	   *
	   * @param  {Object} pos Position object with width, height, left, top.
	   * @return {Object}     Style object.
	   */
	  createStyle: function createStyle(pos) {
	    var style = {
	      width: pos.width + 'px',
	      height: pos.height + 'px',
	      left: pos.left + 'px',
	      top: pos.top + 'px',
	      position: 'absolute'
	    };
	
	    // This is used for server rendering.
	    if (this.props.usePercentages) {
	      pos.left = utils.perc(pos.left / this.props.containerWidth);
	      style.left = pos.left;
	      style.width = utils.perc(pos.width / this.props.containerWidth);
	    }
	
	    // CSS Transforms support
	    if (this.props.useCSSTransforms) {
	      utils.setTransform(style, [pos.left, pos.top]);
	      delete style.left;
	      delete style.top;
	    }
	
	    return style;
	  },
	
	  /**
	   * Mix a Draggable instance into a child.
	   * @param  {Element} child    Child element.
	   * @param  {Object} position  Position object (pixel values)
	   * @return {Element}          Child wrapped in Draggable.
	   */
	  mixinDraggable: function mixinDraggable(child, position) {
	    var start = typeof position.left === "string" ? undefined : { x: position.left, y: position.top };
	    return React.createElement(
	      Draggable,
	      {
	        start: start,
	        moveOnStartChange: this.props.moveOnStartChange,
	        onStop: this.onDragHandler('onDragStop'),
	        onStart: this.onDragHandler('onDragStart'),
	        onDrag: this.onDragHandler('onDrag'),
	        handle: this.props.handle,
	        cancel: ".react-resizable-handle " + this.props.cancel,
	        useCSSTransforms: this.props.useCSSTransforms
	      },
	      child
	    );
	  },
	
	  /**
	   * Mix a Resizable instance into a child.
	   * @param  {Element} child    Child element.
	   * @param  {Object} position  Position object (pixel values)
	   * @return {Element}          Child wrapped in Resizable.
	   */
	  mixinResizable: function mixinResizable(child, position) {
	    var p = this.props;
	    // This is the max possible width - doesn't go to infinity because of the width of the window
	    var maxWidth = this.calcPosition(0, 0, p.cols - p.x, 0).width;
	
	    // Calculate min/max constraints using our min & maxes
	    var mins = this.calcPosition(0, 0, p.minW, p.minH);
	    var maxes = this.calcPosition(0, 0, p.maxW, p.maxH);
	    var minConstraints = [mins.width, mins.height];
	    var maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
	    return React.createElement(
	      Resizable,
	      {
	        width: position.width,
	        height: position.height,
	        minConstraints: minConstraints,
	        maxConstraints: maxConstraints,
	        onResizeStop: this.onResizeHandler('onResizeStop'),
	        onResizeStart: this.onResizeHandler('onResizeStart'),
	        onResize: this.onResizeHandler('onResize')
	      },
	      child
	    );
	  },
	
	  /**
	   * Wrapper around drag events to provide more useful data.
	   * All drag events call the function with the given handler name,
	   * with the signature (index, x, y).
	   *
	   * @param  {String} handlerName Handler name to wrap.
	   * @return {Function}           Handler function.
	   */
	  onDragHandler: function onDragHandler(handlerName) {
	    var me = this;
	    return function (e, _ref3) {
	      var element = _ref3.element;
	      var position = _ref3.position;
	
	      if (!me.props[handlerName]) return;
	      // Get new XY
	
	      var _me$calcXY = me.calcXY(position);
	
	      var x = _me$calcXY.x;
	      var y = _me$calcXY.y;
	
	      // Cap x at numCols
	      x = Math.min(x, me.props.cols - me.props.w);
	
	      me.props[handlerName](me.props.i, x, y, { e: e, element: element, position: position });
	    };
	  },
	
	  /**
	   * Wrapper around drag events to provide more useful data.
	   * All drag events call the function with the given handler name,
	   * with the signature (index, x, y).
	   *
	   * @param  {String} handlerName Handler name to wrap.
	   * @return {Function}           Handler function.
	   */
	  onResizeHandler: function onResizeHandler(handlerName) {
	    var me = this;
	    return function (e, _ref4) {
	      var element = _ref4.element;
	      var size = _ref4.size;
	
	      if (!me.props[handlerName]) return;
	
	      // Get new XY
	
	      var _me$calcWH = me.calcWH(size);
	
	      var w = _me$calcWH.w;
	      var h = _me$calcWH.h;
	
	      // Cap w at numCols
	      w = Math.min(w, me.props.cols - me.props.x);
	      // Ensure w is at least 1
	      w = Math.max(w, 1);
	
	      // Min/max capping
	      w = Math.max(Math.min(w, me.props.maxW), me.props.minW);
	      h = Math.max(Math.min(h, me.props.maxH), me.props.minH);
	
	      me.setState({ resizing: handlerName === 'onResizeStop' ? null : size });
	
	      me.props[handlerName](me.props.i, w, h, { e: e, element: element, size: size });
	    };
	  },
	
	  render: function render() {
	    var p = this.props,
	        pos = this.calcPosition(p.x, p.y, p.w, p.h);
	    if (this.state.resizing) {
	      pos.width = this.state.resizing.width;
	      pos.height = this.state.resizing.height;
	    }
	
	    // Create the child element. We clone the existing element but modify its className and style.
	    var child = cloneWithProps(this.props.children, {
	      // Munge a classname. Use passed in classnames and resizing.
	      // React with merge the classNames.
	      className: ['react-grid-item', this.props.className, this.state.resizing ? 'resizing' : '', this.props.useCSSTransforms ? 'cssTransforms' : ''].join(' '),
	      // We can set the width and height on the child, but unfortunately we can't set the position.
	      style: this.createStyle(pos)
	    });
	
	    // Resizable support. This is usually on but the user can toggle it off.
	    if (this.props.isResizable) {
	      child = this.mixinResizable(child, pos);
	    }
	
	    // Draggable support. This is always on, except for with placeholders.
	    if (this.props.isDraggable) {
	      child = this.mixinDraggable(child, pos);
	    }
	
	    return child;
	  }
	});
	
	function constraintError(name, props) {
	  delete props.children;
	  throw new Error(name + ' overrides contraints on gridItem ' + props.i + '. Full props: ' + JSON.stringify(props));
	}
	
	module.exports = GridItem;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var React = __webpack_require__(1);
	var utils = __webpack_require__(2);
	var responsiveUtils = __webpack_require__(12);
	var PureDeepRenderMixin = __webpack_require__(3);
	var WidthListeningMixin = __webpack_require__(6);
	var ReactGridLayout = __webpack_require__(5);
	
	/**
	 * A wrapper around ReactGridLayout to support responsive breakpoints.
	 */
	var ResponsiveReactGridLayout = React.createClass({
	  displayName: 'ResponsiveReactGridLayout',
	
	  mixins: [PureDeepRenderMixin, WidthListeningMixin],
	
	  propTypes: {
	    //
	    // Basic props
	    //
	
	    // Optional, but if you are managing width yourself you may want to set the breakpoint
	    // yourself as well.
	    breakpoint: React.PropTypes.string,
	
	    // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
	    breakpoints: React.PropTypes.object,
	
	    // # of cols. This is a breakpoint -> cols map
	    cols: React.PropTypes.object,
	
	    // layouts is an object mapping breakpoints to layouts.
	    // e.g. {lg: Layout, md: Layout, ...}
	    layouts: function layouts(props, propName, componentName) {
	      React.PropTypes.object.isRequired.apply(this, arguments);
	
	      var layouts = props.layouts;
	      Object.keys(layouts).map(function (k) {
	        utils.validateLayout(layouts[k], 'layouts.' + k);
	      });
	    },
	
	    //
	    // Callbacks
	    //
	
	    // Calls back with breakpoint and new # cols
	    onBreakpointChange: React.PropTypes.func,
	
	    // Callback so you can save the layout.
	    // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
	    onLayoutChange: React.PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
	      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
	      layouts: {},
	      onBreakpointChange: function onBreakpointChange() {},
	      onLayoutChange: function onLayoutChange() {}
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    var breakpoint = this.props.breakpoint || responsiveUtils.getBreakpointFromWidth(this.props.breakpoints, this.props.initialWidth);
	    var cols = responsiveUtils.getColsFromBreakpoint(breakpoint, this.props.cols);
	
	    // Get the initial layout. This can tricky; we try to generate one however possible if one doesn't exist
	    // for this layout.
	    var initialLayout = responsiveUtils.findOrGenerateResponsiveLayout(this.props.layouts, this.props.breakpoints, breakpoint, breakpoint, cols, this.props.verticalCompact);
	
	    return {
	      layout: initialLayout,
	      // storage for layouts obsoleted by breakpoints
	      layouts: this.props.layouts || {},
	      breakpoint: breakpoint,
	      cols: cols,
	      width: this.props.initialWidth
	    };
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // This allows you to set the width manually if you like.
	    // Use manual width changes in combination with `listenToWindowResize: false`
	    if (nextProps.width) this.onWidthChange(nextProps.width);
	
	    // Allow parent to set breakpoint directly.
	    if (nextProps.breakpoint !== this.props.breakpoint) {
	      this.onWidthChange(this.state.width);
	    }
	
	    // Allow parent to set layouts directly.
	    if (nextProps.layouts && nextProps.layouts !== this.state.layouts) {
	      // Since we're setting an entirely new layout object, we must generate a new responsive layout
	      // if one does not exist.
	      var newLayout = responsiveUtils.findOrGenerateResponsiveLayout(nextProps.layouts, nextProps.breakpoints, this.state.breakpoint, this.state.breakpoint, this.state.cols, this.props.verticalLayout);
	
	      this.setState({
	        layouts: nextProps.layouts,
	        layout: newLayout
	      });
	    }
	  },
	
	  /**
	   * Bubble this up, add `layouts` object.
	   * @param  {Array} layout Layout from inner Grid.
	   */
	  onLayoutChange: function onLayoutChange(layout) {
	    this.state.layouts[this.state.breakpoint] = layout;
	    this.setState({ layout: layout, layouts: this.state.layouts });
	    this.props.onLayoutChange(layout, this.state.layouts);
	  },
	
	  /**
	   * When the width changes work through breakpoints and reset state with the new width & breakpoint.
	   * Width changes are necessary to figure out the widget widths.
	   */
	  onWidthChange: function onWidthChange(width) {
	    // Set new breakpoint
	    var newState = { width: width };
	    newState.breakpoint = this.props.breakpoint || responsiveUtils.getBreakpointFromWidth(this.props.breakpoints, newState.width);
	    newState.cols = responsiveUtils.getColsFromBreakpoint(newState.breakpoint, this.props.cols);
	
	    // Breakpoint change
	    if (newState.cols !== this.state.cols) {
	
	      // Store the current layout
	      newState.layouts = this.state.layouts;
	      newState.layouts[this.state.breakpoint] = JSON.parse(JSON.stringify(this.state.layout));
	
	      // Find or generate a new one.
	      newState.layout = responsiveUtils.findOrGenerateResponsiveLayout(newState.layouts, this.props.breakpoints, newState.breakpoint, this.state.breakpoint, newState.cols, this.props.verticalLayout);
	
	      // This adds missing items.
	      newState.layout = utils.synchronizeLayoutWithChildren(newState.layout, this.props.children, newState.cols, this.props.verticalCompact);
	
	      // Store this new layout as well.
	      newState.layouts[newState.breakpoint] = newState.layout;
	
	      this.props.onBreakpointChange(newState.breakpoint, newState.cols);
	    }
	
	    this.setState(newState);
	  },
	
	  render: function render() {
	    // Don't pass responsive props to RGL.
	    /*jshint unused:false*/
	    var _props = this.props;
	    var layouts = _props.layouts;
	    var onBreakpointChange = _props.onBreakpointChange;
	    var breakpoints = _props.breakpoints;
	
	    var props = _objectWithoutProperties(_props, ['layouts', 'onBreakpointChange', 'breakpoints']);
	
	    return React.createElement(
	      ReactGridLayout,
	      _extends({}, props, {
	        layout: this.state.layout,
	        cols: this.state.cols,
	        listenToWindowResize: false,
	        onLayoutChange: this.onLayoutChange,
	        width: this.state.width }),
	      this.props.children
	    );
	  }
	});
	
	module.exports = ResponsiveReactGridLayout;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	var responsiveUtils = module.exports = {
	
	  /**
	   * Given a width, find the highest breakpoint that matches is valid for it (width > breakpoint).
	   *
	   * @param  {Object} breakpoints Breakpoints object (e.g. {lg: 1200, md: 960, ...})
	   * @param  {Number} width Screen width.
	   * @return {String}       Highest breakpoint that is less than width.
	   */
	  getBreakpointFromWidth: function getBreakpointFromWidth(breakpoints, width) {
	    var sorted = responsiveUtils.sortBreakpoints(breakpoints);
	    var matching = sorted[0];
	    for (var i = 1, len = sorted.length; i < len; i++) {
	      var breakpointName = sorted[i];
	      if (width > breakpoints[breakpointName]) matching = breakpointName;
	    }
	    return matching;
	  },
	
	  /**
	   * Given a breakpoint, get the # of cols set for it.
	   * @param  {String} breakpoint Breakpoint name.
	   * @param  {Object} cols       Map of breakpoints to cols.
	   * @return {Number}            Number of cols.
	   */
	  getColsFromBreakpoint: function getColsFromBreakpoint(breakpoint, cols) {
	    if (!cols[breakpoint]) {
	      throw new Error("ResponsiveReactGridLayout: `cols` entry for breakpoint " + breakpoint + " is missing!");
	    }
	    return cols[breakpoint];
	  },
	
	  /**
	   * Given existing layouts and a new breakpoint, find or generate a new layout.
	   *
	   * This finds the layout above the new one and generates from it, if it exists.
	   *
	   * @param  {Array} layouts     Existing layouts.
	   * @param  {Array} breakpoints All breakpoints.
	   * @param  {String} breakpoint New breakpoint.
	   * @param  {String} breakpoint Last breakpoint (for fallback).
	   * @param  {Number} cols       Column count at new breakpoint.
	   * @param  {Boolean} verticalCompact Whether or not to compact the layout
	   *   vertically.
	   * @return {Array}             New layout.
	   */
	  findOrGenerateResponsiveLayout: function findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, lastBreakpoint, cols, verticalCompact) {
	    // If it already exists, just return it.
	    if (layouts[breakpoint]) return layouts[breakpoint];
	    // Find or generate the next layout
	    var layout = layouts[lastBreakpoint];
	    var breakpointsSorted = responsiveUtils.sortBreakpoints(breakpoints);
	    var breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));
	    for (var i = 0, len = breakpointsAbove.length; i < len; i++) {
	      var b = breakpointsAbove[i];
	      if (layouts[b]) {
	        layout = layouts[b];
	        break;
	      }
	    }
	    layout = JSON.parse(JSON.stringify(layout || [])); // clone layout so we don't modify existing items
	    return utils.compact(utils.correctBounds(layout, { cols: cols }), verticalCompact);
	  },
	
	  /**
	   * Given breakpoints, return an array of breakpoints sorted by width. This is usually
	   * e.g. ['xxs', 'xs', 'sm', ...]
	   *
	   * @param  {Object} breakpoints Key/value pair of breakpoint names to widths.
	   * @return {Array}              Sorted breakpoints.
	   */
	  sortBreakpoints: function sortBreakpoints(breakpoints) {
	    var keys = Object.keys(breakpoints);
	    return keys.sort(function (a, b) {
	      return breakpoints[a] - breakpoints[b];
	    });
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(15);
	var isArguments = __webpack_require__(14);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var emptyFunction = function(){};
	var assign = __webpack_require__(19);
	var classNames = __webpack_require__(18);
	var browserPrefix = __webpack_require__(17)();
	
	//
	// Helpers. See Element definition below this section.
	//
	
	function createUIEvent(draggable) {
	  // State changes are often (but not always!) async. We want the latest value.
	  var state = draggable._pendingState || draggable.state;
	  return {
	    node: draggable.getDOMNode(),
	    position: {
	      top: state.clientY,
	      left: state.clientX
	    }
	  };
	}
	
	function canDragX(draggable) {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
	}
	
	function canDragY(draggable) {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
	}
	
	function isFunction(func) {
	  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
	}
	
	// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
	function findInArray(array, callback) {
	  for (var i = 0, length = array.length; i < length; i++) {
	    if (callback.apply(callback, [array[i], i, array])) return array[i];
	  }
	}
	
	var matchesSelectorFunc = '';
	function matchesSelector(el, selector) {
	  if (!matchesSelectorFunc) {
	    matchesSelectorFunc = findInArray([
	      'matches',
	      'webkitMatchesSelector',
	      'mozMatchesSelector',
	      'msMatchesSelector',
	      'oMatchesSelector'
	    ], function(method){
	      return isFunction(el[method]);
	    });
	  }
	
	  return el[matchesSelectorFunc].call(el, selector);
	}
	
	/**
	 * simple abstraction for dragging events names
	 * */
	var eventsFor = {
	  touch: {
	    start: 'touchstart',
	    move: 'touchmove',
	    end: 'touchend'
	  },
	  mouse: {
	    start: 'mousedown',
	    move: 'mousemove',
	    end: 'mouseup'
	  }
	};
	
	// Default to mouse events
	var dragEventFor = eventsFor.mouse;
	
	/**
	 * get {clientX, clientY} positions of control
	 * */
	function getControlPosition(e) {
	  var position = (e.targetTouches && e.targetTouches[0]) || e;
	  return {
	    clientX: position.clientX,
	    clientY: position.clientY
	  };
	}
	
	function addEvent(el, event, handler) {
	  if (!el) { return; }
	  if (el.attachEvent) {
	    el.attachEvent('on' + event, handler);
	  } else if (el.addEventListener) {
	    el.addEventListener(event, handler, true);
	  } else {
	    el['on' + event] = handler;
	  }
	}
	
	function removeEvent(el, event, handler) {
	  if (!el) { return; }
	  if (el.detachEvent) {
	    el.detachEvent('on' + event, handler);
	  } else if (el.removeEventListener) {
	    el.removeEventListener(event, handler, true);
	  } else {
	    el['on' + event] = null;
	  }
	}
	
	function outerHeight(node) {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetTop which is including margin. See getBoundPosition
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height += int(computedStyle.borderTopWidth);
	  height += int(computedStyle.borderBottomWidth);
	  return height;
	}
	
	function outerWidth(node) {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetLeft which is including margin. See getBoundPosition
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width += int(computedStyle.borderLeftWidth);
	  width += int(computedStyle.borderRightWidth);
	  return width;
	}
	function innerHeight(node) {
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height -= int(computedStyle.paddingTop);
	  height -= int(computedStyle.paddingBottom);
	  return height;
	}
	
	function innerWidth(node) {
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width -= int(computedStyle.paddingLeft);
	  width -= int(computedStyle.paddingRight);
	  return width;
	}
	
	function isNum(num) {
	  return typeof num === 'number' && !isNaN(num);
	}
	
	function int(a) {
	  return parseInt(a, 10);
	}
	
	function getBoundPosition(draggable, clientX, clientY) {
	  var bounds = JSON.parse(JSON.stringify(draggable.props.bounds));
	  var node = draggable.getDOMNode();
	  var parent = node.parentNode;
	
	  if (bounds === 'parent') {
	    var nodeStyle = window.getComputedStyle(node);
	    var parentStyle = window.getComputedStyle(parent);
	    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
	    bounds = {
	      left: -node.offsetLeft + int(parentStyle.paddingLeft) +
	            int(nodeStyle.borderLeftWidth) + int(nodeStyle.marginLeft),
	      top: -node.offsetTop + int(parentStyle.paddingTop) +
	            int(nodeStyle.borderTopWidth) + int(nodeStyle.marginTop),
	      right: innerWidth(parent) - outerWidth(node) - node.offsetLeft,
	      bottom: innerHeight(parent) - outerHeight(node) - node.offsetTop
	    };
	  }
	
	  // Keep x and y below right and bottom limits...
	  if (isNum(bounds.right)) clientX = Math.min(clientX, bounds.right);
	  if (isNum(bounds.bottom)) clientY = Math.min(clientY, bounds.bottom);
	
	  // But above left and top limits.
	  if (isNum(bounds.left)) clientX = Math.max(clientX, bounds.left);
	  if (isNum(bounds.top)) clientY = Math.max(clientY, bounds.top);
	
	  return [clientX, clientY];
	}
	
	function snapToGrid(grid, pendingX, pendingY) {
	  var x = Math.round(pendingX / grid[0]) * grid[0];
	  var y = Math.round(pendingY / grid[1]) * grid[1];
	  return [x, y];
	}
	
	// Useful for preventing blue highlights all over everything when dragging.
	var userSelectStyle = ';user-select: none;';
	if (browserPrefix) {
	  userSelectStyle += '-' + browserPrefix.toLowerCase() + '-user-select: none;';
	}
	
	function addUserSelectStyles(draggable) {
	  if (!draggable.props.enableUserSelectHack) return;
	  var style = document.body.getAttribute('style') || '';
	  document.body.setAttribute('style', style + userSelectStyle);
	}
	
	function removeUserSelectStyles(draggable) {
	  if (!draggable.props.enableUserSelectHack) return;
	  var style = document.body.getAttribute('style') || '';
	  document.body.setAttribute('style', style.replace(userSelectStyle, ''));
	}
	
	function createCSSTransform(style) {
	  // Replace unitless items with px
	  var x = style.x + 'px';
	  var y = style.y + 'px';
	  var out = {transform: 'translate(' + x + ',' + y + ')'};
	  // Add single prefixed property as well
	  if (browserPrefix) {
	    out[browserPrefix + 'Transform'] = out.transform;
	  }
	  return out;
	}
	
	function createSVGTransform(args) {
	  return 'translate(' + args.x + ',' + args.y + ')';
	}
	
	//
	// End Helpers.
	//
	
	//
	// Define <Draggable>
	//
	
	module.exports = React.createClass({
	  displayName: 'Draggable',
	
	  propTypes: {
	    /**
	     * `axis` determines which axis the draggable can move.
	     *
	     * 'both' allows movement horizontally and vertically.
	     * 'x' limits movement to horizontal axis.
	     * 'y' limits movement to vertical axis.
	     *
	     * Defaults to 'both'.
	     */
	    axis: React.PropTypes.oneOf(['both', 'x', 'y']),
	
	    /**
	     * `bounds` determines the range of movement available to the element.
	     * Available values are:
	     *
	     * 'parent' restricts movement within the Draggable's parent node.
	     *
	     * Alternatively, pass an object with the following properties, all of which are optional:
	     *
	     * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
	     *
	     * All values are in px.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
	     *       render: function () {
	     *         return (
	     *            <Draggable bounds={{right: 300, bottom: 300}}>
	     *              <div>Content</div>
	     *           </Draggable>
	     *         );
	     *       }
	     *   });
	     * ```
	     */
	    bounds: React.PropTypes.oneOfType([
	      React.PropTypes.shape({
	        left: React.PropTypes.Number,
	        right: React.PropTypes.Number,
	        top: React.PropTypes.Number,
	        bottom: React.PropTypes.Number
	      }),
	      React.PropTypes.oneOf(['parent', false])
	    ]),
	
	    /**
	     * By default, we add 'user-select:none' attributes to the document body
	     * to prevent ugly text selection during drag. If this is causing problems
	     * for your app, set this to `false`.
	     */
	    enableUserSelectHack: React.PropTypes.bool,
	
	    /**
	     * `handle` specifies a selector to be used as the handle that initiates drag.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
	     *       render: function () {
	     *         return (
	     *            <Draggable handle=".handle">
	     *              <div>
	     *                  <div className="handle">Click me to drag</div>
	     *                  <div>This is some other content</div>
	     *              </div>
	     *           </Draggable>
	     *         );
	     *       }
	     *   });
	     * ```
	     */
	    handle: React.PropTypes.string,
	
	    /**
	     * `cancel` specifies a selector to be used to prevent drag initialization.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
	     *       render: function () {
	     *           return(
	     *               <Draggable cancel=".cancel">
	     *                   <div>
	     *                     <div className="cancel">You can't drag from here</div>
	     *            <div>Dragging here works fine</div>
	     *                   </div>
	     *               </Draggable>
	     *           );
	     *       }
	     *   });
	     * ```
	     */
	    cancel: React.PropTypes.string,
	
	    /**
	     * `grid` specifies the x and y that dragging should snap to.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
	     *       render: function () {
	     *           return (
	     *               <Draggable grid={[25, 25]}>
	     *                   <div>I snap to a 25 x 25 grid</div>
	     *               </Draggable>
	     *           );
	     *       }
	     *   });
	     * ```
	     */
	    grid: React.PropTypes.arrayOf(React.PropTypes.number),
	
	    /**
	     * `start` specifies the x and y that the dragged item should start at
	     *
	     * Example:
	     *
	     * ```jsx
	     *      var App = React.createClass({
	     *          render: function () {
	     *              return (
	     *                  <Draggable start={{x: 25, y: 25}}>
	     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	     *                  </Draggable>
	     *              );
	     *          }
	     *      });
	     * ```
	     */
	    start: React.PropTypes.shape({
	      x: React.PropTypes.number,
	      y: React.PropTypes.number
	    }),
	
	    /**
	     * `moveOnStartChange`, if true (default false) will move the element if the `start`
	     * property changes.
	     */
	    moveOnStartChange: React.PropTypes.bool,
	
	
	    /**
	     * `zIndex` specifies the zIndex to use while dragging.
	     *
	     * Example:
	     *
	     * ```jsx
	     *   var App = React.createClass({
	     *       render: function () {
	     *           return (
	     *               <Draggable zIndex={100}>
	     *                   <div>I have a zIndex</div>
	     *               </Draggable>
	     *           );
	     *       }
	     *   });
	     * ```
	     */
	    zIndex: React.PropTypes.number,
	
	    /**
	     * Called when dragging starts.
	     * If this function returns the boolean false, dragging will be canceled.
	     *
	     * Example:
	     *
	     * ```js
	     *  function (event, ui) {}
	     * ```
	     *
	     * `event` is the Event that was triggered.
	     * `ui` is an object:
	     *
	     * ```js
	     *  {
	     *    position: {top: 0, left: 0}
	     *  }
	     * ```
	     */
	    onStart: React.PropTypes.func,
	
	    /**
	     * Called while dragging.
	     * If this function returns the boolean false, dragging will be canceled.
	     *
	     * Example:
	     *
	     * ```js
	     *  function (event, ui) {}
	     * ```
	     *
	     * `event` is the Event that was triggered.
	     * `ui` is an object:
	     *
	     * ```js
	     *  {
	     *    position: {top: 0, left: 0}
	     *  }
	     * ```
	     */
	    onDrag: React.PropTypes.func,
	
	    /**
	     * Called when dragging stops.
	     *
	     * Example:
	     *
	     * ```js
	     *  function (event, ui) {}
	     * ```
	     *
	     * `event` is the Event that was triggered.
	     * `ui` is an object:
	     *
	     * ```js
	     *  {
	     *    position: {top: 0, left: 0}
	     *  }
	     * ```
	     */
	    onStop: React.PropTypes.func,
	
	    /**
	     * A workaround option which can be passed if onMouseDown needs to be accessed,
	     * since it'll always be blocked (due to that there's internal use of onMouseDown)
	     */
	    onMouseDown: React.PropTypes.func,
	  },
	
	  componentWillReceiveProps: function(newProps) {
	    // React to changes in the 'start' param.
	    if (newProps.moveOnStartChange && newProps.start) {
	      this.setState(this.getInitialState(newProps));
	    }
	  },
	
	  componentDidMount: function() {
	    // Check to see if the element passed is an instanceof SVGElement
	    if( React.findDOMNode(this) instanceof SVGElement) {
	        this.setState({ isElementSVG: true });
	    }
	  },
	
	  componentWillUnmount: function() {
	    // Remove any leftover event handlers
	    removeEvent(document, dragEventFor.move, this.handleDrag);
	    removeEvent(document, dragEventFor.end, this.handleDragEnd);
	    removeUserSelectStyles(this);
	  },
	
	  getDefaultProps: function () {
	    return {
	      axis: 'both',
	      bounds: false,
	      handle: null,
	      cancel: null,
	      grid: null,
	      moveOnStartChange: false,
	      start: {x: 0, y: 0},
	      zIndex: NaN,
	      enableUserSelectHack: true,
	      onStart: emptyFunction,
	      onDrag: emptyFunction,
	      onStop: emptyFunction,
	      onMouseDown: emptyFunction
	    };
	  },
	
	  getInitialState: function (props) {
	    // Handle call from CWRP
	    var currentState = this.state;
	    props = props || this.props;
	    return {
	      // Whether or not we are currently dragging.
	      dragging: false,
	
	      // Offset between start top/left and mouse top/left while dragging.
	      offsetX: 0, offsetY: 0,
	
	      // Current transform x and y.
	      clientX: props.start.x, clientY: props.start.y,
	
	      // Determines if the element is an svg or not. Default to false.
	      isElementSVG: currentState && currentState.isElementSVG !== undefined ?
	        currentState.isElementSVG :
	        false
	    };
	  },
	
	  handleDragStart: function (e) {
	    // Set touch identifier in component state if this is a touch event
	    if(e.targetTouches){
	      this.setState({touchIdentifier: e.targetTouches[0].identifier});
	    }
	
	    // Make it possible to attach event handlers on top of this one
	    this.props.onMouseDown(e);
	
	    // Short circuit if handle or cancel prop was provided and selector doesn't match
	    if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
	      (this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
	      return;
	    }
	
	    // Call event handler. If it returns explicit false, cancel.
	    var shouldStart = this.props.onStart(e, createUIEvent(this));
	    if (shouldStart === false) return;
	
	    var dragPoint = getControlPosition(e);
	
	    // Add a style to the body to disable user-select. This prevents text from
	    // being selected all over the page.
	    addUserSelectStyles(this);
	
	    // Initiate dragging. Set the current x and y as offsets
	    // so we know how much we've moved during the drag. This allows us
	    // to drag elements around even if they have been moved, without issue.
	    this.setState({
	      dragging: true,
	      offsetX: dragPoint.clientX - this.state.clientX,
	      offsetY: dragPoint.clientY - this.state.clientY,
	      scrollX: document.body.scrollLeft,
	      scrollY: document.body.scrollTop
	    });
	
	
	    // Add event handlers
	    addEvent(document, 'scroll', this.handleScroll);
	    addEvent(document, dragEventFor.move, this.handleDrag);
	    addEvent(document, dragEventFor.end, this.handleDragEnd);
	  },
	
	  handleDragEnd: function (e) {
	    // Short circuit if not currently dragging
	    if (!this.state.dragging) {
	      return;
	    }
	
	    // Short circuit if this is not the correct touch event
	    if(e.changedTouches && (e.changedTouches[0].identifier != this.state.touchIdentifier)){
	     return;
	    }
	
	    removeUserSelectStyles(this);
	
	    // Turn off dragging
	    this.setState({
	      dragging: false
	    });
	
	    // Call event handler
	    this.props.onStop(e, createUIEvent(this));
	
	    // Remove event handlers
	    removeEvent(document, 'scroll', this.handleScroll);
	    removeEvent(document, dragEventFor.move, this.handleDrag);
	    removeEvent(document, dragEventFor.end, this.handleDragEnd);
	  },
	
	  handleDrag: function (e) {
	    // Return if this is a touch event, but not the correct one for this element
	    if(e.targetTouches && (e.targetTouches[0].identifier != this.state.touchIdentifier)){
	      return;
	    }
	    var dragPoint = getControlPosition(e);
	
	    // Calculate X and Y
	    var clientX = dragPoint.clientX - this.state.offsetX;
	    var clientY = dragPoint.clientY - this.state.offsetY;
	
	    // Snap to grid if prop has been provided
	    if (Array.isArray(this.props.grid)) {
	      var coords = snapToGrid(this.props.grid, clientX, clientY);
	      clientX = coords[0];
	      clientY = coords[1];
	    }
	
	    if (this.props.bounds) {
	      var pos = getBoundPosition(this, clientX, clientY);
	      clientX = pos[0];
	      clientY = pos[1];
	    }
	
	    // Call event handler. If it returns explicit false, cancel.
	    var shouldUpdate = this.props.onDrag(e, createUIEvent(this));
	    if (shouldUpdate === false) return this.handleDragEnd({});
	
	    // Update transform
	    this.setState({
	      clientX: clientX,
	      clientY: clientY
	    });
	  },
	
	  handleScroll: function(e) {
	    var s = this.state, x = document.body.scrollLeft, y = document.body.scrollTop;
	    var offsetX = x - s.scrollX, offsetY = y - s.scrollY;
	    this.setState({
	      scrollX: x,
	      scrollY: y,
	      clientX: s.clientX + offsetX,
	      clientY: s.clientY + offsetY,
	      offsetX: s.offsetX - offsetX,
	      offsetY: s.offsetY - offsetY
	    });
	  },
	
	  onMouseDown: function(ev) {
	    // Prevent 'ghost click' which happens 300ms after touchstart if the event isn't cancelled.
	    // We don't cancel the event on touchstart because of #37; we might want to make a scrollable item draggable.
	    // More on ghost clicks: http://ariatemplates.com/blog/2014/05/ghost-clicks-in-mobile-browsers/
	    if (dragEventFor === eventsFor.touch) {
	      return ev.preventDefault();
	    }
	
	    return this.handleDragStart.apply(this, arguments);
	  },
	
	  onTouchStart: function(ev) {
	    // We're on a touch device now, so change the event handlers
	    dragEventFor = eventsFor.touch;
	
	    return this.handleDragStart.apply(this, arguments);
	  },
	
	  // Intended for use by a parent component. Resets internal state on this component. Useful for
	  // <Resizable> and other components in case this element is manually resized and start/moveOnStartChange
	  // don't work for you.
	  resetState: function() {
	    this.setState({
	      offsetX: 0, offsetY: 0, clientX: 0, clientY: 0
	    });
	  },
	
	  render: function () {
	    // Create style object. We extend from existing styles so we don't
	    // remove anything already set (like background, color, etc).
	    var childStyle = this.props.children.props.style || {};
	
	    // Add a CSS transform to move the element around. This allows us to move the element around
	    // without worrying about whether or not it is relatively or absolutely positioned.
	    // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	    // has a clean slate.
	    var transform = this.state.isElementSVG ? null :
	      createCSSTransform({
	          // Set left if horizontal drag is enabled
	          x: canDragX(this) ?
	            this.state.clientX :
	            this.props.start.x,
	
	          // Set top if vertical drag is enabled
	          y: canDragY(this) ?
	            this.state.clientY :
	            this.props.start.y
	        });
	
	
	    // This is primarily for IE as it ignores the CSS transform applied above
	    // and only respects the real transform attribute.
	    var svgTransform = !this.state.isElementSVG ? null :
	        createSVGTransform({
	          // Set left if horizontal drag is enabled
	          x: canDragX(this) ?
	            this.state.clientX :
	            this.props.start.x,
	
	          // Set top if vertical drag is enabled
	          y: canDragY(this) ?
	            this.state.clientY :
	            this.props.start.y
	        });
	
	
	    // Workaround IE pointer events; see #51
	    // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
	    var touchHacks = {
	      touchAction: 'none'
	    };
	
	    var style = assign({}, childStyle, transform, touchHacks);
	
	    // Set zIndex if currently dragging and prop has been provided
	    if (this.state.dragging && !isNaN(this.props.zIndex)) {
	      style.zIndex = this.props.zIndex;
	    }
	
	    var className = classNames((this.props.children.props.className || ''), 'react-draggable', {
	      'react-draggable-dragging': this.state.dragging,
	      'react-draggable-dragged': this.state.dragged
	    });
	
	    // Reuse the child provided
	    // This makes it flexible to use whatever element is wanted (div, ul, etc)
	    return React.cloneElement(React.Children.only(this.props.children), {
	      style: style,
	      transform: svgTransform,
	      className: className,
	
	      onMouseDown: this.onMouseDown,
	      onTouchStart: this.onTouchStart,
	      onMouseUp: this.handleDragEnd,
	      onTouchEnd: this.handleDragEnd
	    });
	  }
	});


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function() {
	  if (typeof window === 'undefined') return '';
	  // Thanks David Walsh
	  var styles = window.getComputedStyle(document.documentElement, ''),
	  pre = (Array.prototype.slice
	        .call(styles)
	        .join('')
	        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	      )[1];
	  // 'ms' is not titlecased
	  if(pre === undefined || pre === null) return '';
	  if (pre === 'ms') return pre;
	  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 19 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(1);
	var Resizable = __webpack_require__(8);
	var PureRenderMixin = __webpack_require__(9);
	
	// An example use of Resizable.
	var ResizableBox = module.exports = React.createClass({
	  displayName: 'ResizableBox',
	  mixins: [PureRenderMixin],
	
	  propTypes: {
	    lockAspectRatio: React.PropTypes.bool
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      lockAspectRatio: false,
	      handleSize: [20, 20]
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      width: this.props.width,
	      height: this.props.height,
	      aspectRatio: this.props.width / this.props.height
	    };
	  },
	
	  onResize: function onResize(event, _ref) {
	    var _this = this;
	
	    var element = _ref.element;
	    var size = _ref.size;
	    var width = size.width;
	    var height = size.height;
	
	    var widthChanged = width !== this.state.width,
	        heightChanged = height !== this.state.height;
	    if (!widthChanged && !heightChanged) {
	      return;
	    }if (this.props.lockAspectRatio) {
	      var _preserveAspectRatio = this.preserveAspectRatio(width, height);
	
	      var _preserveAspectRatio2 = _slicedToArray(_preserveAspectRatio, 2);
	
	      width = _preserveAspectRatio2[0];
	      height = _preserveAspectRatio2[1];
	    }
	
	    this.setState({ width: width, height: height }, function () {
	      if (_this.props.onResize) {
	        _this.props.onResize(event, { element: element, size: { width: width, height: height } });
	      }
	    });
	  },
	
	  // If you do this, be careful of constraints
	  preserveAspectRatio: function preserveAspectRatio(width, height) {
	    var min = this.props.minConstraints;
	    var max = this.props.maxConstraints;
	
	    height = width / this.state.aspectRatio;
	    width = height * this.state.aspectRatio;
	
	    if (min) {
	      width = Math.max(min[0], width);
	      height = Math.max(min[1], height);
	    }
	    if (max) {
	      width = Math.min(max[0], width);
	      height = Math.min(max[1], height);
	    }
	    return [width, height];
	  },
	
	  render: function render() {
	    // Basic wrapper around a Resizable instance.
	    // If you use Resizable directly, you are responsible for updating the component
	    // with a new width and height.
	    var _props = this.props;
	    var handleSize = _props.handleSize;
	    var minConstraints = _props.minConstraints;
	    var maxConstraints = _props.maxConstraints;
	
	    var props = _objectWithoutProperties(_props, ['handleSize', 'minConstraints', 'maxConstraints']);
	
	    return React.createElement(
	      Resizable,
	      {
	        minConstraints: minConstraints,
	        maxConstraints: maxConstraints,
	        handleSize: handleSize,
	        width: this.state.width,
	        height: this.state.height,
	        onResizeStart: this.props.onResizeStart,
	        onResize: this.onResize,
	        onResizeStop: this.props.onResizeStop,
	        draggableOpts: this.props.draggableOpts
	      },
	      React.createElement(
	        'div',
	        _extends({ style: { width: this.state.width + 'px', height: this.state.height + 'px' } }, props),
	        this.props.children
	      )
	    );
	  }
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign = __webpack_require__(4);
	var React = __webpack_require__(1);
	
	module.exports = function cloneElement(element, props) {
	  if (props.style && element.props.style) {
	    props.style = assign({}, element.props.style, props.style);
	  }
	  if (props.className && element.props.className) {
	    props.className = element.props.className + ' ' + props.className;
	  }
	  return React.cloneElement(element, props);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function() {
	  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
	};
	
	module.exports.Resizable = __webpack_require__(8);
	module.exports.ResizableBox = __webpack_require__(20);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React    = __webpack_require__(1)
	  , hasOwn   = Object.prototype.hasOwnProperty
	  , version  = React.version.split('.').map(parseFloat)
	  , RESERVED = {
	      className:  resolve(joinClasses),
	      children:   function(){},
	      key:        function(){},
	      ref:        function(){},
	      style:      resolve(extend)
	    };
	
	module.exports = function cloneWithProps(child, props) {
	  var newProps = mergeProps(child.props, props);
	
	  if (!hasOwn.call(newProps, 'children') && hasOwn.call(child.props, 'children'))
	    newProps.children = child.props.children;
	
	  // < 0.11
	  if (version[0] === 0 && version[1] < 11)
	    return child.constructor.ConvenienceConstructor(newProps);
	  
	  // 0.11
	  if (version[0] === 0 && version[1] === 11)
	    return child.constructor(newProps);
	
	  // 0.12
	  else if (version[0] === 0 && version[1] === 12){
	    MockLegacyFactory.isReactLegacyFactory = true
	    MockLegacyFactory.type = child.type
	    return React.createElement(MockLegacyFactory, newProps);
	  }
	
	  // 0.13+
	  return React.createElement(child.type, newProps);
	
	  function MockLegacyFactory(){}
	}
	
	function mergeProps(currentProps, childProps) {
	  var newProps = extend(currentProps), key
	
	  for (key in childProps) {
	    if (hasOwn.call(RESERVED, key) )
	      RESERVED[key](newProps, childProps[key], key)
	
	    else if ( !hasOwn.call(newProps, key) )
	      newProps[key] = childProps[key];
	  }
	  return newProps
	}
	
	function resolve(fn){
	  return function(src, value, key){
	    if( !hasOwn.call(src, key)) src[key] = value
	    else src[key] = fn(src[key], value)
	  }
	}
	
	function joinClasses(a, b){
	  if ( !a ) return b || ''
	  return a + (b ? ' ' + b : '')
	}
	
	function extend() {
	  var target = {};
	  for (var i = 0; i < arguments.length; i++) 
	    for (var key in arguments[i]) if (hasOwn.call(arguments[i], key)) 
	      target[key] = arguments[i][key]   
	  return target
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */
	
	'use strict';
	
	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = shallowEqual;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-grid-layout.js.map
