var Backbone = require('backbone')

var ChemicalElement = module.exports = Backbone.Model.extend({

  defaults: {

    name: 'Hydrogen',
    abbr: 'H',
    mass: 1.01,

    protons: 1,
    group: 'nonmetal',
    shells: 1,
    'electro-negativity': 'low',
    'natural-occurrancy': 'true',

    answered: false

  }

})
