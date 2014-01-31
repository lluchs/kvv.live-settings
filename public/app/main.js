
requirejs.config({
  paths: {
    reqwest: '../bower_components/reqwest/reqwest',
    Ractive: '../bower_components/ractive/build/Ractive',
    text: '../bower_components/requirejs-text/text',
    rv: '../bower_components/requirejs-ractive/rv',
    slip: '../bower_components/slip/slip',
    'ractive-decorators-slip': '../bower_components/ractive-decorators-slip/Ractive-decorators-Slip',
  }
});

require(['app'], function() {});
