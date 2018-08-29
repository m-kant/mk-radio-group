'use strict';

/** 
 * Creates new mk radio select widget. 
 * Uses HTML input element as an anchor to bind widget
 * Usage: `var rs = new mkRadioSelect(document.getElememtById('mkrs_input'), options)`
 * 
 * @param {HTMLElement} inputElement
 * @param {Object}   options overrides for mkRadioSelect.defaults
 * @param {Array}    options.enum     List of available options in one of formats: [value, value,...] or [{name, value},...]
 * @param {Mixed}    options.value    Selected value. If not set will be taken from input element
 * @param {String}   options.class    Additional css className for root radio-group element
 * @param {Boolean}  options.stacked  display radio selectors as stack
 * @param {Function} options.oninput  Callback for "input" event. Invoked with widget value as only argument
 * @class */
window.mkRadioSelect = function (inputElement, options) {
    if (typeof inputElement === 'string') inputElement = document.querySelector(inputElement);
    if (!inputElement) throw new Error('No input element given for mkRadioSelect');
    if (inputElement.nodeName !== 'INPUT') throw new Error('Given element for mkRadioSelect is not INPUT');
    this.options = Object.assign({}, window.mkRadioSelect.defaults, options);

    this.input = inputElement;
    this.input.type = 'hidden';
    this.enum = this._getEnum();
    if (this.options.value) {
        this.setval(this.options.value);
    } else {
        this.value = this.input.value;
    }

    var cssClass = 'mk-radio-group';
    cssClass += this.options.class ? ' ' + this.options.class : '';
    cssClass += this.options.stacked ? ' mk-radio-group_stacked' : '';
    this.face = this._el('ul', { class: cssClass });
    this.render();
    this.input.parentNode.insertBefore(this.face, this.input);
};

/** default options of new mkRadioSelect object 
 * @namespace defaults
 * @property {Array}    enum     null
 * @property {Mixed}    value    null
 * @property {String}   class    null
 * @property {Boolean}  stacked  false
 * @property {Function} oninput  null
*/
mkRadioSelect.defaults = {
    enum: null,
    value: null,
    class: null,
    stacked: false,
    oninput: null
};

mkRadioSelect.prototype = {

    /** cast enum to format {name, value} 
     * @param {Array} enumdata [value, value,...] or [{name, value},...]
    */
    normalizeEnum: function normalizeEnum(enumdata) {
        return enumdata.map(function (el) {
            return { name: el.name || el, value: el.value || el };
        });
    },


    /** extracts enum from optioins or input attributes */
    _getEnum: function _getEnum() {
        var enumData = [];
        if (this.options.enum) {
            enumData = this.options.enum;
        } else if (this.input.dataset.enum) {
            enumData = JSON.parse(this.input.dataset.enum);
        }

        return this.normalizeEnum(enumData);
    },


    /** fires InputEvent on input element 
     * @param {HTMLElement} el input element
    */
    _fireInput: function _fireInput(el) {
        var event = new InputEvent('input', { bubbles: true });
        this.input.dispatchEvent(event);
    },


    /** creates DOM of radio item elements and attaches it to component face */
    render: function render() {
        var _this = this;

        var self = this;
        this.enum.forEach(function (el) {
            var isActive = el.value === self.value;
            // opt LI element
            var optEl = _this._el('li', {
                class: 'mk-radio-group_item' + (el.value === self.value ? ' active' : ''),
                'radioSelectValue': el.value
            });
            // Anchor element inside Li to hold FOCUS if no-mouse no-touch interfaces
            var a = optEl.appendChild(_this._el('a', {
                onclick: function onclick() {
                    self.setval(el.value, true);
                }
            }));
            // radio wire circle
            var box = a.appendChild(_this._el('b', { class: 'mk-radio-group_box' }));
            // selected tick-circle inside wire circle, always exist to hold transition effects
            box.appendChild(_this._el('b', { class: 'mk-radio-group_tick' }));
            // name inside separate span to hold style effects
            a.appendChild(_this._el('span', { class: 'mk-radio-group_name', html: el.name }));

            self.face.appendChild(optEl);
            if (isActive) setTimeout(function () {
                return optEl.scrollIntoView();
            }, 0);
        });

        return self.face;
    },


    /** sets value to component, sets correspondent styles 
     * @param {mixed} value value to set
     * @param {Boolean} noscroll scroll active item into view (on programmatic set) or not (on manual set)
     * @fires InputEvent
    */
    setval: function setval(value, noscroll) {
        var _this2 = this;

        this.value = value;
        this.input.value = value;
        this._fireInput();
        if (this.options.oninput) this.options.oninput.call(this, this.value);

        if (!this.face) return value;

        this.eachOpt(function (el) {
            var elval = el.radioSelectValue || el.getAttribute('radioSelectValue');

            if (elval == value) {
                _this2._addClass(el, 'active');
                if (!noscroll) setTimeout(function () {
                    return el.scrollIntoView();
                }, 0);
            } else {
                _this2._removeClass(el, 'active');
            }
        });
        return value;
    },


    /** runs through all DOM radio-items, and invokes a callback on every one 
     * @param {Function} callback
    */
    eachOpt: function eachOpt(callback) {
        [].forEach.call(this.face.querySelectorAll('.mk-radio-group_item'), callback);
    },


    /** creates new html element
     * @param {String} tag name of the tag
     * @param {Object} attrs list of attributes to set to element + special attribute "html" for innnerHTML
     * @returns {HTMLElement}
     */
    _el: function _el(tag) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var el = document.createElement(tag);
        Object.keys(attrs).forEach(function (attrName) {
            var val = attrs[attrName];
            if (attrName === 'html') {
                el.innerHTML = val;
            } else if (typeof val === 'string') {
                el.setAttribute(attrName, val);
            } else {
                el[attrName] = val;
            }
        });
        return el;
    },

    /** adds css class to element
     * @param {HTMLElement} element
     * @param {String} className
     */
    _addClass: function _addClass(element, className) {
        var i = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
        i.test(element.className) || (element.className = (element.className + " " + className).replace(/\s+/g, " ").replace(/(^ | $)/g, ""));
    },
    /** removes css class fom element
     * @param {HTMLElement} element
     * @param {String} className
     */
    _removeClass: function _removeClass(element, className) {
        var i = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
        element.className = element.className.replace(i, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
    }

};