import { useState, useEffect } from 'react';

function Items() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the data for debugging
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError(error.message);
      }
    };
    fetchItems();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2>Items</h2>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
}

export default Items;
