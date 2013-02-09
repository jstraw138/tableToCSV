/**
	 * tableToCSV
	 *
	 * Creates Text or CSV format of table data. It retrieves data from current table,
	 * creates string version of that data, sends ajax call to csv.script.php,
	 * and opens up new window/tab with returned file.
	 * If path to csv.script.php is changed ( or CodeIgniter is not used to
	 * as base framework ), path should be manually changed.
	 *
	 * Required:
	 * * Table should have both thead and tbody tags
	 * * csv.script.php should be present, and url to this file should be valid in ajax call
	 *
	 * @param format Format of output file. Default is 'txt'.
	 * @param exclude Columns that should be excluded from CSV file. Default is empty array.
	 * @example $('table').tableToCSV(); will generate 'csv_<ipaddress>.txt'
	 * @example $('table').tableToCSV('csv'); will generate 'csv_<ipaddress>.csv'
	 * @example $('table').tableToCSV('txt', [0]); will generate 'csv_<ipaddress>.txt' without first column
	 */
$.fn.tableToCSV = function ( format, exclude )
{
	// Set default value
	format = format || 'txt';
	exclude = exclude || [ ];

	// exclude columns if any
	var excludeCols = '';
	$.each( exclude, function ( i, val )
	{
	// val should be incremented because nth-child starts from 1
	excludeCols += ':not(:nth-child(' + ( val + 1 ) + '))';
	} );

	var csv = ''; // string version of whole csv document

	// Write header first
	var headers = [ ];

	$( 'th' + excludeCols, this.find( 'thead' ) ).each( function ()
	{
	var text = $( this ).text();
	headers.push( text );
	} );

	csv += headers.join( ',' ) + "\r\n";

	// Write rows
	$( 'tr', this.find( 'tbody' ) ).each( function ()
	{
		var row = [ ];

		$( 'td' + excludeCols, $( this ) ).each( function ()
		{
			var text = $( this ).text();
			text = $.trim( text );

			// Check if text should be enclosed in double-quote
			if ( text.indexOf( "," ) !== -1 ||
				text.indexOf( "'" ) !== -1 ||
				text.indexOf( "\n" ) !== -1 ||
				text.indexOf( "\r" ) !== -1 )
				{
				text = '"' + text + '"';
				}

				row.push( text );
		}); // end 'td' each

		csv += row.join( ',' ) + "\r\n";
	}); // end 'tr' each

	var generator = window.open('', '_blank', 'height=600,width=800');
	generator.document.write('<textArea cols=70 rows=15 wrap="off" >'); 
	generator.document.write(csv);
	generator.document.write('</textArea>');
};