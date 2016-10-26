var fs = require('fs');

module.exports = {
  name: 'yuidoc-options',
  description: 'Provide all the required options to run yuidocs',
  getYuiOptions: function(){
    return this.fetchJson('yuidoc.json');
  },
  
  fetchJson: function(file){
    try {
      return JSON.parse(fs.readFileSync(file));
    } catch (e) {
      console.log(file + ' is missing from root folder. Run `ember g yuidoc-ember` to generate the default files');
      process.exit(1);
    }
  },
  
  getYuiServerOptions: function(){
    return this.fetchJson('yuiserver.json');
  },
  
  fullYuiOptions: function(config){
    var exclusions = [
      '.DS_Store',
      '.git',
      '.node_modules',
      'vendor',
      'bower_components',
      'tmp',
      'tests'
    ];
    config.options.outdir = config.options.outdir || './docs';
    var configExclusions = config.options.exclude;
    if(configExclusions && typeof configExclusions === 'string'){
      configExclusions.split(',').forEach(e => {
        e = e && e.trim();
        if(e && exclusions.indexOf(e) === -1){
          exclusions.push(e);
        }
      });
    }
    config.options.exclude = exclusions.join(',');
    return config;
  }
};
