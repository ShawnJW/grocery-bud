import React, { useState } from 'react';
import Form from './Form';
import { nanoid } from "nanoid";
import Items from "./Items.jsx";
import { ToastContainer, toast } from "react-toastify";

const getlocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
       list = JSON.parse(localStorage.getItem('list'));
    } else {
        list = [];
    }
    return list;
}
const setlocalStorage = (items) => {
  localStorage.setItem('list', JSON.stringify(items));
}

const defaultList = JSON.parse(localStorage.getItem('list')) || [];
const App = () => {
  const [items, setItems] = useState(defaultList);
  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setlocalStorage(newItems);
    toast.success('Item added successfully')
  };

  const removeItem = (itemId) => {
    const newItems = items.filter(item => item.id !== itemId);
    setItems(newItems);
    setlocalStorage(newItems);
    toast.success('Item removed successfully');
  }

  const editItem = (itemId) => {
    const newItems = items.map(item => {
      if (item.id === itemId) {
          const newItem = {...item, completed:!item.completed};
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setlocalStorage(newItems);
  }

  return <section className='section-center'>
      <ToastContainer position="top-center" />
    <Form addItem={addItem} />
    <Items items={items} removeItem={removeItem} editItem={editItem} />
  </section>;
};

export default App;
