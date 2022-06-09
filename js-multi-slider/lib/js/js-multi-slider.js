const MultiSlider = (() => {

    const defaults = {
        dir   : "left",
        width : "100%",
        height: "400px",
        visibleItems: 6,
        onNext: () => {},
        onPrev: () => {}
    };

    return class
    {
        /**
         * Initializes a new instance of the class.
         * 
         * @param {HTMLElement} element The slider element.
         * @param {defaults} options The configuration options.
         */
        constructor(element, options) {
            this._options = { ...options };

            for (const key in defaults) {
                if (!options[key])
                    this._options[key] = defaults[key];
            }

            this._element = element;
            this._slides  = this._element.querySelectorAll(".slide");
            this._moves   = 1;
            this._dir     = this._options.dir;

            this._container = this._element.querySelector(".ps-container");
            this._elemStyle = window.getComputedStyle(this._element);
            this._contStyle = window.getComputedStyle(this._container);

            this._next = this._element.querySelector(".next");
            this._prev = this._element.querySelector(".prev");

            this._next.onclick = () => this.next();
            this._prev.onclick = () => this.prev();
            this._prev.classList.add("hide");

            setDimentions.bind(this)();
        }

        /**
         * Returns the slider width.
         * @returns {number} The width.
         */
        sliderWidth() {
            const style = window.getComputedStyle(this._element);
            return parseFloat(style.width);
        }

        /** Moves the slider forwards. */
        next() {
            const moved = parseFloat(this._contStyle[this._dir]);
            const width = parseFloat(this._contStyle.width);
            const vport = parseFloat(this._elemStyle.width);

            const remaining = width - this._moves * vport - moved * -1;
            let distance;

            if (vport - moved === width) {
                this._moves = distance = 0;
            }
            else if (remaining > vport)
                distance = moved - vport; else
                distance = moved + remaining;

            if (distance === 0)
                this._prev.classList.add("hide"); else
                this._prev.classList.remove("hide");

            this._container.style[this._dir] = distance + "px";
            this._moves++;
        }

        /** Moves the slider backwards. */
        prev() {
            const moved = parseFloat(this._contStyle[this._dir]);
            const vport = parseFloat(this._elemStyle.width);

            if (moved === 0) return;

            let distance = Math.abs(moved) <= vport ? 0 : moved + vport;
            if (distance === 0)
                this._prev.classList.add("hide");

            this._container.style[this._dir] = distance + "px";
            this._moves--;
        }

        /** Resents the slider values. */
        reset() {
            this._container.style[this._dir] = "0px";
            this._moves = 1;
            this._prev.classList.add("hide");
        }
    };

    function setDimentions() {
        if (this._options.width)
            this._element.style.width = this._options.width;

        if (this._options.height)
            this._element.style.height = this._options.height;

        const width = this.sliderWidth();
        this._slides.forEach(slide => {
            slide.style.width = width / this._options.visibleItems + "px";
        });
    }
})();