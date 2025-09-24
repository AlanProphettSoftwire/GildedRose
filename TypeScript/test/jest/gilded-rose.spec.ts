import { Item, GildedRose } from '@/gilded-rose';

const POSSIBLE_ITEMS: String[] = ['Aged Brie', 'Sulfuras, Hand of Ragnaros', 'Backstage passes to a TAFKAL80ETC concert']

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

type expectedValuesAfterUpdateSet = [name: string, sellIn: number, quality: number, expectedSellIn: number, expectedQuality: number];

it.each<expectedValuesAfterUpdateSet>([
  ['Base Case Item', 5, 5, 4, 4],
  ['Base Case Item', 0, 0, -1, 0],
  ['Base Case Item', 1, 1, 0, 0],
  ['Base Case Item', 0, 6, 0, 4],
  ['Base Case Item', 0, 1, -1, 0],
])('should return %s %i %i %i %i', (name, sellIn, quality, expectedSellIn, expectedQuality) => {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  console.log(expectedQuality)
  expect(items[0].name).toBe(name);
  expect(items[0].quality).toBe(expectedQuality);
  expect(items[0].sellIn).toBe(expectedSellIn);
});
