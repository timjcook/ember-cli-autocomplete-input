import Ember from 'ember';
import layout from '../templates/components/autocomplete-input';
import KeyboardNavMixin from 'ember-cli-keyboard-nav/mixins/keyboard-nav';

const { Component, computed } = Ember;

export default Component.extend(KeyboardNavMixin, {

  // keyboard nav config

  objectSelector: '.input input[type="text"]',

  results: [],

  focusResultIndex: -1,

  highlightedResult: computed('results.[]', 'focusResultIndex', function() {
    return this.get('results')[this.get('focusResultIndex')];
  }),

  hasResults: computed.notEmpty("results"),

  lastTerm: '',

  actions: {
    selectResult(term) {
      this.sendAction('selectResult', term);
    },

    updateTerm(term) {
      if (term !== this.get('lastTerm')) {
        this.set('lastTerm', term);
        this.sendAction('updateTerm', term);
      }
    },

    clearTerm() {
      this.set("term", "");
    },

    clearSearch() {
      this.send('clearTerm');
      this.set('results', []);
    }
  },

  onEnterPress() {
    let result = this.get("results")[this.get("focusResultIndex")];
    if(!!result) {
      this.send("selectResult", result);
    }
  },

  onEscPress() {
    this.send("clearSearch");
  },

  onDownPress() {
    let index = 0;

    if(this.get("focusResultIndex") >= 0) {
      index = this.get("focusResultIndex") + 1;
    }

    if(index > this.get("results").length - 1) {
      index = 0;
    }

    console.log(index);
    this.set("focusResultIndex", index);
  },

  onUpPress() {
    let lastItem = this.get("results").length - 1;
    let index = lastItem;

    if(this.get("focusResultIndex") >= 0) {
      index = this.get("focusResultIndex") - 1;
    }

    if(index < 0) {
      index = lastItem;
    }

    console.log(index);
    this.set("focusResultIndex", index);
  }

});
