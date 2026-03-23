import { TestBed } from "@angular/core/testing";
import { TimerService } from "./timerService";

describe('TimerService', () => {
    let service: TimerService;

    //para que haga local storage
    beforeEach(() => {
        localStorage.clear();
        TestBed.configureTestingModule({});
        service = TestBed.inject(TimerService);
    });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // test the initial state of the timer
    it('should start in idle state with 25 min', () => {
        expect(service.timerState().status).toBe('idle');
        expect(service.timerState().mode).toBe('pomodoro');
        expect(service.minutes()).toBe(25);
        expect(service.seconds()).toBe(0);
    });

    // test the mode switching functionality
    it('should switch modes correctly', () => {
        service.switchMode('shortBreak');
        expect(service.timerState().mode).toBe('shortBreak');
        expect(service.minutes()).toBe(5);

        service.switchMode('longBreak');
        expect(service.timerState().mode).toBe('longBreak');
        expect(service.minutes()).toBe(15);
    });

    // test the sessions before long break logic
    it('should reflect totalSessions from config', () => {
        expect(service.timerStats().totalSessions).toBe(4);

        service.updateConfig({ sessionsBeforeLongBreak: 6 });
        expect(service.timerStats().totalSessions).toBe(6);
    })
})