import React from 'react';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';

// Import a Mode (language)
import 'brace/mode/python';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/ambiance';

export default class App extends React.Component {

    constructor(props: {}, context: any) {
        super(props, context);
        
        this.onChange = this.onChange.bind(this);
    }

    onChange(newValue: any) {
        console.log('change', newValue);
    }

    render() {
        return (
            <div>
                <AceEditor
                    mode="python"
                    theme="ambiance"
                    onChange={this.onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}
                    style={{width: "400px"}}
                />
            </div>
        );
    }
}
