import React, { useState } from 'react';

function AddMenuItemPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  /*const [description, setDescription] = useState('');*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*const newItem = { name, price: parseFloat(price), category, description };*/
    const newItem = { name, price: parseFloat(price), category };

    try {
      const response = await fetch('http://localhost:5000/api/menu',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setName('');
        setPrice('');
        setCategory('');
        /*setDescription('');*/
      } else {
        alert('Failed to add menu item');
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <div>
      <h1 style ={{margin: '100px 0 0 0'}} >Add Menu Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dish Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        {/*<textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea> */}
        <button type="submit">Add Menu Item</button>
      </form>
    </div>
  );
}

export default AddMenuItemPage;