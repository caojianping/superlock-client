import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({ name: 'App' })
export default class App extends Vue {
    calcSize() {
        let element = document.documentElement;
        if (!element) return;

        let clientWidth = element.clientWidth;
        if (!clientWidth) return;

        element.style.fontSize = 16 * (clientWidth / 375) + 'px';
    }

    windowResize() {
        var self = this,
            timer: any = null;
        return function() {
            let eventName =
                'orientationchange' in window ? 'orientationchange' : 'resize';
            (window as any)[`on${eventName}`] = function() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    self.calcSize();
                }, 500);
            };
        };
    }

    mounted() {
        this.calcSize();
        this.windowResize()();
    }
}
