var system = require('system');
var page = require('webpage').create();

const URL = 'https://immobilien.postbank.de/karlsruhe/immobilien/suchergebnisse/#/search/Town=undefined&EstateTypeIds=[]&EstateSubTypeIds=[]%20&OfferType=2&Page=1&PageSize=100&Sort=3&OffererId=karlsruhe&EstateMetaCodeIds=[1,2,3]';

page.open(URL, (status) => {
  if (status !== 'success') {
    console.log('PhantomJS: unable to open page', URL);
  } else {
    var doc = page.evaluate(() => {
      return document.querySelectorAll('#portal-content')[0].innerHTML;
    });
    console.log('GOT doc');
    system.stdout.write(doc);
  }
  phantom.exit();
});