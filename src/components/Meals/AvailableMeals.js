import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';



const AvailableMeals = function() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

    useEffect(() => {
      const fetchMeals = async function() {
        const response =await fetch('https://meals-project-b6b54-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
        if(!response.ok) {
          throw new Error('Ops, something went wrong')
        }
        
        const data = await response.json();

        const loadedMeals = [];

        for(const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
            
          })
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      }

        fetchMeals().catch(err => {
        setIsLoading(false);
        setHttpError(err.message);
        } );
      
    }, [])
    
    
    if(isLoading) {
      return <section className={classes.MealsLoading}>
        <Card>
          <p>Is Loading...</p>
        </Card>
      </section>
    }
    
    if(httpError) {
      return <section className={classes.MealsLoading}>
        <Card>
          <p>{httpError}</p>
        </Card>
      </section>
    }


    const mealsList = meals.map(eachMeal => {
       return <MealItem 
       key={eachMeal.id} 
       id={eachMeal.id} 
       name={eachMeal.name} 
       description={eachMeal.description} 
       price={eachMeal.price} />
    })

    return <section className={classes.meals}>
    <Card>
        <ul>{mealsList}</ul>
    </Card>
    </section>
}

export default AvailableMeals;