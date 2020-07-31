import { 
    TimelineLite, 
} from "gsap";

export default class Animation {
    
    static from(elName) {
        const timeline = new TimelineLite();

        timeline.from(elName, {
            x: -1000,
            opacity: 0,
        })
    }

    static out(elName, next) {
        const timeline = new TimelineLite();

        timeline.to(elName, {
            x: 1000,
            opacity: 0
        })
    
        setTimeout(()=> {
          next()
        }, 300)
    }
}