import { Component,OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {Category} from "../models/category";
import {ComputeService} from "../compute/services/compute.service";
import {Activity} from "../models/activity";
import {Utils} from "../utils/utils";
import {User} from "../models/user";
import {ActivityService} from "../activity/services/activity.service";

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.Default,
    styleUrls: ['./styles.css'],
    templateUrl: './template.html'
})
export class DemoComponent  implements AfterViewInit  {

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: string = 'month';

    viewDate: Date = new Date();

    comutedArray: Category[];
    bestActivities: Activity[];
    user: User;
    events: CalendarEvent[];

    modalData: {
        action: string,
        event: CalendarEvent
    };

    refresh: Subject<any> = new Subject();

    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal,
                private   computeService: ComputeService,
                private activityService: ActivityService) {
        this.user = Utils.getUserFromStorage();

    }

    ngAfterViewInit(): void {

        this.computeService.compute(this.user.loginName)
            .then((ans: Category[]) => {
                this.comutedArray = ans;
                this.getBestActivities(ans[0].location);
            })
            .catch(() => {
                console.log("You remembered to check for errors!");
            });


    }

    getBestActivities(location: string): void{
        this.activityService.getBestActivitiesByLocation(location)
            .then((ans: Activity[]) => {
                this.events=[];
                this.bestActivities=ans;
                for(let index=0;index<this.bestActivities.length;index++){
                    let event = {
                    start : subDays(startOfDay(new Date()), 1),
                    end : subDays(startOfDay(new Date()), 1),
                    title : this.bestActivities[index].activityName,
                    color : colors.red,
                    actions : this.actions};
                    this.events.push(event);
                }
                // this.bestActivities.forEach(function(activity: Activity){
                //     let event ={};
                //     event.start= subDays(startOfDay(new Date()), 1);
                //     event.end= subDays(startOfDay(new Date()), 1);
                //     event.title=activity.activityName;
                //     event.color= colors.red;
                //     event.actions= this.actions;
                //     this.events.push(event);
                // });
                // this.events= [{
                //     start: subDays(startOfDay(new Date()), 1),
                //     end: addDays(new Date(), 1),
                //     title: 'A 3 day event',
                //     color: colors.red,
                //     actions: this.actions
                // }, {
                //     start: startOfDay(new Date()),
                //     title: 'An event with no end date',
                //     color: colors.yellow,
                //     actions: this.actions
                // }, {
                //     start: subDays(endOfMonth(new Date()), 3),
                //     end: addDays(endOfMonth(new Date()), 3),
                //     title: 'A long event that spans 2 months',
                //     color: colors.blue
                // }, {
                //     start: addHours(startOfDay(new Date()), 2),
                //     end: new Date(),
                //     title: 'A draggable and resizable event',
                //     color: colors.yellow,
                //     actions: this.actions,
                //     resizable: {
                //         beforeStart: true,
                //         afterEnd: true
                //     },
                //     draggable: true
                // }];
            })
            .catch((error) => {
                console.log("You remembered to check for errors! " +error);
            });
    }

    actions: CalendarEventAction[] = [{
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({event}: {event: CalendarEvent}): void => {
            this.handleEvent('Edited', event);
        }
    }, {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({event}: {event: CalendarEvent}): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
        }
    }];

    dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = {event, action};
        this.modal.open(this.modalContent, {size: 'lg'});
    }

    addEvent(): void {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    }

}