class GradualBlur {
  static PRESETS = {
    top: { position: 'top', height: '6rem' },
    bottom: { position: 'bottom', height: '6rem' },
    left: { position: 'left', height: '6rem' },
    right: { position: 'right', height: '6rem' },
    subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
    intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
    smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
    sharp: { height: '5rem', curve: 'linear', divCount: 4 },
    header: { position: 'top', height: '8rem', curve: 'ease-out' },
    footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
    sidebar: { position: 'left', height: '6rem', strength: 2.5 },
    'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
    'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
  };

  static CURVE_FUNCTIONS = {
    linear: p => p,
    bezier: p => p * p * (3 - 2 * p),
    'ease-in': p => p * p,
    'ease-out': p => 1 - Math.pow(1 - p, 2),
    'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
  };

  static DEFAULT_CONFIG = {
    position: 'bottom',
    strength: 2,
    height: '6rem',
    divCount: 5,
    exponential: false,
    zIndex: 1000,
    animated: false,
    duration: '0.3s',
    easing: 'ease-out',
    opacity: 1,
    curve: 'linear',
    responsive: false,
    target: 'parent',
    className: '',
    style: {}
  };

  constructor(element, config = {}) {
    this.element = element;
    this._isHovered = false;
    this._observer = null;
    this._resizeHandler = null;
    this._isVisible = true;

    const presetConfig = config.preset && GradualBlur.PRESETS[config.preset]
      ? GradualBlur.PRESETS[config.preset]
      : {};

    this.config = { ...GradualBlur.DEFAULT_CONFIG, ...presetConfig, ...config };

    this._responsiveValue = {
      height: this.config.height,
      width: this.config.width
    };

    this._init();
  }

  _getGradientDirection(position) {
    const directions = {
      top: 'to top',
      bottom: 'to bottom',
      left: 'to left',
      right: 'to right'
    };
    return directions[position] || 'to bottom';
  }

  _debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  _calculateResponsive() {
    if (!this.config.responsive) return;
    const w = window.innerWidth;
    const keys = ['height', 'width'];
    keys.forEach(key => {
      let v = this.config[key];
      if (w <= 480 && this.config[`mobile${key.charAt(0).toUpperCase() + key.slice(1)}`])
        v = this.config[`mobile${key.charAt(0).toUpperCase() + key.slice(1)}`];
      else if (w <= 768 && this.config[`tablet${key.charAt(0).toUpperCase() + key.slice(1)}`])
        v = this.config[`tablet${key.charAt(0).toUpperCase() + key.slice(1)}`];
      else if (w <= 1024 && this.config[`desktop${key.charAt(0).toUpperCase() + key.slice(1)}`])
        v = this.config[`desktop${key.charAt(0).toUpperCase() + key.slice(1)}`];
      this._responsiveValue[key] = v;
    });
  }

  _getEffective(key) {
    return this.config.responsive ? (this._responsiveValue[key] || this.config[key]) : this.config[key];
  }

  _buildBlurLayers() {
    const config = this.config;
    const divs = [];
    const increment = 100 / config.divCount;
    const currentStrength = this._isHovered && config.hoverIntensity
      ? config.strength * config.hoverIntensity
      : config.strength;

    const curveFunc = GradualBlur.CURVE_FUNCTIONS[config.curve] || GradualBlur.CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = this._getGradientDirection(config.position);

      const div = document.createElement('div');
      div.style.cssText = `
        position: absolute;
        inset: 0;
        mask-image: linear-gradient(${direction}, ${gradient});
        -webkit-mask-image: linear-gradient(${direction}, ${gradient});
        backdrop-filter: blur(${blurValue.toFixed(3)}rem);
        -webkit-backdrop-filter: blur(${blurValue.toFixed(3)}rem);
        opacity: ${config.opacity};
        ${config.animated && config.animated !== 'scroll'
          ? `transition: backdrop-filter ${config.duration} ${config.easing};`
          : ''}
      `;
      divs.push(div);
    }
    return divs;
  }

  _getContainerStyle() {
    const config = this.config;
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const style = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };

    if (this._animated && !this._isVisible) {
      style.opacity = 0;
    }

    if (isVertical) {
      style.height = this._getEffective('height');
      style.width = this._getEffective('width') || '100%';
      style[config.position] = '0';
      style.left = '0';
      style.right = '0';
    } else if (isHorizontal) {
      style.width = this._getEffective('width') || this._getEffective('height');
      style.height = '100%';
      style[config.position] = '0';
      style.top = '0';
      style.bottom = '0';
    }

    return style;
  }

  _applyContainerStyle() {
    const style = this._getContainerStyle();
    for (const [key, value] of Object.entries(style)) {
      if (typeof value === 'number') {
        this._container.style[key] = value;
      } else {
        this._container.style[key] = value;
      }
    }
  }

  _render() {
    this._destroyInner();

    this._container = document.createElement('div');
    const isPageTarget = this.config.target === 'page';
    this._container.className = `gradual-blur ${isPageTarget ? 'gradual-blur-page' : 'gradual-blur-parent'} ${this.config.className}`;

    this._applyContainerStyle();

    if (this.config.animated && this.config.animated !== 'scroll') {
      this._container.style.opacity = '0';
    }

    const inner = document.createElement('div');
    inner.className = 'gradual-blur-inner';
    inner.style.cssText = 'position: relative; width: 100%; height: 100%;';

    const layers = this._buildBlurLayers();
    layers.forEach(layer => inner.appendChild(layer));

    this._container.appendChild(inner);
    this.element.appendChild(this._container);
  }

  _destroyInner() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._container = null;
  }

  _setupHover() {
    if (!this.config.hoverIntensity) return;
    this._container.addEventListener('mouseenter', () => {
      this._isHovered = true;
      this._rerender();
    });
    this._container.addEventListener('mouseleave', () => {
      this._isHovered = false;
      this._rerender();
    });
  }

  _rerender() {
    const inner = this._container.querySelector('.gradual-blur-inner');
    if (inner) {
      inner.innerHTML = '';
      const layers = this._buildBlurLayers();
      layers.forEach(layer => inner.appendChild(layer));
    }
  }

  _setupScrollReveal() {
    if (this.config.animated !== 'scroll') {
      this._isVisible = true;
      return;
    }

    this._isVisible = false;
    this._observer = new IntersectionObserver(
      ([entry]) => {
        this._isVisible = entry.isIntersecting;
        if (this._container) {
          this._container.style.opacity = this._isVisible ? '1' : '0';
        }
        if (this._isVisible && this.config.onAnimationComplete) {
          const ms = parseFloat(this.config.duration) * 1000;
          setTimeout(() => this.config.onAnimationComplete(), ms);
        }
      },
      { threshold: 0.1 }
    );
    this._observer.observe(this.element);
  }

  _setupResponsive() {
    if (!this.config.responsive) return;
    const handler = this._debounce(() => {
      this._calculateResponsive();
      this._applyContainerStyle();
      this._rerender();
    }, 100);
    this._resizeHandler = handler;
    window.addEventListener('resize', handler);
    this._calculateResponsive();
  }

  _init() {
    this._calculateResponsive();
    this._render();
    this._setupHover();
    this._setupScrollReveal();
    this._setupResponsive();

    if (this.config.animated && this.config.animated !== 'scroll') {
      requestAnimationFrame(() => {
        this._container.style.transition = `opacity ${this.config.duration} ${this.config.easing}`;
        this._container.style.opacity = '1';
      });
    }
    if (this.config.animated === 'scroll') {
      this._container.style.opacity = '0';
    }
  }

  update(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this._destroyInner();
    this._render();
    this._setupHover();
    if (this.config.animated === 'scroll') {
      this._container.style.opacity = '0';
    }
  }

  destroy() {
    this._destroyInner();
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
      this._resizeHandler = null;
    }
  }
}
