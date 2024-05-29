import React from 'react'

export const Person = (props) => {
  return (
      <div class="col">
        <div class="card h-100 text-bg-secondary">
          <img src={props.img} className="card-img-top" alt={props.name}/>
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <p className="card-text">{props.role}</p>
            </div>
        </div>
      </div>
  )
}
