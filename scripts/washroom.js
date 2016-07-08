module.exports = function(robot) {
	robot.respond(/status/i, function(res) {
		var washroomStatus = function(db, callback) {
			var cursor = db.collection('washroom').find();
			cursor.each(function(err, result) {
				if(result != null) {
					if(result.Occupied) {
						res.reply("The " + result.Gender + "'s " + result.Name + " washroom on the " + result.Floor + " floor is OCCUPIED.");
					} else {
						res.reply("The " + result.Gender + "'s " + result.Name + " washroom on the " + result.Floor + " floor is UNOCCUPIED.");
					}
				} else {
					callback();
				}
			});
		};

		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost:27017/washroom';
		var ObjectId = require('mongodb').ObjectId;
		MongoClient.connect(url, function(err, db) {
			washroomStatus(db, function() {
				db.close();
			});
		});
	});

	robot.respond(/reserve (.*) (.*) (.*)/i, function(res) {
		var reserve = function(db, callback) {
			var cursor = db.collection('washroom').find({Gender : res.match[1], Name : res.match[2], Floor : res.match[3]});
			cursor.each(function(err, result) {
				if(result != null) {
					if(result.Occupied) {
						res.reply("Cannot reserve! The " + result.Gender + "'s " + result.Name + " washroom on the " + result.Floor + " floor is OCCUPIED until " + result.OccupiedTill + ".");
					} else {
						db.collection('washroom').update({Gender : res.match[1], Name : res.match[2], Floor : res.match[3]}, {Gender : res.match[1], Name : res.match[2], Floor : res.match[3], Occupied: true, OccupiedTill: new Date()});
						res.reply("Done! The " + result.Gender + "'s " + result.Name + " washroom on the " + result.Floor + " floor is RESERVED.");
					}
				} else {
					callback();
				}
			});
		};

		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost:27017/washroom';
		var ObjectId = require('mongodb').ObjectId;
		MongoClient.connect(url, function(err, db) {
			reserve(db, function() {
				db.close();
			});
		});
	});

	robot.respond(/free (.*) (.*) (.*)/i, function(res) {
		var reserve = function(db, callback) {
			var cursor = db.collection('washroom').find({Gender : res.match[1], Name : res.match[2], Floor : res.match[3]});
			cursor.each(function(err, result) {
				if(result != null) {
					db.collection('washroom').update({Gender : res.match[1], Name : res.match[2], Floor : res.match[3]}, {Gender : res.match[1], Name : res.match[2], Floor : res.match[3], Occupied: false, OccupiedTill: new Date()});
					res.reply("Done! The " + result.Gender + "'s " + result.Name + " washroom on the " + result.Floor + " floor is UNOCCUPIED again.");
				} else {
					callback();
				}
			});
		};

		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost:27017/washroom';
		var ObjectId = require('mongodb').ObjectId;
		MongoClient.connect(url, function(err, db) {
			reserve(db, function() {
				db.close();
			});
		});
	});
}