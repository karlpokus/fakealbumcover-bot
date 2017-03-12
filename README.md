# fakealbumcover-bot
A bot for [r/fakealbumcovers](https://www.reddit.com/r/fakealbumcovers/). A work in progress.

# test
Note: Requires a flickr api key in `process.env.FLICKR_API_KEY` or `settings.json` placed in root.
```
$ git clone [repo]
$ npm test
```

# [the Rules](http://i.imgur.com/tbVr3WT.jpg)
- band name from https://en.wikipedia.org/wiki/Special:Random
- album title from https://en.wikiquote.org/wiki/Special:Random
- 5th img from https://www.flickr.com/explore/interesting/7days/

# Todos
- [x] get text data
- [x] get img
- [x] crop img to square
- [x] send data to client
- [x] [adjust canvas ppi](http://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas)
- [x] apply band name
- [ ] apply album title
- [ ] share url
- [ ] ?
- [ ] profit

# Licence
MIT
