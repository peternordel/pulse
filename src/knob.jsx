import './knob.css'
import { useState } from 'react'

export default function Knob (props) {
    function convertRange (oldMin, oldMax, newMin, newMax, oldValue) {
        return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
      };
    
    const fullAngle = props.degrees;
    const startAngle = (360 - props.degrees) / 2;
    const endAngle = startAngle + props.degrees;
    const margin = props.size * 0.15;
    let currentDeg = Math.floor(
    convertRange(
        props.min,
        props.max,
        startAngle,
        endAngle,
        props.value
        )
    );

    const [deg, setDeg] = useState(currentDeg)
    console.log("rerender", deg)

    function startDrag (e) {
        e.preventDefault();
        const knob = e.target.getBoundingClientRect();
        const pts = {
          x: knob.left + knob.width / 2,
          y: knob.top + knob.height / 2
        };
        const moveHandler = e => {
            currentDeg = getDeg(e.clientX, e.clientY, pts);
            if (currentDeg === startAngle) currentDeg--;
            let newValue = Math.floor(
                convertRange(
                    startAngle,
                    endAngle,
                    props.min,
                    props.max,
                    currentDeg
                )
          );
          setDeg(currentDeg)
          props.onChange(newValue);
        };
        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", e => {
          document.removeEventListener("mousemove", moveHandler);
        });
    }
      
    function getDeg (cX, cY, pts) {
        const x = cX - pts.x;
        const y = cY - pts.y;
        let deg = Math.atan(y / x) * 180 / Math.PI;
        if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
            deg += 90;
        } else {
            deg += 270;
        }
        let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
        return finalDeg;
    };
      
        convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
          return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
        };
      
        // renderTicks = () => {
        //   let ticks = [];
        //   const incr = this.fullAngle / this.props.numTicks;
        //   const size = this.margin + this.props.size / 2;
        //   for (let deg = this.startAngle; deg <= this.endAngle; deg += incr) {
        //     const tick = {
        //       deg: deg,
        //       tickStyle: {
        //         height: size + 10,
        //         left: size - 1,
        //         top: size + 2,
        //         transform: "rotate(" + deg + "deg)",
        //         transformOrigin: "top"
        //       }
        //     };
        //     ticks.push(tick);
        //   }
        //   return ticks;
        // };
      
        function dcpy (o) {
          return JSON.parse(JSON.stringify(o));
        };
      
        let kStyle = {
            width: props.size,
            height: props.size
        };
        let iStyle = dcpy(kStyle);
        let oStyle = dcpy(kStyle);
        oStyle.margin = margin;
        if (props.color) {
            oStyle.backgroundImage =
                "radial-gradient(100% 70%,hsl(210, " +
                currentDeg +
                "%, " +
                currentDeg / 5 +
                "%),hsl(" +
                Math.random() * 100 +
                ",20%," +
                currentDeg / 36 +
                "%))";
        }
        iStyle.transform = "rotate(" + deg + "deg)";
        
    return (
        <div className="knob" style={kStyle}>
            {/* <div className="ticks">
            {this.props.numTicks
                ? this.renderTicks().map((tick, i) => (
                    <div
                    key={i}
                    className={
                        "tick" + (tick.deg <= this.currentDeg ? " active" : "")
                    }
                    style={tick.tickStyle}
                    />
                ))
                : null}
            </div> */}
            <div className="knob outer" style={oStyle} onMouseDown={startDrag}>
            <div className="knob inner" style={iStyle}>
                <div className="grip" />
            </div>
            </div>
        </div>
    )
}