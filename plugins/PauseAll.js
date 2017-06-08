import Plugin from 'uppy/lib/plugins/Plugin';
import html from 'yo-yo';

export default class PauseAll extends Plugin {
  constructor(core, opts) {
    super(core, opts);
    this.id = 'PauseAll';
    this.title = 'PauseAll';
    this.type = 'control';

    const defaultOptions = {
      replaceTargetContent: false,
      target: '.upload'
    }

    this.opts = Object.assign({}, defaultOptions, opts);

    this.render = this.render.bind(this);
    this.pauseAll = this.pauseAll.bind(this);
  }

  pauseAll() {
    // This only works the main upload of the file has started,
    // so after the initial POST/HEAD request used to create/resume a tus upload

    // I've opened https://github.com/tus/tus-js-client/pull/76 as a possible solution
    this.core.emit('core:pause-all');

    this.core.emit('informer', 'All uploads paused', 'info', 5000);
  }

  render() {
    return html`
      <button onclick=${this.pauseAll}>Pause all uploads</button>
    `;
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
