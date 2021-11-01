/**
 * @jest-environment jsdom
 */

window.$ = window.jQuery = require("jquery");
require("../src/table2csv");
require("./asserts");
