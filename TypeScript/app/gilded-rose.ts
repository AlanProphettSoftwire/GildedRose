export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
        continue;
      }

      this.items[i].sellIn = this.items[i].sellIn - 1;

      switch (this.items[i].name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (this.items[i].sellIn < 0) {
            this.items[i].quality = 0
            break;
          }

          if (this.items[i].sellIn >= 10) {
            this.items[i].quality = this.items[i].quality + 1
          }
          else if (this.items[i].sellIn >= 5) {
            this.items[i].quality = this.items[i].quality + 2
          }
          else {
            this.items[i].quality = this.items[i].quality + 3
          }

          if (this.items[i].quality > 50) {
            this.items[i].quality = 50
          }
          break;
        case 'Aged Brie':
          if (this.items[i].sellIn < 0) {
            this.items[i].quality = Math.min(this.items[i].quality + 2, 50);
          }
          else {
            this.items[i].quality = Math.min(this.items[i].quality + 1, 50);
          }
          break;
        case 'Conjured Mana Cake':
          if (this.items[i].sellIn < 0) {
            this.items[i].quality = Math.max(0, this.items[i].quality - 4);
          }
          else {
            this.items[i].quality = Math.max(0, this.items[i].quality - 2);
          }
          break;
        default:
          if (this.items[i].sellIn < 0) {
            this.items[i].quality = Math.max(0, this.items[i].quality - 2);
          }
          else {
            this.items[i].quality = Math.max(0, this.items[i].quality - 1);
          }
          break;
      }
    }
    return this.items;
  }
}
