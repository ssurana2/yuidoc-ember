/*jshint node:true*/
var fs = require('fs');

module.exports = {
  description: 'Generates yuidoc.json if it does not exists',
  normalizeEntityName: function(){},
  afterInstall: function(){
    const pkg = this.project.pkg;
    this.ui.writeLine(pkg.keywords);
    var type = pkg.keywords && pkg.keywords.indexOf('ember-addon') !== -1 ? 'addon' : 'app';
    this.generateDocOptions(this.defaultConfig(pkg), type);
    this.generateServerOptions(this.defaultConfig(pkg));
  },
  
  defaultConfig: function(pkg){
    return {
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      options: {}
    };
  },
  
  generateDocOptions: function(config, type){
    config.options = {
      paths: [],
      enabledEnvironments: ['development', 'test'],
      exclude: 'vendor',
      outdir: './docs',
      linkNatives: true,
      quite: true,
      parseOnly: false,
      lint: false
    };
    config.options.paths.push(type);
    this.createFile('yuidoc.json', config);
  },
  
  generateServerOptions: function(config){
    config.options = {
      hostDocsFor: ['development', 'test'],
      port: 4462
    };
    this.createFile('yuiserver.json', config);
  },
  
  createFile: function(file, config){
    this.ui.writeLine('Generating ' + file + ' for ' + config.name);
    fs.writeFileSync(file , JSON.stringify(config, null, 2));
  }
};
