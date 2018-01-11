import React, { Component } from 'react'
import Link from 'gatsby-link'

class CaesarCipher extends Component {

    constructor() {
        super();
        this.state = {
            paragraph: `Meltdown and Spectre exploit critical vulnerabilities in modern processors. These hardware vulnerabilities allow programs to steal data which is currently processed on the computer. While programs are typically not permitted to read data from other programs, a malicious program can exploit Meltdown and Spectre to get hold of secrets stored in the memory of other running programs. This might include your passwords stored in a password manager or browser, your personal photos, emails, instant messages and even business-critical documents.
            Meltdown and Spectre work on personal computers, mobile devices, and in the cloud. Depending on the cloud provider's infrastructure, it might be possible to steal data from other customers.`,
            mapping: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        }
        var p = [];
        for(var i=0;i<26;i++) p.push(i);
        for (var i=1;i<26;i++) {
            var j = Math.floor(Math.random() * i);
            var v =  p[j];
            p[j] = p[i];
            p[i] = v;
        }
        var w = "";
        for(var i=0;i<26;i++) w += this.state.mapping.charAt(p[i]);
        this.state.mapping = w;
    }
    componentDidMount() {
        
    }
    changeMapping() {
        var t = document.getElementById('maps').value;
        t.replace(/[^A-Z]/g, '')
        this.setState((o) => { return { paragraph: o.paragraph, mapping: t}});
    }
    changeParagraph() {
        var t = document.getElementById('par').value;
        this.setState((o) => {return { paragraph: t, mapping: o.mapping }})
    }
    render() {
        var encodedText=[];
        var s = this.state.paragraph.toUpperCase();
        s = s.replace(/[^A-Z]/g, '');
        for (var i = 0; i < s.length; i++) {
            encodedText.push((<span key={i} style={{color: "black"}}>{this.state.mapping.charAt(s[i].charCodeAt(0)-65)}</span>));
        }
        
    return (    
        <div>
        <h1>Caesar Cipher</h1>
        <div>
        <input id='maps' onChange={this.changeMapping.bind(this)} style={{width: "100%"}} value={this.state.mapping}></input>
        </div>
        <div>
        <textarea id='par' onChange={this.changeParagraph.bind(this)} style={{width: "100%"}} rows="15" value={this.state.paragraph}></textarea>
        </div>
        <div>
            {encodedText}
            </div>

        <Link to="/">Go back to the homepage</Link>
        </div>
    )
    }
}
export default CaesarCipher
