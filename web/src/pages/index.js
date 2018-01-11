import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Ciphers</h1>
    <p>We will be looking on various techniques for decryption classical ciphers.</p>
    <ul>
      <li>
        <Link to="/frequency-analysis/">Frequency Analysis & Substution Ciphers</Link>
      </li>
      <li>
        <Link to="/index-of-coincidence/">Index of Coincidence & Vigenère Ciphers</Link>
      </li>
    </ul>
  </div>
)

export default IndexPage
