const fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

if (!customElements.get("ha-switch") && customElements.get("paper-toggle-button")) {
  customElements.define("ha-switch", customElements.get("paper-toggle-button"));
}

const LitElement = customElements.get("hui-masonry-view") ? Object.getPrototypeOf(customElements.get("hui-masonry-view")) : Object.getPrototypeOf(customElements.get("hui-view"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;
const HELPERS = window.loadCardHelpers();

export class WeatherCardEditor extends LitElement {
  setConfig(config) {
    this._config = { ...config };
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }

  get _entity() {
    return this._config.entity || "";
  }

  get _name() {
    return this._config.name || "";
  }

  get _icons() {
    return this._config.icons || "";
  }

  get _current() {
    return this._config.current !== false;
  }

  get _details() {
    return this._config.details !== false;
  }

  get _forecast() {
    return this._config.forecast !== false;
  }

  get _hide_humidity() {
    return this._config.hide_humidity !== false;
  }

  get _hide_wind() {
    return this._config.hide_wind !== false;
  }

  get _hide_pressure() {
    return this._config.hide_pressure !== false;
  }

  get _hide_visibility() {
    return this._config.hide_visibility !== false;
  }

  get _hide_sunrise_sunset() {
    return this._config.hide_sunrise_sunset !== false;
  }

  get _hide_precipitation() {
    return this._config.hide_precipitation !== false;
  }

  get _hide_precipitation_probability() {
    return this._config.hide_precipitation_probability !== false;
  }

  get _hourly_forecast() {
    return this._config.hourly_forecast !== false;
  }

  get _number_of_forecasts() {
    return this._config.number_of_forecasts || 5;
  }

  firstUpdated() {
    HELPERS.then(help => {
      if (help.importMoreInfoControl) {
        help.importMoreInfoControl("fan");
      }
    })
  }
  
  render() {
    if (!this.hass) {
      return html``;
    }

    const entities = Object.keys(this.hass.states).filter(
      (eid) => eid.substr(0, eid.indexOf(".")) === "weather"
    );

    return html`
      <div class="card-config">
        <div>
          <paper-input
            label="Name"
            .value="${this._name}"
            .configValue="${"name"}"
            @value-changed="${this._valueChanged}">
          </paper-input>
          <paper-input
            label="Location of icons (optional)"
            .value="${this._icons}"
            .configValue="${"icons"}"
            @value-changed="${this._valueChanged}">
          </paper-input>
          ${customElements.get("ha-entity-picker")
            ? html`
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${this._entity}"
                  .configValue=${"entity"}
                  domain-filter="weather"
                  @change="${this._valueChanged}"
                  allow-custom-entity>
                  </ha-entity-picker>
              `
            : html`
                <paper-dropdown-menu
                  label="Entity (Required)"
                  @value-changed="${this._valueChanged}"
                  .configValue="${"entity"}">
                  <paper-listbox
                    slot="dropdown-content"
                    .selected="${entities.indexOf(this._entity)}">
                    ${entities.map((entity) => {
                      return html` <paper-item>${entity}</paper-item> `;
                    })}
                  </paper-listbox>
                </paper-dropdown-menu>
              `}
          <div class="switches">
            <div class="switch">
              <ha-switch
                .checked=${this._current}
                .configValue="${"current"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Show current</span>
            </div>
            <div class="switch">
              <ha-switch
                .checked=${this._details}
                .configValue="${"details"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Show details</span>
            </div>
            <div class="switch">
              <ha-switch
                .checked=${this._forecast}
                .configValue="${"forecast"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Show forecast</span>
            </div>
            <div class="switch">
              <ha-switch
                .checked=${this._hourly_forecast}
                .configValue="${"hourly_forecast"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Show hourly forecast</span>
            </div>
          </div>
          <paper-input
            label="Number of forecast fields"
            type="number"
            min="1"
            max="8"
            value=${this._number_of_forecasts}
            .configValue="${"number_of_forecasts"}"
            @value-changed="${this._valueChanged}">
          </paper-input>
          <div class="switches">
            <div class="switch">
              <ha-switch
                .checked=${this._hide_humidity}
                .configValue="${"hide_humidity"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Hide humidity</span>
            </div>
            <div class="switch">
              <ha-switch
                .checked=${this._hide_wind}
                .configValue="${"hide_wind"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Hide wind</span>
            </div>
            <div class="switch">
              <ha-switch
                .checked=${this._hide_pressure}
                .configValue="${"hide_pressure"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Hide pressure</span>
            </div>
            <div class="switch">
              <ha-switch
                .checked=${this._hide_visibility}
                .configValue="${"hide_visibility"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Hide visibility</span>
            </div>
          </div>
          <div class="switches">
            <div class="switch">
              <ha-switch
                .checked=${this._hide_precipitation}
                .configValue="${"hide_precipitation"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Hide precipitation</span>
            </div>
            <div class="switch">
              <ha-switch
                .checked=${this._hide_precipitation_probability}
                .configValue="${"hide_precipitation_probability"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Hide precipitation probability</span>
            </div>
            <div class="switch">
              <ha-switch
                .checked=${this._hide_sunrise_sunset}
                .configValue="${"hide_sunrise_sunset"}"
                @change="${this._valueChanged}">
              </ha-switch>
              <span>Hide sunrise/sunset times</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === "") {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]:
            target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }

  static get styles() {
    return css`
      .switches {
        margin: 8px 0;
        display: flex;
        justify-content: space-between;
      }
      .switch {
        display: flex;
        align-items: center;
        justify-items: center;
      }
      .switches span {
        padding: 0 16px;
      }
    `;
  }
}

customElements.define("pb-weather-card-editor", WeatherCardEditor);
