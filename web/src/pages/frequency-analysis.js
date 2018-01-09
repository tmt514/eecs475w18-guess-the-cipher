import React, { Component } from 'react'
import Link from 'gatsby-link'

class CharHead extends Component {
    render() {
        return (
            <div style={{display: "inline-block", width: "50px", textAlign: "center"}}>{this.props.ch}</div>
        )
    }
}

class BarBody extends Component {
    render() {
        var fw = this.props.freq / this.props.sum;
        var fwidth = fw * 3000;
        const wholeBoxStyle = {
            width: "100%",
            display: "block",
            margin: "0px"
        };
        const innerBarStyle = {
            borderTop: "2px solid white", 
            borderBottom: "2px solid white",
            verticalAlign: "middle",
            lineHeight: "1.5",
            display: "table",
            width: fwidth + "px",
            maxWidth: fwidth + "px",
            backgroundColor:"darkblue",
            color:"white",
            overflow: "hidden",
            fontSize: "50%",
            whiteSpace: "nowrap",
            transition: "all 0.5s"
        };
        const innerTextStyle = {
            display: "table-cell",
            width: fwidth + "px",
            maxWidth: fwidth + "px"
        }
        const outerBarStyle = {
            position: "absolute",
            width: "100%",
            display: "table",
            fontSize: "50%",
            overflow: "hidden",
            borderTop: "2px solid white", 
            borderBottom: "2px solid white",
            lineHeight: "1.5",
            zIndex: "-5"
        };
        return (
            <div style={wholeBoxStyle}>
            <div style={outerBarStyle}><div style={{display:"table-cell"}}>&nbsp;{(fw*100).toFixed(2)}%</div></div>
            <div style={innerBarStyle}><div style={innerTextStyle}>&nbsp;{(fw*100).toFixed(2)}%</div>
            </div>
            </div>
        )
    }
}

class Histogram extends Component {

    constructor() {
        super()
        this.state = { sortBy: "alpha" }
    }

    sortByAlpha() {
        this.setState({ sortBy: "alpha" })
    }
    sortByFreq() {
        this.setState({ sortBy: "freq" })
    }

    render() {
        var sum = 0;
        const d = this.props.counts;
        const m = this.props.mapping;
        var lis = [];
        for (var i = 65; i <= 90; i++) {
            var ch = String.fromCharCode(i);
            var freq = d[String.fromCharCode(i)] || 0;
            sum += freq;
            lis.push({ch: ch, freq: freq, s: (m[ch]||"")});
        }
        const inputBoxStyle = {
            width: "25px",
            padding: "0",
            margin: "0",
            textAlign:"center"
        }
        
        if (this.state.sortBy === "freq") lis.sort((a, b) => (parseInt(b.freq) - parseInt(a.freq)));

        var lip = lis.map((e,i)=>(<li style={{marginBottom: "0pt", display: "flex", alignItems:"center"}} key={i}><input style={inputBoxStyle} id={"INPUT-" + e.ch} value={e.s} onChange={this.props.controller.substituteChange.bind(this.props.controller, "INPUT-" + e.ch, e.ch)} /><CharHead ch={e.ch}></CharHead><BarBody freq={e.freq} sum={sum}></BarBody></li>), lis);
        
        return (
            <div>
                Sorted by: <button onClick={this.sortByAlpha.bind(this)}>Alphabet</button><button onClick={this.sortByFreq.bind(this)}>Frequency</button>
                <ul style={{listStyle: "none"}}>
                {lip}
                </ul>
                sum = {sum}
            </div>
        )
    }
}

class CaesarCipher extends Component {

    constructor() {
        super();
        this.state = {
            mapping: {},
            paragraph: `
        Meltdown and Spectre exploit critical vulnerabilities in modern processors. These hardware vulnerabilities allow programs to steal data which is currently processed on the computer. While programs are typically not permitted to read data from other programs, a malicious program can exploit Meltdown and Spectre to get hold of secrets stored in the memory of other running programs. This might include your passwords stored in a password manager or browser, your personal photos, emails, instant messages and even business-critical documents.
        Meltdown and Spectre work on personal computers, mobile devices, and in the cloud. Depending on the cloud provider's infrastructure, it might be possible to steal data from other customers.
        ` };
        
    }
    componentDidMount() {
        
    }
    substituteChange(inputboxID, ch) {
        var c = document.getElementById(inputboxID).value;
        var m = JSON.parse(JSON.stringify(this.state.mapping));
        if (c.length !== 1) c = undefined;
        m[ch] = c;
        this.setState((o) => { return { mapping: m, paragraph: o.paragraph }})
        console.log(inputboxID, ch);
    }
    updateText() {
        var t = document.getElementById('par').value;
        this.setState((o) => { return { mapping: o.mapping, paragraph: t }; });
    }
    render() {
        const mapping = this.state.mapping;
        var counts = {};
        var s = this.state.paragraph.toUpperCase();
        for (var i = 0; i < s.length; i++) {
            var ch = s[i];
            if (counts[ch] === undefined) counts[ch] = 1;
            else counts[ch] += 1;
        }

        var decodedText = [];
        for (var i = 0; i < s.length; i++) {
            var ch = s[i];
            if (mapping[ch] !== undefined) {
                decodedText.push((<span key={i} style={{color: "red"}}>{mapping[ch]}</span>));
            } else {
                decodedText.push((<span key={i} style={{color: "black"}}>{ch}</span>));
            }
        }
        console.log(counts);
    return (
        <div>
        <h1>Frequency Analysis & Substitution Ciphers</h1>
        <div style={{display: "flex"}}>
        <div style={{flex: "0 0 50%"}}>
            <textarea id='par' rows="15" style={{width:"100%"}} onChange={this.updateText.bind(this)} value={ this.state.paragraph }></textarea>
            <div id='res' style={{fontFamily: "monospace", lineHeight: "1.1"}}>
            {decodedText}
            </div>
        </div>
        <div style={{flex: "0 0 50%"}}>
        <Histogram counts={counts} controller={this} mapping={mapping}></Histogram>
        </div>
        </div>
        <Link to="/">Go back to the homepage</Link>
        </div>
    )
    }
}
export default CaesarCipher
