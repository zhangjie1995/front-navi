// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $addItem = $('.addItem');
var items = JSON.parse(localStorage.getItem('items')) || [];
console.log(items);

function render() {
  $addItem.siblings().remove();
  items.forEach(function (item, index) {
    var $newItem = $("\n         <li class=\"item\">\n            <div class=\"itemIcon\">".concat(simiplifyUrl(item.itemUrl)[0].toUpperCase(), "</div>\n            <div class=\"itemUrl\">").concat(simiplifyUrl(item.itemUrl), "</div>\n            <div class=\"closeIcon\">\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-close\"></use>\n                </svg>\n            </div> \n        </li>\n        "));
    $addItem.before($newItem);
    $newItem.on('click', function () {
      window.open(item.itemUrl);
    });
    $newItem.find('.closeIcon').on('click', function (e) {
      e.stopPropagation();
      console.log(index);
      items.splice(index, 1);
      render();
    });
  });
}

function simiplifyUrl(url) {
  return url.replace(/http:\/\//i, '').replace(/https:\/\//i, '').replace(/www./i, '').replace(/\/.*/, '');
}

render();
$addItem.on('click', function () {
  var newItem = prompt('请输入要添加的网址');

  if (!newItem.match(/http/)) {
    newItem = 'https://' + newItem;
  }

  console.log(newItem);
  items.push({
    'itemUrl': newItem
  });
  render();
});

window.onbeforeunload = function () {
  localStorage.setItem('items', JSON.stringify(items));
};

document.addEventListener('keyup', function (e) {
  for (var i = 0; i < items.length; i++) {
    if (simiplifyUrl(items[i].itemUrl)[0] === e.key) {
      window.open(items[i].itemUrl);
      break;
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.3d1d1bd6.js.map