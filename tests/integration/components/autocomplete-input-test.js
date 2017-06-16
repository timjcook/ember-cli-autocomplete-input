import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('autocomplete-input', 'Integration | Component | autocomplete input', {
  integration: true
});

test('it renders an input without a block and without results', function(assert) {
  assert.expect(2);

  this.set('selectResult', function() {});

  this.set('results', []);
  this.set('term', 'term');

  this.render(hbs`{{autocomplete-input selectResult=(action selectResult) term=term results=results}}`);

  assert.ok(!!this.$('.autocomplete-input .input input[type="text"]').val(), this.get('term'));
  assert.equal(this.$('.autocomplete-input .autocomplete-results').length, 0, 'it should not have autocomplete results');
});

test('it renders an input with a block and without results', function(assert) {
  assert.expect(2);

  this.set('selectResult', function() {});

  this.set('results', []);
  this.set('term', 'term');

  this.render(hbs`
    {{#autocomplete-input selectResult=(action selectResult) term=term results=results as |term|}}
      {{input class='my-input' type='text' value=term}}
    {{/autocomplete-input}}
  `);

  assert.ok(!!this.$('.autocomplete-input .input input.my-input[type="text"]').val(), this.get('term'));
  assert.equal(this.$('.autocomplete-input .autocomplete-results').length, 0, 'it should not have autocomplete results');
});

test('it renders an input without a block and with results', function(assert) {
  assert.expect(4);

  this.set('selectResult', function() {});

  this.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }]);
  this.set('term', 'term');

  this.render(hbs`{{autocomplete-input selectResult=(action selectResult) term=term results=results}}`);

  assert.ok(!!this.$('.autocomplete-input .input input[type="text"]').val(), this.get('term'));
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').length, 2, 'it should have 2 autocomplete result items');
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').eq(0).text().trim(), this.get('results')[0].name, 'it should have correct first result item');
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').eq(1).text().trim(), this.get('results')[1].name, 'it should have correct second result item');
});

test('it renders an input with a block and without results', function(assert) {
  assert.expect(4);

  this.set('selectResult', function() {});

  this.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }]);
  this.set('term', 'term');

  this.render(hbs`
    {{#autocomplete-input selectResult=(action selectResult) term=term results=results as |term|}}
      {{input class='my-input' type='text' value=term}}
    {{/autocomplete-input}}
  `);

  assert.ok(!!this.$('.autocomplete-input .input input[type="text"]').val(), this.get('term'));
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').length, 2, 'it should have 2 autocomplete result items');
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').eq(0).text().trim(), this.get('results')[0].name, 'it should have correct first result item');
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').eq(1).text().trim(), this.get('results')[1].name, 'it should have correct second result item');
});

test('it renders an input with mapped results', function(assert) {
  assert.expect(4);

  this.set('selectResult', function() {});

  this.set('results', [{
    teamName: 'Essendon Bombers',
    teamValue: 'bombers'
  }, {
    teamName: 'Geelong Cats',
    teamValue: 'cats'
  }]);
  this.set('term', 'term');

  this.render(hbs`{{autocomplete-input selectResult=(action selectResult) term=term results=results resultName='teamName' resultValue='teamValue'}}`);

  assert.ok(!!this.$('.autocomplete-input .input input[type="text"]').val(), this.get('term'));
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').length, 2, 'it should have 2 autocomplete result items');
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').eq(0).text().trim(), this.get('results')[0].teamName, 'it should have correct first result item');
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item').eq(1).text().trim(), this.get('results')[1].teamName, 'it should have correct second result item');
});

test('it will render a highlighted option depending on the position of the highlight', function(assert) {
  assert.expect(1);

  this.set('selectResult', function() {});

  this.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }]);
  this.set('highlightedResultIndex', 0);
  this.set('term', 'term');

  this.render(hbs`{{autocomplete-input selectResult=(action selectResult) highlightedResultIndex=highlightedResultIndex term=term results=results}}`);
  assert.equal(this.$('.autocomplete-input .autocomplete-results .autocomplete-result-item.highlight').text().trim(), this.get('results')[0].name, 'it should have correct highlighted result item');
});
