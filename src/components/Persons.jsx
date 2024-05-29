import React, { useState } from 'react'
import { Person } from './Person';

export const Persons = ({persons, setPersons}) => {

  const [editingId, setEditingId] = useState(null);
  const [editedPerson, setEditedPerson] = useState({
    name: '',
    role: '',
    img: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setEditedPerson(prevState =>({
      ...prevState,
      [name]: value
    }));
  }

  const handleEdit = (id) =>{
    setEditingId(id);
    setIsEditing(true);
    const personToEdit = persons.find(person => person.id === id)
    setEditedPerson({...personToEdit})
  }

  const handleSave = (e) =>{
    //Actualizar el array person con los campos del formulario
    setPersons(persons.map(person => person.id === editingId ? editedPerson : person));
    //resetear id a null
    setEditingId(null);
    //resetear los datos de la persona
    setEditedPerson({name: '', role: '', img: ''});
    setEditingId(false);
  }

  return (
    <div>
      <h2>IT Team</h2>
      <div className='container'>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {persons.map((person) => {
            return (
              <div>
                <Person
                  key={person.id}
                  name={person.name}
                  role={person.role}
                  img={person.img}
                  handleEdit={() => handleEdit(person.id)}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className='mt-4'>
        <h2>Modificar datos</h2>
        <div className='col'>
          <input class="form-control mt-2" type='text' name='name' value={editedPerson.name}  onChange={handleChange} placeholder='Nombre'></input>
          <input class="form-control mt-2" type='text' name='rol' value={editedPerson.role}  onChange={handleChange} placeholder='Rol'></input>
          <input class="form-control mt-2" type='text' name='ima' value={editedPerson.img}  onChange={handleChange} placeholder='URL imagen'></input>
          <button className='btn btn-primary mt-4' onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  )
}
