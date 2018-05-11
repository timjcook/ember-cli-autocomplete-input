import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import { observer, computed } from '@ember/object';
import layout from '../templates/components/autocomplete-input';
import KeyboardNavMixin from 'ember-cli-keyboard-nav/mixins/keyboard-nav';

export default Component.extend(KeyboardNavMixin, {

  layout,

  // Hooks

  init() {
    this._super(...arguments);

    if (!this.get('results')) {
      this.set('results', []);
    }
  },

  didInsertElement() {
    this.bindKeys(this.$('input[type="text"]'));
    this.set('lastTerm', this.get('term'));
  },

  // Attributes

  name: '',

  resultName: 'name',

  resultValue: 'value',

  highlightedResultIndex: -1,

  term: '',

  lastTerm: '',

  placeholder: '',

  autocomplete: '',

  // Properties

  highlightedResult: computed('results.[]', 'highlightedResultIndex', function() {
    return this.get('results')[this.get('highlightedResultIndex')];
  }),

  hasResults: notEmpty("results"),

  // Observers

  termDidChange: observer('term', function() {
    this.send('updateTerm', this.get('term'));
  }),

  // Keyboard Nav actions

  onEnterPress() {
    let result = this.get("results")[this.get("highlightedResultIndex")];

    if(result) {
      this.send("selectResult", result);
    }
  },

  onEscPress() {
    this.send("clearSearch");
  },

  onDownPress() {
    let index = 0;

    if(this.get("highlightedResultIndex") >= 0) {
      index = this.get("highlightedResultIndex") + 1;
    }

    if(index > this.get("results").length - 1) {
      index = 0;
    }

    this.set("highlightedResultIndex", index);
  },

  onUpPress() {
    let lastItem = this.get("results").length - 1;
    let index = lastItem;

    if(this.get("highlightedResultIndex") >= 0) {
      index = this.get("highlightedResultIndex") - 1;
    }

    if(index < 0) {
      index = lastItem;
    }

    this.set("highlightedResultIndex", index);
  },

  actions: {
    selectResult(result) {
      this.get('selectResult')(result);
    },

    updateTerm(term) {
      if (term !== this.get('lastTerm')) {
        this.set('lastTerm', term);
        this.get('updateTerm')(term);
      }
    },

    clearSearch() {
      this.get("clearSearch")();
    }
  }


});
