# xkcd Comics App

This app displays last 10 xkcd comics fetched through API and enlarges them once clicked.

# API

The used API can be found at [https://xkcd.com/json.html](https://xkcd.com/json.html)

current comic endpoint: `https://xkcd.com/info.0.json`
endpoint of comic number 614: `https://xkcd.com/614/info.0.json`

example response body:

```
{
    month: "1",
    num: 2262,
    link: "",
    year: "2020",
    news: "",
    safe_title: "Parker Solar Probe",
    transcript: "",
    alt: "It will get within 9 or 10 Sun-diameters of the "bottom" (the Sun's surface) which seems pretty far when you put it that way, but from up here on Earth it's practically all the way down.",
    img: "https://imgs.xkcd.com/comics/parker_solar_probe.png",
    title: "Parker Solar Probe",
    day: "31"
}
```

**Note!** Current API does not support returning multiple comics at once, only one at a time. If we would own the API and multiple comics would be wanted to fetch at once, it might make sense to add new endpoint to API that returns n last comics at once in one API call instead of concurrently requesting them separately on the client.

To figure out the `num`s (IDs) of last 10 comics, you have to first request the `num` (ID) of current comic. After this previous 9 comics can be requested. Comics will be displayed once all 10 comics have been loaded.

# axios

To fetch data, this app uses [axios](https://github.com/axios/axios). To fetch multiple comics at once we use `Promise.all()` method. This method returns a single promise object that resolves only when all arguments passed as an array have resolved.

## Pages

The app uses vue-router in hash mode to navigate between front page `/` and single comic page that is defined based on comic number e.g. `/614`. Users can also share single comic pages.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### run with `start.sh`script

- Go to the root of this file
- Make the script executable with command `chmod +x start.sh`.
- Run the script using `./start.sh`.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
