import { Component } from 'react';
import Head from 'next/head';
import Uppy from 'uppy/lib/core';
import Dashboard from 'uppy/lib/plugins/Dashboard';
import Multipart from 'uppy/lib/plugins/Multipart';
import MetaData from 'uppy/lib/plugins/MetaData';
import Tus10 from 'uppy/lib/plugins/Tus10';

export default class extends Component {
  componentDidMount() {
    this.uppy = new Uppy({ debug: true });
    this.uppy
      .use(Dashboard, {
        target: '.dashboard',
        inline: true,
        autoProceed: true,
        showProgressDetails: true
      })
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
      .use(Tus10, { endpoint: 'http://localhost:3003/files/' })
      .run();
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="/static/uppy.css" />
        </Head>
        <h1>Dashboard</h1>
        <div className="dashboard"></div>
      </div>
    );
  }
}
