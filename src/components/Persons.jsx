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
  const [personToDelete, setPersonToDelete] = useState(null);

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

  const handleDelete = (id) =>{
    setPersonToDelete(id);
  }

  const confirmDelete = (e) => {
    setPersons(persons.filter(person => person.id !== personToDelete));
    setPersonToDelete(null);
  }

  const cancelDelete = (e) =>{
    setPersonToDelete(null);
  }

  const handleCreate = (e) => {
    setPersons([...persons, { id: persons.length + 1, ...editedPerson }]);
    setEditedPerson({ name: '', role: '', img: ''});
  }

  return (
    <div>
      <h2>IT Team</h2>
      <div className='container'>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {persons.map((person) => {
            return (
              <div key={person.id}>
                <Person              
                  id={person.id}
                  name={person.name}
                  role={person.role}
                  img={person.img}
                  handleEdit={() => handleEdit(person.id)}
                  handleDelete={handleDelete}
                />
              </div>
            )
          })}
        </div>
      </div>
      {/* Renderiza el formulario para editar o crear una persona */}
      <div className='mt-4 row p-2'>
          <h2>{isEditing ? 'Modificar Datos' : 'Datos de la Nueva Persona'}</h2>
          <input type="text" name="name" value={editedPerson.name} onChange={handleChange} placeholder='Nombre' className='form-control mb-2'/>
          <input type="text" name="role" value={editedPerson.role} onChange={handleChange} placeholder='Rol' className='form-control mb-2'/>
          <input type="text" name="img" value={editedPerson.img} onChange={handleChange} placeholder='URL de la imagen' className='form-control mb-2'/>
          <div className='mt-2'>
            <button className='btn btn-primary' onClick={isEditing ? handleSave : handleCreate}>{isEditing ? 'Guardar' : 'Crear'}</button>
          </div>
      </div>
      {/* Modal de confirmación de eliminación */}
      <div id="deleteModal" className='modal fade' tabIndex="-1">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Confirmar Eliminación</h4>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={cancelDelete}></button>
            </div>
            <div className='modal-body'>
              <p>¿Estás seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
            </div>
            <div className='modal-footer'>
              <button type="button" className='btn btn-secondary' data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
              <button type="button" className='btn btn-danger' data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
