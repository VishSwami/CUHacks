let Backbone = require('backbone')
let ChemicalElementModel = require('../models/chemical-element')
let ChemicalElementsCollection = require('../collections/chemical-elements')
let template = require('../templates/chemical-element-template.jade')
let $ = require('jquery')
let _  = require('lodash')
let toCamel = require('to-camel-case')

let ChemicalElementView = module.exports = Backbone.View.extend({

  tagName: 'div',
  template,

  events: {
    'click label': 'checkAnswer'
  },

  initialize () {
    //$('.chemical-element-choices label').on('click', this.checkAnswer)
  },

  render () {
    var opts = {
      name: this.model.get('name'),
      abbr: this.model.get('abbr'),
      mass: this.model.get('mass'),
      property: _.sample(['protons', 'group', 'shells', 'electro-negativity'])
    }
    let method = toCamel('get-' + opts.property)
    opts.options = ChemicalElementsCollection[method]()
    if (opts.property === 'protons' || opts.property === 'shells') {
      opts.options.push(this.model.get(opts.property))
      opts.options = _.uniq(opts.options)
    }
    this.model.set({ question: opts.property })
    $(this.el).html(this.template(opts))
    return this
  },

  checkAnswer (e) {
    let input = e.currentTarget.querySelector('input').value.toString()
    console.log(this.model.get(this.model.get('question')), input)
    this.model.set({
      answered: true,
      correct: input === this.model.get(this.model.get('question')).toString(),
      input
    })
    this.model.trigger('next:question')
    $(this.el).remove()
  }

})
