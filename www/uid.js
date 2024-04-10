'use strict';

/*
 * Copyright (c) 2014 HygieiaSoft
 * Distributed under the MIT License.
 * (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT)
 */
var exec = require('cordova/exec');
var utils = require('cordova/utils');

/**
 * Export all the UID values.
 */
var exportUIDValues = function () {
	var onSuccess = function (uid) {
		for (var i in uid) {
			exports[i] = uid[i];
		}
	};

	var onFailure = function (error) {
		utils.alert("[ERROR] Error initializing Cordova uid pluging: " + error);
	};

	exec(onSuccess, onFailure, 'UID', 'getUID', []);
}

/**
 * For Android only.
 * Manual retrieve all the UID values,
 * since UID value retrieval might fail if READ_PHONE_STATE permission is not granted.
 */
exports.init = function () {
	console.log('cordova-plugin-uid | manual init the plugin.');
	
	return new Promise(function (resolve, reject) {
		var onSuccess = function () {
			console.log('cordova-plugin-uid | manual init success.');
			exportUIDValues();
			resolve();
		};

		var onFailure = function (error) {
			console.log('cordova-plugin-uid | manual init fail -> ' + JSON.stringify(error));
			reject(error);
		};
		
		exec(onSuccess, onFailure, 'UID', 'init', []);
	});
}

exportUIDValues();
