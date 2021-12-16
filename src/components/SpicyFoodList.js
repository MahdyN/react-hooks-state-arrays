import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods); // we use useState to set the initial state of foods to the imported spicyFoods array and setFoods is a setter function

  const [filterBy, setFilter] = useState("All")  // we use useState to set initial state of our filter to display all the types of cuisine in our list 

  function handleAddFood() {    // whenever the add new food button is pressed this callback function is triggered, a new spicy food object is returned from the getNewSpicyFood function
    const newSpicyFood = getNewSpicyFood();   // we store the returned new spicy food object in this variable
    const newSpicyFoodArray = [...foods, newSpicyFood];   // we create a new variable and assign an array, spreading the current state of foods and adding the newly returned object from the callback function
    setFoods(newSpicyFoodArray);   // we use the setter function to change the current state of foods to the newly created array, this will trigger a re-render of this parent component, creating a new list of spicy food                
  }

  function handleClick(id) {

    // const newSpicyFoodArray = foods.filter((food) => food.id !== id)      // this returns an array of elements that match the condition in the function(), the filter method will go through every index and compare the id of the food item to the id of the event target list item and return an array with every element that is not the same as that target id, essentially removing that food item from the list
    // setFoods(newSpicyFoodArray)

    const newSpicyFoodArray = foods.map((food) => {           // this returns an array of the same length but updating the key value pair that we want
        if (food.id === id) {           // it will iterate over every food object until it reaches a match for the id of the event target that we clicked and update the value of the heatLevel key 
          return {
            ...food,
            heatLevel: food.heatLevel + 1
          };
        }
        else {               // for the ids that dont match, it just returns the individual food object unchanged so we are only updating the desired key
          return food;
        }
    })
      setFoods(newSpicyFoodArray)
  }

  function handleFilter(option) {              // whenever an option is selected from the drop down, setFilter is gonna set the current inner state of the filterBy to that option, component re-renders
    setFilter(option);
  }

  const filteredFoods = foods.filter((food) => {      // in the callback for this filter method, it will initially check if the filterBy state is equal to "All", if it is, it will return true for every iterated food item, essentially returning every item in the foods array. Else, it will only return the food items which their cuisine matches the filter chosen
    if(filterBy === "All") {
      return true;
    }
    else {
      return food.cuisine === filterBy;

    }
  })

  const spicyFoodList = filteredFoods.map((food) => (   // Creating a spicy food list using the spicyFoods array that is the current state of the foods variable, using the map method over the array and creating a list item with every indexes properties (map performs a certain function on every index of the array and returns a same length array)
                                                // Adding a click event on the list item as they are being made, we need to create an anonymous function and reference the callback function handleClick, if we were to just put the function itself it would invoke the function without an event trigger  
    <li key={food.id} onClick = {() => handleClick(food.id)} >            
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
    ));



  return (   // We added a change event listener on this select drop down that will trigger a callback function, passing the selected value as an argument
    <div>
      <select name="filter" onChange = {(event) => handleFilter(event.target.value)}>       
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>

      <button onClick={handleAddFood}>Add New Food</button>
      <ul>
          {spicyFoodList}
      </ul>
    </div>
  );
}

export default SpicyFoodList;
