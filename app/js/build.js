/*
Metaboverse
Metaboverse is designed for analysis of metabolic networks
https://github.com/j-berg/Metaboverse/
alias: metaboverse

Copyright (C) 2019 Jordan A. Berg
Email: jordan<dot>berg<at>biochem<dot>utah<dot>edu

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const {app, BrowserWindow} = require('electron')
const {ipcRenderer, ipcMain, remote} = require('electron')
const { dialog } = require('electron').remote
var fs = require('fs')

var $ = require('jquery')

var progressFile = "data/progress_log.json"
fs.copyFile('data/progress_log_template.json', 'data/progress_log.json', (err) => {
  if (err) throw err;
  console.log('Progress log file was copied for this session');
});

fs.watch(progressFile, function (event, filename, _callback) {

  var elem = document.getElementById("progressBar");
  var sum_values = 0

  var session = JSON.parse(fs.readFileSync(progressFile).toString());
  console.log(session)
  for (j in session) {  //loop through the array

    sum_values += session[j];  //Do the math!
  }
  console.log(sum_values)
  elem.style.width = sum_values + "%";
  elem.innerHTML = sum_values + "%";

  if (sum_values >= 100) {
    sum_values = 0;
    displayOptions()
  }
});

var transcriptomics = false;
var proteomics = false;
var metabolomics = false;

var t_val = getDefault("transcriptomics")
var p_val = getDefault("proteomics")
var m_val = getDefault("metabolomics")

if (t_val !== null) {
  transcriptomics = true;
}

if (p_val !== null) {
  proteomics = true;
}

if (m_val !== null) {
  metabolomics = true;
}

// Run Python CLI
// Assemble parameters based on available session data 
// Pass progress_log file for updates for each section of processing






function displayOptions() {

  if (transcriptomics === true | proteomics === true | metabolomics === true) {

    $('#content').replaceWith('<a href="motif.html"><div id="continue"><font size="3">Run Motif Search</font></div></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="visualize.html"><div id="continue"><font size="3">Visualize</font></div></a>')

  } else {

    $('#content').replaceWith('<a href="visualize.html"><div id="continue"><font size="3">Visualize</font></div></a>')

  }
}
