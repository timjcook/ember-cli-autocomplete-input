import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/autocomplete-result-item';

export default Component.extend({

  layout,

  // Attributes

  resultName: '',

  resultValue: '',

  // Methods

  getValue(object, attrName) {
    if (object.get) {
      return object.get(attrName);
    } else {
      return object[attrName];
    }
  },

  // Properties

  name: computed('result', 'resultName', function() {
    return this.getValue(this.get('result'), this.get('resultName'));
  }),

  value: computed('result', 'resultValue', function() {
    return this.getValue(this.get('result'), this.get('resultValue'));
  }),

  highlightedValue: computed('highlightedResult', 'resultValue', function() {
    let value = '';

    if (this.get('highlightedResult')) {
      value = this.getValue(this.get('highlightedResult'), this.get('resultValue'));
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
