var LeafScene = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetLeaf = function(leaf) {

      // place leaf towards the top left
      leaf.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf.y = -10;
      leaf.z = Math.random()*200;
      if (leaf.x > this.width) {
        leaf.x = this.width + 10;
        leaf.y = Math.random()*this.height/2;
      }
      // at the start, the leaf can be anywhere
      if (this.timer == 0) {
        leaf.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf.rotation.axis = 'Y';
        leaf.rotation.x = Math.random()*180 + 90;
      } else {
        leaf.rotation.axis = 'Z';
        leaf.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf.ySpeed = Math.random() + 1.5;

      return leaf;
    }

    this._updateLeaf = function(leaf) {
      var leafWindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf.y);

      var xSpeed = leafWindSpeed + leaf.xSpeedVariation;
      leaf.x -= xSpeed;
      leaf.y += leaf.ySpeed;
      leaf.rotation.value += leaf.rotation.speed;

      var t = 'translateX( ' + leaf.x + 'px ) translateY( ' + leaf.y + 'px ) translateZ( ' + leaf.z + 'px )  rotate' + leaf.rotation.axis + '( ' + leaf.rotation.value + 'deg )';
      if (leaf.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf.rotation.x + 'deg)';
      }
      leaf.el.style.webkitTransform = t;
      leaf.el.style.MozTransform = t;
      leaf.el.style.oTransform = t;
      leaf.el.style.transform = t;

      // reset if out of view
      if (leaf.x < -10 || leaf.y > this.height + 10) {
        this._resetLeaf(leaf);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  LeafScene.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetLeaf(leaf);
      this.leaves.push(leaf);
      this.world.appendChild(leaf.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  LeafScene.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves.length; i++) {
      this._updateLeaf(this.leaves[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf scene
  var leafContainer = document.querySelector('.falling-leaves'),
      leaves = new LeafScene(leafContainer);

  leaves.init();
  leaves.render();
  
  
  
  
/////////////////////////////////////////////////////////////////
//            falling-leaves2 
/////////////////////////////////////////////////////////////////

var leaf2Scene2 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves2 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf2 = function(leaf2) {

      // place leaf2 towards the top left
      leaf2.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf2.y = -10;
      leaf2.z = Math.random()*200;
      if (leaf2.x > this.width) {
        leaf2.x = this.width + 10;
        leaf2.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf2.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf2.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf2.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf2.rotation.axis = 'Y';
        leaf2.rotation.x = Math.random()*180 + 90;
      } else {
        leaf2.rotation.axis = 'Z';
        leaf2.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf2.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf2.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf2.ySpeed = Math.random() + 1.5;

      return leaf2;
    }

    this._updateleaf2 = function(leaf2) {
      var leaf2WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf2.y);

      var xSpeed = leaf2WindSpeed + leaf2.xSpeedVariation;
      leaf2.x -= xSpeed;
      leaf2.y += leaf2.ySpeed;
      leaf2.rotation.value += leaf2.rotation.speed;

      var t = 'translateX( ' + leaf2.x + 'px ) translateY( ' + leaf2.y + 'px ) translateZ( ' + leaf2.z + 'px )  rotate' + leaf2.rotation.axis + '( ' + leaf2.rotation.value + 'deg )';
      if (leaf2.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf2.rotation.x + 'deg)';
      }
      leaf2.el.style.webkitTransform = t;
      leaf2.el.style.MozTransform = t;
      leaf2.el.style.oTransform = t;
      leaf2.el.style.transform = t;

      // reset if out of view
      if (leaf2.x < -10 || leaf2.y > this.height + 10) {
        this._resetleaf2(leaf2);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf2Scene2.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf2 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf2(leaf2);
      this.leaves2.push(leaf2);
      this.world.appendChild(leaf2.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf2Scene2.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves2.length; i++) {
      this._updateleaf2(this.leaves2[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf2Container = document.querySelector('.falling-leaves2'),
      leaves2 = new leaf2Scene2(leaf2Container);

  leaves2.init();
  leaves2.render();
  

  

/////////////////////////////////////////////////////////////////
//            falling-leaves3 
/////////////////////////////////////////////////////////////////

var leaf3Scene3 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves3 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf3 = function(leaf3) {

      // place leaf2 towards the top left
      leaf3.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf3.y = -10;
      leaf3.z = Math.random()*200;
      if (leaf3.x > this.width) {
        leaf3.x = this.width + 10;
        leaf3.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf3.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf3.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf3.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf3.rotation.axis = 'Y';
        leaf3.rotation.x = Math.random()*180 + 90;
      } else {
        leaf3.rotation.axis = 'Z';
        leaf3.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf3.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf3.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf3.ySpeed = Math.random() + 1.5;

      return leaf3;
    }

    this._updateleaf3 = function(leaf3) {
      var leaf3WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf3.y);

      var xSpeed = leaf3WindSpeed + leaf3.xSpeedVariation;
      leaf3.x -= xSpeed;
      leaf3.y += leaf3.ySpeed;
      leaf3.rotation.value += leaf3.rotation.speed;

      var t = 'translateX( ' + leaf3.x + 'px ) translateY( ' + leaf3.y + 'px ) translateZ( ' + leaf3.z + 'px )  rotate' + leaf3.rotation.axis + '( ' + leaf3.rotation.value + 'deg )';
      if (leaf3.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf3.rotation.x + 'deg)';
      }
      leaf3.el.style.webkitTransform = t;
      leaf3.el.style.MozTransform = t;
      leaf3.el.style.oTransform = t;
      leaf3.el.style.transform = t;

      // reset if out of view
      if (leaf3.x < -10 || leaf3.y > this.height + 10) {
        this._resetleaf3(leaf3);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf3Scene3.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf3 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf3(leaf3);
      this.leaves3.push(leaf3);
      this.world.appendChild(leaf3.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf3Scene3.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves3.length; i++) {
      this._updateleaf3(this.leaves3[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf3Container = document.querySelector('.falling-leaves3'),
      leaves3 = new leaf3Scene3(leaf3Container);

  leaves3.init();
  leaves3.render();
  


/////////////////////////////////////////////////////////////////
//            falling-leaves4 
/////////////////////////////////////////////////////////////////

var leaf4Scene4 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves4 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf4 = function(leaf4) {

      // place leaf2 towards the top left
      leaf4.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf4.y = -10;
      leaf4.z = Math.random()*200;
      if (leaf4.x > this.width) {
        leaf4.x = this.width + 10;
        leaf4.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf4.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf4.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf4.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf4.rotation.axis = 'Y';
        leaf4.rotation.x = Math.random()*180 + 90;
      } else {
        leaf4.rotation.axis = 'Z';
        leaf4.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf4.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf4.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf4.ySpeed = Math.random() + 1.5;

      return leaf4;
    }

    this._updateleaf4 = function(leaf4) {
      var leaf4WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf4.y);

      var xSpeed = leaf4WindSpeed + leaf4.xSpeedVariation;
      leaf4.x -= xSpeed;
      leaf4.y += leaf4.ySpeed;
      leaf4.rotation.value += leaf4.rotation.speed;

      var t = 'translateX( ' + leaf4.x + 'px ) translateY( ' + leaf4.y + 'px ) translateZ( ' + leaf4.z + 'px )  rotate' + leaf4.rotation.axis + '( ' + leaf4.rotation.value + 'deg )';
      if (leaf4.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf4.rotation.x + 'deg)';
      }
      leaf4.el.style.webkitTransform = t;
      leaf4.el.style.MozTransform = t;
      leaf4.el.style.oTransform = t;
      leaf4.el.style.transform = t;

      // reset if out of view
      if (leaf4.x < -10 || leaf4.y > this.height + 10) {
        this._resetleaf4(leaf4);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf4Scene4.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf4 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf4(leaf4);
      this.leaves4.push(leaf4);
      this.world.appendChild(leaf4.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf4Scene4.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves4.length; i++) {
      this._updateleaf4(this.leaves4[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf4Container = document.querySelector('.falling-leaves4'),
      leaves4 = new leaf4Scene4(leaf4Container);

  leaves4.init();
  leaves4.render();
  
  
/////////////////////////////////////////////////////////////////
//            falling-leaves5 
/////////////////////////////////////////////////////////////////

var leaf5Scene5 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves5 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf5 = function(leaf5) {

      // place leaf2 towards the top left
      leaf5.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf5.y = -10;
      leaf5.z = Math.random()*200;
      if (leaf5.x > this.width) {
        leaf5.x = this.width + 10;
        leaf5.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf5.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf5.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf5.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf5.rotation.axis = 'Y';
        leaf5.rotation.x = Math.random()*180 + 90;
      } else {
        leaf5.rotation.axis = 'Z';
        leaf5.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf5.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf5.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf5.ySpeed = Math.random() + 1.5;

      return leaf5;
    }

    this._updateleaf5 = function(leaf5) {
      var leaf5WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf5.y);

      var xSpeed = leaf5WindSpeed + leaf5.xSpeedVariation;
      leaf5.x -= xSpeed;
      leaf5.y += leaf5.ySpeed;
      leaf5.rotation.value += leaf5.rotation.speed;

      var t = 'translateX( ' + leaf5.x + 'px ) translateY( ' + leaf5.y + 'px ) translateZ( ' + leaf5.z + 'px )  rotate' + leaf5.rotation.axis + '( ' + leaf5.rotation.value + 'deg )';
      if (leaf5.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf5.rotation.x + 'deg)';
      }
      leaf5.el.style.webkitTransform = t;
      leaf5.el.style.MozTransform = t;
      leaf5.el.style.oTransform = t;
      leaf5.el.style.transform = t;

      // reset if out of view
      if (leaf5.x < -10 || leaf5.y > this.height + 10) {
        this._resetleaf5(leaf5);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf5Scene5.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf5 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf5(leaf5);
      this.leaves5.push(leaf5);
      this.world.appendChild(leaf5.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf5Scene5.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves5.length; i++) {
      this._updateleaf5(this.leaves5[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf5Container = document.querySelector('.falling-leaves5'),
      leaves5 = new leaf5Scene5(leaf5Container);

  leaves5.init();
  leaves5.render();  
  
  
/////////////////////////////////////////////////////////////////
//            falling-leaves6 
/////////////////////////////////////////////////////////////////

var leaf6Scene6 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves6 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf6 = function(leaf6) {

      // place leaf2 towards the top left
      leaf6.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf6.y = -10;
      leaf6.z = Math.random()*200;
      if (leaf6.x > this.width) {
        leaf6.x = this.width + 10;
        leaf6.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf6.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf6.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf6.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf6.rotation.axis = 'Y';
        leaf6.rotation.x = Math.random()*180 + 90;
      } else {
        leaf6.rotation.axis = 'Z';
        leaf6.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf6.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf6.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf6.ySpeed = Math.random() + 1.5;

      return leaf6;
    }

    this._updateleaf6 = function(leaf6) {
      var leaf6WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf6.y);

      var xSpeed = leaf6WindSpeed + leaf6.xSpeedVariation;
      leaf6.x -= xSpeed;
      leaf6.y += leaf6.ySpeed;
      leaf6.rotation.value += leaf6.rotation.speed;

      var t = 'translateX( ' + leaf6.x + 'px ) translateY( ' + leaf6.y + 'px ) translateZ( ' + leaf6.z + 'px )  rotate' + leaf6.rotation.axis + '( ' + leaf6.rotation.value + 'deg )';
      if (leaf6.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf6.rotation.x + 'deg)';
      }
      leaf6.el.style.webkitTransform = t;
      leaf6.el.style.MozTransform = t;
      leaf6.el.style.oTransform = t;
      leaf6.el.style.transform = t;

      // reset if out of view
      if (leaf6.x < -10 || leaf6.y > this.height + 10) {
        this._resetleaf6(leaf6);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf6Scene6.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf6 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf6(leaf6);
      this.leaves6.push(leaf6);
      this.world.appendChild(leaf6.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf6Scene6.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves6.length; i++) {
      this._updateleaf6(this.leaves6[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf6Container = document.querySelector('.falling-leaves6'),
      leaves6 = new leaf6Scene6(leaf6Container);

  leaves6.init();
  leaves6.render();  
    
/////////////////////////////////////////////////////////////////
//            falling-leaves7 
/////////////////////////////////////////////////////////////////

var leaf7Scene7 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves7 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf7 = function(leaf7) {

      // place leaf2 towards the top left
      leaf7.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf7.y = -10;
      leaf7.z = Math.random()*200;
      if (leaf7.x > this.width) {
        leaf7.x = this.width + 10;
        leaf7.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf7.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf7.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf7.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf7.rotation.axis = 'Y';
        leaf7.rotation.x = Math.random()*180 + 90;
      } else {
        leaf7.rotation.axis = 'Z';
        leaf7.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf7.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf7.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf7.ySpeed = Math.random() + 1.5;

      return leaf7;
    }

    this._updateleaf7 = function(leaf7) {
      var leaf7WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf7.y);

      var xSpeed = leaf7WindSpeed + leaf7.xSpeedVariation;
      leaf7.x -= xSpeed;
      leaf7.y += leaf7.ySpeed;
      leaf7.rotation.value += leaf7.rotation.speed;

      var t = 'translateX( ' + leaf7.x + 'px ) translateY( ' + leaf7.y + 'px ) translateZ( ' + leaf7.z + 'px )  rotate' + leaf7.rotation.axis + '( ' + leaf7.rotation.value + 'deg )';
      if (leaf7.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf7.rotation.x + 'deg)';
      }
      leaf7.el.style.webkitTransform = t;
      leaf7.el.style.MozTransform = t;
      leaf7.el.style.oTransform = t;
      leaf7.el.style.transform = t;

      // reset if out of view
      if (leaf7.x < -10 || leaf7.y > this.height + 10) {
        this._resetleaf7(leaf7);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf7Scene7.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf7 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf7(leaf7);
      this.leaves7.push(leaf7);
      this.world.appendChild(leaf7.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf7Scene7.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves7.length; i++) {
      this._updateleaf7(this.leaves7[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf7Container = document.querySelector('.falling-leaves7'),
      leaves7 = new leaf7Scene7(leaf7Container);

  leaves7.init();
  leaves7.render();  
    
/////////////////////////////////////////////////////////////////
//            falling-leaves8 
/////////////////////////////////////////////////////////////////
var leaf8Scene8 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves8 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf8 = function(leaf8) {

      // place leaf2 towards the top left
      leaf8.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf8.y = -10;
      leaf8.z = Math.random()*200;
      if (leaf8.x > this.width) {
        leaf8.x = this.width + 10;
        leaf8.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf8.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf8.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf8.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf8.rotation.axis = 'Y';
        leaf8.rotation.x = Math.random()*180 + 90;
      } else {
        leaf8.rotation.axis = 'Z';
        leaf8.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf8.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf8.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf8.ySpeed = Math.random() + 1.5;

      return leaf8;
    }

    this._updateleaf8 = function(leaf8) {
      var leaf8WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf8.y);

      var xSpeed = leaf8WindSpeed + leaf8.xSpeedVariation;
      leaf8.x -= xSpeed;
      leaf8.y += leaf8.ySpeed;
      leaf8.rotation.value += leaf8.rotation.speed;

      var t = 'translateX( ' + leaf8.x + 'px ) translateY( ' + leaf8.y + 'px ) translateZ( ' + leaf8.z + 'px )  rotate' + leaf8.rotation.axis + '( ' + leaf8.rotation.value + 'deg )';
      if (leaf8.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf8.rotation.x + 'deg)';
      }
      leaf8.el.style.webkitTransform = t;
      leaf8.el.style.MozTransform = t;
      leaf8.el.style.oTransform = t;
      leaf8.el.style.transform = t;

      // reset if out of view
      if (leaf8.x < -10 || leaf8.y > this.height + 10) {
        this._resetleaf8(leaf8);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf8Scene8.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf8 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf8(leaf8);
      this.leaves8.push(leaf8);
      this.world.appendChild(leaf8.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf8Scene8.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves8.length; i++) {
      this._updateleaf8(this.leaves8[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf8Container = document.querySelector('.falling-leaves8'),
      leaves8 = new leaf8Scene8(leaf8Container);

  leaves8.init();
  leaves8.render(); 
  
/////////////////////////////////////////////////////////////////
//            falling-leaves9 
/////////////////////////////////////////////////////////////////
var leaf9Scene9 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves9 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf9 = function(leaf9) {

      // place leaf2 towards the top left
      leaf9.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf9.y = -10;
      leaf9.z = Math.random()*200;
      if (leaf9.x > this.width) {
        leaf9.x = this.width + 10;
        leaf9.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf9.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf9.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf9.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf9.rotation.axis = 'Y';
        leaf9.rotation.x = Math.random()*180 + 90;
      } else {
        leaf9.rotation.axis = 'Z';
        leaf9.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf9.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf9.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf9.ySpeed = Math.random() + 1.5;

      return leaf9;
    }

    this._updateleaf9 = function(leaf9) {
      var leaf9WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf9.y);

      var xSpeed = leaf9WindSpeed + leaf9.xSpeedVariation;
      leaf9.x -= xSpeed;
      leaf9.y += leaf9.ySpeed;
      leaf9.rotation.value += leaf9.rotation.speed;

      var t = 'translateX( ' + leaf9.x + 'px ) translateY( ' + leaf9.y + 'px ) translateZ( ' + leaf9.z + 'px )  rotate' + leaf9.rotation.axis + '( ' + leaf9.rotation.value + 'deg )';
      if (leaf9.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf9.rotation.x + 'deg)';
      }
      leaf9.el.style.webkitTransform = t;
      leaf9.el.style.MozTransform = t;
      leaf9.el.style.oTransform = t;
      leaf9.el.style.transform = t;

      // reset if out of view
      if (leaf9.x < -10 || leaf9.y > this.height + 10) {
        this._resetleaf9(leaf9);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf9Scene9.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf9 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf9(leaf9);
      this.leaves9.push(leaf9);
      this.world.appendChild(leaf9.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf9Scene9.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves9.length; i++) {
      this._updateleaf9(this.leaves9[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf9Container = document.querySelector('.falling-leaves9'),
      leaves9 = new leaf9Scene9(leaf9Container);

  leaves9.init();
  leaves9.render(); 
  
/////////////////////////////////////////////////////////////////
//            falling-leaves10 
/////////////////////////////////////////////////////////////////
var leaf10Scene10 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves10 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf10 = function(leaf10) {

      // place leaf2 towards the top left
      leaf10.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf10.y = -10;
      leaf10.z = Math.random()*200;
      if (leaf10.x > this.width) {
        leaf10.x = this.width + 10;
        leaf10.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf10.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf10.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf10.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf10.rotation.axis = 'Y';
        leaf10.rotation.x = Math.random()*180 + 90;
      } else {
        leaf10.rotation.axis = 'Z';
        leaf10.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf10.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf10.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf10.ySpeed = Math.random() + 1.5;

      return leaf10;
    }

    this._updateleaf10 = function(leaf10) {
      var leaf10WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf10.y);

      var xSpeed = leaf10WindSpeed + leaf10.xSpeedVariation;
      leaf10.x -= xSpeed;
      leaf10.y += leaf10.ySpeed;
      leaf10.rotation.value += leaf10.rotation.speed;

      var t = 'translateX( ' + leaf10.x + 'px ) translateY( ' + leaf10.y + 'px ) translateZ( ' + leaf10.z + 'px )  rotate' + leaf10.rotation.axis + '( ' + leaf10.rotation.value + 'deg )';
      if (leaf10.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf10.rotation.x + 'deg)';
      }
      leaf10.el.style.webkitTransform = t;
      leaf10.el.style.MozTransform = t;
      leaf10.el.style.oTransform = t;
      leaf10.el.style.transform = t;

      // reset if out of view
      if (leaf10.x < -10 || leaf10.y > this.height + 10) {
        this._resetleaf10(leaf10);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf10Scene10.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf10 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf10(leaf10);
      this.leaves10.push(leaf10);
      this.world.appendChild(leaf10.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf10Scene10.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves10.length; i++) {
      this._updateleaf10(this.leaves10[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf10Container = document.querySelector('.falling-leaves10'),
      leaves10 = new leaf10Scene10(leaf10Container);

  leaves10.init();
  leaves10.render(); 
  
/////////////////////////////////////////////////////////////////
//            falling-leaves11 
/////////////////////////////////////////////////////////////////
var leaf11Scene11 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves11 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf11 = function(leaf11) {

      // place leaf2 towards the top left
      leaf11.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf11.y = -10;
      leaf11.z = Math.random()*200;
      if (leaf11.x > this.width) {
        leaf11.x = this.width + 10;
        leaf11.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf11.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf11.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf11.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf11.rotation.axis = 'Y';
        leaf11.rotation.x = Math.random()*180 + 90;
      } else {
        leaf11.rotation.axis = 'Z';
        leaf11.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf11.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf11.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf11.ySpeed = Math.random() + 1.5;

      return leaf11;
    }

    this._updateleaf11 = function(leaf11) {
      var leaf11WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf11.y);

      var xSpeed = leaf11WindSpeed + leaf11.xSpeedVariation;
      leaf11.x -= xSpeed;
      leaf11.y += leaf11.ySpeed;
      leaf11.rotation.value += leaf11.rotation.speed;

      var t = 'translateX( ' + leaf11.x + 'px ) translateY( ' + leaf11.y + 'px ) translateZ( ' + leaf11.z + 'px )  rotate' + leaf11.rotation.axis + '( ' + leaf11.rotation.value + 'deg )';
      if (leaf11.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf11.rotation.x + 'deg)';
      }
      leaf11.el.style.webkitTransform = t;
      leaf11.el.style.MozTransform = t;
      leaf11.el.style.oTransform = t;
      leaf11.el.style.transform = t;

      // reset if out of view
      if (leaf11.x < -10 || leaf11.y > this.height + 10) {
        this._resetleaf11(leaf11);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf11Scene11.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf11 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf11(leaf11);
      this.leaves11.push(leaf11);
      this.world.appendChild(leaf11.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf11Scene11.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves11.length; i++) {
      this._updateleaf11(this.leaves11[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf11Container = document.querySelector('.falling-leaves11'),
      leaves11 = new leaf11Scene11(leaf11Container);

  leaves11.init();
  leaves11.render(); 
  
/////////////////////////////////////////////////////////////////
//            falling-leaves12
/////////////////////////////////////////////////////////////////
var leaf12Scene12 = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves12 = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 0.2,
        maxSpeed: 2,
        duration: 800,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetleaf12 = function(leaf12) {

      // place leaf2 towards the top left
      leaf12.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf12.y = -10;
      leaf12.z = Math.random()*200;
      if (leaf12.x > this.width) {
        leaf12.x = this.width + 10;
        leaf12.y = Math.random()*this.height/2;
      }
      // at the start, the leaf2 can be anywhere
      if (this.timer == 0) {
        leaf12.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf12.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf12.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf12.rotation.axis = 'Y';
        leaf12.rotation.x = Math.random()*180 + 90;
      } else {
        leaf12.rotation.axis = 'Z';
        leaf12.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf12.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf12.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf12.ySpeed = Math.random() + 1.5;

      return leaf12;
    }

    this._updateleaf12 = function(leaf12) {
      var leaf12WindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf12.y);

      var xSpeed = leaf12WindSpeed + leaf12.xSpeedVariation;
      leaf12.x -= xSpeed;
      leaf12.y += leaf12.ySpeed;
      leaf12.rotation.value += leaf12.rotation.speed;

      var t = 'translateX( ' + leaf12.x + 'px ) translateY( ' + leaf12.y + 'px ) translateZ( ' + leaf12.z + 'px )  rotate' + leaf12.rotation.axis + '( ' + leaf12.rotation.value + 'deg )';
      if (leaf12.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf12.rotation.x + 'deg)';
      }
      leaf12.el.style.webkitTransform = t;
      leaf12.el.style.MozTransform = t;
      leaf12.el.style.oTransform = t;
      leaf12.el.style.transform = t;

      // reset if out of view
      if (leaf12.x < -10 || leaf12.y > this.height + 10) {
        this._resetleaf12(leaf12);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf2 position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf2 Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  leaf12Scene12.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf12 = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetleaf12(leaf12);
      this.leaves12.push(leaf12);
      this.world.appendChild(leaf12.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  leaf12Scene12.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves12.length; i++) {
      this._updateleaf12(this.leaves12[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf2 scene
  var leaf12Container = document.querySelector('.falling-leaves12'),
      leaves12 = new leaf12Scene12(leaf12Container);

  leaves12.init();
  leaves12.render(); 