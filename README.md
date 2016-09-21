# table2csv
A simple jQuery plugin to convert HTML tables to CSV

## Usage

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
$("#tab").table2csv();
```

This will start the download of a file called 'table.csv' which will contain the following:

    "Company","Contact","Country"
    "Alfreds Futterkiste","Maria Anders","Germany"
    "Ernst Handel","Roland Mendel","Austria"
    "Island Trading","Helen Bennett","UK"
    "Magazzini Alimentari Riuniti","Giovanni Rovelli","Italy"
    
You can change the name of the downlaoded file and other settings using the options.

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
* filename  
`default: 'table.csv'`  
This is the name given to the file when the 'download' action is invoked

#### Output options
* appendTo  
`default: 'body'`  
jQuery selector of the element inside which append the generated csv text. This is only used when the 'output' action is invoked