"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var date_fns_1 = require("date-fns");
var Subject_1 = require("rxjs/Subject");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var compute_service_1 = require("../compute/services/compute.service");
var utils_1 = require("../utils/utils");
var activity_service_1 = require("../activity/services/activity.service");
var router_1 = require("@angular/router");
var colors = {
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
var CalenderComponent = (function () {
    function CalenderComponent(modal, computeService, activityService, activatedRoute) {
        var _this = this;
        this.modal = modal;
        this.computeService = computeService;
        this.activityService = activityService;
        this.activatedRoute = activatedRoute;
        this.view = 'month';
        this.viewDate = new Date();
        this.refresh = new Subject_1.Subject();
        this.activeDayIsOpen = true;
        this.actions = [{
                label: '<i class="fa fa-fw fa-pencil"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.handleEvent('Edited', event);
                }
            }, {
                label: '<i class="fa fa-fw fa-times"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.events = _this.events.filter(function (iEvent) { return iEvent !== event; });
                    _this.handleEvent('Deleted', event);
                }
            }];
        this.user = utils_1.Utils.getUserFromStorage();
        this.numberOfActivities = 9;
        this.numberOfActivitiesPerDay = 3;
        this.startHour = 60 * 8; //8 AM
    }
    CalenderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var location = params['location']; //todo need to fix
            _this.getBestActivities(location, _this.numberOfActivities);
        });
    };
    CalenderComponent.prototype.getBestActivities = function (location, countResults) {
        var _this = this;
        this.activityService.getBestActivitiesByLocation(location, countResults)
            .then(function (ans) {
            _this.events = [];
            _this.bestActivities = ans;
            var startIndex = 0;
            var day = 1;
            while (startIndex < _this.bestActivities.length) {
                var endIndex = Math.min(startIndex + _this.numberOfActivitiesPerDay, _this.bestActivities.length);
                var subArray = _this.bestActivities.slice(startIndex, endIndex);
                startIndex += _this.numberOfActivitiesPerDay;
                _this.startHour = 60 * 8;
                for (var index2 = 0; index2 < subArray.length; index2++) {
                    var event_1 = {
                        start: date_fns_1.addMinutes(date_fns_1.addDays(date_fns_1.startOfDay(new Date()), day), _this.startHour),
                        end: date_fns_1.addMinutes(date_fns_1.addDays(date_fns_1.startOfDay(new Date()), day), _this.startHour + subArray[index2].suggestedDuration),
                        title: subArray[index2].activityName,
                        color: colors.red,
                        actions: _this.actions
                    };
                    _this.events.push(event_1);
                    _this.startHour += subArray[index2].suggestedDuration;
                }
                day++;
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
            .catch(function (error) {
            console.log("You remembered to check for errors! " + error);
        });
    };
    CalenderComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    CalenderComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    };
    CalenderComponent.prototype.handleEvent = function (action, event) {
        this.modalData = { event: event, action: action };
        this.modal.open(this.modalContent, { size: 'lg' });
    };
    CalenderComponent.prototype.addEvent = function () {
        this.events.push({
            title: 'New event',
            start: date_fns_1.startOfDay(new Date()),
            end: date_fns_1.endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    };
    return CalenderComponent;
}());
__decorate([
    core_1.ViewChild('modalContent'),
    __metadata("design:type", core_1.TemplateRef)
], CalenderComponent.prototype, "modalContent", void 0);
CalenderComponent = __decorate([
    core_1.Component({
        selector: 'mwl-demo-component',
        changeDetection: core_1.ChangeDetectionStrategy.Default,
        styleUrls: ['./styles.css'],
        templateUrl: './template.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
        compute_service_1.ComputeService,
        activity_service_1.ActivityService,
        router_1.ActivatedRoute])
], CalenderComponent);
exports.CalenderComponent = CalenderComponent;
//# sourceMappingURL=calender-component.js.map