import { IgxCircularProgressBar, IgxLinearProgressBar } from 'igniteui-js-blocks/main';
import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-progressbar',
    templateUrl: './progressbar.component.html',
    styleUrls: ['./progressbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProgressbarComponent implements OnInit {

    public currentValue: number;
    public type: string;
    public interval: any;

    @ViewChildren(IgxLinearProgressBar, { read: IgxLinearProgressBar })
    linearBars: QueryList<IgxLinearProgressBar>;

    @ViewChildren(IgxCircularProgressBar, { read: IgxCircularProgressBar })
    circularBars: QueryList<IgxCircularProgressBar>;

    constructor() {
        this.currentValue = 0;
    }

    private randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    changeIcon() {
        return this.interval ? 'pause' : 'play_arrow';
    }

    updateValue() {
        this.linearBars.map((bar) => bar.value += this.randomIntFromInterval(1, 3));
        this.circularBars.map((bar) => this.currentValue += this.randomIntFromInterval(1, 3));
        const shouldStop = this.linearBars.toArray().every((bar) => bar.value >= bar.max);
        if (shouldStop) {
            this.interval = clearInterval(this.interval);
        }
    }

    tick() {
        if (this.interval) {
            this.interval = clearInterval(this.interval);
            return;
        }
        this.interval = setInterval(this.updateValue.bind(this), 60);
    }

    ngOnInit() {
    }

}
