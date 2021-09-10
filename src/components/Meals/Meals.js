import MealsSummary from './MealsSummary'
import AvailableMeals from './AvailableMeals';
import React from 'react';
import Image from './Image';

const Meals = () => {
  return (
    <React.Fragment>
      <Image />
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  )
};

export default Meals;