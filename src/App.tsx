import React from 'react';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';
import { jsPython } from 'jspython-interpreter';
// Import a Mode (language)
import 'brace/mode/python';
import 'ace-builds/src-noconflict/ace';

// // Import a Theme (okadia, github, xcode etc)
import 'brace/theme/ambiance';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { usePython } from 'react-py';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface MyState {
  outputResult: string;
}
var code = "";
// var outputResult = "asd"



// export default class App extends React.Component<{}, MyState> {
  export default function App() {
  

    // constructor(props: {}, context: any) {
    //     super(props, context);
    //     this.state = {
    //       outputResult: '',
    //   };
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython()


    //     this.onChange = this.onChange.bind(this);
    // }

    // const onChange= (newValue) => () => {
    //     console.log('change', newValue);
    //     code = newValue;
    // }
    var code = ''
    function onChange(newValue) {
      console.log("change", newValue);
      code = newValue;
    }
    // EvaluatePython () {

    const handleClick = (value) => () => {
      console.log(code);
      // this.evaluatePython(code);
      // const [userInput, setUserInput] = React.useState("asd");
      // const [outputResult, setOutput] = React.useState("asd");
      const script = `
      x = [1, 2, 3]
      if 1 in x:
        print('1 present')
      `;

      if(value == "evaluate") {
        runPython(code);
      } else if (value=="clear") {
        // this.setState({
        //   outputResult: "",
        // });
      }
      
    };
 
      

    
        return (
           
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid xs="auto">
              <AceEditor
                    mode="python"
                    theme="ambiance"
                    onChange={onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}
                    style={{width: "600px"}}
                />
              </Grid>
              <Grid xs="auto">
                <Stack direction="column" spacing={2}>
                  <Button variant="contained" onClick={handleClick('evaluate')}
                  
                  // disabled={isLoading || isRunning}
                  >{!isRunning ? 'Run' : 'Running...'}</Button>
                  <Button variant="contained" onClick={handleClick('clear')}>Clear</Button>
                </Stack>
              </Grid>
              <Grid xs>
                <TextField
                    id="filled-multiline-static"
                    label="Output"
                    multiline
                    rows={4}
                    value={stdout}
                    defaultValue="Default Value"
                    variant="filled"
                  />
                    <p>Output</p>
                      <pre>
                        <code>{stdout}</code>
                      </pre>
                      <p>Error</p>
                      <pre>
                        <code>{stderr}</code>
                      </pre>
              </Grid>
            </Grid>
          </Box>
        );
        
    }

