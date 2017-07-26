import React from 'react';
import ReactDOM from 'react-dom';
import FileDragAndDrop from 'react-file-drag-and-drop';



class App extends React.Component {
  constructor (props){
    super(props);

    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.handleDragDropPreventDefault = this.handleDragDropPreventDefault.bind(this);
  }


  handleDragDropPreventDefault(e){
    e = e || event;
    e.preventDefault();
  }


  componentDidMount(){
    // Only want to handle drop when on designated drop zone... Prevent browser
    // from navigating to dropped image/file by preventing default event handler.
    window.addEventListener("dragover",this.handleDragDropPreventDefault,false);
    window.addEventListener("drop",this.handleDragDropPreventDefault,false);
  }

  componentWillUnmount() {
    // On unmount of our component, remove the event listeners
    window.removeEventListener("dragover",this.handleDragDropPreventDefault,false);
    window.removeEventListener("drop",this.handleDragDropPreventDefault,false);
  }


  handleFileSelect() {
    var input = document.querySelector('input[type="file"]');
    var image = document.querySelector('img');

    var data = new FormData();
    data.append('file', input.files[0]);
    data.append('user', 'hubot');

    var myHeaders = new Headers();
    myHeaders.append('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE0ODc5NjA5Nzl9.qO856Cwwlzs2zpDYSXthApAKo5VpVafc5DHDLSV9Hho');
    //console.log('HHHHHHHHH', myHeaders.getAll('jwt'));

    console.log('input.files[0]', input.files[0]);


    if (input.files.length > 0) {
      // POST to server when server is ready....
      //fetch('http://localhost:8000/upload', { method: 'POST',  mode: 'no-cors', credentials: 'same-origin', headers: myHeaders, body: data });

    // show preview of selected file
    const reader = new FileReader();

    // set up FileReader to update the image tag with the selected file
    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        // console.log('e.target.result', e.target);
        image.src = e.target.result;
    };


    // read the image file as a data URL.
    // console.log('input.files[0]', input.files[0]);
    reader.readAsDataURL(input.files[0]);

    }
  }

  handleFileDrop(data) {
    console.log('DATA DROPPED', data);


    var input = document.querySelector('input[type="file"]');

    input.files=data.files;
  }

  render() {

      return (
      <div className="appWrapper" style={{display: "flex", flexDirection: "column"}}
      onDrop={(e)=>{e.preventDefault()}}>
        <div style={{width: '400px', height: '100px'}}>
          <FileDragAndDrop onDrop={this.handleFileDrop} >
            Drop File here...
          </FileDragAndDrop>
        </div>
        <div style={{width:'400px', height: '200px',background: 'orange'}}>
          <input name="myFile" type="file" onChange={this.handleFileSelect} />
          <img id="image" ref="image" style={{maxHeight: '40px', maxWidth:'40px'}}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
