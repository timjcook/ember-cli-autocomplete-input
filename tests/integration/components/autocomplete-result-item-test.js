import EmberObject, {
  computed,
  defineProperty
} from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('autocomplete-result-item', 'Integration | Component | autocomplete result item', {
  integration: true
});

test('it renders the result item with default mappings', function(assert) {
  assert.expect(1);

  this.set('result', {
    name: 'Essendon Bombers',
    value: 'bombers'
  });
  this.render(hbs`{{autocomplete-result-item result=result resultName='name' resultValue='value'}}`);

  assert.equal(this.$('.autocomplete-result-item').text().trim(), this.get('result').name, 'it displays the autocomplete result correctly');
});

test('it renders the result item with custom mappings', function(assert) {
  assert.expect(1);

  this.set('result', {
    teamName: 'Essendon Bombers',
    teamValue: 'bombers'
  });
  this.render(hbs`{{autocomplete-result-item result=result resultName='teamName' resultValue='teamValue'}}`);

  assert.equal(this.$('.autocomplete-result-item').text().trim(), this.get('result').teamName, 'it displays the autocomplete result correctly');
});

test('it renders the result item highlighted with default mappings', function(assert) {
  assert.expect(1);

  this.set('result', {
    name: 'Essendon Bombers',
    value: 'bombers'
  });
  this.set('highlightedResult', this.get('result'));
  this.render(hbs`{{autocomplete-result-item result=result highlightedResult=highlightedResult resultName='name' resultValue='value'}}`);

  assert.equal(this.$('.autocomplete-result-item').text().trim(), this.get('result').name, 'it displays the autocomplete result correctly');
});

test('it renders the result item highlighted with custom mappings', function(assert) {
  assert.expect(1);

  this.set('result', {
    teamName: 'Essendon Bombers',
    teamValue: 'bombers'
  });
  this.set('highlightedResult', this.get('result'));
  this.render(hbs`{{autocomplete-result-item result=result highlightedResult=highlightedResult resultName='teamName' resultValue='teamValue'}}`);

  assert.equal(this.$('.autocomplete-result-item').text().trim(), this.get('result').teamName, 'it displays the autocomplete result correctly');
});

test('it renders a result item with computed propeties and default mappings', function(assert) {
  assert.expect(1);

  let result = new EmberObject({});
  defineProperty(result, 'name', computed(function() { return 'Essendon Bombers'; }));
  defineProperty(result, 'value', computed(function() { return 'bombers'; }));
  this.set('result', result);

  this.render(hbs`{{autocomplete-result-item result=result resultName='name' resultValue='value'}}`);

  assert.equal(this.$('.autocomplete-result-item').text().trim(), this.get('result').get('name'), 'it displays the autocomplete result correctly');
});

test('it renders a result item with computed propeties and custom mappings', function(assert) {
  assert.expect(1);

  let result = new EmberObject({});
  defineProperty(result, 'teamName', computed(function() { return 'Essendon Bombers'; }));
  defineProperty(result, 'teamValue', computed(function() { return 'bombers'; }));
  this.set('result', result);

  this.render(hbs`{{autocomplete-result-item result=result resultName='teamName' resultValue='teamValue'}}`);

  assert.equal(this.$('.autocomplete-result-item').text().trim(), this.get('result').get('teamName'), 'it displays the autocomplete result correctly');
});

test('it renders a result item highlighted with computed properties and default mappings', function(assert) {
  assert.expect(1);

  let result = new EmberObject({});
  defineProperty(result, 'name', computed(function() { return 'Essendon Bombers'; }));
  defineProperty(result, 'value', computed(function() { return 'bombers'; }));
  this.set('result', result);
  this.set('highlightedResult', this.get('result'));

  this.render(hbs`{{autocomplete-result-item result=result highlightedResult=highlightedResult resultName='name' resultValue='value'}}`);

  assert.equal(this.$('.autocomplete-result-item').text().trim(), this.get('result').get('name'), 'it displays the autocomplete result correctly');
});

test('it renders a result item highlighted with computed properties and custom mappings', function(assert) {
  assert.expect(1);

  let result = new EmberObject({});
  defineProperty(result, 'teamName', computed(function() { return 'Essendon Bombers'; }));
  defineProperty(result, 'teamValue', computed(function() { return 'bombers'; }));
  this.set('result', result);
  this.set('highlightedResult', this.get('result'));

  this.render(hbs`{{autocomplete-result-item result=result highlightedResult=highlightedResult resultName='teamName' resultValue='teamValue'}}`);

  assert.equal(this.$('.autocomplete-result-item').text().trim(), this.get('result').get('teamName'), 'it displays the autocomplete result correctly');
});

test('it fires the select result on click with default mappings', function(assert) {
  assert.expect(1);

  this.set('result', {
    name: 'Essendon Bombers',
    value: 'bombers'
  });

  this.set('selectResult', (result) => {
    assert.deepEqual(result, this.get('result')), 'it passes the correct result value';
  });
  this.render(hbs`{{autocomplete-result-item result=result selectResult=(action selectResult) resultName='name' resultValue='value'}}`);

  this.$('.autocomplete-result-item').click();
});

test('it fires the select result on click with custom mappings', function(assert) {
  assert.expect(1);

  this.set('result', {
    teamName: 'Essendon Bombers',
    teamValue: 'bombers'
  });

  this.set('selectResult', (result) => {
    assert.deepEqual(result, this.get('result')), 'it passes the correct result value';
  });
  this.render(hbs`{{autocomplete-result-item result=result selectResult=(action selectResult) resultName='teamName' resultValue='teamValue'}}`);

  this.$('.autocomplete-result-item').click();
});
