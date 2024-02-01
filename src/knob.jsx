import './knob.css'
import { useState } from 'react'

export default function Knob (props) {
    function convertRange (oldMin, oldMax, newMin, newMax, oldValue) {
        return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
      };
    
    const fullAngle = props.degrees;
    const startAngle = (360 - props.degrees) / 2;
    const endAngle = startAngle + props.degrees;
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
          console.log(deg, Math.round(currentDeg), newValue)
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
      
        function dcpy (o) {
          return JSON.parse(JSON.stringify(o));
        };
      
        let kStyle = {
            width: props.size,
            height: props.size
        };
        let iStyle = dcpy(kStyle);
        let oStyle = dcpy(kStyle);
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
            <div className="knob outer" style={oStyle} onMouseDown={startDrag}>
                <div className="knob inner" style={iStyle}>
                    <div className="grip" />
                </div>
            </div>
        </div>
    )
}