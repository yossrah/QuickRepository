import React,{useState} from 'react'
import Editor from './Editor'
const CodePen=({id,HandleClose})=> {
  // const id = useParams()
  const [java,setJava]=useState('')
  console.log("codePennnnnnnnnnnn",id)
  return (
    <>
    <div style={{
      // display: 'flex',
      //  justifyContent: 'center',
      //  alignItems: 'center',
      width: '100%',
      height: '100vh'
    }}>
    
    <div className='pane top-pane'>
     <Editor
     HandleClose={HandleClose}
     id={id}
     language="java" displayName="Java" value={java}
      onChange={setJava}
     />
    </div>
    </div>
    </>
  )
}

export default CodePen
