import { Item, GildedRose } from '@/gilded-rose';

const POSSIBLE_ITEMS: String[] = ['Aged Brie', 'Sulfuras, Hand of Ragnaros', 'Backstage passes to a TAFKAL80ETC concert']

// describe('Gilded Rose', () => {
//   it('should foo', () => {
//     const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
//     const items = gildedRose.updateQuality();
//     expect(items[0].name).toBe('foo');
//   });
// });

type expectedValuesAfterUpdateSet = [name: string, sellIn: number, quality: number, expectedSellIn: number, expectedQuality: number];

it.each<expectedValuesAfterUpdateSet>([
  ['Base Case Item - standard speed', 5, 5, 4, 4],          //standard speed
  ['Base Case Item - not below zero', 0, 0, -1, 0],         //not below zero
  ['Base Case Item - at zero boundary', 1, 1, 0, 0],        //at zero boundary
  ['Base Case Item - twice the speed', 0, 6, -1, 4],        //twice the speed
  ['Base Case Item - sellIn goes negative', 0, 1, -1, 0],   //sellIn goes negative
  ['Aged Brie', 15, 5, 14, 6],                             //Brie increases in 
  ['Aged Brie', 0, 5, -1, 7],                               //Out of date brie twice as good
  ['Aged Brie', -9, 5, -10, 7],                             //Long out of date brie twice as good
  ['Aged Brie', -9, 50, -10, 50],                           //Long out of date brie twice as good
  ['Sulfuras, Hand of Ragnaros', -9, 80, -9, 80],           //No change to SellIn or Quality when Sellin negative
  ['Sulfuras, Hand of Ragnaros', 9, 80, 9, 80],             //No change to SellIn or Quality when Sellin positive
  ['Sulfuras, Hand of Ragnaros', 0, 80, 0, 80],             //No change to SellIn or Quality when Sellin zero
  ['Backstage passes to a TAFKAL80ETC concert', 11, 6, 10, 7], // more than 10 days left
  ['Backstage passes to a TAFKAL80ETC concert', 10, 6, 9, 8],  // 10 days left
  ['Backstage passes to a TAFKAL80ETC concert', 6, 6, 5, 8], // 6 days left
  ['Backstage passes to a TAFKAL80ETC concert', 5, 6, 4, 9], // 5 days left
  ['Backstage passes to a TAFKAL80ETC concert', 1, 6, 0, 9], // 1 day left
  ['Backstage passes to a TAFKAL80ETC concert', 0, 6, -1, 0], // concert has happened
  ['Backstage passes to a TAFKAL80ETC concert', 5, 49, 4, 50], // more than 5 days but quality at max
  ['Backstage passes to a TAFKAL80ETC concert', 1, 49, 0, 50], // more than one day but quality at max
  ['Backstage passes to a TAFKAL80ETC concert', 0, 49, -1, 0], // day has passed but quality at max
])('should return %s %i %i %i %i', (name, sellIn, quality, expectedSellIn, expectedQuality) => {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  expect(items[0].name).toBe(name);
  expect(items[0].quality).toBe(expectedQuality);
  expect(items[0].sellIn).toBe(expectedSellIn);
});



describe('updateQuality', () => {

  test('should not modify sellIn or quality if item is Sulfuras, Hand of Ragnaros', () => {
    const gildedRose = new GildedRose([new Item(
      'Sulfuras, Hand of Ragnaros',
      10,
      80
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(80);
  });

  test('should decrease in sellIn and quality is 0 if item Backstage passes is on sellIn date', () => {
    const gildedRose = new GildedRose([new Item(
      'Backstage passes to a TAFKAL80ETC concert',
      0,
      10
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  test('should decrease in sellIn and quality is 0 if item Backstage passes is past sellIn date', () => {
    const gildedRose = new GildedRose([new Item(
      'Backstage passes to a TAFKAL80ETC concert',
      -1000,
      0
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(-1001);
    expect(items[0].quality).toBe(0);
  });

  test('should decrease in sellIn and increase quality by 1 if item Backstage passes is 11 days before sellIn date', () => {
    const gildedRose = new GildedRose([new Item(
      'Backstage passes to a TAFKAL80ETC concert',
      11,
      10
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(11);
  });

  test('should decrease in sellIn and increase quality by 2 if item Backstage passes is 6 days before sellIn date', () => {
    const gildedRose = new GildedRose([new Item(
      'Backstage passes to a TAFKAL80ETC concert',
      6,
      10
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(12);
  });

  test('should decrease in sellIn and increase quality by 3 if item Backstage passes is 1 days before sellIn date', () => {
    const gildedRose = new GildedRose([new Item(
      'Backstage passes to a TAFKAL80ETC concert',
      1,
      10
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(13);
  });

  test('should decrease in sellIn and increase quality remain as 50 if item Backstage passes quality is already 50', () => {
    const gildedRose = new GildedRose([new Item(
      'Backstage passes to a TAFKAL80ETC concert',
      10,
      50
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  });

  test('should decrease in sellIn and increase quality remain as 50 if item Brie and quality is already 50', () => {
    const gildedRose = new GildedRose([new Item(
      'Aged Brie',
      10,
      50
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  });

  test('should decrease in sellIn and increase quality to 50 if item Brie and quality is already 49', () => {
    const gildedRose = new GildedRose([new Item(
      'Aged Brie',
      -7,
      49
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].sellIn).toBe(-8);
    expect(items[0].quality).toBe(50);
  });

  test('should decrease in sellIn and increase quality by 1 if item Brie and quality is less than 50', () => {
    const gildedRose = new GildedRose([new Item(
      'Aged Brie',
      7,
      10
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].sellIn).toBe(6);
    expect(items[0].quality).toBe(11);
  });

  test('should decrease in sellIn and increase quality by 2 if SellIn negative and item Brie and quality is less than 49', () => {
    const gildedRose = new GildedRose([new Item(
      'Aged Brie',
      -7,
      48
    )]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].sellIn).toBe(-8);
    expect(items[0].quality).toBe(50);
  });
});
