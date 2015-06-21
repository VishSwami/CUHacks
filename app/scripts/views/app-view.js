let Backbone = require('backbone')
let ChemicalElementView = require('./chemical-element-view')
let ChemicalElementsCollection = require('../collections/chemical-elements')
let statsTemplate = require('../templates/stats-template.jade')
let elements = require('../elements')
let $ = require('jquery')
let _  = require('lodash')

let AppView = module.exports = Backbone.View.extend({

  el: '#periodic-table-app',

  statsTemplate,

  events: {
    //'click .next': 'nextQuestion'
  },

  initialize () {
    ChemicalElementsCollection.add(_.sample(elements, 10))
    this.nextQuestion()
  },

  nextQuestion () {
    let model = ChemicalElementsCollection.unanswered()[0]
    if (!model) return this.showStats()
    this.listenToOnce(model, 'next:question', _.bind(this.nextQuestion, this))
    let view = new ChemicalElementView({ model })
    $(this.el).append(view.render().el)
  },

  showStats () {
    $(this.el).append(this.statsTemplate({
      correct: ChemicalElementsCollection.getCorrect().length,
      max: ChemicalElementsCollection.answered().length
    }))
  }

})
