import Plugin from 'uppy/lib/plugins/Plugin';
import html from 'yo-yo';

export default class File extends Plugin {
  constructor(core, opts) {
    super(core, opts);
    this.id = 'File';
    this.title = 'File';
    this.type = 'control';

    const defaultOptions = {
      replaceTargetContent: false,
      target: '.upload'
    };

    this.opts = { ...defaultOptions, opts };

    this.render = this.render.bind(this);
    this.pauseUpload = this.pauseUpload.bind(this);
  }

  pauseUpload(fileID) {
    this.core.emit('core:upload-pause', fileID);
  }

  render() {
    const files = this.core.getState().files;
    const fileDisplay = Object.keys(files).map((f) => {
      const file = files[f];
      return (
        html`
          <div>
            <button onclick=${() => this.pauseUpload(file.id)}>Pause</button>
            ${file.preview && html`<div><img src=${file.preview} alt="" /></div>`}
          </div>
        `
      );
    });
    return (
      html`
        <div>
          <h2>Files</h2>
          ${fileDisplay && fileDisplay.map(item => item)}
        </div>
      `
    );
  }

  install() {
    const target = this.opts.target;
    const plugin = this;
    this.target = this.mount(target, plugin);
  }

  uninstall() {
    this.unmount();
  }
}
