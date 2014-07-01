nanobar
=======

Very very lightweight progress bars (~630 bytes gzipped). No jQuery needed.

Compatibility: IE10+ and the rest of the world
(Note: works at IE7+ without animations)

## Original Demo

See [nanobar.micronube.com](http://nanobar.micronube.com)

## Usage

### Load

Link `nanobar.js` from your html file

```html
<script src="path/to/nanobar.min.js"></script>
```

### Generate progressbar

```js
var nanobar = new Nanobar( options );
```

**options**

- `bg` `<String>`: (optional) background css property, '#000' by default
- `id` `<String>`: (optional) id for **nanobar** div
- `target` `<DOM Element>`: (optional) Where to put the progress bar, **nanobar** will be fixed to top of document if `target` is `null`


### Move bar

Resize the bar with `nanobar.go(percentage)`

**arguments**

- `percentage` `<Number>` : percentage width of nanobar


## Example

Create bar

```js
var options = {
	bg: '#acf',
	// leave target blank for global nanobar
	target: document.getElementById('myDivId'),
	// id for new nanobar
	id: 'mynano'
};

var nanobar = new Nanobar( options );

//move bar
nanobar.go( 30 ); // size bar 30%

// Finish progress bar
nanobar.go(100);
```

<br><br>

---

© 2014 [jacoborus](https://github.com/jacoborus) - Released under [MIT License](https://raw.github.com/jacoborus/nanobar/master/LICENSE)
