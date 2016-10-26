/* jshint node: true */
'use strict';
var Y = require('yuidocjs');
var options = require('./lib/options');

module.exports = {
  name: 'yuidoc-ember',
  
  serverRunning: false,
  
  postprocessTree: function(type, tree){
    if(type === 'all'){
      var env = this.app && this.app.env;
      if(env !== 'production'){
        var config = options.getYuiOptions(),
        liveReloadEnabled = config.options && config.options.enabledEnvironments && config.options.enabledEnvironments.indexOf(env) !== -1;
        if(env !== 'production' && liveReloadEnabled){
          return this.generateDocs(tree, this.getFullYuiDocConfig(config));
        }
      }
    }
    return tree;
  },
  
  included: function(){
    var env = this.app.env;
    var args = (process.argv || []);
    switch (env) {
      case 'test':
        this.serverRunning = args.indexOf('--server') !== -1 || args.indexOf('--s') !== -1 || args.indexOf('--server=true') !== -1 || args.indexOf('--s=true') !== -1;
        break;
      case 'development':
        this.serverRunning = args.indexOf('s') !== -1 || args.indexOf('server') !== -1;
        break;
      default:
        this.serverRunning = false;
    }
  },
  
  getFullYuiDocConfig: function(config){
    return Y.Project.init(options.fullYuiOptions(config));
  },
  
  generateDocs: function(tree, config){
    var json = (new Y.YUIDoc(config)).run();
    var builder = new Y.DocBuilder(config, json);
    builder.compile(() => {
      this.ui.writeLine('YUIDOC Generated');
      var env = this.app.env;
      if(env && env !== 'production'){
        this.startServer(env);
      }
    });  
    return tree;
  },
  
  startServer: function(env){
    var serverOptions = options.getYuiServerOptions();
    var enabledHosts = serverOptions && serverOptions.options && serverOptions.options.hostDocsFor || [];
    if(this.serverRunning && enabledHosts.indexOf(env) !== -1){
      Y.Server.start({port: serverOptions.options && serverOptions.options.port || '4462'});
    }
  }
};
