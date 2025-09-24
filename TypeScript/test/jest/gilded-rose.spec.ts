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
  ['Aged Brie', 15 ,5 , 14, 6],                             //Brie increases in 
  ['Aged Brie', 0, 5, -1, 7],                                //Out of date brie twice as good
  ['Aged Brie', -9, 5, -10, 7],                                //Long out of date brie twice as good
  ['Aged Brie', -9, 50, -10, 50]                                //Long out of date brie twice as good

])('should return %s %i %i %i %i', (name, sellIn, quality, expectedSellIn, expectedQuality) => {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  console.log(expectedQuality)
  expect(items[0].name).toBe(name);
  expect(items[0].quality).toBe(expectedQuality);
  expect(items[0].sellIn).toBe(expectedSellIn);
});
