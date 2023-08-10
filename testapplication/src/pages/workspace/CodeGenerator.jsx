import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/display/rulers';
import React,{ useState, useRef, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetFlow, GetCode } from '../../redux/actions/flowActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Controlled } from 'react-codemirror2';
import Button from '@mui/material/Button';
import { DownloadCode } from '../../redux/actions/flowActions';
import CircularProgress from '@mui/material/CircularProgress';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/display/rulers';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/match-highlighter';
const CodeGenerator=({onClose})=> {
  const {id}=useParams()
  const codeMirrorRef = useRef(null);
  const {loader}=useSelector((state)=>state.flows)
  const {code}=useSelector((state)=>state.flows)
  const {file}=useSelector((state)=>state.flows)
  const dispatch=useDispatch()
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    dispatch(GetFlow(id));
      dispatch(GetCode(id))
    }, [id]);
    console.log('coooode',code)
    let codeValue = code;
    if (typeof code === 'object' && Object.keys(code).length === 0) {
      return <div>
      <div>no code availale yet</div>
      <CircularProgress  /></div>;
    }
    const handleDownload=(id)=>{
       dispatch(DownloadCode(id))
   }
   const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  
   console.log('fiiiiiiiiiiiile',file)
  
  return (
    
    <React.Fragment>
    {loader ?
      <CircularProgress  />:
      <>
      <Controlled
    value={codeValue}
    options={{
      mode: 'java', // Remplacez par le langage de votre code
      // theme: 'default', // Choisissez un thème de votre choix
      // theme: 'material-darker',
      theme: theme === 'light' ? 'material' : 'material-darker',
      lineNumbers: true, // Display line numbers
            styleActiveLine: true, // Highlight the active line
            rulers: [{ color: '#ccc', column: 80 }], // Display a ruler at column 80
            autoRefresh: true, // Enable auto-refresh for dynamic content

    }}
    // onBeforeChange={(editor, data, value) => {
    //   // Update codeValue when the editor value changes
    //   codeValue = value;
    // }}
    onBeforeChange={() => {}}
    editorDidMount={(editor) => {
      codeMirrorRef.current = editor;
    }}
  />
     <br></br>
     <Button variant="outlined" onClick={()=>handleDownload(id)}>Send code</Button>
     <Button variant="outlined" onClick={toggleTheme}>
            Toggle Theme
          </Button>
     <CopyToClipboard text={code} onCopy={handleCopy}>
          <Button variant="outlined">
            {copied ? 'Copied!' : 'Copy code'}
          </Button>
        </CopyToClipboard>
     <Button variant="outlined" 
    //  onClick={onClose}
     >Go back</Button>
     
     </>}
    </React.Fragment>
  )
}

export default CodeGenerator
