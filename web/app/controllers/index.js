import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  queryParams: ['person'],

  person: null,

  targetPerson: Ember.computed('model', 'person', function () {
    let person = this.get('person');

    if (Ember.isEmpty(person) && person !== '') {
      return false;
    } else {
      let personality = this.get(`model.${person}`).personality;
      let consumption = this.get(`model.${person}`).consumption_preferences;
      //debugger
      return {personality,consumption};
    }
  })
});
