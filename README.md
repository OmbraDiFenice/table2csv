# table2csv
A simple jQuery plugin to convert HTML tables to CSV

## Usage

Import jQuery and this script

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="src/table2csv.js"></script>
```

then invoke the `table2csv()` function on the jQuery object of the table

```javascript
$("table").first().table2csv(); // default action is 'download'
```

The plugin currently convert just one table at a time and must be called directly on the table you want to convert.
These limits will hopefully be removed in future versions.

`table2csv()` accepts 2 arguments, both optional:

`table2csv(action, options)`

See below for the description.


### Example

```html
<table id="tab">
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>
```

```javascript
// download the content of table "tab"
$("#tab").table2csv(); // default action is 'download'
```

This will start the download of a file called 'table.csv' which will contain the following:

    "Company","Contact","Country"
    "Alfreds Futterkiste","Maria Anders","Germany"
    "Ernst Handel","Roland Mendel","Austria"
    "Island Trading","Helen Bennett","UK"
    "Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"
    
You can change the name of the downlaoded file and other settings using the options.

### Actions

* 'download'  
This is the default action (i.e. the one performed if you call `table2csv()` without any argument).
Convert the table to a csv and start the download of the file. The file name can be specified in the options (default is `table.csv`).

* 'output'  
With this action the csv output is not downloaded as a file, but appended as text inside the html page.
Use the `appendTo` option to specify the jQuery selector of the destination element (default is `body`).

### Options

#### General options
* separator  
`default: ','`  
The field separator to use in the csv

* newline  
`default: '\n'`  
The line separator to use in the csv

* quoteFields  
`default: true`  
Whether to quote fields in the csv

* excludeColumns  
`default: ''`  
jQuery selector for the columns you don't want to export in the csv (tipically a list of classes)

* excludeRows  
`default: ''`  
jQuery selector for the rows you don't want to export in the csv (tipically a list of classes)

#### Download options

These options apply only when the 'download' action is used

* filename  
`default: 'table.csv'`  
This is the name given to the file when the 'download' action is invoked

#### Output options

These options apply only when the 'output' action is used

* appendTo  
`default: 'body'`  
jQuery selector of the element inside which append the generated csv text. This is only used when the 'output' action is invoked
