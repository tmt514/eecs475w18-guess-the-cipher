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


        if (typeof (window) === 'object' && window.MathJax !== undefined) {
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
        this.state = {
            key: "0f1571c947d9e859",
            plaintext: "02468aceeca86420",
            
            // key schedule tables
            PC1: [57, 49, 41, 33, 25, 17,  9,
                1, 58, 50, 42, 34, 26, 18,
               10,  2, 59, 51, 43, 35, 27,
               19, 11,  3, 60, 52, 44, 36,
               63, 55, 47, 39, 31, 23, 15,
                7, 62, 54, 46, 38, 30, 22,
               14,  6, 61, 53, 45, 37, 29,
               21, 13,  5, 28, 20, 12,  4],
            keyrotations: 
            [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],

            PC2: [14, 17, 11, 24,  1,  5,
                3, 28, 15,  6, 21, 10,
               23, 19, 12,  4, 26,  8,
               16,  7, 27, 20, 13,  2,
               41, 52, 31, 37, 47, 55,
               30, 40, 51, 45, 33, 48,
               44, 49, 39, 56, 34, 53,
               46, 42, 50, 36, 29, 32],
            
            // permutation tables
            IP: [58, 50, 42, 34, 26, 18, 10,  2,
                60, 52, 44, 36, 28, 20, 12,  4,
                62, 54, 46, 38, 30, 22, 14,  6,
                64, 56, 48, 40, 32, 24, 16,  8,
                57, 49, 41, 33, 25, 17,  9,  1,
                59, 51, 43, 35, 27, 19, 11,  3,
                61, 53, 45, 37, 29, 21, 13,  5,
                63, 55, 47, 39, 31, 23, 15,  7
            ],
            
            
            // F function tables
            E: [32,  1,  2,  3,  4,  5,  4,  5,
                6,  7,  8,  9,  8,  9, 10, 11,
               12, 13, 12, 13, 14, 15, 16, 17,
               16, 17, 18, 19, 20, 21, 20, 21,
               22, 23, 24, 25, 24, 25, 26, 27,
               28, 29, 28, 29, 30, 31, 32,  1],

            Sbox: 
            [
                [
                [14,  4, 13,  1,  2, 15, 11,  8,  3, 10,  6, 12,  5,  9,  0,  7],
                [ 0, 15,  7,  4, 14,  2, 13,  1, 10,  6, 12, 11,  9,  5,  3,  8],
                [ 4,  1, 14,  8, 13,  6,  2, 11, 15, 12,  9,  7,  3, 10,  5,  0],
                [15, 12,  8,  2,  4,  9,  1,  7,  5, 11,  3, 14, 10,  0,  6, 13],
                ],
              
                [
                [15,  1,  8, 14,  6, 11,  3,  4,  9,  7,  2, 13, 12,  0,  5, 10],
                [ 3, 13,  4,  7, 15,  2,  8, 14, 12,  0,  1, 10,  6,  9, 11,  5],
                [ 0, 14,  7, 11, 10,  4, 13,  1,  5,  8, 12,  6,  9,  3,  2, 15],
                [13,  8, 10,  1,  3, 15,  4,  2, 11,  6,  7, 12,  0,  5, 14,  9],
                ],
              
                [
                [10,  0,  9, 14,  6,  3, 15,  5,  1, 13, 12,  7, 11,  4,  2,  8],
                [13,  7,  0,  9,  3,  4,  6, 10,  2,  8,  5, 14, 12, 11, 15,  1],
                [13,  6,  4,  9,  8, 15,  3,  0, 11,  1,  2, 12,  5, 10, 14,  7],
                [ 1, 10, 13,  0,  6,  9,  8,  7,  4, 15, 14,  3, 11,  5,  2, 12],
                ],
              
                [
                [ 7, 13, 14,  3,  0,  6,  9, 10,  1,  2,  8,  5, 11, 12,  4, 15],
                [13,  8, 11,  5,  6, 15,  0,  3,  4,  7,  2, 12,  1, 10, 14,  9],
                [10,  6,  9,  0, 12, 11,  7, 13, 15,  1,  3, 14,  5,  2,  8,  4],
                [ 3, 15,  0,  6, 10,  1, 13,  8,  9,  4,  5, 11, 12,  7,  2, 14],
                ],
              
                [
                [ 2, 12,  4,  1,  7, 10, 11,  6,  8,  5,  3, 15, 13,  0, 14,  9],
                [14, 11,  2, 12,  4,  7, 13,  1,  5,  0, 15, 10,  3,  9,  8,  6],
                [ 4,  2,  1, 11, 10, 13,  7,  8, 15,  9, 12,  5,  6,  3,  0, 14],
                [11,  8, 12,  7,  1, 14,  2, 13,  6, 15,  0,  9, 10,  4,  5,  3],
                ],
              
                [
                [12,  1, 10, 15,  9,  2,  6,  8,  0, 13,  3,  4, 14,  7,  5, 11],
                [10, 15,  4,  2,  7, 12,  9,  5,  6,  1, 13, 14,  0, 11,  3,  8],
                [ 9, 14, 15,  5,  2,  8, 12,  3,  7,  0,  4, 10,  1, 13, 11,  6],
                [ 4,  3,  2, 12,  9,  5, 15, 10, 11, 14,  1,  7,  6,  0,  8, 13],
                ],
              
                [
                [ 4, 11,  2, 14, 15,  0,  8, 13,  3, 12,  9,  7,  5, 10,  6,  1],
                [13,  0, 11,  7,  4,  9,  1, 10, 14,  3,  5, 12,  2, 15,  8,  6],
                [ 1,  4, 11, 13, 12,  3,  7, 14, 10, 15,  6,  8,  0,  5,  9,  2],
                [ 6, 11, 13,  8,  1,  4, 10,  7,  9,  5,  0, 15, 14,  2,  3, 12],
                ],
              
                [
                [13,  2,  8,  4,  6, 15, 11,  1, 10,  9,  3, 14,  5,  0, 12,  7],
                [ 1, 15, 13,  8, 10,  3,  7,  4, 12,  5,  6, 11,  0, 14,  9,  2],
                [ 7, 11,  4,  1,  9, 12, 14,  2,  0,  6, 10, 13, 15,  3,  5,  8],
                [ 2,  1, 14,  7,  4, 10,  8, 13, 15, 12,  9,  0,  3,  5,  6, 11],
                ]
            ],
            Pbox:
            [16,  7, 20, 21, 29, 12, 28, 17,
                1, 15, 23, 26,  5, 18, 31, 10,
                2,  8, 24, 14, 32, 27,  3,  9,
               19, 13, 30,  6, 22, 11,  4, 25]

            
        }
    }

    
    updateState(key, id) {
        var t = document.getElementById(id).value;
        var st = JSON.parse(JSON.stringify(this.state))
        st[key] = t;
        if (t.match(/[^A-Fa-f0-9]/) === null) {
            this.setState(st);
        }
    }
    updateArray(key, id, idx) {
        var t = parseInt(document.getElementById(id).value) || 0;
        var st = JSON.parse(JSON.stringify(this.state))
        st[key][idx] = t;
        this.setState(st);
    }
    updateSbox(key, id, which, outeridx, inneridx) {
        var t = parseInt(document.getElementById(id).value) || 0;
        var st = JSON.parse(JSON.stringify(this.state))
        st[key][which][outeridx][inneridx] = t;
        this.setState(st);
    }
    updateSboxZero(which) {
        var st = JSON.parse(JSON.stringify(this.state))
        for (var i = 0; i < 4;i+=1)
            for (var j = 0; j < 16; j+=1) {
                st['Sbox'][which][i][j] = 0;
            }
        this.setState(st)
    }
    makeIPIdentity() {
        var st = JSON.parse(JSON.stringify(this.state))
        for (var i = 0; i < 64; i++)
            st.IP[i] = i+1;
        this.setState(st)
    }
    makePboxIdentity() {
        var st = JSON.parse(JSON.stringify(this.state))
        for (var i = 0; i < 32; i++)
        st.Pbox[i] = i+1;
        this.setState(st)
    }
    swapIPandInvIP(InvIP) {
        var st = JSON.parse(JSON.stringify(this.state))
        st.IP = InvIP
        this.setState(st)
    }


    runDES(computed) {
        const hex2bin = function(str) {
            var t = ""
            for (var i = 0; i < str.length; i++) {
                var v = parseInt(str[i], 16).toString(2)
                t += "0000".substr(v.length) + v
            }
            return t
        }
        const bin2hex = function(str) {
            var t = ""
            for (var i = 0; i < str.length; i+=4) {
                var v = parseInt(str.substr(i, 4), 2).toString(16)
                t += v
            }
            return t
        }
        const subKeyDisplay = function(str) {
            var t = ""
            for (var i = 0; i < str.length; i += 6) {
                var v1 = parseInt(str.substr(i, 2), 2).toString(16)
                var v2 = parseInt(str.substr(i+2, 4), 2).toString(16)
                t += v1 + v2 + " "
            }
            return t
        }
        const permute = function(text, P) {
            var t = ""
            for (var i = 0; i < P.length; i++) {
                t += text[P[i]-1];
            }
            return t;
        }
        const circularShiftL = function(str) {
            return str.substr(1) + str[0]
        }
        const Xor = function(x, y) {
            if (x.length != y.length) console.warn("xor : length does not match!")
            var t = ""
            for (var i = 0; i < x.length; i++) {
                t += (x[i] === y[i]? "0": "1")
            }
            return t
        }
    

        var F = (function(computed, round, R, K) {
            var E = permute(R, this.state.E)
            var beforeS = Xor(E, K)
            var afterS = ""
            
            for (var i = 0; i < beforeS.length; i+=6) {
                var outer = beforeS[i] + beforeS[i+5]
                var inner = beforeS.substr(i+1, 4)
                var outerIdx = parseInt(outer, 2)
                var innerIdx = parseInt(inner, 2)
                var v = this.state.Sbox[i/6][outerIdx][innerIdx].toString(2)
                
                // logging use
                computed.SboxAccessHistory[Math.floor(i/6)*64+outerIdx*16+innerIdx] = round;

                afterS += "0000".substr(v.length) + v
            }
            return permute(afterS, this.state.Pbox)
        }).bind(this, computed)

        var plaintext = hex2bin(computed.plaintext);
        var IPed = permute(plaintext, this.state.IP)

        var results = []
        var L = IPed.substr(0, 32)
        var R = IPed.substr(32, 32)
        var key = hex2bin(computed.key)
        var K = permute(key, this.state.PC1)
        if (K.length != 56) console.warn("Incorrect key length!")

        results.push(["IP", "", bin2hex(L), bin2hex(R)])
        for (var i = 1; i <= 16; i++) {
            // key generation
            var C = K.substr(0, 28)
            var D = K.substr(28, 28)
            for (var times = 0; times < this.state.keyrotations[i-1]; times+=1) {
                C = circularShiftL(C)
                D = circularShiftL(D)
            }
            K = C+D
            var subKey = permute(K, this.state.PC2)
            


            var tmp = R
            R = Xor(F(i, R, subKey), L)
            L = tmp
            results.push([`${i}`, subKeyDisplay(subKey), bin2hex(L), bin2hex(R)])
        }
        tmp = L
        L = R
        R = tmp
        results.push(["Swap", "", bin2hex(L), bin2hex(R)])

        var InvIPed = permute(L+R, computed.InvIP)
        L = InvIPed.substr(0, 32)
        R = InvIPed.substr(32, 32)
        results.push(["InvIP", "", bin2hex(L), bin2hex(R)])
        return results
    }
    
    
    render() {

        const legalize = (hexstr) => "0000000000000000".substr(hexstr.length) + hexstr;

        // ================ data generation ===================
        var computed = {
            InvIP: [40,  8, 48, 16, 56, 24, 64, 32,
                39,  7, 47, 15, 55, 23, 63, 31,
                38,  6, 46, 14, 54, 22, 62, 30,
                37,  5, 45, 13, 53, 21, 61, 29,
                36,  4, 44, 12, 52, 20, 60, 28,
                35,  3, 43, 11, 51, 19, 59, 27,
                34,  2, 42, 10, 50, 18, 58, 26,
                33,  1, 41,  9, 49, 17, 57, 25],
            SboxAccessHistory: {},
            plaintext: legalize(this.state.plaintext),
            key: legalize(this.state.key)
        }

        for (var i = 0; i < 64; i++) {
            computed.InvIP[this.state.IP[i]-1] = i+1
        }

        const DESresults = this.runDES(computed);



        // ============== diagrams =========================


        const L1 = (<Box shadow x={50} y={30} w={150} h={40}>{`$L_{i-1}$`}</Box>);
        const R1 = (<Box shadow x={240} y={30} w={150} h={40}>{`$R_{i-1}$`}</Box>);
        const C1 = (<Box shadow x={500} y={30} w={150} h={40}>{`$C_{i-1}$`}</Box>);
        const D1 = (<Box shadow x={690} y={30} w={150} h={40}>{`$D_{i-1}$`}</Box>);

        const C1Shift = (<Box smalltext x={500} y={100} w={150} h={30}>{`Left Circular Shift[$i$]`}</Box>);
        const D1Shift = (<Box smalltext x={690} y={100} w={150} h={30}>{`Left Circular Shift[$i$]`}</Box>);

        const F = (<Box x={240+45} y={170} w={60} h={60}>{`$F$`}</Box>);
        const X = (<Box largetext noshape x={240+45+10} y={(170+430)/2+10} w={60-20} h={60-20}>{`$\\oplus$`}</Box>);

        const L2 = (<Box shadow x={50} y={430} w={150} h={40}>{`$L_{i}$`}</Box>);
        const R2 = (<Box shadow x={240} y={430} w={150} h={40}>{`$R_{i}$`}</Box>);
        const C2 = (<Box shadow x={500} y={430} w={150} h={40}>{`$C_{i}$`}</Box>);
        const D2 = (<Box shadow x={690} y={430} w={150} h={40}>{`$D_{i}$`}</Box>);
        
        const K = (<Box shadow x={460} y={170} w={60} h={60}>{`$K_{i}$`}</Box>)
        const KPC2 = (<Box shadow x={580} y={170} w={60} h={60}>{`$\\textrm{PC}_2$`}</Box>)
        


        const pathStyle = {
            markerEnd: "url(#markerArrow)",
            stroke: "#000",
            strokeWidth: "1px",
            fill: 'none'
        }
        const pathStyleNoEnd = {
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
        const textOnC1 = (<g>
            <Box smalltext noshape x={gp(C1,"west").x} y={0} w={150} h={40}>{`$28$-bits`}</Box>
            <path style={pathStyle} d={segs(pt(gp(C1,"north").x-25, 20), off(-50, 0))} />
            <path style={pathStyle} d={segs(pt(gp(C1,"north").x+25, 20), off(50, 0))} />
            </g>)
        const textOnD1 = (<g>
            <Box smalltext noshape x={gp(D1,"west").x} y={0} w={150} h={40}>{`$28$-bits`}</Box>
            <path style={pathStyle} d={segs(pt(gp(D1,"north").x-25, 20), off(-50, 0))} />
            <path style={pathStyle} d={segs(pt(gp(D1,"north").x+25, 20), off(50, 0))} />
            </g>)

        const Finput = (<Box shadow  x={50} y={60} w={300} h={40}>{`\$R_{i-1}\$: \$32\$ bits`}</Box>)
        const XOR2 = (<Box shadow x={75} y={260} w={75*8-25} h={30}>{`XOR $\\oplus$`}</Box>)
        const Foutput = (<Box shadow  x={200} y={540} w={300} h={40}>{`Output`}</Box>)
        const FP = (<Box shadow  x={200} y={460} w={300} h={40}>{`Permutation $P$`}</Box>)
        const FK = (<Box shadow x={460} y={60} w={400} h={40}>{`$K_i$: $48$ bits`}</Box>)
        const Fexpand = (<Box shadow  x={50} y={150} w={400} h={40}>{`Expanded to $48$ bits`}</Box>)

        var SBoxes = [];
        for (var i=1;i<=8;i+=1) {
            const tmp = (<Box shadow key={i} x={75*i} y={330} w={50} h={50}>{`$S_${i-1}$`}</Box>);
            SBoxes.push(tmp)
            for (var j=0;j<6;j++) {
                SBoxes.push((<path key={1000+i*6+j} style={pathStyleNoEnd} d={segs(
                    {x: gp(tmp, "north").x + (j-2.5)*6, y: gp(XOR2, "south").y },
                    {x: gp(tmp, "north").x + (j-2.5)*6, y: gp(tmp, "north").y }
                )}/>))
                
            }
            for (var j=0; j<4; j++) {
                SBoxes.push((<path key={2000+i*4+j} style={pathStyleNoEnd} d={segs(
                    {x: gp(tmp, "south").x + (j-1.5)*6, y: gp(tmp, "south").y },
                    {x: gp(tmp, "south").x + (j-1.5)*6, y: gp(tmp, "south").y + 20 },
                    {x: gp(FP, "north").x + (i*4-4+j-15.5)*6,
                     y: gp(FP, "north").y - 15 },
                     {x: gp(FP, "north").x + (i*4-4+j-15.5)*6,
                     y: gp(FP, "north").y }
                )}/>))
            }
        }
        
        

//============== tables ===================


        var IPTable = []
        for (var i = 0; i < 8; i++) {
            var row = []
            for (var j = 0; j < 8; j++) {
                var tid = "IP-"+i+"-"+j;
                row.push(<td style={{fontSize: "150%", fontFamily: 'monospace', border: '1px solid black', maxWidth: "50px", padding: "0"}} key={j}><input
                    style={{border: 'none', width: "100%", textAlign: 'center'}}
                    id={tid}
                    onChange={this.updateArray.bind(this, 'IP', tid, i*8+j)}
                    value={this.state.IP[i*8+j]}/></td>)
            }
            IPTable.push((<tr key={i} >{row}</tr>))
        }
        IPTable = (<table style={{border: '3px solid black'}}><tbody><tr><td style={{textAlign: 'center', position: 'relative'}} colSpan={8}>Initial Permutation $IP$
        <button onClick={this.makeIPIdentity.bind(this)} style={{position: 'absolute', lineHeight: '1', whiteSpace: 'nowrap', width: '70px', height: '20px', top: '0', right: '0', fontSize: '80%', backgroundColor: '#FDD'}}>Identity</button>
        <button onClick={this.swapIPandInvIP.bind(this, computed.InvIP)} style={{position: 'absolute', lineHeight: '1', whiteSpace: 'nowrap', width: '70px', height: '20px', top: '20px', right: '0', fontSize: '80%', backgroundColor: '#FDD'}}>Swap $\leftrightarrow$</button>
        </td></tr>{IPTable}</tbody></table>)
        


        var appeared = {}
        var InvIPTable = []
        for (var i = 0; i < 8; i++) {
            var row = []
            for (var j = 0; j < 8; j++) {
                var tid = "InvIP-"+i+"-"+j;
                var v = computed.InvIP[i*8+j];
                var flag = false
                if (appeared[v] === 1) {
                    flag = true
                }
                appeared[v] = 1;
                row.push(<td style={{fontSize: "150%", fontFamily: 'monospace', maxWidth: "50px", padding: "0"}} key={j}><input disabled="disabled"
                    style={{border: 'none', width: "100%", textAlign: 'center', color: (flag? "red": "black")}}
                    id={tid}
                    //onChange={this.updateArray.bind(this, 'InvIP', tid, i*8+j)}    // cannot change
                    value={computed.InvIP[i*8+j]}/></td>)
            }
            InvIPTable.push((<tr key={i}>{row}</tr>))
        }
        InvIPTable = (<table><tbody><tr><td style={{textAlign: 'center'}} colSpan={8}>{`Inversed Initial Permutation $IP^{-1}$`}</td></tr>{InvIPTable}</tbody></table>)
        
        var SBoxTable = []
        for (var z=0;z<8;z++) {
            var subtable = []
            for (var i=0;i<4;i++) {
                var row = []
                if (i === 0) {
                    row.push(<td style={{padding: '0', width: '50px', backgroundColor: '#DDD', textAlign: 'center', verticalAlign: 'middle', position: 'relative'}} key={-1} rowSpan={4}>{`$S_${z}$`}
                    <button onClick={this.updateSboxZero.bind(this, z)} style={{position: 'absolute', lineHeight: '1', whiteSpace: 'nowrap', width: '45px', height: '20px', top: '0', left: '0', fontSize: '80%', backgroundColor: '#FDD'}}>Zero</button>
                    </td>)
                }
                for (var j=0;j<16;j++) {
                    var stid = `S-${z}${i}${j}`

                    // check if that has been accessed
                    var hasAccessed = (computed.SboxAccessHistory[z*64+i*16+j] !== undefined);

                    row.push(<td style={{fontSize: "150%", fontFamily: 'monospace', border: '1px solid black', maxWidth: "50px", padding: "0", textAlign: 'center'}} key={j}><input
                    style={{backgroundColor: (hasAccessed? 'gold': '#DDD'), border: 'none', textAlign: 'center', width: "100%"}}
                    id={stid}
                    onChange={this.updateSbox.bind(this, 'Sbox', stid, z, i, j)}
                    value={this.state.Sbox[z][i][j]}/></td>
                    )
                }
                subtable.push(<tr key={i}>{row}</tr>)
                
            }
            SBoxTable.push(<table style={{border: "2px solid black", maxWidth: 50*17}} key={z*2}>
                <tbody>
                    {subtable}
                </tbody>
            </table>)
            SBoxTable.push(<hr key={z*2+1} />)
        }


        var PBoxTable = []
        for (var i = 0; i < 4; i++) {
            var row = []
            for (var j = 0; j < 8; j++) {
                var tid = "Pbox-"+i+"-"+j;
                row.push(<td style={{backgroundColor: '#DDD', fontSize: "150%", fontFamily: 'monospace', border: '1px solid black', maxWidth: "50px", padding: "0"}} key={j}><input
                    style={{border: 'none', width: "100%", textAlign: 'center'}}
                    id={tid}
                    onChange={this.updateArray.bind(this, 'Pbox', tid, i*8+j)}
                    value={this.state.Pbox[i*8+j]}/></td>)
            }
            PBoxTable.push((<tr key={i} >{row}</tr>))
        }
    
        PBoxTable = (<div style={{width: "400px"}}>
        <table style={{border: '3px solid black'}}><tbody><tr><td style={{position: 'relative', textAlign: 'center'}} colSpan={8}>{`P-Box`}
        <button onClick={this.makePboxIdentity.bind(this)} style={{position: 'absolute', lineHeight: '1', whiteSpace: 'nowrap', width: '70px', height: '20px', top: '0', right: '0', fontSize: '80%', backgroundColor: '#FDD'}}>Identity</button>
        </td></tr>{PBoxTable}</tbody></table></div>
        )


        // TODO
        var PC1Table = (<div></div>)
        var PC2Table = (<div></div>)
        
        var ActualExample = []
        
        var thStyle = {textAlign: 'center', border: '1px solid black', padding: '0'}
        var tdStyle = {textAlign: 'center', border: '1px solid black', padding: '0', fontFamily: 'monospace', fontSize: '150%'}


        
        ActualExample = DESresults.map((x, i) => (<tr key={i}>
            <td style={thStyle}>{x[0]}</td>
            <td style={tdStyle}>{x[1]}</td>
            <td style={tdStyle}>{x[2]}</td>
            <td style={tdStyle}>{x[3]}</td>
            </tr>
            ))
        
            console.log(computed.SboxAccessHistory)


        ActualExample = (
            <table>
                <thead><tr>
                    <th style={thStyle}>Round</th>
                    <th style={thStyle}>$K_i$</th>
                    <th style={thStyle}>$L_i$</th>
                    <th style={thStyle}>$R_i$</th></tr></thead>
                <tbody>{ActualExample}</tbody>
            </table>
        )



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
            {C1Shift}
            {D1Shift}
            
            {F}
            {X}
            
            {L2}
            {R2}
            {C2}
            {D2}

            {K}
            {KPC2}
            <path style={pathStyle} d={segs(gp(KPC2, "west"), gp(K, "east"))} />
            <path style={pathStyle} d={segs(gp(K, "west"), gp(F, "east"))} />
            <path style={pathStyle} d={segs(gp(C1, "south"), gp(C1Shift, "north"))} />
            <path style={pathStyle} d={segs(gp(D1, "south"), gp(D1Shift, "north"))} />
            <path style={pathStyle} d={segs(
                pt(md(gp(C1Shift, "south"), gp(D1Shift, "south")).x, gp(KPC2, "east").y),
                gp(KPC2, "east")
            )} />
            <path style={pathStyle} d={segs(
                gp(C1Shift, "south"), 
                off(0, 20),
                pt(md(gp(C1Shift, "south"), gp(D1Shift, "south")).x, gp(C1Shift, "south").y+20),
                pt(md(gp(C1Shift, "south"), gp(D1Shift, "south")).x, gp(C2, "north").y-30),
                pt(gp(C2, "north").x, gp(C2, "north").y-30),
                off(0, 30)
                )} />
            <path style={pathStyle} d={segs(
                gp(D1Shift, "south"), 
                off(0, 20),
                pt(md(gp(C1Shift, "south"), gp(D1Shift, "south")).x, gp(D1Shift, "south").y+20),
                pt(md(gp(C1Shift, "south"), gp(D1Shift, "south")).x, gp(D2, "north").y-30),
                pt(gp(D2, "north").x, gp(D2, "north").y-30),
                off(0, 30)
                )} />
            <Box smalltext noshape x={gp(F,"east").x} y={170} w={120} h={40}>{`$48$-bits`}</Box>
            
            {textOnL1}
            {textOnR1}
            {textOnC1}
            {textOnD1}
            
            </svg>
            <p></p>
            <div id="tdiv">
            <h2>Inside Feistel's F() function.</h2>

            <svg width="100%" height="650" style={{backgroundColor: "#EEE"}}>
            
            <path style={pathStyle} d={segs(
                gp(Finput, "south"),
                {x: gp(Finput, "south").x, y: gp(Fexpand, "north").y}
            )}/>
            <path style={pathStyle} d={segs(
                gp(Fexpand, "south"),
                {x: gp(Fexpand, "south").x, y: gp(XOR2, "north").y}
            )}/>
            <path style={pathStyle} d={segs(
                gp(FK, "south"),
                off(0, 100),
                off(-160, 0),
                {x: gp(FK, "south").x-160, y: gp(XOR2, "north").y}
            )}/>
            <path style={pathStyle} d={segs(
                gp(FP, "south"),
                gp(Foutput, "north")
            )}/>
            {FK}
            {Finput}
            {Fexpand}
            {XOR2}
            {SBoxes}
            {FP}
            {Foutput}
            

            </svg>
            <p></p>
            <h2>Entire DES Encryption/Decription Process</h2>
            <h3>Parameters</h3>
            <div>
            <div style={{display: 'inline-block', maxWidth: "400px"}}>{IPTable}</div>
            <div style={{display: 'inline-block', width: '50px'}}></div>
            <div style={{display: 'inline-block', maxWidth: "400px"}}>{InvIPTable}</div>
            </div>
            {SBoxTable}
            {PBoxTable}
            {PC1Table}
            {PC2Table}
            <h3>The Actual Example</h3>
            <p>plaintext: <input id='ptxt' style={{fontSize: '150%', fontFamily: 'monospace', width: '300px'}} onChange={this.updateState.bind(this,'plaintext', 'ptxt')} value={this.state.plaintext} /></p>
            <p>key: <input id='ky' style={{fontSize: '150%', fontFamily: 'monospace', width: '300px'}}  onChange={this.updateState.bind(this, 'key', 'ky')} value={this.state.key} /></p>
            {ActualExample}
            </div>
            </div>
        )
    }
}

export default DES;