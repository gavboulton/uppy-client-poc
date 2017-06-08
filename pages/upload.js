import React, { Component } from 'react';
import Head from 'next/head';
import Uppy from 'uppy/lib/core';
import FileInput from 'uppy/lib/plugins/FileInput';
import MetaData from 'uppy/lib/plugins/MetaData';
import Tus10 from 'uppy/lib/plugins/Tus10';
import Informer from 'uppy/lib/plugins/Informer';
import PauseAll from '../plugins/PauseAll';
import File from '../plugins/File';
import ConnectionError from '../plugins/ConnectionError';

export default class extends Component {

  constructor(props) {
    super(props);

    this.endpoint = process.env.ENDPOINT || 'http://localhost:3003/files/';
  }

  componentDidMount() {
    this.uppy = new Uppy({ debug: true, autoProceed: true });
    this.uppy
      .use(FileInput, { target: '.upload', pretty: false })
      .use(MetaData, {
        fields: [
          {
            id: 'customer',
            value: 1
          },
          {
            id: 'album',
            value: 1
          },
          {
            id: 'company',
            value: 'babel'
          }
        ]
      })
      .use(Tus10, {
        endpoint: this.endpoint,
      })
      .use(PauseAll)
      .use(ConnectionError)
      .use(File)
      .use(Informer, {
        target: '.upload',
        replaceTargetContent: false
      })
      .run();
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="/static/uppy.css" />
        </Head>
        <h1>Upload</h1>
        <div className="upload"></div>
      </div>
    );
  }
}
