import Vue from 'vue';

Vue.filter('toCurrency', (value) => {
    if (typeof value !== 'number') {
      return value;
    }

    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
});
