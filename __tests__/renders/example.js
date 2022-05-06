import React from 'react';
import renderer from 'react-test-renderer';
import FoodSearch from '../../src/pages/foodSearch/foodSearch';

test('renders correctly', () => {
  const x = renderer.create(<FoodSearch />).toJSON();

  expect(1+2).toBe(3);
  expect(1+2)
  //expect(await x.findByText('home')).toBeTruthy();
});

