/*================================================================
 Reusable Components:
    We will refactor Search component to make it reusable.
 
    Since the Search component doesn't have any actual "search" 
 functionality, it takes little effort to generalize the search 
 domain-specific properties to make the component reusable for the 
 rest of the application. Let's pass a: 
     1.dynamic id
     2.and label prop to the Search component, 
     3.rename the actual value and callback handler 
       to something more generic like 'onChange; and 
     4.rename the component too:
    
   Review what is useState?
      - When a state gets mutated, the component with the state 
      and all child components will re-render.

   Review what is useEffect?
    - What does useEffect do? by using this hook you tell React that 
     your component needs to do something after render.

=============================================*/

import * as React from 'react';
 
  //Create a custom hook called "useStorageState". We will use two hooks 
  //to create it:
  //    1. useState
  //    2. useEffect 
  //So far this custom hook is just function around useState and useEffect.
  //What's missing is providing an initial state and returning the values
  //that are needed by the App component as an array.
  
  const useStorageState = (key, initialState) => {
     const [value, setValue] = React.useState(
        localStorage.getItem('key') || initialState 
     );

     //What does useEffect do? by using this hook you tell React that 
     //your component needs to do something after a render.
     React.useEffect(() => {
         console.log('useEffect fired. Displaying value of dependency array ' +
            [value, key]  );
         localStorage.setItem(key, value);  
        },
        [value, key] 
        ); //EOF useEffect
    
     return [value, setValue]; 

  } //EOF create custom hook
  
 const App = () => { 
     
      const stories = [
        {
          title: 'React',
          url: 'https://reactjs.org/',
          author: 'Jordan Walke',
          num_comments: 3,
          points: 4,
          objectID: 0,
        },
        {
          title: 'Redux',
          url: 'https://redux.js.org/',
          author: 'Dan Abramov, Andrew Clark',
          num_comments: 2,
          points: 5,
          objectID: 1,
        },
       ]
       
      const [searchTerm, setSearchTerm] = 
               useStorageState('search', 'React');
         
      const handleSearch = (event) => {
          setSearchTerm(event.target.value); 
        };

      const searchedStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      /*  <Search search={searchTerm} onSearch={handleSearch} />
          component was renamed InputWithLabel. Two new parameters/props 
          were added: 'id' 'and label' 
            id,
            label,
            type = 'text',
            value, - value will be passed 'searchTerm' the original name of 
                    stateFul value. See line 73
            onInputChange  - will be initialize to handleSearch 
                  (the original name of the callback function)
      */
      return (
        <>
          <h1>My Hacker Stories</h1>
    
           <InputWithLabel
             id="search"
             label="Search"
             value={searchTerm} //assign name of stateful value created by call to useState() hook
             onInputChange={handleSearch} //assign name of callback handler
             //text = note we are not passing 'text' prop. Every time the InputWithLabel 
             //component is used without a type prop, the default type will be "text".
           />
          <hr />
    
          <List list={searchedStories} />
        </>
      );
    }
    
   /*Rename 
   const Search = ({search, onSearch}) => ( //<--Destructrure the props right inside the function signature
      <div>
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={onSearch}
         />
      </div>
      )  //EOF Search component */ 
  
    /*Rename Search to InputWithLabel and add two props 'id' and 'label'
        1.dynamic id
        2.and 'label' prop to the Search component, 
        3.rename the prop 'searchTerm' to 'value'  - assign 'searchTerm' to this prop
        4.rename the prop 'onChange' to 'onInputChange' - assign 'handleSearch' to this prop 
          to something more generic; and 
        4.rename the component too to 'InputWithLabel': */
    const InputWithLabel = ({
        id,
        label,
        value,  //this prop was assigned {searchTerm}
        type = 'text',
        onInputChange, //this prop was assigned {handleSearch} the callback
      }) => (
        <>
          <label htmlFor={id}>{label}</label>
          &nbsp;
          <input
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
          />
        </>
      );
    
   const List = ({list}) => (  //<-- destructure objects in the function signature.
    <ul>
       {list.map((item) => (
         <Item key={item.objectID} item={item} />
       ))}
    </ul>
  ); //EOF
     
 
  
  const Item = ({item}) => (   
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </li>
  );   

    
export default App;

//========================================================== 
//Note on Map:
 //Within the map() method, we have access to each object and its properties.
 
 //useState
 //By using useState, we are telling React that we want to have a 
 //stateful value which changes over time. And whenever this stateful value 
 //changes, the affected components (here: Search component) 
 //will re-render to use it (here: to display the recent value).