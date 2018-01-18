import React, { Component } from 'react'


class Box extends Component {
    constructor() {
        super()
        this.uuid = Math.random().toString(36)
        this.state = {
            glowing: false
        }
    }
    componentDidMount() {
        this.nv.addEventListener('click', this.handleClick.bind(this))
    }
    componentWillUnmount() {
        this.nv.removeEventListener('click', this.handleClick.bind(this))
    }
    handleClick() {
        this.setState((o) => {
            return { glowing: !o.glowing }
        })
    }
    render() {
        var rectStyle = {
            fill: (this.state.glowing? 'gold': '#DDD'),
            stroke: '#555',
            strokeWidth: '2px'
        }
        var rectShadowStyle = {
            fill: '#777'
        }
        const textWrapStyle = {display: 'table', width:'100%', height: '100%'}
        var textStyle = {display: 'table-cell', textAlign: 'center', verticalAlign: 'middle'}

        if (this.props.largetext) {
            textStyle.fontSize = '200%'
        }
        if (this.props.smalltext) {
            textStyle.fontSize = '70%'
        }

        if (this.props.noshape) {
            rectStyle.fillOpacity = '0.0'
            rectStyle.stroke = undefined
            rectStyle.strokeWidth = undefined
        }


        if (window.MathJax !== undefined) {
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, "math-" + this.uuid ]);
        }

        return (
            <g ref={elem => this.nv = elem} >

        {this.props.shadow && 
            <rect x={this.props.x+5} y={this.props.y+5} width={this.props.w} height={this.props.h} style={rectShadowStyle} />
        }

        <rect x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h} style={rectStyle} />
        <foreignObject x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={textWrapStyle}>
        <p id={"math-"+this.uuid} style={textStyle}>{this.props.children}</p>
        </div>
        </foreignObject>
        
        </g>
        )
    }
}
//<text x={this.props.x + this.props.w/2} y={this.props.y+this.props.h/2} dominantBaseline="central" textAnchor="middle">{this.props.children}</text>

class DES extends Component {
    constructor() {
        super()
    }

    
    
    render() {
        const L1 = (<Box shadow x={50} y={30} w={150} h={40}>{`$L_{i-1}$`}</Box>);
        const R1 = (<Box shadow x={240} y={30} w={150} h={40}>{`$R_{i-1}$`}</Box>);
        const C1 = (<Box shadow x={500} y={30} w={150} h={40}>{`$C_{i-1}$`}</Box>);
        const D1 = (<Box shadow x={690} y={30} w={150} h={40}>{`$D_{i-1}$`}</Box>);

        const F = (<Box x={240+45} y={170} w={60} h={60}>{`$F$`}</Box>);
        const X = (<Box largetext noshape x={240+45+10} y={(170+430)/2+10} w={60-20} h={60-20}>{`$\\oplus$`}</Box>);

        const L2 = (<Box shadow x={50} y={430} w={150} h={40}>{`$L_{i}$`}</Box>);
        const R2 = (<Box shadow x={240} y={430} w={150} h={40}>{`$R_{i}$`}</Box>);
        
        const K = (<Box shadow x={500} y={170} w={60} h={60}>{`$K_{i}$`}</Box>)
        


        const pathStyle = {
            markerEnd: "url(#markerArrow)",
            stroke: "#000",
            strokeWidth: "1px",
            fill: 'none'
        }

        const gp = function(rect, p) {
            if (p === "east") {
                return {x: rect.props.x + rect.props.w,
                    y: rect.props.y + rect.props.h/2}
            } else if (p === "west") {
                return {x: rect.props.x,
                    y: rect.props.y + rect.props.h/2}
            } else if (p === "north") {
                return {x: rect.props.x + rect.props.w/2,
                    y: rect.props.y}
            } else if (p === "south") {
                return {x: rect.props.x + rect.props.w/2,
                    y: rect.props.y + rect.props.h}
            }
        }
        const segs = function(from) {
            
            var x = from.x;
            var y = from.y;
            var ret = "M" + x + "," + y + " ";

            var args = Array.prototype.slice.call(arguments, 1);
            const lst = args.map(p => (p.l || "L") + p.x + "," + p.y)
            ret += lst.join(" ")
            
            return ret;
        }
        // south-west
        const sw = function(r1, r2) {
            return {x: Math.min(r1.props.x+r1.props.w/2, r2.props.x+r2.props.w/2),
                y: Math.max(r1.props.y+r1.props.h/2, r2.props.y+r2.props.h/2)}
        }
        // middle of two points
        const md = function(p1, p2) {
            return {x: (p1.x+p2.x)/2, y: (p1.y+p2.y)/2}
        }
        // offset
        const off = function(dx, dy) {
            return {l: "l", x: dx, y: dy};
        }
        const pt = function(x, y) {
            return {x: x, y: y}
        }



        const textOnL1 = (<g>
            <Box smalltext noshape x={50} y={0} w={150} h={40}>{`$32$-bits`}</Box>
            <path style={pathStyle} d={segs(pt(100, 20), pt(50, 20))} />
            <path style={pathStyle} d={segs(pt(150, 20), pt(200, 20))} />
            </g>)

        const textOnR1 = (<g>
        <Box smalltext noshape x={240} y={0} w={150} h={40}>{`$32$-bits`}</Box>
        <path style={pathStyle} d={segs(pt(290, 20), off(-50, 0))} />
        <path style={pathStyle} d={segs(pt(340, 20), off(50, 0))} />
        </g>)


        return (
            <div>
                <h2>A Feistel Network Round</h2>
            <svg width="100%" height="500" style={{backgroundColor: "#EEE"}}>
            <defs>
            <marker id="markerArrow" markerWidth="15" markerHeight="15" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,11 L10,5 L0,0" style={{fill: '#000'}} />
            </marker>
            </defs>
            <path style={pathStyle} d={segs(gp(L1, "south"), sw(L1, X), gp(X, "west"))}/>
            <path style={pathStyle} d={segs(gp(R1, "south"), gp(F, "north"))}/>
            <path style={pathStyle} d={segs(md(gp(R1, "south"), gp(F, "north")), off(-90, 0), gp(L2, "north"))} />
            <path style={pathStyle} d={segs(gp(F, "south"), gp(X, "north"))} />
            <path style={pathStyle} d={segs(gp(X, "south"), gp(R2, "north"))} />
            {L1}
            {R1}
            {C1}
            {D1}
            
            {F}
            {X}
            
            {L2}
            {R2}
            {K}
            <path style={pathStyle} d={segs(gp(K, "west"), gp(F, "east"))} />
            <Box smalltext noshape x={gp(F,"east").x} y={170} w={150} h={40}>{`$48$-bits`}</Box>
            
            {textOnL1}
            {textOnR1}
            
            </svg>
            <p></p>
            <div id="tdiv">
            <h2>Inside Feistel's F() function.</h2>

            <svg width="100%" height="500" style={{backgroundColor: "#EEE"}}>
            
            </svg>
            </div>
            </div>
        )
    }
}

export default DES;