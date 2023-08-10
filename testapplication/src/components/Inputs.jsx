import React from 'react'
import Classnames from 'classnames'
const Inputs=({name,label,type,icon,onChangeHandler,errors,value}) =>{
  return (
    <div className=" mb-3">
        <label  className="form-label">{label}</label>
        <div className="input-group">
            <span className="input-group-text" >
              <i className={icon}></i>
            </span>
                <input type={type} name={name} value={value} className={Classnames("form-control",{"is-invalid":errors})} onChange={onChangeHandler}/>
                {errors && (<div class="invalid-feedback">
                {errors}
              </div>)}
        </div>
    </div>
  )
}

export default Inputs
