# deep-sync

Recursively synchronizes two JSON / Javascript objects where the target becomes the source, without changing the target values for the keys that it has in common with the source.
If overwrite option is passed, existent keys will be overwritten as well.
Keys that exist in the target but not in the source will be removed from the dict.

# method

```
var deepSync = require('deep-sync')
deepSync(target, source, overwrite)
```

# example

```
var baseObj = {a: 1, b:2, c:3, d: { e:4 }}
var target = {a:1, b:1}

deepSync(target, baseObj, false)
// {a:1, b:1, c:3, d: { e:4 }}

deepSync(target, baseObj, true)
// {a:1, b:2, c:3, d: { e:4 }}
```

# error handling
Throws an error of instance TypeError for invalid input

```
try {
deepSync(a,b)
} catch (e) {
  if (e instanceof TypeError) {
    console.log('Invalid objects')
  }
}
```

# install

With npm do:

```
npm install deep-sync
```

# test

With npm do:

```
npm test
```

# license

MIT.
