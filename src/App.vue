<template>
  <div id="app">
    <h1>Pickle Clicker</h1>
    <section class="infobox">
      <p class="market">Price: {{ marketPrice }}</p>
      <div class="stats">
        <p>Cash: {{ cash }}</p>
        <p>Pickles: {{ pickles }} ({{ pps }} pps)</p>
        <p>Satisfaction: {{ satisfaction }}</p>
      </div>
    </section>
    <section class="interface">
      <h2>Actions</h2>
      <div>
        <button v-on:click="pickleClick" class="click">Pickle it</button>
        <button v-on:click="sellClick" class="click">Sell stock</button>
      </div>

      <h2 v-if="this.empire.length">Empire</h2>
      <div class="empire">
        <ul class="empire__list">
          <li v-for="(item, index) in empire" v-bind:key="index">
            {{ item.itemName }}: {{ item.upgradeLevel }}
            <button
              v-on:click="upgradeEmpire(item)"
            >Upgrade: ${{ item.upgradeCost }}</button>
          </li>
        </ul>
      </div>

      <h2>Shop</h2>
      <div class="shop">
        <ul class="merchandise">
          <!-- Needs to be a Component -->
          <li v-for="(item) in marketItems" v-bind:key="item.itemId" class="merchandise__item">
            <button
              class="merchandise__action"
              v-on:click="storeClick(item)"
              v-bind:disabled="item.itemCost < this.cash ? true : false"
              v-bind:class="item.itemCost < this.cash ? 'disabled' : 'not'"
            >
              <p>{{ item.itemId + 1 }}. {{ item.itemName }}</p>
              <p>${{ item.itemCost }}</p>
            </button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import data from "./assets/data.js";

export default {
  name: "App",
  data() {
    return {
      cash: 399,
      empire: [],
      marketItems: [],
      marketPrice: 1,
      pickles: 20,
      picklesTick: 0,
      pps: 0,
      satisfaction: 1.0
    };
  },
  components: {},
  computed: {
    shopData: function() {
      // `this` points to the vm instance
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  },
  watch: {
    pickles: function() {
      // Calc pps?
      console.log(this.pickles);
    }
  },
  methods: {
    gameLoop: function() {
      // Auto create pickles
      let newCukes = this.empire.length;
      this.pickles += newCukes;

      // Do stuff like autosell?

      // Reset PPS needs to be last
      this.pps = this.picklesTick;
      this.picklesTick = 0;
    },
    pickleClick: function() {
      this.picklesSec++;
      this.pickles++;
    },
    sellClick: function() {
      const sellPrice = this.marketPrice * this.pickles;
      const prevCash = this.cash;
      this.cash = sellPrice + prevCash;
      this.pickles = 0;
    },
    setupMarket: function() {
      // Maybe verify the data?
      console.log("Market Data", data);
      this.marketItems = data;
    },
    storeClick: function(newItem) {
      // If cash on hand,
      if (this.cash >= newItem.itemCost) {
        // Make sure we dont already own it
        if (
          !this.empire.filter(item => item.itemId === newItem.itemId).length
        ) {
          this.cash -= newItem.itemCost;
          newItem.upgradeCost = 0;
          this.empire.push(newItem);
          let newMarket = this.marketItems;

          for (let i = 0; i < newMarket.length; i++) {
            if (newMarket[i].itemId == newItem.id) {
              newMarket.splice(i, 1);
              break;
            }
          }

          this.upgradeEmpire(this.empire[this.empire.length - 1]);
        }
      }
      // this.empire.push(item);
    },
    upgradeEmpire: function(eItem) {
      if (eItem.upgradeLevel < 10 && this.cash >= eItem.upgradeCost) {
        this.cash -= eItem.upgradeCost;
        eItem.upgradeLevel++;
      }
      eItem.upgradeCost = eItem.itemCost * (eItem.upgradeLevel * 2);
    }
  },
  mounted: function() {
    this.setupMarket();
    setInterval(this.gameLoop, 1000);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 1.5rem;
}

button {
  cursor: pointer;
}

.stats {
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2em;
}

.stats p {
  display: inline-block;
  margin-bottom: 1em;
}

.interface {
  border: 1px solid gainsboro;
  padding: 2em;
}

.interface .click {
  background-color: lightgreen;
  border-radius: 1rem;
  font-size: 1.4rem;
  margin: 0 1rem;
  padding: 1rem 1.8rem;
}

.interface .click:hover {
  background-color: darkgreen;
  color: white;
}

.merchandise {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 0.5rem;
  list-style: none;
  padding-block-start: 0;
}

.merchandise__item {
  border: 1px solid gainsboro;
  height: 0;
  margin-bottom: 1rem;
  padding-bottom: 100%;
  position: relative;
}

.merchandise__inner {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.merchandise__action {
  display: block;
  height: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
</style>
