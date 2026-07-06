class GlassIcons {
  static gradientMapping = {
    blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
    purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
    red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
    indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
    orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
    green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'
  };

  static icons = {
    fileText:
      '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    book:
      '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    heart:
      '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    cloud:
      '<svg viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>',
    edit:
      '<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    barChart:
      '<svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    music:
      '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    code:
      '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    user:
      '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    settings:
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    camera:
      '<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>'
  };

  constructor(container, items = [], className = '') {
    this.container = container;
    this.items = items;
    this.className = className;
    this._render();
  }

  _getBackgroundStyle(color) {
    if (GlassIcons.gradientMapping[color]) {
      return { background: GlassIcons.gradientMapping[color] };
    }
    return { background: color };
  }

  _getIconSVG(icon) {
    if (typeof icon === 'string') {
      return GlassIcons.icons[icon] || icon;
    }
    return icon;
  }

  _render() {
    const wrapper = document.createElement('div');
    wrapper.className = `icon-btns${this.className ? ' ' + this.className : ''}`;

    this.items.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = `icon-btn${item.customClass ? ' ' + item.customClass : ''}`;
      btn.setAttribute('aria-label', item.label);
      btn.setAttribute('type', 'button');

      const back = document.createElement('span');
      back.className = 'icon-btn__back';
      const bg = this._getBackgroundStyle(item.color);
      back.style.background = bg.background;

      const front = document.createElement('span');
      front.className = 'icon-btn__front';

      const iconSpan = document.createElement('span');
      iconSpan.className = 'icon-btn__icon';
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.innerHTML = this._getIconSVG(item.icon);

      front.appendChild(iconSpan);

      const label = document.createElement('span');
      label.className = 'icon-btn__label';
      label.textContent = item.label;

      btn.appendChild(back);
      btn.appendChild(front);
      btn.appendChild(label);

      wrapper.appendChild(btn);
    });

    this.container.appendChild(wrapper);
  }
}
