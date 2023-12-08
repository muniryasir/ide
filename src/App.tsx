import React, { useState } from 'react';

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
import Textarea from '@mui/joy/Textarea';

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
    const [example, setExample] = useState('')
    const [code, setCode] = useState('')
    const [result, setResult] = useState('')

    //     this.onChange = this.onChange.bind(this);
    // }

    // const onChange= (newValue) => () => {
    //     console.log('change', newValue);
    //     code = newValue;
    // }

    function onChange(newValue) {
      console.log("change", newValue);
      setCode(newValue);
      setExample(newValue);
    }
    // EvaluatePython () {

    const handleClick = (value) => () => {
      console.log(value);
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
        
         runPython(code)
        
        // setResult(JSON.stringify(isLoading || isRunning)+'-'+JSON.stringify(isLoading)+'-'+JSON.stringify(isLoading))
          // console.log(res);
       
        let output = ` 
          Output
          ${stdout}
          Error
          ${stderr}
                  `
          setResult(output);
          
          
        

      } else if (value=="clear") {
        setExample('')
        // this.setState({
        //   outputResult: "",
        // });
      }
      
    };
 
    const handleItemClick = (value) => () => {
      // alert(value)
      if(value == "1") {
        let primenumbers = 
`
# Program to check if a number is prime or not

num = 29

# To take input from the user
#num = int(input("Enter a number: "))

# define a flag variable
flag = False

if num == 1:
    print(num, "is not a prime number")
elif num > 1:
  # check for factors
  for i in range(2, num):
      if (num % i) == 0:
          # if factor is found, set flag to True
          flag = True
          # break out of loop
          break

  # check if flag is True
  if flag:
      print(num, "is not a prime number")
  else:
      print(num, "is a prime number")
`
        setExample(primenumbers)
        setCode(primenumbers)
      } else if(value == '2') {
        let factoralNumber = 
        `
# Python program to find the factorial of a number provided by the user.

# change the value for a different result
num = 7

# To take input from the user
#num = int(input("Enter a number: "))

factorial = 1

# check if the number is negative, positive or zero
if num < 0:
   print("Sorry, factorial does not exist for negative numbers")
elif num == 0:
   print("The factorial of 0 is 1")
else:
   for i in range(1,num + 1):
       factorial = factorial*i
   print("The factorial of",num,"is",factorial)
        `
        setExample(factoralNumber)
        setCode(factoralNumber)
      } else if(value == '3') {
        let matrixMultiplication = 
        `
# Program to multiply two matrices using nested loops

# 3x3 matrix
X = [[12,7,3],
    [4 ,5,6],
    [7 ,8,9]]
# 3x4 matrix
Y = [[5,8,1,2],
    [6,7,3,0],
    [4,5,9,1]]
# result is 3x4
result = [[0,0,0,0],
         [0,0,0,0],
         [0,0,0,0]]

# iterate through rows of X
for i in range(len(X)):
   # iterate through columns of Y
   for j in range(len(Y[0])):
       # iterate through rows of Y
       for k in range(len(Y)):
           result[i][j] += X[i][k] * Y[k][j]

for r in result:
   print(r)

        `
        setExample(matrixMultiplication)
        setCode(matrixMultiplication)
      }
    }

      

    
        return (
           
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
            <Grid xs={12}>
              <span> Python IDE with interpretor</span>
            </Grid>
              <Grid xs="auto">
               <Stack direction="row" spacing={2}>
                  <Item onClick={handleItemClick('1')}>Example 1</Item>
                  <Item onClick={handleItemClick('2')}>Example 2 </Item>
                  <Item onClick={handleItemClick('3')}>Example 3</Item>
                </Stack>
              <AceEditor
                    mode="python"
                    theme="ambiance"
                    onChange={onChange}
                    value={example}
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
                  
                  disabled={isLoading || isRunning}
                  >{!isRunning ? 'Run' : 'Running...'}</Button>
                  <Button variant="contained" onClick={handleClick('clear')}>Clear</Button>
                </Stack>
              </Grid>
              <Grid xs>
              {/* <Textarea placeholder="Type anything…" 
              defaultValue={result}
              /> */}
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

