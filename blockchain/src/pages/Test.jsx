import React, { useState } from 'react';

function Test() {
  const [items, setItems] = useState([{ id: 1, value: 0 }]);

  const incrementItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, value: item.value + 1 } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Increment List Values</h1>
        
        <div>
          <h2>Items List</h2>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {`Item ${item.id}: ${item.value}`}
                <button onClick={() => incrementItem(item.id)}>Increment</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}


export default Test;
