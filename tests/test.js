jQuery = require('jquery')
$ = jQuery
require('./jsdom_fix')
require('../src/table2csv')

beforeEach(() => {
	document.body.innerHTML = `<table id="tab">
	  <tr class="row0">
		<th class="col1">Company</th>
		<th class="col2">Contact</th>
		<th class="col3">Country</th>
	  </tr>
	  <tr class="row1">
		<td class="col1">     Alfreds Futterkiste</td>
		<td class="col2">		Maria Anders</td>
		<td class="col3">Germany</td>
	  </tr>
	  <tr class="row2">
		<td class="col1">Centro comercial Moctezuma 	</td>
		<td class="col2">Francisco Chang    </td>
		<td class="col3">Mexico	</td>
	  </tr>
	  <tr class="row3">
		<td class="col1">Ernst Handel</td>
		<td class="col2">Roland Mendel</td>
		<td class="col3">Austria</td>
	  </tr>
	  <tr class="row4">
		<td class="col1">Island Trading</td>
		<td class="col2">Helen Bennett</td>
		<td class="col3">UK</td>
	  </tr>
	  <tr class="row5">
		<td class="col1">Laughing Bacchus Winecellars</td>
		<td class="col2">Yoshi Tannamuri</td>
		<td class="col3">Canada</td>
	  </tr>
	  <tr class="row6">
		<td class="col1">Magazzini Alimentari Riuniti</td>
		<td class="col2">Giovanni Rovelli</td>
		<td class="col3">Italy</td>
	  </tr>
	</table>
	
	<table id="tab2">
		<tr>
			<th>head1</th>
			<th>head2</th>
		</tr>
			<tr>
			<td>data1</td>
			<td>data2</td>
		</tr>
		<tr>
			<td>data3</td>
			<td>data4</td>
		</tr>
	</table>
	
	<div id="out" class="out"></div>
	<div id="out2" class="out"></div>`
})

// initialization

test('accepts call with no parameters', () => {
	let table = $('#tab')
	expect(() => {
		table.table2csv()
	}).not.toThrow()
})

test('accepts "action" parameter only', () => {
	let table = $('#tab')
	expect(() => {
		table.table2csv('download')
	}).not.toThrow()
})

test('accepts "options" parameter only', () => {
	let table = $('#tab')
	expect(() => {
		table.table2csv({appendTo: '#out'})
	}).not.toThrow()
})

test('call on non-table element should raise an exception', () => {
	expect(() => {
		$('#out').table2csv()
	}).toThrow(/must be called on (a )?<table> elements?/)
})

test('call on multiple table elements should raise an exception (not supported yet)', () => {
	expect(() => {
		$('table').table2csv()
	}).toThrow(/not supported/)
})

test('"action" argument must be string, if provided', () => {
	let emptyFunction = () => {
		return true
	}

	expect(() => {
		$('#tab').table2csv(emptyFunction)
	}).toThrow('"action" argument must be a string')

	expect(() => {
		$('#tab').table2csv(2)
	}).toThrow('"action" argument must be a string')
})

test('"action" argument must be one of the supported actions, if provided', () => {
	expect(() => {
		$('#tab').table2csv('somethingElse')
	}).toThrow('"action" argument must be one of the supported action strings')
})

test('"options" argument must be an object, if provided', () => {
	let emptyFunction = () => {
		return true
	}

	expect(() => {
		$('#tab').table2csv('output', 1)
	}).toThrow('"options" argument must be an object')

	expect(() => {
		$('#tab').table2csv('download', emptyFunction)
	}).toThrow('"options" argument must be an object')
})

test('output action on a non existing element should print a warning', () => {
	// $('#tab').table2csv('output', {appendTo: '#nonExisting'})
})

test('call with just the action argument generate csv using default options', () => {
	const expected = '"Company","Contact","Country"\n"Alfreds Futterkiste","Maria Anders","Germany"\n"Centro comercial Moctezuma","Francisco Chang","Mexico"\n"Ernst Handel","Roland Mendel","Austria"\n"Island Trading","Helen Bennett","UK"\n"Laughing Bacchus Winecellars","Yoshi Tannamuri","Canada"\n"Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"\n'

	$('#tab').table2csv('output', {appendTo: '#out'})
	expect($('#out').text()).toBe(expected)
})

// chain call

test('return jquery element of the matched table', () => {
	let table = $('#tab')
	expect(table.table2csv()).toBe(table)
})

// csv conversion

test('with "separator" option use the specified character', () => {
	const expected = '"Company"@"Contact"@"Country"\n"Alfreds Futterkiste"@"Maria Anders"@"Germany"\n"Centro comercial Moctezuma"@"Francisco Chang"@"Mexico"\n"Ernst Handel"@"Roland Mendel"@"Austria"\n"Island Trading"@"Helen Bennett"@"UK"\n"Laughing Bacchus Winecellars"@"Yoshi Tannamuri"@"Canada"\n"Magazzini Alimentari Riuniti"@"Giovanni Rovelli"@"Italy"\n'

	$('#tab').table2csv('output', {appendTo: '#out', separator: '@'})
	expect($('#out').text()).toBe(expected)
})

test('with "newline" option use the specified character', () => {
	const expected = '"Company","Contact","Country"\r\n"Alfreds Futterkiste","Maria Anders","Germany"\r\n"Centro comercial Moctezuma","Francisco Chang","Mexico"\r\n"Ernst Handel","Roland Mendel","Austria"\r\n"Island Trading","Helen Bennett","UK"\r\n"Laughing Bacchus Winecellars","Yoshi Tannamuri","Canada"\r\n"Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"\r\n'

	$('#tab').table2csv('output', {appendTo: '#out', newline: '\r\n'})
	expect($('#out').text()).toBe(expected)
})

test('with "quoteField" option wraps csv fields with "', () => {
	const expected = 'Company,Contact,Country\nAlfreds Futterkiste,Maria Anders,Germany\nCentro comercial Moctezuma,Francisco Chang,Mexico\nErnst Handel,Roland Mendel,Austria\nIsland Trading,Helen Bennett,UK\nLaughing Bacchus Winecellars,Yoshi Tannamuri,Canada\nMagazzini Alimentari Riuniti,Giovanni Rovelli,Italy\n'

	$('#tab').table2csv('output', {appendTo: '#out', quoteFields: false})
	expect($('#out').text()).toBe(expected)
})

test('with "excludeColumns" skips the matching columns (single selector)', () => {
	const expected = '"Company","Country"\n"Alfreds Futterkiste","Germany"\n"Centro comercial Moctezuma","Mexico"\n"Ernst Handel","Austria"\n"Island Trading","UK"\n"Laughing Bacchus Winecellars","Canada"\n"Magazzini Alimentari Riuniti","Italy"\n'

	$('#tab').table2csv('output', {appendTo: '#out', excludeColumns: '.col2'})
	expect($('#out').text()).toBe(expected)
})

test('with "excludeColumns" skips all the matching columns (multiple selector)', () => {
	const expected = '"Company"\n"Alfreds Futterkiste"\n"Centro comercial Moctezuma"\n"Ernst Handel"\n"Island Trading"\n"Laughing Bacchus Winecellars"\n"Magazzini Alimentari Riuniti"\n'

	$('#tab').table2csv('output', {appendTo: '#out', excludeColumns: '.col2, .col3'})
	expect($('#out').text()).toBe(expected)
})

test('with "excludeRows" skips the matching rows (single selector)', () => {
	const expected = '"Alfreds Futterkiste","Maria Anders","Germany"\n"Centro comercial Moctezuma","Francisco Chang","Mexico"\n"Ernst Handel","Roland Mendel","Austria"\n"Island Trading","Helen Bennett","UK"\n"Laughing Bacchus Winecellars","Yoshi Tannamuri","Canada"\n"Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"\n'

	$('#tab').table2csv('output', {appendTo: '#out', excludeRows: '.row0'})
	expect($('#out').text()).toBe(expected)
})

test('with "excludeRows" skips the matching rows (multiple selector)', () => {
	const expected = '"Alfreds Futterkiste","Maria Anders","Germany"\n"Centro comercial Moctezuma","Francisco Chang","Mexico"\n"Ernst Handel","Roland Mendel","Austria"\n"Island Trading","Helen Bennett","UK"\n"Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"\n'

	$('#tab').table2csv('output', {appendTo: '#out', excludeRows: '.row0, .row5'})
	expect($('#out').text()).toBe(expected)
})

test('with "trimContent" avoid including leading or trailing spaces in the csv fields', () => {
	const expected = '"Company","Contact","Country"\n"     Alfreds Futterkiste","\t\tMaria Anders","Germany"\n"Centro comercial Moctezuma \t","Francisco Chang    ","Mexico\t"\n"Ernst Handel","Roland Mendel","Austria"\n"Island Trading","Helen Bennett","UK"\n"Laughing Bacchus Winecellars","Yoshi Tannamuri","Canada"\n"Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"\n'

	$('#tab').table2csv('output', {appendTo: '#out', trimContent: false})
	expect($('#out').text()).toBe(expected)
})

// output

test('call with just "output" action append csv to body element', () => {
	const expected = '"Company","Contact","Country"\n"Alfreds Futterkiste","Maria Anders","Germany"\n"Centro comercial Moctezuma","Francisco Chang","Mexico"\n"Ernst Handel","Roland Mendel","Austria"\n"Island Trading","Helen Bennett","UK"\n"Laughing Bacchus Winecellars","Yoshi Tannamuri","Canada"\n"Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"\n'

	$('#tab').table2csv('output')
	expect($('body pre').length).toBe(1)
	expect($('body pre').text()).toBe(expected)
})

test('"output" action with "appendTo" option appends the csv to all the matching elements', () => {
	const expected = '"Company","Contact","Country"\n"Alfreds Futterkiste","Maria Anders","Germany"\n"Centro comercial Moctezuma","Francisco Chang","Mexico"\n"Ernst Handel","Roland Mendel","Austria"\n"Island Trading","Helen Bennett","UK"\n"Laughing Bacchus Winecellars","Yoshi Tannamuri","Canada"\n"Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"\n'

	$('#tab').table2csv('output', {appendTo: '.out'})
	expect($('#out').text()).toBe(expected)
	expect($('#out2').text()).toBe(expected)
})