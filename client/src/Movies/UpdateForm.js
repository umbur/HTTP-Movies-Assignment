import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
  title: '',
  director: '',
  metascore: '',
  description: '',
  stars: []
};

const UpdateForm = props => {
    console.log('props from UpdateForm', props)
  const [item, setItem] = useState(initialItem);
  useEffect(() => {
    const id = props.match.params.id;
    const itemInArr = props.items.find(item => `${item.id}` === id);
    if (itemInArr) setItem(itemInArr);
  }, [props.items, props.match.params.id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, item)
      .then(res => {
        console.log('res from handleSubmit', res);
        setItem(initialItem);
        props.updateItems(res.data);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={item.name}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.name}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.price}
        />
        <div className="baseline" />

        <input
          type="text"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={item.price}
        />
        <div className="baseline" />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={item.price}
        />
        <div className="baseline" />


        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
