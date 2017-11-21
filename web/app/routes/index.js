import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    person: {
      refreshModel: false
    }
  },
  model() {
    return new Promise(function(resolve, reject) {
      fetch('/api/personalities')
        .then((resp) => { return resp.json(); })
        .then((data) => { resolve(data); });
    });
  }
});
