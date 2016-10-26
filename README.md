# Yuidoc-Ember

This is an ember-cli addon inspired from [ember-cli-yuidoc](https://github.com/cibernox/ember-cli-yuidoc). This addon generates html documentation by using [YUIDoc](http://yuilibrary.com/).

For reference to the comment syntax of [YUIDoc](http://yuilibrary.com/). Please visit (YUIDoc - JavaScript Documentation Tool)[http://yui.github.io/yuidoc/] page.

## Installation

The addon is built using `ember-cli@2.5.0`. To install the addon just run `ember install yuidoc-ember`.

Make sure two files `yuidoc.json` and `yuiserver.json` files are generated in your root folder and if not present run `ember g yuidoc-ember` for generating them. 

Running the `ember g yuidoc-ember` would overwrite the files to have default values.

# Usage

The addon only generates docs when ember is running in `development` or `test` mode depending on the options provided in `yuidoc.json`

## Generating docs

The generation of doc is enabled by default for `development` and `test`.

To disable the generation of docs in either of the environment go to `yuidoc.json` file present in the application's root folder and remove the environment type from `options.enabledEnvironments` array.

To disable the generation of doc totally, remove the property `options.enabledEnvironments` from `yuidoc.json` file

To see the full list of available options that can be included in the `options` hash of `yuidoc.json` to mainpulate the generation of docs (click here)[http://yui.github.io/yuidoc/args/]

## Hosting the docs

The hosting of the docs can only be done when ember development or test server is running. The generated docs by default would be generated and hosted on http://127.0.0.1:4462. By default the docs are hosted for both `development` and `test` environments.

The hosting of the docs can be stopped for a particular environment by removing the environment type value from the `options.hostDocsFor` array of `yuiserver.json` file present in the application root directory. The hosting can be entirely stopped by emptying or removing the property `options.hostDocsFor` from `yuiserver.json` file.

By default the port where the docs would be hosted on http://127.0.0.1 is `4662`.
`
{
  "name": "application name",
  "version": "1.2.3",
  "options": {
    // Remove the environment type for disabling the hosting of docs in that environment from "hostDocsFor"
    // Removing the property itself would stop hosting the docs in both development and test environment
    "hostDocsFor": ["development", "test"], 
    "port": 4462 //port where the docs would be generated, To change the port, update this property.
  }
}
`
