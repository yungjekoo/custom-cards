!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.DeviceTable=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var RPT = React.PropTypes;

var DeviceTable = React.createClass({
	displayName: "DeviceTable",

	propTypes: {
		data: RPT.array,
		nls: RPT.object
	},

	getDefaultProps: function getDefaultProps() {
		return {
			data: [{
				id: "ABC",
				value: 123,
				name: "Peter"
			}, {
				id: "DEF",
				value: 456,
				name: "Fernando"
			}, {
				id: "GHI",
				value: 789,
				name: "Henrietta"
			}],
			strings: ["header", "footer"]
		};
	},

	getInitialState: function getInitialState() {
		return {
			strings: {
				"header": "",
				"footer": ""
			}
		};
	},

	handleNLS: function handleNLS(strings) {
		this.setState(strings);
		this.render();
	},

	componentWillMount: function componentWillMount() {
		this.props.nls.resolve("DeviceTable", this.props.strings, this.handleNLS);
	},

	render: function render() {
		var rows = this.props.data;
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h3",
				null,
				this.state.strings.header
			),
			React.createElement(
				"table",
				{ className: "deviceTable" },
				React.createElement(
					"tbody",
					null,
					React.createElement(
						"tr",
						null,
						Object.keys(rows[0]).map(function (key) {
							return React.createElement(
								"th",
								{ key: key },
								key
							);
						})
					),
					rows.map(function (row) {
						return React.createElement(
							"tr",
							{ key: row.id },
							Object.keys(row).map(function (key) {
								return React.createElement(
									"th",
									{ key: key },
									row[key]
								);
							})
						);
					})
				)
			),
			React.createElement(
				"h5",
				null,
				this.state.strings.footer
			)
		);
	}
});

module.exports = DeviceTable;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])
(1)
});