import React,{useState,useRef,useEffect} from 'react'
import { useSelector } from 'react-redux';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/mode/groovy/groovy'
import 'codemirror/addon/display/rulers';
import { Controlled } from 'react-codemirror2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/display/rulers';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/match-highlighter';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import CircularProgress from '@mui/material/CircularProgress';
import Swipeable from '../../components/swipeable';
import ShareCode from '../codePen/ShareCode'
function Editor(props) {
  
  //-------------------------------------drawer----------------------------------------------------------
  const [state, setState] =useState({right: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const onClose=()=>{
    setState({ ...state, 'right': false });
  }
  //-------------------------------------drawer---------------------------------------------------------
  // const {id}=useParams()
  const { loader, code } = useSelector((state) => state.flows);
  const codeMirrorRef = useRef(null);
  const [codeValue, setCodeValue] = useState('');
  const markDriverKeyword = () => {
    if (codeMirrorRef.current) {
      const cursor = codeMirrorRef.current.getSearchCursor('driver');
      const clicking = codeMirrorRef.current.getSearchCursor('click');
      const newword = codeMirrorRef.current.getSearchCursor('new');
      const importation = codeMirrorRef.current.getSearchCursor('import');
      const cap = codeMirrorRef.current.getSearchCursor('cap');
      while (cursor.findNext()) {
        codeMirrorRef.current.markText(
          cursor.from(),
          cursor.to(),
          { className: 'driver-keyword' } // Custom CSS class for styling
        );
      }
      while (clicking.findNext()) {
        codeMirrorRef.current.markText(
          clicking.from(),
          clicking.to(),
          { className: 'driver-keyword' } // Custom CSS class for styling
        );
      }
      while (newword.findNext()) {
        codeMirrorRef.current.markText(
          newword.from(),
          newword.to(),
          { className: 'new-keyword' } // Custom CSS class for styling
        );
      }
      while (cap.findNext()) {
        codeMirrorRef.current.markText(
          cap.from(),
          cap.to(),
          { className: 'new-keyword' } // Custom CSS class for styling
        );
      }
      while (importation.findNext()) {
        codeMirrorRef.current.markText(
          importation.from(),
          importation.to(),
          { className: 'new-keyword' } // Custom CSS class for styling
        );
      }
    }
  };
  
useEffect(() => {
  setCodeValue(code);
 
}, [code]);

useEffect(() => {
  markDriverKeyword();
}, [codeValue]);

    // console.log('coooode',code)

  const [copied, setCopied] = useState(false);
    const [theme, setTheme] = useState('dark');
    if (typeof codeValue === 'object' && Object.keys(codeValue).length === 0) {
      return <div>
      <div>no code availale yet</div>
      <CircularProgress  /></div>;
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
    const {
        language,
        displayName,
        onChange
    }=props
    const handleChange=(editor,data,codeValue)=>{
         onChange(codeValue)
        setCodeValue(codeValue);

    }
    const HandleShare=()=>{
      setState({ ...state, 'right': true })
      props.HandleClose()
    }
  return (
    <>
    
    {loader ?
      <CircularProgress  />:
      <>
    <div className='editor-container' >
      <div className='editor-title'>
      {displayName}
      <div >
      <IconButton style={{ color: '#fff' }} onClick={toggleTheme}>
      <DarkModeOutlinedIcon/></IconButton>
      <IconButton style={{ color: '#fff' }} onClick={HandleShare}><ShareIcon/></IconButton>
      <CopyToClipboard text={code} onCopy={handleCopy}>
      <IconButton style={{ color: '#fff' }}>
        {copied ? (
          <FileCopyRoundedIcon variant="outlined" />
        ) : (
          <ContentCopyIcon variant="outlined" />
        )}
      </IconButton>
    </CopyToClipboard>
      </div>
      </div>
      <Controlled
      onBeforeChange={handleChange}
      value={codeValue}
      className='code-mirror-wrapper'
      options={
        {
            lineWrapping:true,
            lint:true,
            mode:language,
            theme: theme === 'light' ? 'material' : 'material-darker',
            lineNumbers:true,
            //  styleActiveLine: true, // Highlight the active line
            // rulers: [{ color: '#ccc', column: 80 }], // Display a ruler at column 80
            autoRefresh: true, // Enable auto-refresh for dynamic content

        }

      }
      editorDidMount={(editor) => {
        codeMirrorRef.current = editor;
      }}
      >
      </Controlled>
    </div>
    </>}
    <Swipeable key='right'
    open={state['right']} 
    anchor='right'
    onClose={onClose}>
    <ShareCode onClose={onClose} codeValue={codeValue}/>
    </Swipeable>
    </>
  )
}

export default Editor
