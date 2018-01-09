import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Ciphers</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      <li>
        <Link to="/caesar-cipher/">Caesar Cipher</Link>
      </li>
      <li>
        <Link to="/frequency-analysis/">Frequency Analysis</Link>
      </li>
    </ul>
  </div>
)

export default IndexPage
