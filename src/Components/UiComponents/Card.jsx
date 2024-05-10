import React from 'react'

function Card({title,nbRendez_vous}) {
  return (
   
    <div className="col-xl-3 col-md-6 mb-4">
    <div className="card border-left-warning shadow h-100 py-2">
        <div className="card-body">
            <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        {title}</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{nbRendez_vous}</div>
                </div>
                
            </div>
        </div>
    </div>
</div>

   
  )
}

export default Card
