var Backbone = require('backbone')
Backbone.LocalStorage = require('backbone.localstorage')
var ChemicalElement = require('../models/chemical-element')
var _ = require('lodash')

var ChemicalElementList = Backbone.Collection.extend({

  model: ChemicalElement,

  localStorage: new Backbone.LocalStorage('chemical-elements-backbone'),

  answered () {
    return this.filter(function (element) { return element.get('answered') })
  },

  unanswered () {
    return this.without.apply(this, this.answered())
  },

  allProtons () {
    return this.map(function (element) { return element.get('protons') })
  },

  getProtons (n) {
    return _.sample(this.allProtons(), n || 3)
  },

  getGroup () {
    return ['metal', 'metalloid', 'nonmetal']
  },

  allShells () {
    return _.uniq(this.map(function (element) { return element.get('shells') }))
  },

  getShells (n) {
    return _.sample(this.allShells(), n || 3)
  },

  getElectroNegativity () {
    return ['low', 'medium', 'high']
  },

  getNaturalOccurrancy () {
    return ['true', 'false']
  },

  getNextQuestion () {
    return _.first(this.unanswered()) || null
  },

  getCorrect () {
    return this.filter(function (element) { return element.get('correct') })
  },

  getResults () {
    return this.answered().map(function (element) {
      return {
        name: element.get('name'),
        question: element.get('question'),
        correct: element.get('correct'),
        correctAns: element.get(element.get('question')).toString(),
        inputAns: element.get('input').toString()
      }
    })
  },

  comparator: 'order'


})

let ChemicalElements = module.exports = new ChemicalElementList()
