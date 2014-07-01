/* 
	Original code: http://nanobar.micronube.com/  ||  https://github.com/jacoborus/nanobar/    MIT LICENSE
	Edited by: UOL <gpaes@uolinc.com> to support css3 animations
*/
var Nanobar = (function () {

	'use strict';

	// support css3 animation
	// @Author: Axel Jack Fuchs (Cologne, Germany)
	// https://gist.github.com/jackfuchs/556448
	var cssAnimation = (function(p, rp) {
		var b = document.body || document.documentElement,
				s = b.style;

		// No css support detected
		if(typeof s == 'undefined') { return false; }

		// Tests for standard prop
		if(typeof s[p] == 'string') { return rp ? p : true; }

		// Tests for vendor specific prop
		var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms', 'Icab'],
				p = p.charAt(0).toUpperCase() + p.substr(1);

		for(var i=0; i<v.length; i++) {
			if(typeof s[v[i] + p] == 'string') { return rp ? (v[i] + p) : true; }
		}

		return false;
	})('transition', true);

	var addCss, setAnim, Bar, Nanobar, move, place, hide, init,
		DURATION_ANIMATION = 0.5 * 1000, // in ms
		// container styles
		cssCont = {
			width: '100%',
			height: '4px',
			zIndex: 9999,
			top : '0'
		},
		// bar styles
		cssBar = {
			width: '0%',
			height: '100%',
			clear: 'both'
		};

	setAnim = function(el, duration, property) {
		if(cssAnimation !== false) {
			var anim = {};
			anim[cssAnimation] = property + ' ' + duration + 'ms ease';
			addCss(el, anim);
		}
	}

	// add `css` to `el` element
	addCss = function (el, css) {
		var i;
		for (i in css) {
			el.style[i] = css[i];
		}
		el.style.float = 'left';
	};

	// animation loop
	move = function () {
		var self = this,
			dist = Math.abs(this.width - this.here),
			duration = DURATION_ANIMATION * dist / 100;

		setAnim(this.el, duration, 'width');

		if(this.here === 100) {
			setTimeout(function() {
				hide.call(self);
			}, duration + 100);
		}

		this.el.style.width = this.here + '%';
		this.width = this.here;
	};

	hide = function() {
		var el = this.el,
			style = el.style;

		setAnim(el, 0, 'width');
		setAnim(el, '500', 'opacity');
		style.opacity = 0;

		setTimeout(function() {
			style.width = 0 + '%';
			style.opacity = 1;
		}, 500);
	}

	// set bar width
	place = function (num) {
		this.width = num;
		this.el.style.width = this.width + '%';
	};

	// create and insert bar in DOM and this.bars array
	init = function () {
		var bar = new Bar( this );
		this.bars.unshift( bar );
	};

	Bar = function ( cont ) {
		// create progress element
		this.el = document.createElement( 'div' );
		this.el.style.backgroundColor = cont.opts.bg;
		this.width = 0;
		this.here = 0;
		this.moving = false;
		this.cont = cont;
		addCss( this.el, cssBar);
		cont.el.appendChild( this.el );
	};

	Bar.prototype.go = function (num) {
		this.here = num;
		move.call( this );
	};


	Nanobar = function (opt) {

		var opts = this.opts = opt || {},
			el;

		// set options
		opts.bg = opts.bg || '#000';
		this.bars = [];

		// create bar container
		el = this.el = document.createElement( 'div' );
		// append style
		addCss( this.el, cssCont);
		if (opts.id) {
			el.id = opts.id;
		}

		// set CSS position
		el.style.position = !opts.target ? 'fixed' : 'relative';

		// insert container
		if (!opts.target) {
			document.getElementsByTagName( 'body' )[0].appendChild( el );
		} else {
			opts.target.insertBefore( el, opts.target.firstChild);
		}

		init.call( this );
	};


	Nanobar.prototype.go = function (p) {
		if(p === undefined) return this.bars[0].width;
		var self = this;
		// expand bar
		setTimeout(function() {
			self.bars[0].go( p )
		}, 10);
	};

	return Nanobar;
})();
