const shell = require('shelljs');
const WWWROOT_FOLDER = '../../Server/NgxShopper.WebApp/wwwroot';
const fs = require('fs');
const indexHtml = fs.readFileSync('dist/browser/index.html', 'utf8');

// clean our anything in the folder before writing to it
shell.rm('-rf', `${WWWROOT_FOLDER}/ngxbuyer`);

// move generated files to wwwroot folder in our server so they can be served to the client
shell.mkdir('-p',`${WWWROOT_FOLDER}/ngxbuyer`); // make directory if it doesn't already exist
shell.mv(
    'dist',
    `${WWWROOT_FOLDER}/ngxbuyer`
);

// collect scripts and hrefs from generated index.html and output to a json file
// aspnet core will read this file in order to render the final index.html to be served to the client
const files = {
    hrefs: getAllHrefs(indexHtml),
    scripts: getAllScripts(indexHtml)
}
// write to a json file
new shell.ShellString(JSON.stringify(files, null, 4))
    .to(`${WWWROOT_FOLDER}/ngxbuyer/dist/filestats.json`);










/***********
 * Helpers *
 * *********
 */
function getAllHrefs(indexHtml) {
    // extracts text between href=" and "
    const regex = /href=\"([\S\s]*?)\"/g;
    const matches = getAllMatches(indexHtml, regex);

    // remove base href, gets set by aspnet core
    return matches.filter(match => match !== '/')
}

function getAllScripts(indexHtml) {
    // extracts text between src=" and "
    const regex = /src=\"([\S\s]*?)\"/g;
    return getAllMatches(indexHtml, regex); 
}

// gets all the matches from a regex
function getAllMatches(input, regex) {
    const matches = [];
    let match;
    while (match = regex.exec(input)) {
        matches.push(match[1]);
    }
    return matches;
}