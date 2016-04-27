var localdb;
$(function() {

	localdb = {
		init : function() {

			this.initDatabase();

			// Button and link actions
			$('#clearLocalDB').on('click', function() {
				reset();
				localdb.updateSetting();				
				clearUserInput();
				window.close();
			});
		},

		initDatabase : function() {
			try {
				if (!window.openDatabase) {
					alert('Local Databases are not supported by your browser. Please use a Webkit browser for this demo');
				} else {
					var shortName = 'DEMODB', version = '1.0', displayName = 'DEMODB Test', maxSize = 100000; // in
					// bytes

					DEMODB = openDatabase(shortName, version, displayName,
							maxSize);
					this.createTables();
					//this.selectAll();
				}
			} catch (e) {
				if (e === 2) {
					// Version mismatch.
					console.log("Invalid database version.");
				} else {
					console.log("Unknown error " + e + ".");
				}
				return;
			}
		},

		/***********************************************************************
		 * *** CREATE TABLE **
		 **********************************************************************/
		createTables : function() {
			var that = this;
			DEMODB
					.transaction(function(transaction) {
						transaction
								.executeSql(
										'CREATE TABLE IF NOT EXISTS page_settings(id INTEGER NOT NULL PRIMARY KEY, jsonString TEXT NOT NULL);',
										[], that.nullDataHandler,
										that.errorHandler);
					});
			this.prePopulate();
		},

		/***********************************************************************
		 * *** INSERT INTO TABLE **
		 **********************************************************************/
		prePopulate : function() {
			DEMODB
					.transaction(function(transaction) {
						// Starter data when page is initialized
						var data = [ '1', 'none' ];

						transaction
								.executeSql(
										"INSERT INTO page_settings(id, jsonString) VALUES (?, ?)",
										[ data[0], data[1] ]);
					});
		},

		/***********************************************************************
		 * *** UPDATE TABLE **
		 **********************************************************************/
		updateSetting : function() {
			DEMODB.transaction(function(transaction) {
				jsonString = JSON.stringify(finalJsonOutput);
				transaction.executeSql(
						"UPDATE page_settings SET jsonString=? WHERE id = 1",
						[ jsonString ]);
			});

			//this.selectAll();
		},

		selectAll : function() {
			var that = this;
			DEMODB.transaction(function(transaction) {
				transaction.executeSql("SELECT * FROM page_settings;", [],
						that.dataSelectHandler, that.errorHandler);

			});
		},

		dataSelectHandler : function(transaction, results) {
			// Handle the results
			var i = 0, row;

			for (i; i < results.rows.length; i++) {

				row = results.rows.item(i);
//				finalJsonOutput = $.parseJSON(row['jsonString']);
//				console.log($.parseJSON(row['jsonString']));
				handleUserInput($.parseJSON(row['jsonString'])["user-input"]);
				finalJsonOutput = $.parseJSON(row['jsonString']);
				console.log(finalJsonOutput);
				console.log(session);
				if(!session)
					getWithoutLoginInfo(finalJsonOutput);
			}
		},

		/***********************************************************************
		 * *** Save 'default' data into DB table **
		 **********************************************************************/
		saveAll : function() {
			this.prePopulate(1);
		},

		errorHandler : function(transaction, error) {

			if (error.code === 1) {
				// DB Table already exists
			} else {
				// Error is a human-readable string.
				console.log('Oops.  Error was ' + error.message + ' (Code '
						+ error.code + ')');
			}
			return false;
		},

		nullDataHandler : function() {
			console.log("SQL Query Succeeded");
		},

		/***********************************************************************
		 * *** SELECT DATA **
		 **********************************************************************/
		selectAll : function() {
			var that = this;
			DEMODB.transaction(function(transaction) {
				transaction.executeSql("SELECT * FROM page_settings;", [],
						that.dataSelectHandler, that.errorHandler);
			});
		},

		/***********************************************************************
		 * *** DELETE DB TABLE **
		 **********************************************************************/
		dropTables : function() {
			var that = this;
			DEMODB.transaction(function(transaction) {
				transaction.executeSql("DROP TABLE page_settings;", [],
						that.nullDataHandler, that.errorHandler);
			});
			console.log("Table 'page_settings' has been dropped.");
			// location.reload();
		}

	};

	// Instantiate Demo
	localdb.init();
	
	
	

});

function prePopulateUserInput(map) {
	$('.form-group').find('.question').each(
			function() {

				if ($(this).next('input').is('input:text')) {
					$(this).next('input').val(
							map[$(this).text().replace(/\t/g, '').replace(
									/\n/g, ' ')]);

				} else if ($(this).next('input').is('input:radio')) {
					currAns = map[$(this).text().replace(/\t/g, '').replace(
							/\n/g, ' ')];
					$(this).nextAll('input').each(function(){
					    if ($(this).val() == currAns)  {
					        $(this).attr('checked',true).trigger('click');
					    }
					});

				}
				;

			})
}

function clearUserInput() {
	$('.form-group').find('label').each(function() {

		if ($(this).next('input').is('input:text')) {
			$(this).next('input').val("");

		} else if ($(this).next('input').is('input:radio')) {
			$(this).nextAll('input').each(function(){
			    $(this).attr('checked',false);
			});
		};
	})
	initializeUserInputMap();
	jsonOutput($('.user-input-json'),userInputMap);
}

function handleUserInput(usrInMap){
	if(usrInMap != undefined && usrInMap != "none"){		
		prePopulateUserInput(usrInMap);
		userInputMap = usrInMap;
		jsonOutput($('.user-input-json'),userInputMap);
	}
}

function setIpAddress(){
	localStorage.setItem("serverIPPort",$("#txtIpAddr").val());
}