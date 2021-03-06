class WordpressReadingProgress {

    constructor(element) {
        this.element = document.getElementById(element);
        if (this.element === null || typeof this.element == 'undefined') {
            return false;
        }
        this.screenHeight = this.getScreenHeight();
        this.elementOffset = this.getElementOffset();
        this.scrollPosition = this.getScrollPosition();
        this.scrollbarElement = null;
        this.scrollbarElementID = 'wordpress-reading-progress-bar';

        this.appendScrollbarElement(document.getElementsByTagName('body')[0]);
        this.checkReadingProgress();

        window.addEventListener('resize', this.checkReadingProgress.bind(this));
        window.addEventListener('scroll', this.checkReadingProgress.bind(this));
    }

    getElementOffset() {
        return this.element.getBoundingClientRect().bottom;
    }

    getScreenHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight);
    }

    getScrollPosition() {
        return document.documentElement.scrollTop;
    }

    appendScrollbarElement(appendTo) {
        this.scrollbarElement = document.createElement('div');
        this.scrollbarElement.setAttribute('id', this.scrollbarElementID);
        this.scrollbarElement.classList.add(`position-${postReadingProgress.position}`);
        appendTo.appendChild(this.scrollbarElement);
        this.scrollbarElement.appendChild(document.createElement('div'));
    }

    checkReadingProgress() {
        this.elementOffset = this.getElementOffset();
        this.screenHeight = this.getScreenHeight();
        this.scrollPosition = this.getScrollPosition();

        const currentOffset = this.elementOffset - this.screenHeight;
        const totalOffset = this.scrollPosition + currentOffset;
        let currentPercentPosition = Math.abs((currentOffset * 100 / totalOffset) - 100);

        if (currentPercentPosition > 100) {
            currentPercentPosition = 100;

            if (postReadingProgress.autohide == '1') {
                this.scrollbarElement.classList.add(postReadingProgress.autohideAnimation);
            }
        } else {
            if (postReadingProgress.autohide == '1') {
                this.scrollbarElement.classList.remove(postReadingProgress.autohideAnimation);
            }
        }

        if (postReadingProgress.position == 'top' || postReadingProgress.position == 'bottom') {
            document.querySelector(`#${this.scrollbarElementID} > div`).style.width = currentPercentPosition + '%';
        } else {
            document.querySelector(`#${this.scrollbarElementID} > div`).style.height = currentPercentPosition + '%';
        }
    }
}

export default WordpressReadingProgress;