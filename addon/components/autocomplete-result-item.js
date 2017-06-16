import Ember from 'ember';
import layout from '../templates/components/autocomplete-result-item';

const { Component, computed } = Ember;

export default Component.extend({

  layout,

  // Attributes

  resultName: '',

  resultValue: '',

  // Properties

  name: computed('result', 'resultName', function() {
    return this.get('result')[this.get('resultName')];
  }),

  value: computed('result', 'resultValue', function() {
    return this.get('result')[this.get('resultValue')];
  }),

  highlightedValue: computed('highlightedResult', 'resultValue', function() {
    let value = '';

    if (this.get('highlightedResult')) {
      value = this.get('highlightedResult')[this.get('resultValue')];
    }

    return value;
  }),

  isHighlighted: computed('value', 'highlightedValue', function() {
    return this.get('value') === this.get('highlightedValue');
  }),

  actions: {
    selectResult(value) {
      this.attrs.selectResult(value);
    }
  }

});
