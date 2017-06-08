import Plugin from 'uppy/lib/plugins/Plugin';
import html from 'yo-yo';

export default class ConnectionError extends Plugin {
  constructor(core, opts) {
    super(core, opts);
    this.id = 'ConnectionError';
    this.name = 'ConnectionError';
    this.type = 'notification';

    const defaultOptions = {
      replaceTargetContent: false,
      target: '.upload'
    };

    this.opts = { ...defaultOptions, opts };
    this._connectionError = false;

    this.render = this.render.bind(this);
    this.handleError = this.handleError.bind(this);

    this.core.on('core:upload-error', this.handleError);
  }

  handleError() {
    this._connectionError = true;
    this.render();
  }

  render() {
    if (this._connectionError) {
      return html`<div style="padding-top: 20px;">Connection error</div>`;
    }
    return html`<div></div>`;
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
