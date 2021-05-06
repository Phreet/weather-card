# PB - Weather card

Originally created for the [old UI](https://community.home-assistant.io/t/custom-ui-weather-state-card-with-a-question/23008) converted by @arsaboo and @ciotlosm to [Lovelace](https://community.home-assistant.io/t/custom-ui-weather-state-card-with-a-question/23008/291) and now converted to Lit to make it even better. In latest addition, renamed to PB - Weather card and updated with new animations.

This card uses the awesome [animated SVG weather icons by amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/).

![Weather Card](https://github.com/bramkragten/custom-ui/blob/master/weather-card/weather-card.gif?raw=true)

## Configuration

And add a card with type `custom:pb-weather-card`:

```yaml
type: custom:pb-weather-card
entity: weather.yourweatherentity
name: Optional name
```

You can choose which elements of the weather card you want to show:

The 3 different rows, being:

- The current weather icon, the current temperature and title
- The details about the current weather
- The X day forecast or hourly forecast

```yaml
type: custom:pb-weather-card
entity: weather.yourweatherentity
name: Optional name
current: true
details: false
forecast: true
hourly_forecast: false
number_of_forecasts: 5
hide_humidity: false
hide_wind: false
hide_precipitation: true
hide_precipitation_probability: true
hide_pressure: false
hide_visibility: false
hide_sunrise_sunset: false
```

If you want to show the sunrise and sunset times, make sure the `sun` component is enabled:

```yaml
# Example configuration.yaml entry
sun:
```
