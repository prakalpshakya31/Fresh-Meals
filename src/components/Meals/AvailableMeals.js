import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://fresh-meals-prakalpshakya31-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          image: responseData[key].image,
          price: responseData[key].price,
          category: responseData[key].category,
        });
      }
      setMeals(loadedMeals);
      setAllMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const filterItem = (categoryItem) => {
    const updatedItems = allMeals.filter((currElement) => {
      return (
        categoryItem === 'all' ||
        currElement.category === categoryItem
      );
    });

    setMeals(updatedItems);
  };

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      image={meal.image}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <div className={classes.filters}>
        <button onClick={() => filterItem('all')}>
          All
        </button>
        <button onClick={() => filterItem('Starters')}>
          Starters
        </button>
        <button onClick={() => filterItem('Main Course')}>
          Main Course
        </button>
        <button onClick={() => filterItem('Bread')}>
          Bread
        </button>
        <button onClick={() => filterItem('Thalis')}>
          Thalis
        </button>
      </div>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
