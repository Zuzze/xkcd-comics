# :nerd_face: xkcd Comics App

This app displays last 10 xkcd comics fetched through API and enlarges them once clicked.

# API

The used API can be found at [https://xkcd.com/json.html](https://xkcd.com/json.html)

- current comic endpoint: `https://xkcd.com/info.0.json`
- endpoint of comic number 614: `https://xkcd.com/614/info.0.json`

example response body for `/614`:

```
{
   month: "7",
   num: 614,
   link: "",
   year: "2009",
   news: "",
   safe_title: "Woodpecker",
   transcript: "[[A man with a beret and a woman are standing on a boardwalk, leaning on a handrail.]] Man: A woodpecker! <<Pop pop pop>> Woman: Yup. [[The woodpecker is banging its head against a tree.]] Woman: He hatched about this time last year. <<Pop pop pop pop>> [[The woman walks away. The man is still standing at the handrail.]] Man: ... woodpecker? Man: It's your birthday! Man: Did you know? Man: Did... did nobody tell you? [[The man stands, looking.]] [[The man walks away.]] [[There is a tree.]] [[The man approaches the tree with a present in a box, tied up with ribbon.]] [[The man sets the present down at the base of the tree and looks up.]] [[The man walks away.]] [[The present is sitting at the bottom of the tree.]] [[The woodpecker looks down at the present.]] [[The woodpecker sits on the present.]] [[The woodpecker pulls on the ribbon tying the present closed.]] ((full width panel)) [[The woodpecker is flying, with an electric drill dangling from its feet, held by the cord.]] {{Title text: If you don't have an extension cord I can get that too. Because we're friends! Right?}}",
   alt: "If you don't have an extension cord I can get that too. Because we're friends! Right?",
   img: "https://imgs.xkcd.com/comics/woodpecker.png",
   title: "Woodpecker",
   day: "24"
}
```

**Note** Current API does not support returning multiple comics at once, only one at a time. If we would own the API and multiple comics would be wanted to fetch at once, it might make sense to add new endpoint to API that returns n last comics at once in one API call instead of concurrently requesting them separately on the client.

To figure out the `num`s (IDs) of last 10 comics, you have to first request the `num` (ID) of current comic. After this previous 9 comics can be requested. Comics will be displayed once all 10 comics have been loaded. Loading state is observed in store and loading spinner is displayed during loading for the user.

### axios

To fetch data, this app uses [axios](https://github.com/axios/axios). To fetch multiple comics at once we use `Promise.all()` method. This method returns a single promise object that resolves only when all arguments passed as an array have resolved.

# Pages

The app uses vue-router in hash mode to navigate between front page `/` and single comic page that is defined based on comic number e.g. `/614`. Users can also share single comic pages.

# Project setup

```
git clone https://github.com/Zuzze/xkcd-comics.git
```

```
cd xkcd-comics
```

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
