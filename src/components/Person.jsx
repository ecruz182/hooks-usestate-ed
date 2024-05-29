import React from 'react'

export const Person = ({name, role, img, handleEdit}) => {
  return (
      <div class="col">
        <div class="card text-bg-secondary">
          <img src={img} className="card-img-top" alt={name}/>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{role}</p>
            </div>
            <div>
              <button className='btn btn-success me-2' onClick={handleEdit}>Editar</button>
              <button className='btn btn-danger'>Eliminar</button>
            </div>
        </div>
      </div>
  )
}
