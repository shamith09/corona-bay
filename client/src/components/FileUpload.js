import React, { Fragment, useState } from 'react';
import Message from './Message';
import axios from 'axios';

const FileUpload = ({ setStatus }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [result, setResult] = useState("");

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/detection', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          axios.post('/api/get-detection-results', { id: res.data}, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              setResult(res.data);
              //console.log(res.data)
            })
        })

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
     console.log(err)
    }
  };

  const getResult = () => {
    if(result === 1) return "The CT scan was positive";
    else if(result === 0) return "The CT scan was negative";
    else if(result === "") return ""
    else return "An error has occurced" 
  }

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
      <h1> {getResult()} </h1>
    </Fragment>
  );
}

export default FileUpload;
