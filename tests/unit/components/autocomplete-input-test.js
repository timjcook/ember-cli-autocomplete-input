import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('autocomplete-input', 'Unit | Component | autocomplete input', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it will send a clearSearch action when the esc key is pressed', function(assert) {
  assert.expect(1);

  let component = this.subject();
  component.actions.clearSearch = () => {
    assert.ok(true, 'it sends a clearSearch action');
  };

  component.onEscPress();
});

test('it will not send the selectResult action if  no highlighted result on enter press', function(assert) {
  assert.expect(0);

  let component = this.subject();
  component.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }, {
    name: 'Adelaide Crows',
    value: 'crows'
  }]);
  component.set('highlightedResultIndex', -1);

  component.actions.selectResult = () => {
    assert.ok(false, 'it will not send the select result action');
  };

  component.onEnterPress();
});

test('it will send the selectResult action on currently highlighted result on enter press', function(assert) {
  assert.expect(2);

  let component = this.subject();
  component.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }, {
    name: 'Adelaide Crows',
    value: 'crows'
  }]);
  component.set('highlightedResultIndex', 0);

  component.actions.selectResult = (result) => {
    assert.equal(result.name, component.get('results')[component.get('highlightedResultIndex')].name, 'it sends the currently highlighted results');
    assert.equal(result.value, component.get('results')[component.get('highlightedResultIndex')].value, 'it sends the currently highlighted results');
  };

  component.onEnterPress();
});

test('it will move the highlighted index down one on down key action', function(assert) {
  assert.expect(1);

  let component = this.subject();

  component.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }, {
    name: 'Adelaide Crows',
    value: 'crows'
  }]);
  component.set('highlightedResultIndex', 0);

  component.onDownPress();

  assert.equal(component.get('highlightedResultIndex'), 1);
});

test('it will move the highlighted index back to top down key action when last element highlighted', function(assert) {
  assert.expect(1);

  let component = this.subject();

  component.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }, {
    name: 'Adelaide Crows',
    value: 'crows'
  }]);
  component.set('highlightedResultIndex', component.get('results').length - 1);

  component.onDownPress();

  assert.equal(component.get('highlightedResultIndex'), 0);
});

test('it will move the highlighted index up one on up key action', function(assert) {
  assert.expect(1);

  let component = this.subject();

  component.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }, {
    name: 'Adelaide Crows',
    value: 'crows'
  }]);
  component.set('highlightedResultIndex', 2);

  component.onUpPress();

  assert.equal(component.get('highlightedResultIndex'), 1);
});

test('it will move the highlighted index to bottom on up key action when first element highlighted', function(assert) {
  assert.expect(1);

  let component = this.subject();

  component.set('results', [{
    name: 'Essendon Bombers',
    value: 'bombers'
  }, {
    name: 'Geelong Cats',
    value: 'cats'
  }, {
    name: 'Adelaide Crows',
    value: 'crows'
  }]);
  component.set('highlightedResultIndex', 0);

  component.onUpPress();

  assert.equal(component.get('highlightedResultIndex'), component.get('results').length - 1);
});

