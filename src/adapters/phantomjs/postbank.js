var system = require('system');
var page = require('webpage').create();

const URL = 'https://immobilien.postbank.de/karlsruhe/immobilien/suchergebnisse/#/search/Town=undefined&EstateTypeIds=[]&EstateSubTypeIds=[]%20&OfferType=2&Page=1&PageSize=100&Sort=3&OffererId=karlsruhe&EstateMetaCodeIds=[1,2,3]';

page.open(URL, function (status) {
  page.onLoadFinished = function(status) {
      page.render('screenshot.png');
      phantom.exit();
  };
  if (status !== 'success') {
    console.log('PhantomJS: unable to open page', URL);
  } else {
    var doc = page.evaluate(function() {
      return document.querySelectorAll('body')[0].innerHTML;
    });
    console.log('GOT doc');
    system.stdout.write(doc);
  }

  phantom.exit();
});