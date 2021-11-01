/**
 * @jest-environment jsdom
 */

window.$ = window.jQuery = require("jquery");
require("../dist/table2csv.min");
require("./asserts");
